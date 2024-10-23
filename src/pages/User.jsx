import Header from "../utils/User/Header.jsx";
import Footer from "../utils/User/Footer.jsx";

// eslint-disable-next-line react/prop-types
function User({onLogout}) {
    return (
        <div style={{paddingTop: '60px', paddingBottom: '60px', backgroundColor: '#f0f2f5', minHeight: '100vh'}}>
            <Header onLogout={onLogout}/>
            <div style={{textAlign: 'center', padding: '20px'}}>
                <h1>Welcome, User!</h1>
            </div>
            <Footer/>
        </div>
    );
}

export default User;
