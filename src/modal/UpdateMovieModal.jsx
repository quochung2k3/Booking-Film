// MovieModal.jsx
import {useState, useEffect} from "react";
import styled from "styled-components";

// eslint-disable-next-line react/prop-types
function UpdateMovieModal({movie, onClose, onSubmit}) {
    const [movieData, setMovieData] = useState(movie);
    const [isChanged, setIsChanged] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    let title = 'Create Movie';
    if(movie.movieName)
    {
        title = 'Details'
    }

    console.log("movie: ", movie)

    // Reset dữ liệu khi mở modal
    useEffect(() => {
        setMovieData(movie);
        setIsChanged(false);
    }, [movie]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        setIsChanged(true); // Đánh dấu đã có thay đổi
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setMovieData({...movieData, [name]: value});
        setIsChanged(true); // Đánh dấu đã có thay đổi
    };

    const handleReset = () => {
        setMovieData(movie);
        setIsChanged(false); // Reset lại trạng thái thay đổi
    };

    const handleSubmit = async () => {
        let method = 'POST';
        let url = 'http://localhost:3000/api/v1/film/';
    
        // Nếu đang cập nhật phim hiện tại, sử dụng PUT thay vì POST
        if (title === 'Details') {
            method = 'PUT';
            url = `http://localhost:3000/api/v1/film/${movieData.id}`;
        }
    
        try {
            const formData = new FormData();
    
            // Thêm các trường dữ liệu khác vào FormData
            for (const key in movieData) {
                if (movieData[key]) {
                    formData.append(key, movieData[key]);
                }
            }
    
            // Kiểm tra nếu hình ảnh đã được chọn
            if (selectedImage) {
                formData.append("image", selectedImage);
            } else {
                alert("Vui lòng chọn hình ảnh trước khi gửi.");
                return;
            }
    
            // Gỡ lỗi FormData để xem nội dung của nó
            for (const [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }
    
            const response = await fetch(url, {
                method: method,
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error(`Không thể ${method === 'POST' ? 'tạo mới' : 'cập nhật'} phim`);
            }
    
            const result = await response.json();
            console.log(`Phim ${method === 'POST' ? 'được tạo' : 'được cập nhật'} thành công!`, result);
            onSubmit(result); // Thông báo cho component cha với kết quả
            onClose(); // Đóng modal
        } catch (error) {
            console.error("Lỗi:", error.message);
            alert("Có lỗi xảy ra. Vui lòng thử lại.");
        }
    };
    
    

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <ModalOverlay onClick={handleOverlayClick}>
            <ModalContent>
                <TitleCustom>
                    {title}
                </TitleCustom>
                <FormGrid>
                    <FormItem>
                        <LabelCustom>Movie Name:</LabelCustom>
                        <StyledInput
                            type="text"
                            name="movieName"
                            value={movieData.movieName}
                            onChange={handleInputChange}
                        />
                    </FormItem>
                    <FormItem>
                        <LabelCustom>Category:</LabelCustom>
                        <StyledInput
                            type="text"
                            name="category"
                            value={movieData.category}
                            onChange={handleInputChange}
                        />
                    </FormItem>
                    <FormItem>
                        <LabelCustom>Duration:</LabelCustom>
                        <StyledInput
                            type="text"
                            name="duration"
                            value={movieData.duration}
                            onChange={handleInputChange}
                        />
                    </FormItem>
                    <FormItem>
                        <LabelCustom>Release Date:</LabelCustom>
                        <StyledInput
                            type="date"
                            name="releaseDate"
                            value={movieData.releaseDate}
                            onChange={handleInputChange}
                        />
                    </FormItem>
                    <FormItem>
                        <LabelCustom>Early Release Date:</LabelCustom>
                        <StyledInput
                            type="date"
                            name="earlyReleaseDate"
                            value={movieData.earlyReleaseDate}
                            onChange={handleInputChange}
                        />
                    </FormItem>
                    <FormItem>
                        <LabelCustom>Country:</LabelCustom>
                        <StyledInput
                            type="text"
                            name="country"
                            value={movieData.country}
                            onChange={handleInputChange}
                        />
                    </FormItem>
                    <FormItem>
                        <LabelCustom>Director:</LabelCustom>
                        <StyledInput
                            type="text"
                            name="director"
                            value={movieData.director}
                            onChange={handleInputChange}
                        />
                    </FormItem>
                    <FormItem>
                        <LabelCustom>Actors:</LabelCustom>
                        <StyledInput
                            type="text"
                            name="listActor"
                            value={movieData.listActor}
                            onChange={handleInputChange}
                        />
                    </FormItem>
                    <FormItem fullWidth>
                        <LabelCustom>Description:</LabelCustom>
                        <StyledTextarea
                            name="description"
                            value={movieData.description}
                            onChange={handleInputChange}
                        />
                    </FormItem>
                    <FormItem fullWidth>
                        <LabelCustom>Image:</LabelCustom>
                        <StyledInput
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange} // Xử lý chọn ảnh
                        />
                    </FormItem>
                </FormGrid>
                {isChanged && (
                    <ButtonContainer>
                        <Button onClick={handleReset}>Reset</Button>
                        <Button primary onClick={handleSubmit}>Submit</Button>
                    </ButtonContainer>
                )}
                <CloseButton onClick={onClose}>X</CloseButton>
            </ModalContent>
        </ModalOverlay>
    );
}

export default UpdateMovieModal;

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
    position: relative;
    background: #fff;
    padding: 30px;
    border-radius: 10px;
    width: 700px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const FormGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
`;

const FormItem = styled.div`
    display: flex;
    flex-direction: column;
    ${(props) => props.fullWidth && "grid-column: span 2;"}
`;

const StyledInput = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    margin-top: 5px;
`;

const StyledTextarea = styled.textarea`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    margin-top: 5px;
    resize: vertical;
    min-height: 80px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    gap: 10px;
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background: ${(props) => (props.primary ? "#4CAF50" : "#f44336")};
    color: white;
    font-size: 16px;
`;

const CloseButton = styled.span`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
    color: #333;
`;

const TitleCustom = styled.h3`
    text-align: center;
    font-size: 1.5rem;
`

const LabelCustom = styled.label`
    font-weight: bold;
    font-size: 1.2rem;
`
