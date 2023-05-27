// const { Link, NavLink, useNavigate } = ReactRouterDOM
// const { useSelector, useDispatch } = ReactRedux
import { Link, NavLink, useNavigate } from 'react-router-dom'



export function AppHeader() {
    const navigate = useNavigate()

    
    
    return <header className="main-header full" >
        <Link className="logo" to="/">
            <h3 >Toys&Toys</h3>
        </Link>
        <nav className="nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/toy">Toys</NavLink>
        </nav>
    </header>
}
