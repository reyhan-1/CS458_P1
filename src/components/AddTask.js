import { useState } from 'react'
import { Link } from 'react-router-dom'

const SignIn = ({ onSignIn }) => {
  const [text, setText] = useState('')
  const [pass, setPass] = useState('')
  const [rememberMe, setRemember] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    if(!pass){
      alert('invalid password')
    }

    onSignIn({ text, pass, rememberMe })
    setText('')
    setPass('')
    setRemember(false)
  }

  return (
    <form className='signin' onSubmit={onSubmit}>
      <div className='signin-control'>
        <input
          type='text'
          placeholder='Email or phone number'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className='signin-control'>
        <input
          type='text'
          placeholder='Password'
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </div>
      <div className='signin-control signin-control-check'>
        <label>remember me</label>
        <input
          type='checkbox'
          checked={rememberMe}
          value={rememberMe}
          onChange={(e) => setRemember(e.currentTarget.checked)}
        />
      </div>

      <input type='submit' value='Sign In' className='mybutton mybutton-block' />
    </form>
  )
}

export default SignIn
