import {useState, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";
import UpdateMovieModal from "../../modal/UpdateMovieModal.jsx";
import Loading from "../../utils/Loading.jsx";

const apiGetFilm = import.meta.env.VITE_API_FILM_URL

function ListFilm() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isCreateMode, setIsCreateMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(apiGetFilm);
                const apiMovies = response.data.map((movie) => ({
                    id: movie._id,
                    movieName: movie.film_name,
                    description: movie.description,
                    category: movie.category_id?.category_name || "Unknown",
                    duration: `${movie.duration} minutes`,
                    releaseDate: new Date(movie.release_date).toLocaleDateString(),
                    earlyReleaseDate: movie.early_release_date
                        ? new Date(movie.early_release_date).toLocaleDateString()
                        : null,
                    country: movie.country || "Unknown",
                    director: movie.director,
                    listActor: movie.list_actor.join(", ") || "Unknown",
                    imageUrl: movie.image_url || "",
                }));
                setMovies(apiMovies);
                setIsLoading(false)
            } catch (error) {
                console.error("Error fetching movies:", error);
                setIsLoading(false)
            }
        };
        fetchMovies();
    }, []);

    const handleCardClick = (movie) => {
        setSelectedMovie(movie);
        setIsCreateMode(false);
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
        setIsCreateMode(true);
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
        <>
            {isLoading && <Loading/>}
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
        </>
    );
}

export default ListFilm;

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
