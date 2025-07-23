import express from 'express';

const router = express.Router();


// Lấy thông tin người dùng (yêu cầu đã đăng nhập)
// dùng middleware protect cho các route cần đăng nhập
// router.get('/profile', protect, getUserProfile);

//tasks
router.post("/");
router.get("/");
router.delete("/:id");
router.put("/:id");

export default router;

