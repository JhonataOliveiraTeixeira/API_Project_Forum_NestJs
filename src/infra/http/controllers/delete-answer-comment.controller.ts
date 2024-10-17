import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { DeleteCommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer-comment/delete-answer-comment'

@Controller('/answers/comments/:commentId')
export class DeleteAnswerCommentController {
  constructor(private deleteAnswerComment: DeleteCommentOnAnswerUseCase) {}
  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('commentId') commentId: string,
  ) {
    const userId = user.sub
    const result = await this.deleteAnswerComment.execute({
      authorId: userId,
      answerCommentId: commentId,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
