// smsService.ts
import axios from 'axios';
import {ENV} from '../../helper';

// تعریف انواع TypeScript
export interface SMSConfig {
  token: string;
}

export interface SendSMSOptions {
  mobile: string;
  message: string;
  sendDateTime?: string;
}

export interface SMSResponse {
  status: number;
  message: string;
  data?: any;
}

// اینترفیس برای پاسخ‌های آموت
interface AmootResponse {
  Status: string;
  Message: string;
  MessageText?: string;
  SMSPagesCount?: number;
  CampaignID?: number;
  Price?: number;
  Data?: any;
}

class SMSService {
  private token: string;
  private baseURL: string = 'https://portal.amootsms.com/rest/';

  constructor(config?: SMSConfig) {
    this.token =  ENV.SMS_API_KEY || 'D575336A0F6E94716D262B92E709D31144775F77';
  }

  /**
   * ارسال پیامک به یک شماره موبایل با خط خدماتی (GET)
   */
  async sendSMS(options: SendSMSOptions): Promise<SMSResponse> {
    try {
      const url = `${this.baseURL}SendSimple`;
      
      // ساخت پارامترهای URL
      const params = new URLSearchParams();
      params.append('Token', this.token);
      params.append('SMSMessageText', options.message);
      params.append('LineNumber', 'Service');
      params.append('Mobiles', options.mobile);
      
      if (options.sendDateTime) {
        params.append('SendDateTime', options.sendDateTime);
      }


      const response = await axios.get<AmootResponse>(url + '?' + params.toString());
      
      if (response.data.Status === 'Successful') {
        return {
          status: 200,
          message: 'پیامک با موفقیت ارسال شد',
          data: response.data
        };
      } else {
        return {
          status: 400,
          message: response.data.Message || 'خطا در ارسال پیامک',
          data: response.data
        };
      }
    } catch (error: any) {
      console.error('خطا در ارسال پیامک:', error);
      
      if (error.response) {
        const errorData = error.response.data as AmootResponse;
        return {
          status: error.response.status,
          message: errorData?.Message || 'خطا در ارسال پیامک',
          data: error.response.data
        };
      }
      
      return {
        status: 500,
        message: error.message || 'خطای ناشناخته در ارسال پیامک'
      };
    }
  }

  /**
   * ارسال پیامک به یک شماره موبایل با خط خدماتی (POST)
   */
  async sendSMSPost(options: SendSMSOptions): Promise<SMSResponse> {
    try {
      const url = `${this.baseURL}SendSimple`;
      
      const formData = new URLSearchParams();
      formData.append('Token', this.token);
      formData.append('SMSMessageText', options.message);
      formData.append('LineNumber', 'Service');
      formData.append('Mobiles', options.mobile);
      
      if (options.sendDateTime) {
        formData.append('SendDateTime', options.sendDateTime);
      }


      const response = await axios.post<AmootResponse>(url, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      
      if (response.data.Status === 'Successful') {
        return {
          status: 200,
          message: 'پیامک با موفقیت ارسال شد',
          data: response.data
        };
      } else {
        return {
          status: 400,
          message: response.data.Message || 'خطا در ارسال پیامк',
          data: response.data
        };
      }
    } catch (error: any) {
      console.error('خطا در ارسال پیامک:', error);
      
      if (error.response) {
        const errorData = error.response.data as AmootResponse;
        return {
          status: error.response.status,
          message: errorData?.Message || 'خطا در ارسال پیامک',
          data: error.response.data
        };
      }
      
      return {
        status: 500,
        message: error.message || 'خطای ناشناخته در ارسال پیامک'
      };
    }
  }

  /**
   * ارسال پیامک به چند شماره موبایل (GET)
   */
  async sendBulkSMS(mobiles: string[], message: string, sendDateTime?: string): Promise<SMSResponse> {
    try {
      const url = `${this.baseURL}SendSimple`;
      
      const params = new URLSearchParams();
      params.append('Token', this.token);
      params.append('SMSMessageText', message);
      params.append('LineNumber', 'Service');
      params.append('Mobiles', mobiles.join(','));
      
      if (sendDateTime) {
        params.append('SendDateTime', sendDateTime);
      }

      const response = await axios.get<AmootResponse>(url + '?' + params.toString());
      
      if (response.data.Status === 'Successful') {
        return {
          status: 200,
          message: 'پیامک‌ها با موفقیت ارسال شدند',
          data: response.data
        };
      } else {
        return {
          status: 400,
          message: response.data.Message || 'خطا در ارسال پیامک‌ها',
          data: response.data
        };
      }
    } catch (error: any) {
      if (error.response) {
        const errorData = error.response.data as AmootResponse;
        return {
          status: error.response.status,
          message: errorData?.Message || 'خطا در ارسال پیامک‌ها',
          data: error.response.data
        };
      }
      
      return {
        status: 500,
        message: error.message || 'خطای ناشناخته در ارسال پیامک‌ها'
      };
    }
  }

  /**
   * دریافت وضعیت حساب (GET)
   */
  async getAccountStatus(): Promise<SMSResponse> {
    try {
      const url = `${this.baseURL}AccountStatus`;
      const params = new URLSearchParams();
      params.append('Token', this.token);

      const response = await axios.get<AmootResponse>(url + '?' + params.toString());
      
      if (response.data.Status === 'Successful') {
        return {
          status: 200,
          message: 'وضعیت حساب دریافت شد',
          data: response.data
        };
      } else {
        return {
          status: 400,
          message: response.data.Message || 'خطا در دریافت وضعیت حساب',
          data: response.data
        };
      }
    } catch (error: any) {
      if (error.response) {
        const errorData = error.response.data as AmootResponse;
        return {
          status: error.response.status,
          message: errorData?.Message || 'خطا در دریافت وضعیت حساب',
          data: error.response.data
        };
      }
      
      return {
        status: 500,
        message: error.message || 'خطای ناشناخته در دریافت وضعیت حساب'
      };
    }
  }

  /**
   * دریافت اعتبار حساب (GET)
   */
  async getCredit(): Promise<SMSResponse> {
    try {
      const url = `${this.baseURL}AccountCredit`;
      const params = new URLSearchParams();
      params.append('Token', this.token);

      const response = await axios.get<AmootResponse>(url + '?' + params.toString());
      
      if (response.data.Status === 'Successful') {
        return {
          status: 200,
          message: 'اطلاعات اعتبار دریافت شد',
          data: response.data
        };
      } else {
        return {
          status: 400,
          message: response.data.Message || 'خطا در دریافت اطلاعات اعتبار',
          data: response.data
        };
      }
    } catch (error: any) {
      if (error.response) {
        const errorData = error.response.data as AmootResponse;
        return {
          status: error.response.status,
          message: errorData?.Message || 'خطا در دریافت اطلاعات اعتبار',
          data: error.response.data
        };
      }
      
      return {
        status: 500,
        message: error.message || 'خطای ناشناخته در دریافت اطلاعات اعتبار'
      };
    }
  }
}

// ایجاد نمونه از سرویس با استفاده از مقادیر محیطی
export const smsService = new SMSService();

// ایجاد نمونه از سرویس و export آن
export const createSMSService = (config?: SMSConfig): SMSService => {
  return new SMSService(config);
};

// Export کلاس برای استفاده مستقیم
export default SMSService;