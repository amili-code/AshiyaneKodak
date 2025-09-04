import {type Request ,type Response ,type NextFunction } from 'express';


export function consoleLogger(req:Request, res:Response , next:NextFunction){
    console.log({
        "requestUrl": req.url,
        "params":req.params,
        "body":req.body
    })
    return next()
}