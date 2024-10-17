import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { DeleteCommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question-comment/delete-question-comment'

@Controller('/questions/comments/:commentId')
export class DeleteQuestionCommentController {
  constructor(private deleteQuestionComment: DeleteCommentOnQuestionUseCase) {}
  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('commentId') commentId: string,
  ) {
    const userId = user.sub
    const result = await this.deleteQuestionComment.execute({
      authorId: userId,
      questionCommentId: commentId,
    })
    if (result.isLeft()) {
      console.log(result.value.message)
      throw new BadRequestException()
    }
  }
}
