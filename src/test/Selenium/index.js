const { Builder, By } = require('selenium-webdriver');

const EMAIL_VALID = 'user@test.com';
const PASSWORD_VALID = '12345678qQ';
const EMAIL_INVALID = 'demo@test.com';
const PASSWORD_INVALID = '12345678zZ';
const URL_BASE = 'http://localhost:3000/';
const URL_SIGNIN = 'http://localhost:3000/signin/';
const URL_RESET_PASSWORD = 'http://localhost:3000/resetpassword/';
const CLASS_NAMES = {
  BUTTON_SIGN_IN: 'mybutton mybutton-block',
  BUTTON_RESET_PASSWORD: 'mybutton mybutton-block',
  BUTTON_LOGOUT: 'topMarginLogoutButton',
}

const IDS = {
  WARNING: 'warning',
  INPUT_EMAIL: 'email',
  INPUT_PASSWORD: 'password',
  INPUT_REMEMBER_ME: 'rememberMe',
}

let driver;

const runTests = async () => {
  driver = await new Builder().forBrowser('chrome').build();
  // Run test sequentially
  await checkMissingFieldsBehaviour(1);
  await checkUnregisteredUserBehaviour(2);
  await checkSuccesfullySignIn(3);
  await checkBehaviourOfRememberMe(4);
  await checkResetPassword(5);
  // Quit web driver
  driver.quit();
};

// 4.1. Checks how the code behaves when there is a missing field in the sign in form when the sign in button is clicked.
const checkMissingFieldsBehaviour = async (testNo) => {
  try {
    await driver.get(URL_SIGNIN);
    await driver.findElement(By.className(CLASS_NAMES.BUTTON_SIGN_IN)).click();
    await driver.sleep(5);
    await driver.findElement(By.id(IDS.WARNING)).getText().then((text) => {
      if (text === 'Sorry, please fill in all of the fields.') {
        console.log(`Test Case #${testNo} Passed ✓`);
      } else {
        console.log(`Test Case #${testNo} Failed x: ${text}`);
      }
    });
  } catch(exception) {
    console.log(`Test Case #${testNo} Failed x: ${exception}`);
  }
}

// 4.2. Checks how the code behaves when an unregistered email address is given in the sign in attempt.
const checkUnregisteredUserBehaviour = async (testNo) => {
  try {
    await driver.get(URL_SIGNIN);
    await driver.findElement(By.id(IDS.INPUT_EMAIL)).sendKeys(EMAIL_INVALID);
    await driver.findElement(By.id(IDS.INPUT_PASSWORD)).sendKeys(PASSWORD_INVALID);
    await driver.findElement(By.className(CLASS_NAMES.BUTTON_SIGN_IN)).click();
    await driver.sleep(5);
    await driver.findElement(By.id(IDS.WARNING)).getText().then((text) => {
      if (text === 'Sorry, we can\'t find an account with this email address. Please try again or create a new account.') {
        console.log(`Test Case #${testNo} Passed ✓`);
      } else {
        console.log(`Test Case #${testNo} Failed x: ${text}`);
      }
    });
  } catch(exception) {
    console.log(`Test Case #${testNo} Failed x: ${exception}`);
  }
}

// 4.3. Checks how the code responses to existing users sign in attempt with a valid password. 
const checkSuccesfullySignIn = async (testNo) => {
  try {
    await signIn(EMAIL_VALID, PASSWORD_VALID);
    const currentUrl = await driver.getCurrentUrl();
    if (currentUrl.toLowerCase().endsWith(`dashboard/${EMAIL_VALID}`)) {
      console.log(`Test Case #${testNo} Passed ✓`);
    } else {
      console.log(`Test Case #${testNo} Failed x: Redirected to ${currentUrl}`);
    }
  } catch(exception) {
    console.log(`Test Case #${testNo} Failed x: ${exception}`);
  }
}

