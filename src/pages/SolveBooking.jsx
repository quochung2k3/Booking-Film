import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../utils/User/Header.jsx';
import Footer from '../utils/User/Footer.jsx';

// Styled components
const Container = styled.div`
    padding: 80px 0;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const BodyWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-self: space-between;
`;

const SeatMapContainer = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
`;

const Screen = styled.div`
    width: 80%;
    height: 40px;
    background-color: #d3d3d3;
    border-radius: 15px;
    text-align: center;
    line-height: 40px;
    margin-bottom: 20px;
`;

const SeatMap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Row = styled.div`
    display: flex;
    justify-content: center;
    margin: 5px 0;
`;

const Seat = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background-color: ${({ status, type }) => {
        if (status === 'booked') return '#FF0000'; 
        if (status === 'selected') return '#007BFF'; 
        if (type === 'vip') return '#FFCC99'; 
        return '#D3D3D3'; 
    }};
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ${({ status }) => (status === 'booked' ? 'not-allowed' : 'pointer')};
    user-select: none;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${({ status }) =>
            status === 'available' ? '#90EE90' : ''};
`;

const DetailsContainer = styled.div`
    width: 28%;
    margin-right: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #dcdcdc;
`;

const MovieDetails = styled.div`
    width: 100%;
    text-align: left;
    margin-bottom: 20px;
`;

const TitleContentWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 40px;
`;

const MovieThumbnail = styled.img`
    height: 200px;
    width: 200px;
    border-radius: 10px;
    margin-bottom: 20px;
`;

const MovieInfo = styled.div`
    margin-bottom: 10px;
    border-top: 1px solid #ccc;
    padding-top: 10px;
    width: 100%;
`;

const MovieAttribute = styled.p`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px 0;
    font-size: 14px;
    line-height: 1.5;
    padding: 0 14%;

    & > strong {
        margin-right: 5px;
    }
`;
const DiscountWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
`;
const VoucherCustom = styled.span`
    font-weight: bold;
`;
const InputCustom = styled.input`
    width: 40%;
    padding: 8px 10px;
    border-radius: 6px;
    border: 2px solid #333;
`;
const ButtonVoucherCustom = styled.button`
    padding: 10px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
`;

const Legend = styled.div`
    display: flex;
    justify-content: space-around;
    width: 80%;
    margin-top: 20px;
`;

const LegendItem = styled.div`
    display: flex;
    align-items: center;
`;

const LegendColor = styled.div`
    width: 20px;
    height: 20px;
    background-color: ${({ color }) => color};
    margin-right: 5px;
    border-radius: 5px;
`;

import { useLocation } from "react-router-dom";

const generateSeats = (bookedSeats) => {
    const rows = 'ABCDEFGHIJ'.split(''); 
    const seatsPerRow = 12;
    const seats = [];

    rows.forEach((row) => {
        const rowSeats = [];
        for (let i = 1; i <= seatsPerRow; i++) {
            const seatId = `${row}${i}`;
            rowSeats.push({
                seatId,
                status: bookedSeats.includes(seatId) ? 'booked' : 'available',
                price: row >= 'D' && row <= 'G' ? 100000 : 50000, 
                type: row >= 'D' && row <= 'G' ? 'vip' : 'regular',
            });
        }
        seats.push(rowSeats);
    });

    return seats;
};




