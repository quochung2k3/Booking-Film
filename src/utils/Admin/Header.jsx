// Header.jsx
import styled from 'styled-components'

// eslint-disable-next-line react/prop-types
function Header({onLogout}) {
    return (
        <HeaderContainer>
            <Title>My Admin Panel</Title>
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
    background-color: #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    z-index: 1000;
`

const Title = styled.h2`
    margin: 0;
`

const LogoutButton = styled.button`
    background-color: #ff4d4d;
    border: none;
    color: white;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
        background-color: #ff3333;
    }
`
