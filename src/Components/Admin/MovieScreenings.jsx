// MovieScreenings.jsx
import {useState} from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ScreeningModal from "../../modal/ScreeningModal.jsx";
import {movieScreenings} from "../../utils/data.jsx";

function MovieScreenings() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleCreateClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Flatten listShowTime from all branches
    const screeningsList = movieScreenings.flatMap(branch =>
        branch.listShowTime.map(show => ({
            ...show,
            branch: branch.branch,
            address: branch.address
        }))
    ).filter(() => {
        // Assuming selectedDate is used to filter by date, you can add more date filtering logic here
        return true; // Modify this line if you have specific date comparison logic
    });

    const handleEdit = (show) => {
        console.log("Edit", show);
        // Logic for editing the screening
    };

    const handleDelete = (show) => {
        console.log("Delete", show);
        // Logic for deleting the screening
    };

    return (
        <Container>
            <CreateButton onClick={handleCreateClick}>Create Movie Screening</CreateButton>
            <h2>Movie Screenings</h2>
            <DatePickerContainer>
                <label>Select Date: </label>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy/MM/dd"
                />
            </DatePickerContainer>
            <ScreeningsTable>
                <thead>
                <tr>
                    <th>Branch</th>
                    <th>Address</th>
                    <th>Screen</th>
                    <th>Film</th>
                    <th>Start Time</th>
                    <th>Duration</th>
                    <th>End Time</th>
                    <th>Seats</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {screeningsList.length > 0 ? (
                    screeningsList.map((show, index) => (
                        <tr key={index}>
                            <td>{show.branch}</td>
                            <td>{show.address}</td>
                            <td>{show.screenName}</td>
                            <td>{show.filmName}</td>
                            <td>{show.startTime}</td>
                            <td>{show.duration}</td>
                            <td>{show.endTime}</td>
                            <td>{show.emptySeat}/{show.totalSeat}</td>
                            <td>
                                <ActionButton onClick={() => handleEdit(show)}>Edit</ActionButton>
                                <ActionButton delete onClick={() => handleDelete(show)}>Delete</ActionButton>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="9">No screenings available for this date.</td>
                    </tr>
                )}
                </tbody>
            </ScreeningsTable>
            {showModal && (
                <ScreeningModal onClose={handleCloseModal}/>
            )}
        </Container>
    );
}

export default MovieScreenings;

// Styled components
const Container = styled.div`
    position: absolute;
    top: 10%;
    left: 18%;
    width: 78%;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
`;

const DatePickerContainer = styled.div`
    margin-bottom: 20px;
`;

const ScreeningsTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f2f2f2;
    }
`;

const ActionButton = styled.button`
    background-color: ${(props) => (props.delete ? "#f44336" : "#4CAF50")};
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    margin-right: 5px;

    &:hover {
        background-color: ${(props) => (props.delete ? "#d32f2f" : "#45a049")};
    }
`;

const CreateButton = styled.button`
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #45a049;
    }
`;
