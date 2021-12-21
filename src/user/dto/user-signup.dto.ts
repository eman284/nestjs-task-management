import { AuthCredentialsDto } from "../../auth/auth-credentials.dto";
import { IsEmail, IsNotEmpty, IsNumberString, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty, PickType } from "@nestjs/swagger";

// PickType allow to pick some keys from the extended class
// OmitType allow to omit some keys from the extended class
export class UserSignupDto extends PickType(AuthCredentialsDto, ["password"]) {
  @IsEmail()
  @MinLength(10)
  @MaxLength(50)
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  @ApiProperty()
  username: string;


  @IsNumberString()
  @MinLength(11)
  @MaxLength(20)
  @IsNotEmpty()
  @ApiProperty()
  phone: string;

}
