import styled from "styled-components";

const TitleCustom = styled.h2`
    margin: 0;
    padding-left: 2rem;
`

// eslint-disable-next-line react/prop-types
function Header({onLogout}) {
    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            backgroundColor: '#007bff',
            color: '#fff',
            padding: '10px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <TitleCustom>Disney Land</TitleCustom>
            <button
                onClick={() => {
                    console.log('Button clicked');
                    onLogout();
                }}
                style={{
                    backgroundColor: '#28a745',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 16px',
                    marginRight: '1rem',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                Logout
            </button>

        </header>
    );
}

export default Header;
