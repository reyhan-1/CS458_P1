import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import SignIn from './components/SignIn'
import About from './components/About'
import SignUp from './components/SignUp'
import MainPage from './components/MainPage'
import ResetPassword from './components/ResetPassword'

const App = () => {
  return (
    <Router>
      <div className='container'>
        <Header />
        <Route path='/' exact component={SignUp} />
        <Route path='/signin' exact component={SignIn} />
        <Route path='/signup' exact component={SignUp} />
        <Route path='/dashboard/:email' component={MainPage} />
        <Route path='/resetpassword/:email' component={ResetPassword} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  )
}

export default App
