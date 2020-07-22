
import * as Router from 'koa-router'
import * as joi from 'joi'
import { validateRequest } from '../util/routes'
import { performWithdrawal } from '../controllers/withdrawal'
const router = new Router()

router.post('/',
  validateRequest({
    body: {
      linkedAccountId: joi.number().required(),
      amount: joi.number().positive().required()
    }
  }), async ctx => {
    const userId = ctx.state.authenticatedUser.accountId
    const { linkedAccountId, amount } = ctx.request.body
    const withdrawal = await performWithdrawal(userId, linkedAccountId, amount)

    ctx.body = { withdrawal }
  })