// 4.4. Checks if the sign ins with remember me preference are memorized for future logins.
const checkBehaviourOfRememberMe = async (testNo) => {
  try {
    // First check behaviour when remember me checked
    await checkBehaviourWhenRememberMeChecked(testNo);
    // Then check behaviour when remember me unchecked
    await checkBehaviourWhenRememberMeUnchecked(testNo)
    console.log(`Test Case #${testNo} Passed ✓`);
  } catch (exception) {
    console.log(`Test Case #${testNo} Failed x: ${exception}`);
  }
}

const checkBehaviourWhenRememberMeChecked = async (testNo) => {
  await signIn(EMAIL_VALID, PASSWORD_VALID, true);
  await driver.get(URL_BASE);
  const currentUrl = await driver.getCurrentUrl();
  if (!currentUrl.toLowerCase().endsWith(`dashboard/${EMAIL_VALID}`)) {
    throw `Should redirect to dashboard when remember me is checked`;
  }
  await driver.findElement(By.className(CLASS_NAMES.BUTTON_LOGOUT)).click();
}

const checkBehaviourWhenRememberMeUnchecked = async (testNo) => {
  await signIn(EMAIL_VALID, PASSWORD_VALID, false);
  await driver.get(URL_BASE);
  const currentUrl = await driver.getCurrentUrl();
  if (currentUrl.toLowerCase().endsWith(`dashboard/${EMAIL_VALID}`)) {
    throw `Failed x: Should not redirect to dashboard when remember me is unchecked`;
  }
}

// 4.5. Checks if the reset password functionality works.
const checkResetPassword = async (testNo) => {
  try {
    await resetPassword(EMAIL_VALID, PASSWORD_INVALID);
    await signIn(EMAIL_VALID, PASSWORD_INVALID);
    const currentUrl = await driver.getCurrentUrl();
    if (!currentUrl.toLowerCase().endsWith(`dashboard/${EMAIL_VALID}`)) {
      console.log(`Test Case #${testNo} Failed x: Password was not changed ${currentUrl}`);
    } else {
      console.log(`Test Case #${testNo} Passed ✓`);
      await driver.findElement(By.className(CLASS_NAMES.BUTTON_LOGOUT)).click();
      await resetPassword(EMAIL_VALID, PASSWORD_VALID);
    }
  } catch(exception) {
    console.log(`Test Case #${testNo} Failed x: ${exception}`);
  }
}

const resetPassword = async (email, newPassword, testNo) => {
  await driver.get(URL_SIGNIN);
  await driver.findElement(By.id(IDS.INPUT_EMAIL)).sendKeys(email);
  await driver.findElement(By.id(IDS.INPUT_PASSWORD)).sendKeys(newPassword);
  await driver.findElement(By.className(CLASS_NAMES.BUTTON_SIGN_IN)).click();
  await driver.sleep(5);
  const text = await driver.findElement(By.id(IDS.WARNING)).getText();
  if (text === 'Incorrect password. Please try again or you can reset your password.') {
    // Reset password
    await driver.get(URL_RESET_PASSWORD + EMAIL_VALID)
    await driver.findElement(By.id(IDS.INPUT_PASSWORD)).sendKeys(newPassword);
    await driver.findElement(By.id('password-confirmation')).sendKeys(newPassword);
    await driver.findElement(By.className(CLASS_NAMES.BUTTON_RESET_PASSWORD)).click();
    await driver.sleep(5);
  } else {
    throw `Failed x: Does not show reset password link, may the password is correct`;
  }
}

const signIn = async (email, password, rememberMe) => {
  await driver.get(URL_SIGNIN);
  await driver.findElement(By.id(IDS.INPUT_EMAIL)).sendKeys(email);
  await driver.findElement(By.id(IDS.INPUT_PASSWORD)).sendKeys(password);
  // Click remember me if it requires
  if (rememberMe ^ await driver.findElement(By.id(IDS.INPUT_REMEMBER_ME)).isSelected()) {
    await driver.findElement(By.id(IDS.INPUT_REMEMBER_ME)).click();
    await driver.sleep(5);
  }
  await driver.findElement(By.className(CLASS_NAMES.BUTTON_SIGN_IN)).click();
  await driver.sleep(5);
}

runTests();
