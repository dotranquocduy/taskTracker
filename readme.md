📌 TaskTracker
Ứng dụng quản lý công việc cá nhân, sử dụng MERN-like stack (React + Express + PostgreSQL + TypeORM).

🚀 Tính năng chính
✅ Đăng ký / Đăng nhập người dùng (JWT)
✅ CRUD Task (thêm / sửa / xoá / xem danh sách task)
✅ Bảo vệ API với Middleware xác thực
✅ Kết nối cơ sở dữ liệu PostgreSQL bằng TypeORM
✅ UI đơn giản với React + Tailwind CSS

🛠 Cấu trúc thư mục 

tasktracker/
├── backend/
│ ├── controllers/ // Xử lý logic
│ ├── models/ // Entity TypeORM
│ ├── routes/ // Định nghĩa API route
│ ├── database/ // Kết nối DB (AppDataSource)
│ ├── middleware/ // Middleware xác thực JWT
│ ├── server.ts // Khởi chạy server Express
│ ├── package.json
│ └── tsconfig.json
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── api/ // Gọi API (axios)
│ │ └── App.tsx
│ ├── package.json
│ └── tsconfig.json
├── README.md
└── .env
