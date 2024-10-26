import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

// eslint-disable-next-line react/prop-types
function Login({onLogin}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
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
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.heading}>Welcome</h2>
                <div style={styles.inputContainer}>
                    <label style={styles.label}>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputContainer}>
                    <label style={styles.label}>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>Login</button>
            </form>
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundImage: 'url("https://t4.ftcdn.net/jpg/06/89/49/95/360_F_689499531_MeYeI1VVavgYQRzz0S3JxkQ9VxzgYZQh.jpg")',
    },
    form: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '300px',
        textAlign: 'center',
    },
    heading: {
        marginTop: 0,
        marginBottom: '1rem',
        fontSize: '1.5rem',
        color: '#333',
    },
    inputContainer: {
        marginBottom: '1rem',
    },
    label: {
        display: 'block',
        marginBottom: '0.5rem',
        fontSize: '1rem',
        color: '#555',
        textAlign: 'left',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '0.5rem',
        fontSize: '1rem',
        borderRadius: '4px',
        border: '2px solid #ddd',
        outline: 'none',
        boxSizing: 'border-box',
    },
    button: {
        width: '100%',
        padding: '0.7rem',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#4CAF50',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#45a049',
    }
}

export default Login
