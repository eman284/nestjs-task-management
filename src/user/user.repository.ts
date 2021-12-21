import { EntityRepository, Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UserSignupDto } from "./dto/user-signup.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userDto: UserSignupDto): Promise<void> {
    const { username, password, email, phone } = userDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ username, password: hashedPassword, email, phone });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === "23505")
        throw new ConflictException("Username already exit !");
      else
        throw new InternalServerErrorException();
    }
  }
}
