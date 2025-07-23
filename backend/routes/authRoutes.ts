import express from 'express';
import { registerUser, loginUser, getUserInfo, logoutUser, verfifyEmail, checkAccount } from '../controllers/authController';
import { validateLogin, validateLoginRules, validateRegister, validateRegisterRules } from '../middleware/authMiddleware';
import { protect } from '../middleware/protect';

const router = express.Router();

function asyncHandler(fn: Function) {
  return function (req: express.Request, res: express.Response, next: express.NextFunction) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}


// users
router.post("/checkAccount", validateRegisterRules, asyncHandler(validateRegister), asyncHandler(checkAccount));
router.post("/register", asyncHandler(registerUser));
router.post("/login",validateLoginRules, asyncHandler(validateLogin), asyncHandler(loginUser));
router.get('/info', asyncHandler(protect), asyncHandler(getUserInfo)); // lay thông tin người dùng đã đăng nhập from token
router.post('/logout', asyncHandler(logoutUser)); // xoa token khi đăng xuất
router.post('/verify', asyncHandler(verfifyEmail)); // verify email

export default router;