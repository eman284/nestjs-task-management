import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "../user/user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDto } from "./auth-credentials.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt.payload.interface";
import { UserSignupDto } from "../user/dto/user-signup.dto";
import { TokenModel } from "./token.model";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {
  }

  async signUp(userDto: UserSignupDto): Promise<void> {
    return this.userRepository.createUser(userDto);
  }

  async signIn(authCredentialDto: AuthCredentialsDto): Promise<TokenModel> {
    const { usernameOrEmail, password } = authCredentialDto;
    const user = await this.userRepository.findOne({ where: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
    if (user && await bcrypt.compare(password, user.password)) {
      const payload: JwtPayload = { username: user.username, id: user.id };
      return { access_token: this.jwtService.sign(payload) };
    } else {
      throw new UnauthorizedException("Please check your login credentials");
    }
  }
}
