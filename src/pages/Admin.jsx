// Admin.jsx
import styled from 'styled-components'
import {Navigate, Route, Routes} from 'react-router-dom'
import Header from "../utils/Admin/Header.jsx";
import Navbar from "../utils/Admin/Navbar.jsx";
import Dashboard from "../Components/Admin/Dashboard.jsx";
import MovieScreenings from "../Components/Admin/MovieScreenings.jsx";
import ListFilm from "../Components/Admin/ListFilm.jsx";

// eslint-disable-next-line react/prop-types
function Admin({onLogout}) {
    return (
        <AdminContainer>
            <Header onLogout={onLogout}/>
            <Navbar/>
            <MainContent>
                <Routes>
                    <Route path="dashboard" element={<Dashboard/>}/>
                    <Route path="movie_screenings" element={<MovieScreenings/>}/>
                    <Route path="list_film" element={<ListFilm/>}/>
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