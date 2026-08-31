import './Logo.css'
import logo from '../../assets/imgs/logo.png'

export default function Logo() {
    return (
        <aside className='logo'>
            <a href="/" className="logo">
                <img src={logo} alt="logo" />
            </a>
        </aside>
    )
}