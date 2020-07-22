export interface GatewayResponse {
  status: string;
  code: number;
}

// Implementation doesn't matter
export default {
  async settleToExternalAccount(accountId: string): Promise<GatewayResponse> {
    // assume this function makes calls to the external 
    // payment gateway to settle funds into the designated account
    return new Promise((resolve, reject) => {
      // here we use the timer to simulate a network call
      setTimeout(() => {
        return resolve({
          status: 'SUCCESS',
          code: 200
        }) 
      }, 2000)
    })
  }
}