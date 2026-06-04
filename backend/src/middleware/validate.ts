import { ValidationChain, validationResult } from 'express-validator';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ResponseHandler } from '@muzammil328/core';

export const validate = (validations: ValidationChain[]): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const firstError = errors.array()[0];
      ResponseHandler.badRequest(res, firstError.msg || 'Validation failed');
      return;
    }

    next();
  };
};
