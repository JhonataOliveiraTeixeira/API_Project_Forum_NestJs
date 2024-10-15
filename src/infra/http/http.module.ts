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

@Module({
  imports:[DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers:[CreateQuestionUseCase,
    FetchRecenteQuestionUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase
  ]
})
export class HttpModule{}