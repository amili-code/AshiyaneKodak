import { serverError, validationError, notFoundError, badRequestError ,logger} from '../helper';


export function catchHandler(err, req, res, next) {
  // لاگ ارور
  logger.error(`${req.method} ${req.originalUrl} - ${err.message}`);

  // هندل ValidationError
  if (err.name === 'ValidationError' || err.statusCode === 422) {
    return res.status(422).json(validationError(err.message, err.errors));
  }

  // هندل NotFound
  if (err.statusCode === 404) {
    return res.status(404).json(notFoundError(err.message));
  }

  // هندل BadRequest
  if (err.statusCode === 400) {
    return res.status(400).json(badRequestError(err.message));
  }

  // سایر ارورها
  return res.status(500).json(serverError(err.message));
}
