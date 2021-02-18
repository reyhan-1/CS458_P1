import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div>
      <h2>A simple netflix sign in and sign up page for Bilkent CS458 Term Project 1 </h2>
      <br />
      <h3> Group members:  </h3>
      
      <div className="about">
        <p>Reyhan Uyanik</p>
        <p>Aziz Utku Kagitci</p>1
        <p>Osman Burak Intisah </p>
        <p>Aysegul Gokce</p>
      </div>

      <div>
        <Link to='/'>Sign-up Page</Link>
      </div>
    </div>

  )
}

export default About