function SolveBooking({ onLogout }) { 
    const location = useLocation();
    const { showTimeDetails, filmDetails } = location.state || {}; 
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [voucherCode, setVoucherCode] = useState(''); 
    const [discount, setDiscount] = useState(0); 
    const [voucherError, setVoucherError] = useState('');

    useEffect(() => {
        const fetchSeatsAndDetails = async () => {
            if (showTimeDetails) {
                try {
                    // Gọi API lấy thông tin ghế đã đặt
                    const response = await axios.get(
                        `http://localhost:3000/api/v1/payment/${showTimeDetails._id}/showtime`
                    );

                    const bookedSeats = response.data.flatMap((payment) => payment.list_seat);

                    setSeats(generateSeats(bookedSeats));
                } catch (error) {
                    console.error("Error fetching payment details:", error);
                }
            }
        };

        fetchSeatsAndDetails();
    }, [showTimeDetails]);

    const totalPrice = selectedSeats.reduce((total, seatId) => {
        const seat = seats.flat().find((s) => s.seatId === seatId);
        const seatPrice = seat ? seat.price : 0;
        const discountedPrice = discount ? seatPrice * (1 - discount / 100) : seatPrice;
        return total + discountedPrice;
    }, 0);
        
    
    const handleSeatClick = (rowIndex, seatIndex) => {
        const seatId = seats[rowIndex][seatIndex].seatId;
    
        if (seats[rowIndex][seatIndex].status === 'booked') {
            return;
        }
    
        setSeats((prevSeats) =>
            prevSeats.map((row, i) =>
                i === rowIndex
                    ? row.map((seat, j) =>
                        j === seatIndex
                            ? {
                                ...seat,
                                status: seat.status === 'available' ? 'selected' : 'available',
                            }
                            : seat
                    )
                    : row
            )
        );
    
        setSelectedSeats((prevSelectedSeats) => {
            if (prevSelectedSeats.includes(seatId)) {
                return prevSelectedSeats.filter((s) => s !== seatId);
            } else {
                return [...prevSelectedSeats, seatId];
            }
        });
    };

    const [isLoading, setIsLoading] = useState(false);

    const applyVoucher = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/api/v1/discount/apply', {
                code: voucherCode,
            });

            const { discountPercent } = response.data;
            setDiscount(discountPercent);
            setVoucherError('');
            alert(`Áp dụng mã giảm giá thành công! Bạn được giảm ${discountPercent}%`);
        } catch (error) {
            console.error('Error applying voucher:', error);
            setVoucherError(error.response?.data?.message || 'Có lỗi xảy ra');
        } finally {
            setIsLoading(false);
        }
    };

    const [isPaymentLoading, setIsPaymentLoading] = useState(false);

    const handlePayment = async () => {
        
    };
    
    return (
        <Container>
            <Header onLogout={onLogout} /> 
            <BodyWrapper>
                <SeatMapContainer>
                    <Screen>Màn hình chiếu</Screen>
                    <SeatMap>
                        {seats.map((row, rowIndex) => (
                            <Row key={rowIndex}>
                                {row.map((seat, seatIndex) => (
                                    <Seat
                                    key={seat.seatId}
                                    status={seat.status}
                                    type={seat.type}
                                    onClick={() => handleSeatClick(rowIndex, seatIndex)}
                                >
                                    {seat.seatId}
                                </Seat>
                                
                                
                                ))}
                            </Row>
                        
                        ))}
                    </SeatMap>
                    <Legend>
                        <LegendItem>
                            <LegendColor color="#D3D3D3" /> Ghế thường
                        </LegendItem>
                        <LegendItem>
                            <LegendColor color="#FFCC99" /> Ghế VIP
                        </LegendItem>
                        <LegendItem>
                            <LegendColor color="#007BFF" /> Ghế đang chọn
                        </LegendItem>
                        <LegendItem>
                            <LegendColor color="#FF0000" /> Ghế đã đặt
                        </LegendItem>
                    </Legend>

                </SeatMapContainer>
                <DetailsContainer>
                    {filmDetails && (
                        <>
                            <TitleContentWrapper>
                                <MovieThumbnail src={filmDetails.image_url} alt="Movie Poster" />
                                <MovieDetails>
                                    <h3>{filmDetails.film_name}</h3>
                                    <p>{filmDetails.category_id?.category_name || "N/A"}</p>
                                </MovieDetails>
                            </TitleContentWrapper>
                            <MovieInfo>
                                <MovieAttribute>
                                    <strong>Thể loại:</strong> {filmDetails.category_id?.category_name || "N/A"}
                                </MovieAttribute>
                                <MovieAttribute>
                                    <strong>Thời lượng:</strong> {filmDetails.duration || "N/A"} phút
                                </MovieAttribute>
                                <MovieAttribute>
                                    <strong>Rạp chiếu:</strong> {showTimeDetails.branch_id.branch_name || "N/A"}
                                </MovieAttribute>
                                <MovieAttribute>
                                    <strong>Ngày chiếu:</strong> {new Date(showTimeDetails.start_time).toLocaleDateString()}
                                </MovieAttribute>
                                <MovieAttribute>
                                    <strong>Giờ chiếu:</strong> {new Date(showTimeDetails.start_time).toLocaleTimeString()}
                                </MovieAttribute>
                            </MovieInfo>
                            <DiscountWrapper>
                                <VoucherCustom>Mã voucher: </VoucherCustom>
                                <InputCustom
                                    value={voucherCode}
                                    onChange={(e) => setVoucherCode(e.target.value)}
                                    placeholder="Nhập mã voucher"
                                />
                                <ButtonVoucherCustom onClick={applyVoucher} disabled={isLoading}>
                                    {isLoading ? 'Đang xử lý...' : 'Áp dụng'}
                                </ButtonVoucherCustom>
                            </DiscountWrapper>
                            {/* Hiển thị lỗi nếu có */}
                            {voucherError && <p style={{ color: 'red', marginTop: '10px' }}>{voucherError}</p>}

                        </>
                    )}
                    <Button onClick={handlePayment} disabled={isPaymentLoading || selectedSeats.length === 0}>
                        {isPaymentLoading ? 'Đang xử lý...' : 'Xác nhận đặt vé'}
                    </Button>

                    <div style={{ textAlign: "left", margin: "6px", width: "100%", paddingLeft: "2rem" }}>
                        <p>
                            <strong>Ghế đã chọn: </strong>
                            {selectedSeats.length > 0 ? selectedSeats.join(", ") : "[]"}
                        </p>
                        <p>
                            <strong>Tổng số tiền:</strong> {totalPrice.toLocaleString()} VND
                        </p>
                    </div>
                </DetailsContainer>
            </BodyWrapper>
            <Footer />
        </Container>
    );
}

export default SolveBooking;
