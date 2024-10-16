/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { CreateAccountController } from "./controllers/create-account.controller";
import { CreateQuestionController } from "./controllers/create-question.controller";
import { FetchRecentQuestionsController } from "./controllers/fetch-recent-questions.controller";
import { DatabaseModule } from "../databse/databse.module";
import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/create-question/create-question";
import { FetchRecenteQuestionUseCase } from "@/domain/forum/application/use-cases/fetch-recent-questions/fetch-recent-questions";
import { RegisterStudentUseCase } from "@/domain/forum/application/use-cases/register-student.ts/register-student";
import { AuthenticateStudentUseCase } from "@/domain/forum/application/use-cases/authenticate-student/authenticate-student";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { GetQuestionBySlugUseCase } from "@/domain/forum/application/use-cases/get-question-by-slug/get-question-by-slug";
import { GetQuestionBySlugsController } from "./controllers/get-question-by-slug.controller";
import { EditQuestionController } from "./controllers/edit-question.controller";
import { EditQuestionUseCase } from "@/domain/forum/application/use-cases/edit-question/edit-question";
import { DeleteQuestionController } from "./controllers/delete-question.controller";
import { DeleteQuestionUseCase } from "@/domain/forum/application/use-cases/delete-question/delete-question";
import { AnswerQuestionController } from "./controllers/answer-question.controller";
import { AnswerQuestionUseCase } from "@/domain/forum/application/use-cases/answer-question/answer-question";
import { EditAnswerUseCase } from "@/domain/forum/application/use-cases/edit-answer/edit-answer";
import { EditAnswerController } from "./controllers/edit-answer.controller";

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
    EditAnswerController
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
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
    EditAnswerUseCase
  ]
})
export class HttpModule { }