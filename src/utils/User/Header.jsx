import {useEffect, useState} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

const TitleCustom = styled.h2`
    margin: 0;
    padding-left: 2rem;
`;

// eslint-disable-next-line react/prop-types
function Header({onLogout}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check token presence in localStorage
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleLogoutClick = () => {
        console.log("Button clicked");
        onLogout();
        localStorage.removeItem("token"); // Remove token on logout
        setIsLoggedIn(false);
    };

    return (
        <header
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "10px 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                zIndex: 1000,
            }}
        >
            <TitleCustom>Disney Land</TitleCustom>
            {isLoggedIn ? (
                <button
                    onClick={handleLogoutClick}
                    style={{
                        backgroundColor: "#28a745",
                        color: "#fff",
                        border: "none",
                        padding: "8px 16px",
                        marginRight: "1rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Logout
                </button>
            ) : (
                <button
                    onClick={handleLoginClick}
                    style={{
                        backgroundColor: "#ffc107",
                        color: "#000",
                        border: "none",
                        padding: "8px 16px",
                        marginRight: "1rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Login
                </button>
            )}
        </header>
    );
}

export default Header;
