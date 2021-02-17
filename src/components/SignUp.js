import { useState } from 'react'
import { Link } from 'react-router-dom'


const SignUp = ({ onGetStarted }) => {
    const [text, setText] = useState('')
  
    const onSubmit = (e) => {
      e.preventDefault()

      onGetStarted({ text })
      setText('')
    }
  
    return (
      <form className='signup' onSubmit={onSubmit}>
        <div className='signup-control'>
          <input
            type='text'
            placeholder='Email address'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        
       
  
        <input type='submit' value='Get Started >' className='mybutton mybutton-block' />
      </form>
    )
  }
  
  export default SignUp
  