/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaAnswerAttachmentRepository } from "./prisma/repositories/prisma-answer-attachment-repository";
import { PrismaAnswerComentRepository } from "./prisma/repositories/prisma-answer-coment-repository";
import { PrismaAnswerRepository } from "./prisma/repositories/prisma-answer-repository";
import { PrismaQuestionAttachmentRepository } from "./prisma/repositories/prisma-question-attachemnt-repository";
import { PrismaQuestionComent } from "./prisma/repositories/prisma-question-coment-respository";
import { PrismaQuestionRespository } from "./prisma/repositories/prisma-question-repository";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { StudentRepository } from "@/domain/forum/application/repositories/student-repository";
import { PrismaStudentRespository } from "./prisma/repositories/prisma-student-repository";
import { AnswerAttachmentRepository } from "@/domain/forum/application/repositories/answer-attachment-repository";
import { AnswerRepository } from "@/domain/forum/application/repositories/answres-repository";
import { QuestionAttachmentRepository } from "@/domain/forum/application/repositories/question-attachment-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";
import { AnswerCommentRepository } from "@/domain/forum/application/repositories/answer-comment-repository";

@Module({
  providers: [PrismaService,
    {
      provide: AnswerAttachmentRepository,
      useClass: PrismaAnswerAttachmentRepository,

    },
    {
      provide: AnswerCommentRepository,
      useClass: PrismaAnswerComentRepository,

    },
    {
      provide: AnswerRepository,
      useClass: PrismaAnswerRepository,

    },
    {
      provide: QuestionAttachmentRepository,
      useClass: PrismaQuestionAttachmentRepository,

    },
    {
      provide: QuestionAttachmentRepository,
      useClass: PrismaQuestionAttachmentRepository,

    },
    {
      provide: QuestionComment,
      useClass: PrismaQuestionComent,

    },
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionRespository
    },
    {
      provide: StudentRepository,
      useClass: PrismaStudentRespository
    }
  ],
  exports: [PrismaService,
    AnswerAttachmentRepository,
    AnswerCommentRepository,
    AnswerRepository,
    QuestionAttachmentRepository,
    QuestionAttachmentRepository,
    QuestionComment,
    QuestionsRepository,
    StudentRepository
  ]
})
export class DatabaseModule { }