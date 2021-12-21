import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthCredentialsDto {
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @IsNotEmpty()
  @ApiProperty()
  usernameOrEmail: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: "Password is too week" })
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
