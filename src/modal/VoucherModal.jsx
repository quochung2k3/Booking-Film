// CreateVoucherModal.jsx
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000"; // Đổi port thành port backend của bạn

// eslint-disable-next-line react/prop-types
function VoucherModal({ onClose, voucherData, onSave }) {
  const [discountName, setDiscountName] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [percent, setPercent] = useState("");

  useEffect(() => {
    if (voucherData) {
      setDiscountName(voucherData.discount_name || "");
      setDiscountCode(voucherData.discount_code || "");
      setStartDate(voucherData.start_date || "");
      setEndDate(voucherData.end_date || "");
      setQuantity(voucherData.quantity || "");
      setPercent(voucherData.percent || "");
    } else {
      setDiscountName("");
      setDiscountCode("");
      setStartDate("");
      setEndDate("");
      setQuantity("");
      setPercent("");
    }
  }, [voucherData]);

  const handleCreateOrUpdate = async () => {
    const voucher = {
      discount_name: discountName,
      discount_code: discountCode,
      start_date: startDate,
      end_date: endDate,
      quantity: quantity,
      percent: percent,
    };

    try {
      if (voucherData && voucherData._id) {
        const response = await axios.put(
          `/api/v1/discount/${voucherData._id}`,
          voucher
        );
        console.log("Voucher Updated", voucher);
        onSave(response.data);
      } else {
        const response = await axios.post("/api/v1/discount", voucher);
        console.log("Voucher Created", voucher);
        onSave(response.data);
      }
      onClose();
    } catch (error) {
      console.error("Error creating/updating voucher", error);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <TitleCustom>
          {voucherData ? "Edit Voucher" : "Create Voucher"}
        </TitleCustom>
        <FormGroup>
          <LabelCustom>Discount Name:</LabelCustom>
          <input
            type="text"
            value={discountName}
            onChange={(e) => setDiscountName(e.target.value)}
            placeholder="Enter discount name"
          />
        </FormGroup>
        <FormGroup>
          <LabelCustom>Discount Code:</LabelCustom>
          <input
            type="text"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            placeholder="Enter discount code"
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
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
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

  select,
  input {
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
