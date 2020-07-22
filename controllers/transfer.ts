import users, { User } from './user'
import userBalance from './userBalance'
import transactionLedger from './transactionLedger'
import errors from '../util/errors'

export enum TransferStatus {
  PENDING = 'PENDING',
  SETTLED = 'SETTLED',
  CANCELLED = 'CANCELLED'
}

export interface Transfer {
  id: string;
  amount: number;
  status: TransferStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExecuteTransferConfig {
  senderId: string, 
  recipientId: string, 
  transfer: Transfer
}

export interface ValidateTransferConfig {
  sender: User, 
  recipient: User, 
  transfer: Transfer
}

function ensureTransferIsPending (transfer: Transfer) {
  if (transfer.status !== TransferStatus.PENDING) {
    throw new Error(errors.CANT_SETTLE_NON_PENDING_TRANSFER)
  }
}

function ensureTransferAmountIsPositive (transfer: Transfer) {
  if (transfer.amount <= 0) {
    throw new Error(errors.TRANSFER_AMOUNT_TOO_LOW)
  }
}

async function ensureSenderHasSufficientBalance (sender: User, transfer: Transfer) {
  const balance = await userBalance.getBalance(sender.id)
  if (balance.amount < transfer.amount) {
    throw new Error(errors.INSUFFICIENT_BALANCE)
  }
}


  async function createTransfer(amount: number): Promise<Transfer> {
    // assume this function makes calls to the database and returns an object
    return new Promise((resolve, reject) => {
      // here we use the timer to simulate a network call
      // to create the transfer record in the database
      setTimeout(() => {
        const now = new Date()
        return resolve({
          id: '1',
          amount,
          status: TransferStatus.PENDING,
          createdAt: now,
          updatedAt: now
        }) 
      }, 2000)
    })
  }

  function validateTransfer(config: ValidateTransferConfig): void {
    const { transfer, sender } = config
    ensureTransferAmountIsPositive(transfer)
    ensureSenderHasSufficientBalance(sender, transfer)
  }

  async function executeTransfer(
    config: ExecuteTransferConfig
  ): Promise<Transfer> {
    return new Promise(async (resolve, reject) => {

      const sender = await users.getUser(config.senderId)
      const recipient = await users.getUser(config.recipientId)
      ensureTransferIsPending(config.transfer)
      await validateTransfer({
        sender,
        recipient,
        transfer: config.transfer
      })

      await transactionLedger.insertLedgerEntries({
        sender,
        recipient,
        amount: config.transfer.amount
      })

      config.transfer.status = TransferStatus.SETTLED
      return resolve(config.transfer) 
    })
  }

// Implementation doesn't matter
export default {
  createTransfer,
  validateTransfer,
  executeTransfer
}