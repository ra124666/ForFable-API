import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { ReactionType } from '@ioc:forfabledomain'

export default class extends BaseSchema {
  protected tableName = 'write_reactions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('write_id').unsigned().references('writes.id').onDelete('CASCADE')
      table.integer('type').unsigned().checkIn(Object.keys(ReactionType))

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
