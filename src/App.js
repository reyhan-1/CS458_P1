import { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import SignIn from './components/SignIn'
import About from './components/About'
import SignUp from './components/SignUp'

const App = () => {
  const [showSignIn, setshowSignIn] = useState(false)

  // sign in
  const signInHandler = async (task) => {
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
        <Header />
        <Route
          path='/'
          exact
          component={SignIn}
        />
        <Route
          path='/signin'
          exact
          component={SignIn}
        />
        <Route
          path='/signup'
          exact
          component={SignUp}
        />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  )
}

export default App
