import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

// validateRegisterRules định nghĩa các quy tắc kiểm tra và lưu chúng vào hệ thống của express-validator
export const validateRegisterRules =[
    // validate email
    body("email").notEmpty().withMessage("email is required").isEmail().withMessage("Invalid email format"),
    //validate password
    body("password").notEmpty().withMessage("password is required").isLength({min: 6}).withMessage("password phai có ít nhất 6 ký tự"),
    //validate name
    body("name").notEmpty().withMessage("name is required"),
    //validate phone
    body("phone").notEmpty().withMessage("phone is required")
];

//validateRegister sẽ lấy ra kết quả kiểm tra từ hệ thống đó.
export const validateRegister = async(req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ DT: errors.array() });
    }
    next();
}

export const validateLoginRules =[
    // validate email
    body("email").notEmpty().withMessage("email is required").isEmail().withMessage("Invalid email format"),
    //validate password
    body("password").notEmpty().withMessage("password is required")
];

export const validateLogin = async (req: Request, res: Response, next: NextFunction) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({DT: errors.array()});
    }
    next();
}
