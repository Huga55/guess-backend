import { Response } from "express";

export default (error: string, res: Response) => {
        console.log("Server error 500!", error);
        return res.status(500).send({success: false.valueOf, error: "Something went wrong... Please try again later"});
    }