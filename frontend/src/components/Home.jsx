import { Link } from 'react-router-dom'

export default function Main() {
    return (
        <main>
            <h1>This is the home page</h1>
            <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/record">Record</Link></li>
                <li><Link to='/pastdata'>Past Data</Link></li>
            </ul>
        </main>
    )
}