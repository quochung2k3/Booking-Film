import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Styled components giữ nguyên
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

function BookingModal({ movieTitle, movieId, onClose }) {
    const navigate = useNavigate();
    const [showTimes, setShowTimes] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        const fetchShowTimes = async () => {
            try {
                console.log(`Fetching showtimes for movieId: ${movieId}`);
                const response = await axios.get(`http://localhost:3000/api/v1/showtime/${movieId}/film`);
                const data = response.data; 
                
                console.log('API Response:', data); // Log dữ liệu API trả về
                
                setShowTimes(data); // Lưu toàn bộ suất chiếu
    
                if (data.length > 0) {
                    const firstBranch = data[0].branch_id?._id || '';
                    console.log('First Branch:', firstBranch); // Log rạp đầu tiên
    
                    setSelectedBranch(firstBranch);
    
                    const firstDate = data
                        .filter((showTime) => showTime.branch_id?._id === firstBranch)
                        .map((showTime) => new Date(showTime.start_time))
                        .sort((a, b) => a - b)[0]?.toISOString().split('T')[0] || '';
    
                    console.log('First Date:', firstDate); // Log ngày chiếu đầu tiên
                    setSelectedDate(firstDate);
                }
            } catch (error) {
                console.error('Lỗi khi lấy danh sách suất chiếu:', error);
            }
        };
    
        fetchShowTimes();
    }, [movieId]);
    
    

    const uniqueBranches = Array.from(
        new Map(
            showTimes
                .filter((showTime) => {
                    const isValid = showTime.branch_id && showTime.branch_id.branch_name;
                    if (!isValid) {
                        console.warn('Invalid showTime detected:', showTime); // Log nếu dữ liệu không hợp lệ
                    }
                    return isValid;
                })
                .map((showTime) => [showTime.branch_id._id, showTime.branch_id])
        ).values()
    );
    
    console.log('Unique Branches:', uniqueBranches); // Log danh sách rạp
    
    
    console.log(showTimes); // Kiểm tra dữ liệu từ API
    console.log(uniqueBranches); // Kiểm tra danh sách rạp

    const filteredShowTimes = showTimes.filter(
        (showTime) => showTime.branch_id._id === selectedBranch
    );

    const groupedShowTimes = filteredShowTimes.reduce((acc, showTime) => {
        const date = new Date(showTime.start_time).toISOString().split('T')[0];
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(showTime);
        return acc;
    }, {});
    
    console.log('Grouped ShowTimes:', groupedShowTimes); // Log nhóm suất chiếu theo ngày
    

    const handleBranchChange = (event) => {
        const newBranchId = event.target.value;
        setSelectedBranch(newBranchId);

        const newFirstDate = showTimes
            .filter((showTime) => showTime.branch_id._id === newBranchId)
            .map((showTime) => new Date(showTime.start_time))
            .sort((a, b) => a - b)[0]?.toISOString().split('T')[0] || '';

        setSelectedDate(newFirstDate);
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const handleTimeSlotClick = (showTime) => {
        const filmId = showTime.film_id._id; // Lấy `filmId` từ showTime
        const branchName = showTime.branch_id.branch_name; // Lấy tên rạp từ showTime
    
        // Gọi API để lấy thông tin phim
        axios
            .get(`http://localhost:3000/api/v1/film/${filmId}`)
            .then((filmResponse) => {
                const filmDetails = filmResponse.data;
    
                // Truyền dữ liệu sang SolveBooking
                navigate(`/user/booking/${showTime._id}`, {
                    state: {
                        showTimeDetails: showTime, // Chi tiết suất chiếu
                        filmDetails: filmDetails, // Chi tiết phim
                    },
                });
            })
            .catch((error) => {
                console.error("Error fetching film details:", error);
            });
    };
    

    const handleOutsideClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <ModalContainer onClick={handleOutsideClick}>
            <ModalContent>
                <CloseButton onClick={onClose}>×</CloseButton>
                <Title>LỊCH CHIẾU - {movieTitle}</Title>
                <BranchSelect
                    value={selectedBranch}
                    onChange={(event) => {
                        const newBranchId = event.target.value;
                        console.log('Selected Branch ID:', newBranchId); // Log rạp được chọn
                        setSelectedBranch(newBranchId);

                        const newFirstDate = showTimes
                            .filter((showTime) => showTime.branch_id?._id === newBranchId)
                            .map((showTime) => new Date(showTime.start_time))
                            .sort((a, b) => a - b)[0]?.toISOString().split('T')[0] || '';

                        console.log('New First Date:', newFirstDate); // Log ngày chiếu đầu tiên sau khi đổi rạp
                        setSelectedDate(newFirstDate);
                    }}
                >
                    <option value="">Chọn rạp</option>
                    {uniqueBranches.map((branch) => (
                        <option key={branch._id} value={branch._id}>
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
                            {new Date(date).getDate()}/{new Date(date).getMonth() + 1}
                        </DateTab>
                    ))}
                </DateTabs>

                <ShowTimeContainer>
                    {groupedShowTimes[selectedDate] ? (
                        <ShowTimeGroup>
                            {groupedShowTimes[selectedDate].map((showTime) => (
                                <StyledShowTime key={showTime._id} onClick={() => handleTimeSlotClick(showTime)}>
                                    <TimeSlot>{new Date(showTime.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TimeSlot>
                                    <StyledSpan>Màn hình: {showTime.screen.screen_name}</StyledSpan>
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
