import { Link } from "react-router-dom";

export default function Register() {
    return (
        <main>
            <h1>Register page</h1>
            <p>Please enter your information below:</p>
            <form>
                <input type="text" placeholder="Username"></input>
                <input type="password" placeholder="Password"></input>
                <button type="submit">Submit</button>
            </form>
            <p>Do you need to <Link to="/login">login</Link> instead?</p>
        </main>
    )
}