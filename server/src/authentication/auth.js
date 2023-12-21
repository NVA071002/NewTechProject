
import jwt from "jsonwebtoken";
import {
    checkTokenExist
} from "../services/userService.js"
export default async function checkToken(req, res, next) {
    //bypass login, register, 
    if(req.url.toLowerCase().trim() == '/api/login'.toLowerCase().trim() 
        || req.url.toLowerCase().trim() =='/api/register'.toLowerCase().trim()
        || req.url.toLowerCase().trim() =='/api/logout'.toLowerCase().trim()
        || req.url.toLowerCase().trim() == '/auth/login'.toLowerCase().trim() 
        || req.url.toLowerCase().trim() == '/api/get-reference'.toLowerCase().trim() 
        || req.url.toLowerCase().trim() == '/api/read-pdf'.toLowerCase().trim() 
        || req.url.toLowerCase().trim() == '/api/read-task'.toLowerCase().trim() 
        || req.url.toLowerCase().trim() == '/api/admin/get-announcement-account '.toLowerCase().trim() 
        || req.url.toLowerCase().trim() == '/api/admin/get-announcement-by-id'.toLowerCase().trim() 
    ){
        next()
        return
    }
    const token = req.headers?.authorization?.split(" ")[1];
    try {
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        const isExpired = Date.now() >= jwtObject.exp * 1000
        if(isExpired)
        {
            res.status(400).json({
                errCode: 1,
                message: "token is expired",
            }) 
            res.end()
        }
        else{
            let checkToken = await checkTokenExist(token);
            if(checkToken)
            {
                next()
            }
            else {
                res.status(400).json({
                    errCode: 1,
                    message: "token is expired",
                }) 
                res.end()
            }
        }
        debugger
    }catch(e){
        res.status(400).json({
            errCode: 1,
            message: "Not match token",
        }) 
    }
}

