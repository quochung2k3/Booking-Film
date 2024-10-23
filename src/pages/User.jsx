// eslint-disable-next-line react/prop-types
function User({ onLogout }) {
    return (
        <div>
            <h1>Welcome, User!</h1>
            <button onClick={onLogout}>Logout</button>
        </div>
    )
}

export default User
