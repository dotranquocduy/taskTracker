// protect middleware (token check)
//protect: Dùng để xác thực người dùng đã đăng nhập hay chưa thông qua token.
//  sau khi đăng nhập hoặc đăng ký thành công, backend gửi token vào cookie, 
// và sau đó tất cả các route bảo vệ sẽ dùng protect để kiểm tra token đó.

import { NextFunction, Request, Response } from "express";
import jwt,{JwtPayload } from "jsonwebtoken";


export interface AuthRequest extends Request{
    user?: JwtPayload | string;
}

export const protect = (req:AuthRequest, res: Response, next : NextFunction) =>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({ EC: 1, EM: 'Không có token' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ EC: 1, EM: 'Token không hợp lệ' });
    }
}

// Middleware này sẽ được sử dụng trong các route cần bảo vệ,
// ví dụ như các route để lấy thông tin người dùng hoặc thực hiện các hành động chỉ dành cho người đã đăng nhập.
// Khi người dùng gửi yêu cầu đến các route này, middleware sẽ kiểm tra token trong cookie
// và xác thực nó. Nếu token hợp lệ, middleware sẽ cho phép yêu cầu tiếp tục,
// nếu không, nó sẽ trả về lỗi 401 (Unauthorized).