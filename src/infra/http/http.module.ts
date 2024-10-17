import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question/answer-question'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student/authenticate-student'
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer/choose-question-best-answer'
import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer/comment-on-answer'
import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question/comment-on-question'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question/create-question'
import { DeleteCommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer-comment/delete-answer-comment'
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer/delete-answer'
import { DeleteCommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question-comment/delete-question-comment'
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question/delete-question'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer/edit-answer'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question/edit-question'
import { FecthQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/fetch-question-answer/fetch-question-answer'
import { FetchRecenteQuestionUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions/fetch-recent-questions'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug/get-question-by-slug'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student.ts/register-student'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { AnswerQuestionController } from './controllers/answer-question.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { ChooseQuestionBestAnswerController } from './controllers/choose-question-best-answer'
import { CommentOnAnswerController } from './controllers/comment-on-answer.controller'
import { CommentOnQuestionController } from './controllers/comment-on-question'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { DeleteAnswerCommentController } from './controllers/delete-answer-comment.controller'
import { DeleteAnswerController } from './controllers/delete-answer.controller'
import { DeleteQuestionCommentController } from './controllers/delete-question-comment.controller'
import { DeleteQuestionController } from './controllers/delete-question.controller'
import { EditAnswerController } from './controllers/edit-answer.controller'
import { EditQuestionController } from './controllers/edit-question.controller'
import { FetchQuestionAnswersController } from './controllers/fetch-question-answer.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { GetQuestionBySlugsController } from './controllers/get-question-by-slug.controller'
import { Module } from '@nestjs/common'
import { DatabaseModule } from '../databse/databse.module'
import { FetchQuestionsCommentsController } from './controllers/fetch-questions-comments.controller'
import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-question-comments/fetch-question-comments'
import { FetchAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-answer-cooments/fetch-answer-comments'
import { FetchAnswerCommentsController } from './controllers/fetch-answer-comments.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlugsController,
    EditQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
    EditAnswerController,
    DeleteAnswerController,
    FetchQuestionAnswersController,
    ChooseQuestionBestAnswerController,
    CommentOnQuestionController,
    DeleteQuestionCommentController,
    CommentOnAnswerController,
    DeleteAnswerCommentController,
    FetchQuestionsCommentsController,
    FetchAnswerCommentsController,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    DatabaseModule,
    GetQuestionBySlugUseCase,
    CreateQuestionUseCase,
    FetchRecenteQuestionUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    AnswerQuestionUseCase,
    EditAnswerUseCase,
    DeleteAnswerUseCase,
    FecthQuestionAnswersUseCase,
    ChooseQuestionBestAnswerUseCase,
    CommentOnQuestionUseCase,
    DeleteCommentOnQuestionUseCase,
    CommentOnAnswerUseCase,
    DeleteCommentOnAnswerUseCase,
    FetchQuestionCommentsUseCase,
    FetchAnswerCommentsUseCase,
  ],
})
export class HttpModule { }
