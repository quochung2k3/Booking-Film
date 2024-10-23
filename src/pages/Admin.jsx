// Admin.jsx
import styled from 'styled-components'
import {Navigate, Route, Routes} from 'react-router-dom'
import Header from "../utils/Admin/Header.jsx";
import Navbar from "../utils/Admin/Navbar.jsx";
import Dashboard from "../Components/Admin/Dashboard.jsx";
import Settings from "../Components/Admin/Settings.jsx";
import Profile from "../Components/Admin/Profile.jsx";

// eslint-disable-next-line react/prop-types
function Admin({onLogout}) {
    return (
        <AdminContainer>
            <Header onLogout={onLogout}/>
            <Navbar/>
            <MainContent>
                <Routes>
                    <Route path="dashboard" element={<Dashboard/>}/>
                    <Route path="settings" element={<Settings/>}/>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="/" element={<Navigate to="dashboard"/>}/>
                </Routes>
            </MainContent>
        </AdminContainer>
    )
}

export default Admin

// Styled components
const AdminContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const MainContent = styled.div`
    margin-left: 220px;
    margin-top: 60px;
    padding: 20px;
    flex-grow: 1;
`