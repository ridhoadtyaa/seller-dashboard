import logo from '../assets/img/logo/logo.svg';
import { Link } from 'react-router-dom';
import { BiUserCircle, BiShoppingBag } from 'react-icons/bi';

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
            <div className="container">
            <Link className="navbar-brand pe-4" to="/"><img src={logo} alt="Logo" width={43} /></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle active" to="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Category
                    </Link>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><Link className="dropdown-item" to="#">Shoes</Link></li>
                    <li><Link className="dropdown-item" to="#">Accessories</Link></li>
                    <li><Link className="dropdown-item" to="#">T-Shirt</Link></li>
                    </ul>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="#">Search</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" to="#">About</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" to="#">Help</Link>
                </li>
                </ul>
                <div className='ms-auto'>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active cartnavlink" to="#"><BiShoppingBag /></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active usernavlink" to="#"><BiUserCircle /></Link>
                        </li>
                    </ul>
                </div>
            </div>
            </div>
        </nav>
      </>
    )
}

export default Navbar;