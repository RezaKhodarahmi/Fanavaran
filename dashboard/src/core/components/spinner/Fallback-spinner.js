// ** Logo
import logo from '../../../assets/images/logo/Loading.gif'

const SpinnerComponent = () => {
  return (
    <div className='fallback-spinner app-loader'>
      <img className='fallback-logo' src={logo} alt='logo' />
    </div>
  )
}

export default SpinnerComponent
