import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { TokenSchema } from "./jwt.strategy";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const CurrentUser = createParamDecorator((_:unknown, context: ExecutionContext)=>{
  const request = context.switchToHttp().getRequest()

  return request.user as TokenSchema
})