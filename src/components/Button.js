const Button = ({text, onClick }) => {
  return(
    <button
      onClick={onClick}
      className='mybutton'>
      {text}
    </button>
  )
}
export default Button
