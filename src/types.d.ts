// src/types.d.ts

import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            userId: number;
            userType: string;
        }
    }
}
