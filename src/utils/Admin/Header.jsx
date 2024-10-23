// Header.jsx
import styled from 'styled-components'

// eslint-disable-next-line react/prop-types
function Header({onLogout}) {
    return (
        <HeaderContainer>
            <Title>Admin</Title>
            <LogoutButton onClick={onLogout}>Logout</LogoutButton>
        </HeaderContainer>
    )
}

export default Header

// Styled components
const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background-color: #0b9a7d; /* Matches the Navbar background */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    z-index: 1000;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    color: #ecf0f1; /* Light text color for better contrast */
`

const Title = styled.h2`
    margin: 0;
    color: #ecf0f1; /* Matches the text color with the Navbar */
`

const LogoutButton = styled.button`
    background-color: #e74c3c; /* Dark red for the button */
    border: none;
    color: #ecf0f1;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #c0392b; /* Darker shade on hover */
    }
`
