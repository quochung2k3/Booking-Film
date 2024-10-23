import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

// eslint-disable-next-line react/prop-types
function Login({onLogin}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        // Giả lập dữ liệu đăng nhập mẫu
        if (username === 'admin' && password === 'admin') {
            const fakeToken = 'fake-token-for-admin'
            onLogin(1, fakeToken)
            navigate('/')
        } else if (username === 'user' && password === 'user') {
            const fakeToken = 'fake-token-for-user'
            onLogin(2, fakeToken)
            navigate('/')
        } else {
            alert('Invalid credentials')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    )
}

export default Login
