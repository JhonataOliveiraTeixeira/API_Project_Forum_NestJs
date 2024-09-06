import {
  Body,
  Controller, Post,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { TokenSchema } from 'src/auth/jwt.strategy'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const createQuestionBodBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateQuestionBodBodySchema = z.infer<typeof createQuestionBodBodySchema>

@Controller('/questions')
@UseGuards(AuthGuard('jwt'))
export class CreateQuestionController {

  constructor( private prisma: PrismaService) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createQuestionBodBodySchema)) body: CreateQuestionBodBodySchema,
    @CurrentUser() user: TokenSchema) {
    
      const {title, content} = body

      await this.prisma.question.create({
        data:{
          authorId: user.sub,
          title,
          content,
          slug: title
        }
      })
    
  }
}
