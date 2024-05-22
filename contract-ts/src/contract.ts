import { NearBindgen, near, call, view, Vector } from 'near-sdk-js'
import { Ticket } from './model'

@NearBindgen({})
class TicketBook {
  instances: Vector<Ticket> = new Vector<Ticket>("v-uid");

  @call({ payableFunction: true })
  // Public - Adds a new message.
  buy_ticket({ price, text }: {price: string, text: string }) {
    // If the user attaches more than 0.1N the message is premium
    const sender = near.predecessorAccountId();

    const ticket: Ticket = { sender, price, text };
    this.instances.push(ticket);
  }

  @view({})
  // Returns an array of messages.
  get_tickets({ from_index = 0, limit = 10 }: { from_index: number, limit: number }): Ticket[] {
    return this.instances.toArray().slice(from_index, from_index + limit);
  }

  @view({})
  total_tickets(): number { return this.instances.length }
}
