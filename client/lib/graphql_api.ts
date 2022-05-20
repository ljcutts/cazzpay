import axios from "axios";
import { Seller, Transaction } from "../types/graph";
const graphEndpoint: string = process.env.GRAPH_API_ENDPOINT as string;

/** Get Seller Details
 * @params sellerId for a particular seller
 */
export const getSellerDetails = async (sellerId: string): Promise<Seller> => {
  const response = await axios.post(graphEndpoint, {
    query: `{
      seller(id : "${sellerId}"){
        id
        email
        name
      }
    }`,
  });

  const seller = response.data.data.seller;
  return seller;
};
/** Get total number of Sellers */
export const totalSellerCount = async () => {
  const response = await axios.post(graphEndpoint, {
    query: `{
      sellers{
        id
      }
    }`,
  });
  const sellers: Array<Seller> = response.data.data.sellers;
  return sellers.length;
};

/** Get Total number of transactions under a seller */
export const totalTransactionsUnderSeller = async (
  sellerId: string
): Promise<number> => {
  const response = await axios.post(graphEndpoint, {
    query: `{
      seller(id:"${sellerId}"){
        transactionsReceived{
          id
        }
      }
    }`,
  });
  const transactions: Array<Transaction> =
    response.data.data.seller.transactionsReceived;
  return transactions.length;
};
/** Fetch all transactions of a particular seller
 * @params sellerId for a particular seller
 * @params pageNumber for pagination
 * @params pageSize for how many seller to show
 */
export const getAllTransactionsUnderSeller = async (
  sellerId: string,
  pageNumber?: number,
  pageSize?: number
): Promise<Array<Transaction>> => {
  const response = await axios.post(graphEndpoint, {
    query: `{
      seller(id : "${sellerId}"){
        transactonsReceived(first:${pageSize},skip:${pageNumber}){
          id
          payerWalletAddr
          tokenUsedForPurchaseContractAddr
          tokenAmtUsedForPurchased
          fiatAmountPaid
          fiatAmountToPayToSeller
          confirmed
          timestampOfConfirmation
        }
      }
    }`,
  });
  const transactions: Array<Transaction> =
    response.data.data.seller.transactionsReceived;
  return transactions;
};

/** Get the list of all sellers */
export const listOfSellers = async (): Promise<Array<Seller>> => {
  const response = await axios.post(graphEndpoint, {
    query: `{
      sellers{
        id
        email
        name
      }
    }`,
  });
  const sellers: Array<Seller> = response.data.data.sellers;
  return sellers;
};
