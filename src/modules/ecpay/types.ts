export interface ECPayPaymentRequest {
  MerchantTradeNo: string;
  MerchantTradeDate: string;
  TotalAmount: number;
  TradeDesc: string;
  ItemName: string;
  ReturnURL: string;
  ClientBackURL?: string;
  NotifyURL?: string;
}

export interface ECPayPaymentResponse {
  MerchantID: string;
  MerchantTradeNo: string;
  StoreID?: string;
  RtnCode: number;
  RtnMsg: string;
  TradeNo?: string;
  TradeAmt?: number;
  PaymentDate?: string;
  PaymentType?: string;
  PaymentTypeChargeFee?: string;
  SimulatePaid?: number;
}

export interface ECPayTopupRequest {
  amount: number;
  description?: string;
}