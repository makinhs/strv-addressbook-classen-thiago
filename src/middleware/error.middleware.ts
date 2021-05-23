import { Request, Response, NextFunction } from 'express';

const errorMiddleware = function (req: Request, res: Response, next: NextFunction) {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
};

export { errorMiddleware };
