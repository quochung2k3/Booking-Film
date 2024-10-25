// CreateVoucherModal.jsx
import { useState, useEffect } from "react";
import styled from "styled-components";

// eslint-disable-next-line react/prop-types
function VoucherModal({ onClose, voucherData }) {
    const [voucherName, setVoucherName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [quantity, setQuantity] = useState("");
    const [percentDiscount, setPercentDiscount] = useState("");

    useEffect(() => {
        if (voucherData) {
            // eslint-disable-next-line react/prop-types
            setVoucherName(voucherData.voucher_name || "");
            // eslint-disable-next-line react/prop-types
            setStartDate(voucherData.start_date || "");
            // eslint-disable-next-line react/prop-types
            setEndDate(voucherData.end_date || "");
            // eslint-disable-next-line react/prop-types
            setQuantity(voucherData.quantity || "");
            // eslint-disable-next-line react/prop-types
            setPercentDiscount(voucherData.percent_discount || "");
        } else {
            setVoucherName("");
            setStartDate("");
            setEndDate("");
            setQuantity("");
            setPercentDiscount("");
        }
    }, [voucherData]);

    const handleCreateOrUpdate = () => {
        console.log(voucherData ? "Voucher Updated" : "Voucher Created", {
            voucherName,
            startDate,
            endDate,
            quantity,
            percentDiscount
        });
        onClose();
    };

    return (
        <ModalOverlay>
            <ModalContent>
                <TitleCustom>{voucherData ? "Edit Voucher" : "Create Voucher"}</TitleCustom>
                <FormGroup>
                    <LabelCustom>Voucher Name:</LabelCustom>
                    <input
                        type="text"
                        value={voucherName}
                        onChange={(e) => setVoucherName(e.target.value)}
                        placeholder="Enter voucher name"
                    />
                </FormGroup>
                <FormGroupRow>
                    <FormGroup>
                        <LabelCustom>Start Date:</LabelCustom>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <LabelCustom>End Date:</LabelCustom>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </FormGroup>
                </FormGroupRow>
                <FormGroup>
                    <LabelCustom>Quantity:</LabelCustom>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Enter quantity"
                    />
                </FormGroup>
                <FormGroup>
                    <LabelCustom>Percent Discount:</LabelCustom>
                    <input
                        type="number"
                        value={percentDiscount}
                        onChange={(e) => setPercentDiscount(e.target.value)}
                        placeholder="Enter discount percentage"
                    />
                </FormGroup>
                <ButtonContainer>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button primary onClick={handleCreateOrUpdate}>
                        {voucherData ? "Update" : "Create"}
                    </Button>
                </ButtonContainer>
            </ModalContent>
        </ModalOverlay>
    );
}

export default VoucherModal;

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
    justify-content: space-between;
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
