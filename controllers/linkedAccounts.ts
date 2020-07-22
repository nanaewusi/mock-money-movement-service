export enum PaymentProvider {
  VISA = 'VISA',
  MASTERCARD = 'MASTERCARD',
  MTN_MOBILE_MONEY = 'MTN_MOBILE_MONEY'
}

export interface LinkedAccount {
  id: string;
  pan: string;
  provider: PaymentProvider;
  country: string;
}

// Implementation doesn't matter
export default {
  async getAccount(id: string): Promise<LinkedAccount> {
    // assume this function makes calls to the database and returns an object
    return new Promise((resolve, reject) => {
      // here we use the timer to simulate a network call
      // to fetch the user's balance from the database
      setTimeout(() => {
        return resolve({
          id: 'account-1',
          pan: '+233544998605',
          provider: PaymentProvider.MTN_MOBILE_MONEY,
          country: 'Ghana'
        }) 
      }, 2000)
    })
  }
}
