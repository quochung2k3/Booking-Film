// CreateScreeningModal.jsx
import {useState, useEffect} from "react";
import styled from "styled-components";
import {sampleMovies, cinemaData} from "../utils/data.jsx";

// eslint-disable-next-line react/prop-types
function ScreeningModal({onClose}) {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedMovie, setSelectedMovie] = useState("");
    const [startTime, setStartTime] = useState("");
    const [price, setPrice] = useState("");
    const [selectedBranch, setSelectedBranch] = useState(cinemaData[0]?.branch || "");
    const [selectedRoom, setSelectedRoom] = useState("");
    const [availableRooms, setAvailableRooms] = useState([]);

    useEffect(() => {
        // Khi chi nhánh thay đổi, cập nhật danh sách các phòng tương ứng
        const branch = cinemaData.find((b) => b.branch === selectedBranch);
        if (branch) {
            setAvailableRooms(branch.listScreen);
            setSelectedRoom(branch.listScreen[0]?.screenId || "");
        } else {
            setAvailableRooms([]);
            setSelectedRoom("");
        }
    }, [selectedBranch]);

    const handleCreate = () => {
        // Logic to handle creating the movie screening
        onClose();
    };

    return (
        <ModalOverlay>
            <ModalContent>
                <TitleCustom>Create Movie Screening</TitleCustom>
                <FormGroup>
                    <LabelCustom>Date:</LabelCustom>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <LabelCustom>Movie:</LabelCustom>
                    <select
                        value={selectedMovie}
                        onChange={(e) => setSelectedMovie(e.target.value)}
                    >
                        <option value="">Select Movie</option>
                        {sampleMovies.map((movie) => (
                            <option key={movie.id} value={movie.id}>
                                {movie.movieName}
                            </option>
                        ))}
                    </select>
                </FormGroup>
                <FormGroupRow>
                    <FormGroup>
                        <LabelCustom>Start Time:</LabelCustom>
                        <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <LabelCustom>Price:</LabelCustom>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Enter price"
                        />
                    </FormGroup>
                </FormGroupRow>
                <FormGroup>
                    <LabelCustom>Branch:</LabelCustom>
                    <select
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                    >
                        {cinemaData.map((branch) => (
                            <option key={branch.branch} value={branch.branch}>
                                {branch.branch}
                            </option>
                        ))}
                    </select>
                </FormGroup>
                <FormGroup>
                    <LabelCustom>Screening Room:</LabelCustom>
                    <select
                        value={selectedRoom}
                        onChange={(e) => setSelectedRoom(e.target.value)}
                    >
                        {availableRooms.map((room) => (
                            <option key={room.screenId} value={room.screenId}>
                                {room.screenName} (Seats: {room.totalSeat})
                            </option>
                        ))}
                    </select>
                </FormGroup>
                <ButtonContainer>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button primary onClick={handleCreate}>Create</Button>
                </ButtonContainer>
            </ModalContent>
        </ModalOverlay>
    );
}

export default ScreeningModal;

// Styled components
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: #fff;
    padding: 30px;
    border-radius: 10px;
    width: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
`;

const FormGroup = styled.div`
    margin-bottom: 15px;

    label {
        display: block;
        margin-bottom: 5px;
    }

    select, input {
        width: 100%;
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #ccc;
    }
`;

const FormGroupRow = styled.div`
    display: flex;
    gap: 95px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background: ${(props) => (props.primary ? "#4CAF50" : "#f44336")};
    color: white;
`;

const TitleCustom = styled.h3`
    text-align: center;
    font-size: 1.5rem;
`;

const LabelCustom = styled.label`
    font-size: 1.2rem;
    font-weight: bold;
`;
