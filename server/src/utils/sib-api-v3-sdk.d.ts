// src/types/sib-api-v3-sdk.d.ts
declare module 'sib-api-v3-sdk' {
    export class ApiClient {
      static instance: ApiClient;
      authentications: {
        'api-key': {
          apiKey: string;
        };
      };
    }
  
    export class TransactionalEmailsApi {
      sendTransacEmail(params: {
        sender: { email: string };
        to: { email: string }[];
        subject: string;
        textContent: string;
      }): Promise<any>;
  
      getTransacEmailsList(): Promise<any>; // Example method, adjust as needed
    }
  
    export default {
      ApiClient: ApiClient,
      TransactionalEmailsApi: TransactionalEmailsApi,
    };
  }
  