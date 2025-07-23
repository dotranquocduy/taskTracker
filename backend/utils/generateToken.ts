import jwt from "jsonwebtoken"

export const generateToken = (payload : object) =>{
    return jwt.sign(payload, process.env.JWT_SECRET as string || "RAGE_KEY", {
        expiresIn : "1h"
    })
}
