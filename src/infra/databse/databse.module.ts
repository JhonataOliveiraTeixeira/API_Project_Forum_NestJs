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

@Module({
  providers:[PrismaService,
            PrismaAnswerAttachmentRepository,
            PrismaAnswerComentRepository,
            PrismaAnswerRepository,
            PrismaQuestionAttachmentRepository,
            PrismaQuestionAttachmentRepository,
            PrismaQuestionComent,
            {
              provide: QuestionsRepository,
              useClass: PrismaQuestionRespository 
            },
            {
              provide: StudentRepository,
              useClass: PrismaStudentRespository
            }
      ],
  exports:[PrismaService,
    PrismaAnswerAttachmentRepository,
    PrismaAnswerComentRepository,
    PrismaAnswerRepository,
    PrismaQuestionAttachmentRepository,
    PrismaQuestionAttachmentRepository,
    PrismaQuestionComent,
    QuestionsRepository,
    StudentRepository
  ]
})
export class DatabaseModule{}