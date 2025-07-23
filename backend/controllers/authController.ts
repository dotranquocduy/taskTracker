import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { User } from "../models/user";
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils/generateToken";
import { generateCode } from "../utils/generateCode";
import { sendVerificationEmail } from "../utils/emailSender";


//để thao tác CRUD với bảng User.
//Đây là cách TypeORM cung cấp repository để thao tác bảng User.
//Sau đó dùng findOneBy, create, save... để CRUD.
const userRepo = AppDataSource.getRepository(User); 

const saltRounds = 10; // Number of rounds to perform the hashing operation

const hash = async(password : string): Promise<string> =>{
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

export const checkAccount = async(req: Request, res: Response) =>{
    try {
        const { name, email, password, phone } = req.body;
        //check email exist
        const user = await userRepo.findOne({ where: [
            { email: email },
            { phone: phone }
        ] });
        if (user) {
            return res.status(400).json({ EC: 1, EM: "User already exists !!" });
        }

        // Return the destructured info if account does not exist
        return res.status(200).json({ EC: 0, EM: "Account is available", DT: { name, email, password, phone } });
    } catch (error) {
        return res.status(500).json({ EC: 2, EM: "Internal server error" });
    }
}

export const registerUser = async (req: Request, res: Response) =>{

  try {
   //logic hash pass, luu db, tra token
     const {name, email, password, phone} = req.body;
    // hash pass
    const hashedPassword = await hash(password);

    // tạo đối tượng user mới 

    const newUser = userRepo.create({
        name,
        email,
        password:hashedPassword,
        phone
    })
    //lưu xuống DB
    await userRepo.save(newUser);

    // trả về token
    // use generate token
        const token = generateToken({ id: newUser.id, email: newUser.email, name : newUser.name });

    // lưu token vào cookie
    // Set cookie
     res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // chỉ bật HTTPS ở production
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000, // 1 ngày
    });

     // Thành công
    // Trả về user info
        return res.status(201).json({
            DT: {
                user: {
                    email: newUser.email,
                    name: newUser.name,
                    phone: newUser.phone
                }
            },
            EM : "Register success",
            EC: 0
           
        });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ EC: 2, EM: "Internal server error" });
  }

}

export const loginUser = async (req: Request, res: Response) =>{

     // logic kiểm tra user, so sánh password, trả token
    try {
        const {email, password} = req.body;
        // check email exist
        const user = await userRepo.findOneBy({email});

        if(!user){
            return res.status(400).json({EC: 1, EM: "Invalid user!!"});
        }
  
        // compare password
        const isPassword = await bcrypt.compare(password, user.password);
        if(!isPassword){
            return res.status(400).json({EC: 1, EM: "Invalid user!!"});
        }

        // use generate token
        const token = generateToken({ id: user.id, email: user.email, name : user.name });

        // lưu token vào cookie
        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // chỉ bật HTTPS ở production
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000, // 1 ngày
        });

        // Thành công
        // Trả về user info + token
        return res.json({ 
            // DT: {
            //     token,
            //     user: {
            //         email: user.email,
            //         name: user.name,
            //     }
            // },
            EM: "Login success",
            EC: 0
        });


    } catch (error) {
        // console.log(error)
        return res.status(500).json({ EC: 2, EM: "Internal server error" });
    }
   
}

// Logout – xoá token
export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  return res.status(200).json({ EC: 0, EM: 'Đã đăng xuất' });
};


//  register + middleware → login + middleware → lưu token vào cookie → middleware protect (token) → các route bảo vệ (cần đăng nhập)
//trả JSON chứa thông tin user
export const getUserInfo =(req : Request, res: Response) =>{
    const user = (req as any).user; // thông tin user lấy từ token
    res.status(200).json({
        EC :0,
        EM: 'Lấy thông tin user thành công',
        DT: user
    })
}

export const verfifyEmail = async(req : Request, res: Response) =>{
    try {
         const {email} = req.body;
         if(!email){
            return res.status(400).json({EC: 1, EM: "verify email failed"});
         }
          // use generate code
          const code = generateCode();
          await sendVerificationEmail(email,code);
         // Thành công
        // Trả về user info + token
        return res.json({ 
            EM: "verify success",
            EC: 0,
            code : code
        });
    } catch (error) {
        return res.status(500).json({ EC: 2, EM: "Internal server error" });
    } 
}