import { Link } from 'react-router-dom'

export default function Main() {
    return (
        <main>
            <h1>This is the home page</h1>
            <p>Check out the <Link to="/about">about</Link> page or the <Link to="/login">login</Link> page</p>
        </main>
    )
}