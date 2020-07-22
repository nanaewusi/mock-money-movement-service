export interface UserBalance {
  amount: number;
  currency: string;
}

// Implementation doesn't matter
export default {
  async getBalance(userId: string): Promise<UserBalance> {
    // assume this function makes calls to the database and returns an object
    return new Promise((resolve, reject) => {
      // here we use the timer to simulate a network call
      // to fetch the user's balance from the database
      setTimeout(() => {
        return resolve({
          amount: 1000,
          currency: 'USD'
        }) 
      }, 2000)
    })
  }
}