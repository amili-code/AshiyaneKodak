import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { validationError } from '../helper/ErrorHandler';

export function validateDto(dtoClass: any) {
  return async (req, res, next) => {
    const dtoObj = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoObj, { whitelist: true, forbidNonWhitelisted: true });
    if (errors.length > 0) {
      const errorMessages = errors.map(err =>
        Object.values(err.constraints || {})
      ).flat();
      return res.status(422).json(validationError(errorMessages[0], errors));
    }
    req.body = dtoObj;
    next();
  };
}