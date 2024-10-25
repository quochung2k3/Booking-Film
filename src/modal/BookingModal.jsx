import styled from 'styled-components';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom'; // Import useNavigate

// Styled components
const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px 40px;
    border-radius: 10px;
    width: 80%;
    max-width: 800px;
    text-align: left;
    position: relative;
    min-height: 20vh;
    max-height: 80vh;
    overflow-y: auto;
`;

const CloseButton = styled.button`
    background-color: transparent;
    color: #333;
    border: none;
    font-size: 2rem;
    padding: 0 10px;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
`;

const Title = styled.h2`
    font-size: 18px;
    text-align: center;
    margin-bottom: 1.5rem;
`;

const BranchSelect = styled.select`
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    font-size: 16px;
`;

const DateTabs = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    border-bottom: 2px solid #ddd;
`;

const DateTab = styled.div`
    margin: 0 10px;
    padding: 10px 15px;
    cursor: pointer;
    font-weight: bold;
    color: ${(props) => (props.active ? '#007bff' : '#000')};
    border-bottom: ${(props) => (props.active ? '3px solid #007bff' : 'none')};
    transition: color 0.3s, border-bottom 0.3s;

    &:hover {
        color: #007bff;
    }
`;

const ShowTimeContainer = styled.div`
    margin-top: 20px;
    text-align: center;
`;

const ShowTimeGroup = styled.div`
    margin-bottom: 3rem;
    display: flex;
    gap: 2rem;
`;

const StyledShowTime = styled.div`
    position: relative;
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    font-size: 14px;
    cursor: pointer;
`;

const StyledSpan = styled.span`
    position: absolute;
    top: 110%;
    right: 0;
    left: 0;
    font-size: 12px;
    color: #666;
    cursor: default;
`;

const TimeSlot = styled.div`
    padding: 0.5rem 1rem;
    font-weight: bold;
`;

// eslint-disable-next-line react/prop-types
function BookingModal({movieTitle, onClose, showTimes = []}) {
    const navigate = useNavigate(); // Use useNavigate hook

    let firstChoiceBranch = showTimes.length > 0 ? showTimes[0].branch.branch_id : '';
    let firstChoiceDate = showTimes
        .filter((showTime) => showTime.branch.branch_id === firstChoiceBranch)
        .map((showTime) => new Date(showTime.date))
        .sort((a, b) => a - b)[0]?.toISOString().split('T')[0] || '';

    const [selectedBranch, setSelectedBranch] = useState(firstChoiceBranch);
    const [selectedDate, setSelectedDate] = useState(firstChoiceDate);

    const uniqueBranches = Array.from(new Map(showTimes.map((showTime) => [showTime.branch.branch_id, showTime.branch])).values());

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const handleBranchChange = (event) => {
        const newBranchId = event.target.value;
        setSelectedBranch(newBranchId);

        const newFirstChoiceDate = showTimes
            .filter((showTime) => showTime.branch.branch_id === Number(newBranchId))
            .map((showTime) => new Date(showTime.date))
            .sort((a, b) => a - b)[0]?.toISOString().split('T')[0] || '';

        setSelectedDate(newFirstChoiceDate);
    };

    const filteredShowTimes = showTimes.filter((showTime) => showTime.branch.branch_id === Number(selectedBranch));

    const groupedShowTimes = filteredShowTimes.reduce((acc, showTime) => {
        if (!acc[showTime.date]) {
            acc[showTime.date] = [];
        }
        acc[showTime.date].push(showTime);
        return acc;
    }, {});

    const handleOutsideClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const handleTimeSlotClick = (showTime) => {
        navigate(`/user/booking/${showTime.show_time_id}`);
    };

    return (
        <ModalContainer onClick={handleOutsideClick}>
            <ModalContent>
                <CloseButton onClick={onClose}>×</CloseButton>
                <Title>LỊCH CHIẾU - {movieTitle}</Title>

                <BranchSelect value={selectedBranch} onChange={handleBranchChange}>
                    <option value="">Chọn rạp</option>
                    {uniqueBranches.map((branch) => (
                        <option key={branch.branch_id} value={branch.branch_id}>
                            {branch.branch_name}
                        </option>
                    ))}
                </BranchSelect>

                <DateTabs>
                    {Object.keys(groupedShowTimes).map((date) => (
                        <DateTab
                            key={date}
                            active={date === selectedDate}
                            onClick={() => handleDateClick(date)}
                        >
                            {new Date(date).getDate()}/{new Date(date).getMonth() + 1} - T{new Date(date).getDay() + 1}
                        </DateTab>
                    ))}
                </DateTabs>

                <ShowTimeContainer>
                    {groupedShowTimes[selectedDate] ? (
                        <ShowTimeGroup>
                            {groupedShowTimes[selectedDate].map((showTime) => (
                                <StyledShowTime key={showTime.show_time_id}
                                                onClick={() => handleTimeSlotClick(showTime)}>
                                    <TimeSlot>{showTime.start_time}</TimeSlot>
                                    <StyledSpan>ghế trống</StyledSpan>
                                </StyledShowTime>
                            ))}
                        </ShowTimeGroup>
                    ) : (
                        <p>Không có suất chiếu cho ngày đã chọn.</p>
                    )}
                </ShowTimeContainer>

            </ModalContent>
        </ModalContainer>
    );
}

export default BookingModal;
