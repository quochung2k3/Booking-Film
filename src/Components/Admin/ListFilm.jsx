// MovieList.jsx
import {useState} from "react";
import styled from "styled-components";

const sampleMovies = [
    {
        id: 1,
        movieName: "Inception",
        description: "A mind-bending thriller about dream invasion.",
        category: "Science Fiction",
        duration: "148 min",
        releaseDate: "2010-07-16",
        earlyReleaseDate: "2010-07-08",
        country: "USA",
        director: "Christopher Nolan",
        listActor: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
        imageUrl: "https://example.com/inception.jpg" // Replace with a real image URL
    },
    {
        id: 2,
        movieName: "The Godfather",
        description: "A story about the powerful Italian-American crime family.",
        category: "Crime, Drama",
        duration: "175 min",
        releaseDate: "1972-03-24",
        earlyReleaseDate: "1972-03-14",
        country: "USA",
        director: "Francis Ford Coppola",
        listActor: "Marlon Brando, Al Pacino, James Caan",
        imageUrl: "https://example.com/godfather.jpg" // Replace with a real image URL
    },
    // Add more sample movies here
];

function ListFilm() {
    const [movies] = useState(sampleMovies);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleCardClick = (movie) => {
        setSelectedMovie(movie);
    };

    return (
        <WrapperAll>
            <h2>Movie List</h2>
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
            {/*{selectedMovie && (*/}
            {/*    <MovieDetails>*/}
            {/*        <h3>{selectedMovie.movieName} Details</h3>*/}
            {/*        <p><strong>Description:</strong> {selectedMovie.description}</p>*/}
            {/*        <p><strong>Actors:</strong> {selectedMovie.listActor}</p>*/}
            {/*        <button onClick={() => setSelectedMovie(null)}>Close</button>*/}
            {/*    </MovieDetails>*/}
            {/*)}*/}
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

const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    width: 100%;
`;

const Card = styled.div`
    display: flex;
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
    width: 120px;
    height: 180px;
    border-radius: 8px 0 0 8px;
    object-fit: cover;
`;

const CardContent = styled.div`
    padding: 15px;
    flex: 1;
`;

const MovieDetails = styled.div`
    margin-top: 20px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
