import {useEffect, useState} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Admin from './pages/Admin.jsx';
import User from './pages/User.jsx';
import SolveBooking from "./pages/SolveBooking.jsx";

function App() {
    const [roleId, setRoleId] = useState(null);
    const [fakeToken, setFakeToken] = useState(null);

    useEffect(() => {
        const savedRole = localStorage.getItem('roleId');
        const token = localStorage.getItem('token');
        if (savedRole && token) {
            setRoleId(parseInt(savedRole, 10));
            setFakeToken(token);
        }
    }, []);

    const handleLogin = (role, token) => {
        localStorage.setItem('roleId', role);
        localStorage.setItem('token', token);
        setRoleId(role);
        setFakeToken(token);
    };

    const handleLogout = () => {
        console.log('Logging out...');
        localStorage.removeItem('roleId');
        localStorage.removeItem('token');
        setRoleId(null);
        setFakeToken(null);
    };

    return (
        <Routes>
            <Route
                path="/login"
                element={fakeToken ? <Navigate to="/"/> : <Login onLogin={handleLogin}/>}
            />
            <Route
                path="/admin/*"
                element={fakeToken && roleId === 1 ? <Admin onLogout={handleLogout}/> : <Navigate to="/login"/>}
            />
            <Route
                path="/user"
                element={<User onLogout={handleLogout}/>}
            />
            <Route
                path="/user/booking/:showTimeId"
                element={<SolveBooking onLogout={handleLogout}/>}
            />
            <Route
                path="/"
                element={
                    fakeToken
                        ? roleId === 1
                            ? <Navigate to="/admin"/>
                            : <Navigate to="/user"/>
                        : <Navigate to="/user"/>
                }
            />
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    );
}

export default App;
