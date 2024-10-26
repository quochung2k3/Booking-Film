import React from 'react';
import styled from 'styled-components';
import Header from '../utils/User/Header.jsx';
import Footer from '../utils/User/Footer.jsx';
import {useParams} from 'react-router-dom';
import {dataBookingSeat} from '../utils/data.jsx';

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
`

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
    background-color: ${({status}) => {
        switch (status) {
            case 'available':
                return '#D3D3D3';
            case 'selected':
                return '#007BFF';
            case 'booked':
                return '#FF0000';
            case 'reserved':
                return '#FFD700';
            default:
                return '#D3D3D3';
        }
    }};
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ${({status}) => (status === 'booked' ? 'not-allowed' : 'pointer')};
    user-select: none;
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
`

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
    background-color: ${({color}) => color};
    margin-right: 5px;
    border-radius: 5px;
`;

const TypeWrapper = styled.div`
    border-bottom: 2px dashed #333;
`

const ContentWrapper = styled.div`

`

const DiscountWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
`

const InputCustom = styled.input`
    width: 40%;
    padding: 8px 10px;
    border-radius: 6px;
    border: 2px solid #333;
`

const VoucherCustom = styled.span`
    font-weight: bold;
`
const ButtonVoucherCustom = styled.button`
    padding: 10px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
`

const getBookedSeats = (data) => {
    return data
        .filter(item => item.is_active)
        .flatMap(item => item.list_seat);
};

// Generate seating data
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
            });
        }
        seats.push(rowSeats);
    });

    return seats;
};

// eslint-disable-next-line react/prop-types
function SolveBooking({onLogout}) {
    const {showTimeId} = useParams();
    console.log(showTimeId);

    const bookedSeats = getBookedSeats(dataBookingSeat);
    const [seats, setSeats] = React.useState(generateSeats(bookedSeats));
    const [selectedSeats, setSelectedSeats] = React.useState([]);

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
                                status:
                                    seat.status === 'available'
                                        ? 'selected'
                                        : 'available',
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

    const totalPrice = selectedSeats.length * 50000;

    return (
        <Container>
            <Header onLogout={onLogout}/>
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
                            <LegendColor color="#D3D3D3"/> Ghế trống
                        </LegendItem>
                        <LegendItem>
                            <LegendColor color="#007BFF"/> Ghế đang chọn
                        </LegendItem>
                        <LegendItem>
                            <LegendColor color="#FF0000"/> Ghế đã bán
                        </LegendItem>
                    </Legend>
                </SeatMapContainer>
                <DetailsContainer>
                    <TitleContentWrapper>
                        <MovieThumbnail
                            src="https://files.betacorp.vn/media/images/2024/10/23/011124-sneak-ngay-xua-co-mot-chuyen-tinh-135154-231024-14.png"
                            alt="Movie Poster"/>
                        <MovieDetails>
                            <h3>Ngày Xưa Có Một Chuyện Tình</h3>
                            <p>2D Phụ đề</p>
                        </MovieDetails>
                    </TitleContentWrapper>

                    <MovieInfo>
                        <TypeWrapper>
                            <MovieAttribute><strong>Thể loại:</strong> Tình cảm</MovieAttribute>
                            <MovieAttribute><strong>Thời lượng:</strong> 135 phút</MovieAttribute>
                        </TypeWrapper>
                        <ContentWrapper>
                            <MovieAttribute><strong>Rạp chiếu:</strong> Beta Thái Nguyên</MovieAttribute>
                            <MovieAttribute><strong>Ngày chiếu:</strong> 25/10/2024</MovieAttribute>
                            <MovieAttribute><strong>Giờ chiếu:</strong> 20:15</MovieAttribute>
                            <MovieAttribute><strong>Phòng chiếu:</strong> P1</MovieAttribute>
                        </ContentWrapper>
                    </MovieInfo>
                    <DiscountWrapper>
                        <VoucherCustom>Mã voucher: </VoucherCustom>
                        <InputCustom placeholder={'Voucher code'}/>
                        <ButtonVoucherCustom>Áp dụng</ButtonVoucherCustom>
                    </DiscountWrapper>
                    <Button>Tiếp tục</Button>
                    <div style={{textAlign: 'left', margin: '6px', width: '100%', paddingLeft: '2rem'}}>
                        <p><strong>Ghế đã chọn: </strong>{selectedSeats.length > 0 ? selectedSeats.join(', ') : '[]'}
                        </p>
                        <p><strong>Tổng số tiền:</strong> {totalPrice.toLocaleString()} VND</p>
                    </div>
                </DetailsContainer>
            </BodyWrapper>
            <Footer/>
        </Container>
    );
}

export default SolveBooking;