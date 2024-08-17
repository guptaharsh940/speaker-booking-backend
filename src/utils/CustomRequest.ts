import { Request } from 'express';

export default interface CustomRequest extends Request {
    userId: number; // or number, depending on your implementation
    userType:string;
}