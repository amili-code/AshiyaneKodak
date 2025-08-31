type ErrorResponse = {
  success: false;
  message: string;
  time: string;
  statusCode: number;
  errors?: any;
};

function getCurrentTime(): string {
  const now = new Date();
  return now.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
}

export function validationError(message: string, errors?: any): ErrorResponse {
  return {
    success: false,
    message: message || 'داده‌های ورودی معتبر نیستند.',
    time: getCurrentTime(),
    statusCode: 422,
    errors,
  };
}

export function notFoundError(message: string = 'موردی یافت نشد.'): ErrorResponse {
  return {
    success: false,
    message,
    time: getCurrentTime(),
    statusCode: 404,
  };
}

export function unauthorizedError(message: string = 'دسترسی غیرمجاز.'): ErrorResponse {
  return {
    success: false,
    message,
    time: getCurrentTime(),
    statusCode: 401,
  };
}

export function forbiddenError(message: string = 'اجازه دسترسی ندارید.'): ErrorResponse {
  return {
    success: false,
    message,
    time: getCurrentTime(),
    statusCode: 403,
  };
}

export function serverError(message: string = 'خطای سرور رخ داده است.'): ErrorResponse {
  return {
    success: false,
    message,
    time: getCurrentTime(),
    statusCode: 500,
  };
}

export function badRequestError(message: string = 'درخواست نامعتبر است.'): ErrorResponse {
  return {
    success: false,
    message,
    time: getCurrentTime(),
    statusCode: 400,
  };
}