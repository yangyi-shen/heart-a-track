export default function Login() {
    return (
        <main>
            <h1>Login page</h1>
            <p>Please enter your information below:</p>
            <form>
                <input type="text" placeholder="Username"></input>
                <input type="password" placeholder="Password"></input>
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}