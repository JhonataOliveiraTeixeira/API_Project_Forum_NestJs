/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaAnswerAttachmentRepository } from "./prisma/repositories/prisma-answer-attachment-repository";
import { PrismaAnswerComentRepository } from "./prisma/repositories/prisma-answer-coment-repository";
import { PrismaAnswerRepository } from "./prisma/repositories/prisma-answer-repository";
import { PrismaQuestionAttachmentRepository } from "./prisma/repositories/prisma-question-attachemnt-repository";
import { PrismaQuestionComent } from "./prisma/repositories/prisma-question-coment-respository";
import { PrismaQuestionRespository } from "./prisma/repositories/prisma-question-repository";

@Module({
  providers:[PrismaService,
            PrismaAnswerAttachmentRepository,
            PrismaAnswerComentRepository,
            PrismaAnswerRepository,
            PrismaQuestionAttachmentRepository,
            PrismaQuestionAttachmentRepository,
            PrismaQuestionComent,
            PrismaQuestionRespository
      ],
  exports:[PrismaService,
    PrismaAnswerAttachmentRepository,
    PrismaAnswerComentRepository,
    PrismaAnswerRepository,
    PrismaQuestionAttachmentRepository,
    PrismaQuestionAttachmentRepository,
    PrismaQuestionComent,
    PrismaQuestionRespository]
})
export class DatabaseModule{}