import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtPayload } from "./jwt.payload.interface";

export const GetUser = createParamDecorator((_date, ctx: ExecutionContext): JwtPayload => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});
