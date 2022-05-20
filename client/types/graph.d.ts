import { BigNumber } from "ethers";

export interface Seller {
  id: string;
  name?: string;
  email?: string;
  transactionsReceived?: Array<Transaction>;
}
export interface Transaction {
  id: string;
  payerWalletAddr?: string;
  tokenUsedForPurchaseContractAddr?: string;
  tokenAmtUsedForPurchased?: BigNumber;
  fiatAmountPaid?: BigNumber;
  fiatAmountToPayToSeller?: BigNumber;
  confirmed?: boolean;
  timestampOfConfirmation?: BigNumber;
}