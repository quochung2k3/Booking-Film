import styled from "styled-components";
import Header from "../../utils/User/Header.jsx";
import Footer from "../../utils/User/Footer.jsx";
import {useEffect, useState} from "react";
import Loading from "../../utils/Loading.jsx";
import axios from "axios";

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
    flex-direction: column;
    align-items: center;
`;

const Table = styled.table`
    border-collapse: collapse;
    width: 80%;
    margin: 0 auto;
`;

const Th = styled.th`
    background-color: #007bff;
    color: white;
    padding: 10px;
    border: 1px solid #ddd;
`;

const Td = styled.td`
    padding: 10px;
    border: 1px solid #ddd;
    text-align: center;
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f9f9f9;
    }

    &:hover {
        background-color: #f1f1f1;
    }
`;

// eslint-disable-next-line react/prop-types
function BookingHistory({onLogout}) {
    const [token, setToken] = useState(null);
    const [bookingHistory, setBookingHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch token from localStorage
    useEffect(() => {
        const tokenString = localStorage.getItem("token");
        try {
            const parsedToken = tokenString ? JSON.parse(tokenString) : null;
            setToken(parsedToken);
        } catch (error) {
            console.error("Failed to parse token:", error);
            setToken(null);
        }
    }, []);

    // Fetch payment data and filter based on token.user._id
    useEffect(() => {
        if (token?.user?._id) {
            setLoading(true)
            axios
                .get("http://localhost:3000/api/v1/payment/", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token.access_token}`,
                    },
                })
                .then((response) => {
                    const data = response.data;
                    const filteredData = data.filter(
                        (item) => item.user_id?._id === token.user._id
                    );
                    setBookingHistory(filteredData);
                    setLoading(false)
                })
                .catch((error) => {
                    console.error("Error fetching payment data:", error);
                    setLoading(false)
                });
        }
    }, [token]);

    return (
        <>
            {loading && <Loading/>}
            <Container>
                <Header onLogout={onLogout}/>
                <BodyWrapper>
                    <h2>Booking History</h2>
                    {bookingHistory && bookingHistory.length > 0 ? (
                        <Table>
                            <thead>
                            <tr>
                                <Th>Show Time ID</Th>
                                <Th>List Seat</Th>
                                <Th>Total Price</Th>
                                <Th>Discount</Th>
                                <Th>Paid Amount</Th>
                                <Th>Created At</Th>
                            </tr>
                            </thead>
                            <tbody>
                            {bookingHistory.map((booking, index) => {
                                const calculatedDiscount = (booking.total_price * booking.discount) / 100;
                                return (
                                    <TableRow key={index}>
                                        <Td>{booking.show_time_id._id}</Td>
                                        <Td>{booking.list_seat.join(", ")}</Td>
                                        <Td>{booking.total_price.toLocaleString()} VND</Td>
                                        <Td>{calculatedDiscount.toLocaleString()} VND</Td>
                                        <Td>{booking.paid_amount.toLocaleString()} VND</Td>
                                        <Td>{new Date(booking.created_at).toLocaleString()}</Td>
                                    </TableRow>
                                );
                            })}
                            </tbody>
                        </Table>
                    ) : (
                        <p>Không có lịch sử đặt vé nào.</p>
                    )}
                </BodyWrapper>
                <Footer/>
            </Container>
        </>
    );
}

export default BookingHistory;