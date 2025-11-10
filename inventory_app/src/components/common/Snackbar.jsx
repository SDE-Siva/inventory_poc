import './Snackbar.css'
const Snackbar = ({message, type}) => {
  return (
    <div className={`snackbar ${type}`}>{message}</div>
  )
}

export default Snackbar