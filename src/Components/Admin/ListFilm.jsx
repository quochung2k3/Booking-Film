﻿// MovieList.jsx
import {useState} from "react";
import styled from "styled-components";
import UpdateMovieModal from "../../modal/UpdateMovieModal.jsx";
import {sampleMovies} from "../../utils/data.jsx";

function ListFilm() {
    const [movies, setMovies] = useState(sampleMovies);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isCreateMode, setIsCreateMode] = useState(false);

    const handleCardClick = (movie) => {
        setSelectedMovie(movie);
        setIsCreateMode(false); // Open in update mode
    };

    const handleCreateClick = () => {
        setSelectedMovie({
            id: movies.length + 1,
            movieName: "",
            description: "",
            category: "",
            duration: "",
            releaseDate: "",
            earlyReleaseDate: "",
            country: "",
            director: "",
            listActor: "",
            imageUrl: ""
        });
        setIsCreateMode(true); // Open in create mode
    };

    const handleCloseModal = () => {
        setSelectedMovie(null);
        setIsCreateMode(false);
    };

    const handleSubmitModal = (updatedMovie) => {
        if (isCreateMode) {
            setMovies([...movies, updatedMovie]);
        } else {
            setMovies(movies.map((movie) =>
                movie.id === updatedMovie.id ? updatedMovie : movie
            ));
        }
        handleCloseModal();
    };

    return (
        <WrapperAll>
            <Button onClick={handleCreateClick}>Create Movie</Button>
            <TitleCustom>Movie List</TitleCustom>
            <CardGrid>
                {movies.map((movie) => (
                    <Card key={movie.id} onClick={() => handleCardClick(movie)}>
                        <Image src={movie.imageUrl} alt={movie.movieName}/>
                        <CardContent>
                            <h3>{movie.movieName}</h3>
                            <p><strong>Category:</strong> {movie.category}</p>
                            <p><strong>Duration:</strong> {movie.duration}</p>
                            <p><strong>Release Date:</strong> {movie.releaseDate}</p>
                            <p><strong>Country:</strong> {movie.country}</p>
                            <p><strong>Director:</strong> {movie.director}</p>
                        </CardContent>
                    </Card>
                ))}
            </CardGrid>
            {selectedMovie && (
                <UpdateMovieModal
                    movie={selectedMovie}
                    onClose={handleCloseModal}
                    onSubmit={handleSubmitModal}
                />
            )}
        </WrapperAll>
    );
}

export default ListFilm;

// Styled components
const WrapperAll = styled.div`
    position: absolute;
    top: 10%;
    left: 18%;
    width: 78%;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
`;

const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    width: 100%;
`;

const Card = styled.div`
    display: flex;
    align-items: center;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.05);
    }
`;

const Image = styled.img`
    padding: 1rem;
    height: 240px;
    border-radius: 8px 0 0 8px;
    object-fit: contain;
    flex: 2;
`;

const CardContent = styled.div`
    padding: 15px;
    flex: 2;
`;

const TitleCustom = styled.h2`
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
    color: #333;
    text-align: center;
`;