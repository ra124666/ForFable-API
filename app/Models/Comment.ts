import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Write from './Write'
import User from './User'
import { CommentReaction } from './Reaction'
import { BOOLEAN_SERIAL } from './_Base'
import { UserEntity, WriteEntity, CommentEntity, CommentReactionEntity } from '@ioc:forfabledomain'

export default class Comment extends BaseModel implements CommentEntity {
  @column({ isPrimary: true })
  public id: number

  @column()
  public writeId: number

  @column()
  public authorId: number

  @column()
  public answerToId: number | null

  @column()
  public text: string

  @column()
  public imageUrl: string | null

  @column(BOOLEAN_SERIAL)
  public edited: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Write)
  public write: BelongsTo<typeof Write>

  @belongsTo(() => User, { foreignKey: 'authorId' })
  public author: BelongsTo<typeof User>

  @hasMany(() => CommentReaction)
  public reactions: HasMany<typeof CommentReaction>

  @hasMany(() => Comment, { foreignKey: 'answerToId' })
  public answers: HasMany<typeof Comment>

  public async getWrite(): Promise<WriteEntity> { return this.write }
  public async getAuthor(): Promise<UserEntity> { return this.author }
  public async getReactions(): Promise<CommentReactionEntity[]> { return this.reactions }
  public async getAnswers(): Promise<CommentEntity[]> { return this.answers }
}
