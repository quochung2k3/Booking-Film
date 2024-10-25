import {useState} from "react";
import styled from "styled-components";
import VoucherModal from "../../modal/VoucherModal.jsx";
import {voucher} from "../../utils/data.jsx";

function Voucher() {
    const [showModal, setShowModal] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);

    const handleCreateClick = () => {
        setSelectedVoucher(null); // Đặt null để tạo mới
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedVoucher(null); // Đặt lại khi đóng modal
    };

    const handleEdit = (voucherItem) => {
        setSelectedVoucher(voucherItem);
        setShowModal(true);
    };

    const handleToggleActive = (voucherItem) => {
        console.log(voucherItem.is_active ? "Deactivating" : "Activating", voucherItem);
        // Logic for toggling active state of the voucher
    };

    return (
        <Container>
            <CreateButton onClick={handleCreateClick}>Create Voucher</CreateButton>
            <h2>Voucher List</h2>
            <VouchersTable>
                <thead>
                <tr>
                    <th>Voucher ID</th>
                    <th>Voucher Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Quantity</th>
                    <th>Percent Discount</th>
                    <th>Status</th>
                    <th>Created Date</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {voucher.length > 0 ? (
                    voucher.map((voucherItem, index) => (
                        <tr key={index}>
                            <td>{voucherItem.voucher_id}</td>
                            <td>{voucherItem.voucher_name}</td>
                            <td>{voucherItem.start_date}</td>
                            <td>{voucherItem.end_date}</td>
                            <td>{voucherItem.quantity}</td>
                            <td>{voucherItem.percent_discount}%</td>
                            <td>{voucherItem.is_active ? "Active" : "Inactive"}</td>
                            <td>{voucherItem.created_date}</td>
                            <td>
                                <ActionButton onClick={() => handleEdit(voucherItem)}>Edit</ActionButton>
                                <ActionButton
                                    delete
                                    onClick={() => handleToggleActive(voucherItem)}
                                >
                                    {voucherItem.is_active ? "Deactive" : "Active"}
                                </ActionButton>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="9">No vouchers available.</td>
                    </tr>
                )}
                </tbody>
            </VouchersTable>
            {showModal && (
                <VoucherModal
                    onClose={handleCloseModal}
                    voucherData={selectedVoucher}
                />
            )}
        </Container>
    );
}

export default Voucher;

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

const VouchersTable = styled.table`
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
    margin-right: 16px;

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
