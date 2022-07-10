import { remove } from 'cosmokit'
import { Context } from '.'
import { Bot } from './bot'

export abstract class Adapter<T extends Bot = Bot> {
  async start(bot: T) {}
  async stop(bot: T) {}
}

export namespace Adapter {
  export abstract class Client<T extends Bot = Bot> extends Adapter<T> {
    static reusable = true

    constructor(protected ctx: Context, protected bot: T) {
      super()
    }
  }

  export abstract class Server<T extends Bot = Bot> extends Adapter<T> {
    public bots: T[] = []

    fork(ctx: Context, bot: T) {
      this.bots.push(bot)
      ctx.on('dispose', () => {
        remove(this.bots, bot)
      })
    }
  }
}
