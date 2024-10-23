// Navbar.jsx
import {Link} from 'react-router-dom'
import styled from 'styled-components'

function Navbar() {
    return (
        <NavContainer>
            <NavList>
                <NavItem>
                    <StyledLink to="/admin/dashboard">Dashboard</StyledLink>
                </NavItem>
                <NavItem>
                    <StyledLink to="/admin/movie_screenings">Movie Screenings</StyledLink>
                </NavItem>
                <NavItem>
                    <StyledLink to="/admin/list_film">List Film</StyledLink>
                </NavItem>
            </NavList>
        </NavContainer>
    )
}

export default Navbar

// Styled components
const NavContainer = styled.nav`
    position: fixed;
    top: 60px;
    left: 0;
    width: 200px;
    height: calc(100vh - 60px);
    background-color: #e0e0e0;
    padding: 20px;
    z-index: 900;
`

const NavList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`

const NavItem = styled.li`
    margin-bottom: 10px;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    font-weight: bold;

    &:hover {
        color: #007bff;
    }
`
