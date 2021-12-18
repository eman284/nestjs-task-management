import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDto } from "./auth-credentials.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt.payload.interface";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository:UserRepository,
    private jwtService:JwtService
  ){
    bcrypt
  }

  async signUp(authCredentialDto:AuthCredentialsDto):Promise<void>{
    return this.userRepository.createUser(authCredentialDto);
  }

  async signIn(authCredentialDto:AuthCredentialsDto):Promise<{accsessToken:string}>{
    const {username,password} = authCredentialDto;
    const user = await this.userRepository.findOne({username});

    if (user && await bcrypt.compare(password,user.password)){
      const payload: JwtPayload = {username};
      const accsessToken:string = await this.jwtService.sign(payload);
      return {accsessToken};
    }
    else{
      throw new UnauthorizedException('Please check your login credentials')
    }
  }
}
