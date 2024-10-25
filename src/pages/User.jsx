import {useState} from 'react';
import styled from 'styled-components';
import Header from "../utils/User/Header.jsx";
import Footer from "../utils/User/Footer.jsx";
import {dataBookingFilm, dataBookingModal} from "../utils/data.jsx";
import BookingModal from "../modal/BookingModal.jsx";
import {useNavigate} from "react-router-dom";

// Styled components
const Container = styled.div`
    padding-top: 60px;
    padding-bottom: 60px;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const TabsContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    border-bottom: 2px solid #ddd;
`;

const Tab = styled.div`
    margin: 0 15px;
    padding: 10px 20px;
    cursor: pointer;
    font-weight: bold;
    color: ${(props) => (props.active ? '#007bff' : '#000')};
    border-bottom: ${(props) => (props.active ? '3px solid #007bff' : 'none')};
    transition: color 0.3s, border-bottom 0.3s;

    &:hover {
        color: #007bff;
    }
`;

const MovieListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px 20px;
    max-width: 1000px;
    margin: 0 auto;
`;

const MovieCard = styled.div`
    flex: 1 1 calc(33.33% - 100px);
    max-width: calc(33.33% - 100px);
    margin: 10px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    position: relative;
    overflow: hidden;
    padding: 20px;
`;

const MovieImage = styled.img`
    width: 100%;
    border-radius: 10px 10px 0 0;
    height: 250px;
    object-fit: contain;
`;

const MovieTitle = styled.h3`
    font-size: 16px;
    margin: 5px 0;
    color: #333;
    height: 50px;
    overflow: hidden;
`;

const MovieInfo = styled.p`
    font-size: 14px;
    margin: 3px 0;
    color: #666;
`;

const BuyButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    margin-top: 10px;

    &:hover {
        background-color: #0056b3;
    }
`;

// eslint-disable-next-line react/prop-types
function MovieList({dataBookingFilm, onBuyTicket}) {
    return (
        <MovieListContainer>
            {/* eslint-disable-next-line react/prop-types */}
            {dataBookingFilm.map((movie) => (
                <MovieCard key={movie.id}>
                    <MovieImage src={movie.image} alt={movie.title}/>
                    <MovieTitle>{movie.title}</MovieTitle>
                    <MovieInfo>Thể loại: {movie.type}</MovieInfo>
                    <MovieInfo>Thời lượng: {movie.duration} phút</MovieInfo>
                    <BuyButton onClick={() => onBuyTicket(movie)}>Mua vé</BuyButton>
                </MovieCard>
            ))}
        </MovieListContainer>
    );
}

// eslint-disable-next-line react/prop-types
function User({onLogout}) {
    const [activeTab, setActiveTab] = useState('PHIM SẮP CHIẾU');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredShowtimes, setFilteredShowtimes] = useState([]);
    const navigate = useNavigate();
    const currentDate = new Date();

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const handleBuyTicketClick = (movie) => {
        const token = localStorage.getItem('token');
        if (token) {
            setSelectedMovie(movie);
            const filteredData = dataBookingModal.filter(showtime => showtime.film_id === movie.id);
            setFilteredShowtimes(filteredData);
            setIsModalOpen(true);
        } else {
            navigate('/login');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMovie(null);
        setFilteredShowtimes([]);
    };

    const moviesComingSoon = dataBookingFilm.filter(
        (movie) => new Date(movie.early_release_date) > currentDate
    );

    const moviesNowShowing = dataBookingFilm.filter(
        (movie) => new Date(movie.release_date) < currentDate
    );

    const specialShowings = dataBookingFilm.filter(
        (movie) =>
            new Date(movie.early_release_date) < currentDate &&
            new Date(movie.release_date) > currentDate
    );

    let filteredMovies = [];
    if (activeTab === 'PHIM SẮP CHIẾU') {
        filteredMovies = moviesComingSoon;
    } else if (activeTab === 'PHIM ĐANG CHIẾU') {
        filteredMovies = moviesNowShowing;
    } else if (activeTab === 'SUẤT CHIẾU ĐẶC BIỆT') {
        filteredMovies = specialShowings;
    }

    return (
        <Container>
            <Header onLogout={onLogout}/>
            <TabsContainer>
                <Tab active={activeTab === 'PHIM SẮP CHIẾU'} onClick={() => handleTabClick('PHIM SẮP CHIẾU')}>
                    PHIM SẮP CHIẾU
                </Tab>
                <Tab active={activeTab === 'PHIM ĐANG CHIẾU'} onClick={() => handleTabClick('PHIM ĐANG CHIẾU')}>
                    PHIM ĐANG CHIẾU
                </Tab>
                <Tab active={activeTab === 'SUẤT CHIẾU ĐẶC BIỆT'} onClick={() => handleTabClick('SUẤT CHIẾU ĐẶC BIỆT')}>
                    SUẤT CHIẾU ĐẶC BIỆT
                </Tab>
            </TabsContainer>
            <MovieList dataBookingFilm={filteredMovies} onBuyTicket={handleBuyTicketClick}/>
            {isModalOpen && selectedMovie && (
                <BookingModal movieTitle={selectedMovie.title} showTimes={filteredShowtimes} onClose={closeModal}/>
            )}
            <Footer/>
        </Container>
    );
}

export default User;
