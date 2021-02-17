import { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import AddTask from './components/AddTask'
import About from './components/About'
import SignUp from './components/SignUp'

const App = () => {
  const [showSignIn, setshowSignIn] = useState(false)

  // sign in
  const SignIn = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()
  }

  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setshowSignIn(!showSignIn)}
          showSignIn={showSignIn}
        />


        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {showSignIn && <AddTask onSignIn={SignIn} />}
              
            </>
          )}
        />

        <SignUp/>
        
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  )
}

export default App
