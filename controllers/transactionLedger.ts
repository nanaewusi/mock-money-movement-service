import { User } from "./user"

export interface TransactionConfig {
  sender: User;
  recipient: User;
  amount: number;
}

// Implementation doesn't matter
export default {
  async insertLedgerEntries(config: TransactionConfig): Promise<void> {
    // assume this function makes calls to the database and returns nothing
    return new Promise((resolve, reject) => {
      // here we use the timer to simulate a network call
      // to create the transaction entries in the database
      setTimeout(() => {
        resolve() 
      }, 2000)
    })
  }
}