import payments from './payment'
import linkedAccounts, { LinkedAccount } from './linkedAccounts'
import transfers, { Transfer } from './transfer'
const CHIPPER_BASE_GHS_ACCOUNT_ID = '456'

export enum WithdrawalStatus {
  PENDING = 'PENDING',
  PAYMENT_SUBMITTED = 'PAYMENT_SUBMITTED',
  WAITING_APPROVAL = 'WAITING_APPROVAL',
  DECLINED = 'DECLINED',
  FAILED = 'FAILED',
  EXTERNAL_FAILED = 'EXTERNAL_FAILED',
  SETTLED = 'SETTLED'
}

export interface Withdrawal {
  id: string;
  userId: string;
  linkedAccountId: string;
  status: WithdrawalStatus;
  errorMessage?: string;
  transferId: string;
  createdAt: Date;
  updatedAt: Date;
}

async function createWithdrawal (
  userId: string,
  destinationAccount: LinkedAccount,
  transfer: Transfer
): Promise<Withdrawal> {
    // assume this function makes calls to the database and returns an object
    return new Promise((resolve, reject) => {
      // here we use the timer to simulate a network call
      // to create the withdrawal entry in the database
      setTimeout(() => {
        const now = new Date()
        return resolve({
          id: '123',
          userId,
          linkedAccountId: destinationAccount.id,
          status: WithdrawalStatus.PENDING,
          transferId: transfer.id,
          createdAt: now,
          updatedAt: now
        }) 
      }, 2000)
    })
}

async function settleFundsIntoDestinationAccount (
  accountId: string
): Promise<void> {
  await payments.settleToExternalAccount(accountId)
}

async function executeWithdrawal (
  withdrawal: Withdrawal,
  transfer: Transfer
): Promise<Withdrawal> {
  const result = await transfers.executeTransfer({
    senderId: withdrawal.userId,
    recipientId: CHIPPER_BASE_GHS_ACCOUNT_ID,
    transfer: transfer
  })

  settleFundsIntoDestinationAccount(withdrawal.linkedAccountId)
  withdrawal.status = WithdrawalStatus.SETTLED
  return withdrawal
}

export async function performWithdrawal (
  userId: string,
  destinationAccountId: string,
  amount: number
) {
  const destinationAccount = await linkedAccounts.getAccount(destinationAccountId)
  const transfer  = await transfers.createTransfer(amount)
  let withdrawal = await createWithdrawal(userId, destinationAccount, transfer)
  withdrawal = await executeWithdrawal(withdrawal, transfer)
}