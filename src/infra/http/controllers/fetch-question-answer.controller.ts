import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { FecthQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/fetch-question-answer/fetch-question-answer'
import { AnswerPresenter } from '../presenter/answer-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))
const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)
type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>
@Controller('/questions/:questionId/recent-answers')
export class FetchQuestionAnswersController {
  constructor(private fetchQuestionAnswers: FecthQuestionAnswersUseCase) { }
  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.fetchQuestionAnswers.execute({
      page,
      questionId,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
    const answers = result.value.answers
    return { answers: answers.map(AnswerPresenter.toHTTP) }
  }
}
