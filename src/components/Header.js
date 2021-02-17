import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = ({ onAdd, showAdd }) => {
  const location = useLocation()

  return (
    <header className='header'>
      <h1>Netflix</h1>
      {location.pathname === '/' && (
        <Button 
          color={'red'}
          text={showAdd ? 'Go Back'  : 'Sign In'}
          onClick={onAdd}
        />
      )}
    </header>
  )
}




export default Header
