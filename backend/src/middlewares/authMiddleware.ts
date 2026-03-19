import type { NextFunction, Request, Response } from "express";

export const authMiddleware = (req:Request,res:Response,next:NextFunction)=>{

        const password = req.headers['password'];
        if(!password){
            res.status(400).send("Password Required");
        }else if(password != "dharanI007"){
            res.send("password mismatched")
        }

}