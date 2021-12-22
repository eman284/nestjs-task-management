import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./auth-credentials.dto";
import { ApiTags } from "@nestjs/swagger";
import { UserSignupDto } from "../user/dto/user-signup.dto";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post("/signup")
  signUp(@Body() userDto: UserSignupDto): Promise<void> {
    return this.authService.signUp(userDto);
  }

  @Post("/signin")
  signIn(@Body() authCredentialDto: AuthCredentialsDto) {
    return this.authService.signIn(authCredentialDto);
  }
}

