import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import VoucherModal from "../../modal/VoucherModal.jsx";

function Voucher() {
  const [showModal, setShowModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await axios.get("/api/v1/discount");
        setVouchers(response.data);
      } catch (error) {
        console.error("Error fetching vouchers", error);
      }
    };

    fetchVouchers();
  }, []);

  const handleCreateClick = () => {
    setSelectedVoucher(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVoucher(null);
  };

  const handleEdit = (voucherItem) => {
    setSelectedVoucher(voucherItem);
    setShowModal(true);
  };

  const handleToggleActive = async (voucherItem) => {
    try {
      const updatedVoucher = {
        ...voucherItem,
        is_active: !voucherItem.is_active,
      };
      const response = await axios.put(
        `/api/v1/discount/${voucherItem._id}`,
        updatedVoucher
      );
      setVouchers((prevVouchers) =>
        prevVouchers.map((v) => (v._id === voucherItem._id ? response.data : v))
      );
    } catch (error) {
      console.error("Error toggling voucher active state", error);
    }
  };

  const handleCreateOrUpdate = async (voucher) => {
    try {
      if (selectedVoucher && selectedVoucher._id) {
        const response = await axios.put(
          `/api/v1/discount/${selectedVoucher._id}`,
          voucher
        );
        setVouchers((prevVouchers) =>
          prevVouchers.map((v) =>
            v._id === selectedVoucher._id ? response.data : v
          )
        );
        console.log("Voucher Updated", voucher);
      } else {
        const response = await axios.post("/api/v1/discount", voucher);
        setVouchers((prevVouchers) => [...prevVouchers, response.data]);
        console.log("Voucher Created", voucher);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error creating/updating voucher", error);
    }
  };

  return (
    <Container>
      <CreateButton onClick={handleCreateClick}>Create Voucher</CreateButton>
      <h2>Voucher List</h2>
      <VouchersTable>
        <thead>
          <tr>
            <th>Voucher ID</th>
            <th>Discount Name</th>
            <th>Discount Code</th>
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
          {vouchers.length > 0 ? (
            vouchers.map((voucherItem, index) => (
              <tr key={index}>
                <td>{voucherItem._id}</td>
                <td>{voucherItem.discount_name}</td>
                <td>{voucherItem.discount_code}</td>
                <td>{new Date(voucherItem.start_date).toLocaleDateString()}</td>
                <td>{new Date(voucherItem.end_date).toLocaleDateString()}</td>
                <td>{voucherItem.quantity}</td>
                <td>{voucherItem.percent}%</td>
                <td>{voucherItem.is_active ? "Active" : "Inactive"}</td>
                <td>{new Date(voucherItem.created_at).toLocaleDateString()}</td>
                <td>
                  <ActionButton onClick={() => handleEdit(voucherItem)}>
                    Edit
                  </ActionButton>
                  <ActionButton
                    delete
                    onClick={() => handleToggleActive(voucherItem)}
                  >
                    {voucherItem.is_active ? "Deactivate" : "Activate"}
                  </ActionButton>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No vouchers available.</td>
            </tr>
          )}
        </tbody>
      </VouchersTable>
      {showModal && (
        <VoucherModal
          onClose={handleCloseModal}
          voucherData={selectedVoucher}
          onSave={(updatedVoucher) => {
            if (selectedVoucher && selectedVoucher._id) {
              setVouchers((prevVouchers) =>
                prevVouchers.map((v) =>
                  v._id === selectedVoucher._id ? updatedVoucher : v
                )
              );
            } else {
              setVouchers((prevVouchers) => [...prevVouchers, updatedVoucher]);
            }
          }}
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

  th,
  td {
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
  background-color: #4caf50;
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
