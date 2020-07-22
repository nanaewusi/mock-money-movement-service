export default {
  TRANSFER_AMOUNT_TOO_LOW: 'Transfer amount is too low, please try sending a larger amount.',
  INSUFFICIENT_BALANCE: 'Not enough funds to complete the transaction',
  CANT_SETTLE_NON_PENDING_TRANSFER: 'Can only settle pending transfers',
  INVALID_REQUEST (reason) {
    return reason
  },
}
