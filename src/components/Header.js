import { useLocation, Link } from 'react-router-dom'
import Button from './Button'

const Header = () => {
  const location = useLocation();
  return (
    <header className='header'>
      <h1>Netflix</h1>
      {location.pathname === '/signup' && (
        <Link to="/signin">
          <Button 
            color={'red'}
            text={'Sign In'}
          />
        </Link>
    )}
    </header>
  );
}




export default Header
