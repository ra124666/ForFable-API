import { CommentReactionValidatorSchema } from 'App/Validators/CommentReactionValidator'
import { ConnectionType, postWithAuth } from '../_utils/basic-auth-requests'
import { ApiClient } from '@japa/api-client/build/src/client'
import { CommentReaction } from 'App/Models/Reaction'
import { postComment } from '../5-comments/_data'
import { ReactionType } from '@ioc:forfabledomain'

export const BASE_URL = '/api/react-comment'

export const SAMPLE_REACT_COMMENT: typeof CommentReactionValidatorSchema.props = {
  commentId: 1,
  type: ReactionType.NEGATIVE,
}

export const OTHER_SAMPLE_REACT_COMMENT: typeof CommentReactionValidatorSchema.props = {
  commentId: 1,
  type: ReactionType.POSITIVE
}

export const CONCLUSIVE_REACT_COMMENT: typeof CommentReactionValidatorSchema.props = {
  commentId: 1,
  type: ReactionType.CONCLUSIVE,
}

export const WRONG_SAMPLE_REACT_COMMENT = {
  type: 'CONFUSED'
}

export const postReactComment = async (client: ApiClient, isAdmin: boolean = true) => {
  const comment = await postComment(client, isAdmin ? ConnectionType.NonAdmin : ConnectionType.Admin)
  const body = {...SAMPLE_REACT_COMMENT, commentId: comment.id}
  const response = await postWithAuth(BASE_URL, client, isAdmin ? ConnectionType.Admin : ConnectionType.NonAdmin, body)
  return response.body().data as CommentReaction
}