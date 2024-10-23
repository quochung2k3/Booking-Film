export const sampleMovies = [
    {
        id: 1,
        movieName: "Mắt biếc",
        description: "Mắc Biếc: Một sự kết hợp tinh tế vẻ đẹp thuần khiết của văn chương Nguyễn Nhật Ánh, với những khung hình mãn nhãn đặc trưng của Victor Vũ, đã từng khiến khán giả choáng ngợp từ “Thiên mệnh anh hùng” tới “Tôi thấy hoa vàng trên cỏ xanh”.",
        category: "Chính kịch",
        duration: "116 min",
        releaseDate: "2019-12-18",
        earlyReleaseDate: "2019-12-15",
        country: "Việt Nam",
        director: "Victor Vũ",
        listActor: "Trần Nghĩa, Trúc Anh, Trần Phong",
        imageUrl: "https://innovavietnam.vn/wp-content/uploads/poster-561x800.jpg"
    },
    {
        id: 2,
        movieName: "Ngày Xưa Có Một Chuyện Tình",
        description: "Câu mở đầu trailer – lời dẫn chuyện của nhân vật Vinh là câu thoại nổi bật trong truyện: “Tình bạn là mảnh đất phù hợp nhất để tình yêu gieo xuống hạt giống của mình. Đến một lúc, ta sẽ nhận được phần thưởng quý giá nhất, đó chính là tình yêu”. Phim hứa hẹn bám sát nội dung truyện gốc, đúng với nhiệt huyết tuổi trẻ qua từng câu chữ mà nhà văn Nguyễn Nhật Ánh muốn thể hiện.",
        category: "Tình cảm",
        duration: "135 min",
        releaseDate: "2024-10-25",
        earlyReleaseDate: "2024-10-22",
        country: "Việt Name",
        director: "Trịnh Đình Lê Minh",
        listActor: "Avin Lu, Ngọc Xuân, Đỗ Nhật Hoàng, Thanh Tú, Bảo Tiên, Hạo Khang",
        imageUrl: "https://cdn.galaxycine.vn/media/2024/10/21/ngay-xua-co-1-chuyen-tinh-500_1729502959289.jpg"
    },
];

export const movieScreenings = [
    {
        branch: "Branch A",
        address: "123 Main St, District 1, HCMC",
        listShowTime: [
            {
                screenId: 1,
                screenName: "Screen 1",
                filmName: "Mắt biếc",
                startTime: "10:00",
                duration: "116 min",
                endTime: "11:56",
                emptySeat: 50,
                totalSeat: 100
            },
            {
                screenId: 2,
                screenName: "Screen 2",
                filmName: "Ngày Xưa Có Một Chuyện Tình",
                startTime: "13:00",
                duration: "135 min",
                endTime: "15:15",
                emptySeat: 30,
                totalSeat: 100
            }
        ]
    },
    {
        branch: "Branch B",
        address: "456 Central Park, District 3, HCMC",
        listShowTime: [
            {
                screenId: 1,
                screenName: "Screen 1",
                filmName: "Mắt biếc",
                startTime: "09:30",
                duration: "116 min",
                endTime: "11:26",
                emptySeat: 70,
                totalSeat: 120
            },
            {
                screenId: 2,
                screenName: "Screen 2",
                filmName: "The Godfather",
                startTime: "14:00",
                duration: "175 min",
                endTime: "16:55",
                emptySeat: 20,
                totalSeat: 120
            },
            {
                screenId: 2,
                screenName: "Screen 2",
                filmName: "The Godfather",
                startTime: "17:00",
                duration: "175 min",
                endTime: "19:55",
                emptySeat: 20,
                totalSeat: 120
            }
        ]
    },
    {
        branch: "Branch C",
        address: "789 Cinema Blvd, District 7, HCMC",
        listShowTime: [
            {
                screenId: 1,
                screenName: "Screen 1",
                filmName: "Inception",
                startTime: "12:00",
                duration: "148 min",
                endTime: "14:28",
                emptySeat: 40,
                totalSeat: 90
            },
            {
                screenId: 2,
                screenName: "Screen 2",
                filmName: "Ngày Xưa Có Một Chuyện Tình",
                startTime: "16:00",
                duration: "135 min",
                endTime: "18:15",
                emptySeat: 25,
                totalSeat: 90
            }
        ]
    }
];

export const cinemaData = [
    {
        branch: "Branch A",
        address: "123 Main St, District 1, HCMC",
        listScreen: [
            {
                screenId: 1,
                screenName: "Screen 1",
                totalSeat: 100
            },
            {
                screenId: 2,
                screenName: "Screen 2",
                totalSeat: 120
            }
        ]
    },
    {
        branch: "Branch B",
        address: "456 Central Park, District 3, HCMC",
        listScreen: [
            {
                screenId: 3,
                screenName: "Screen 3",
                totalSeat: 90
            },
            {
                screenId: 4,
                screenName: "Screen 4",
                totalSeat: 150
            }
        ]
    },
    {
        branch: "Branch C",
        address: "789 Cinema Blvd, District 7, HCMC",
        listScreen: [
            {
                screenId: 5,
                screenName: "Screen 5",
                totalSeat: 80
            },
            {
                screenId: 6,
                screenName: "Screen 6",
                totalSeat: 110
            }
        ]
    }
];
