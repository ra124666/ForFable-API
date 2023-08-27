import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('write_id').unsigned().references('writes.id').onDelete('CASCADE')
      table.integer('author_id').unsigned().references('users.id').onDelete('SET NULL')
      table.integer('answer_to_id').unsigned().references('comments.id').onDelete('CASCADE')

      table.string('text')
      table.boolean('edited').defaultTo(false)
      table.string('image_url').nullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}