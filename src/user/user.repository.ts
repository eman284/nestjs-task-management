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
    // where ==> [{}] ==> conditions with OR
    // where ==> {} ==> conditions with AND
    const existingUsers = await this.find({ where: [{ username }, { email }, { phone }] });
    if (existingUsers?.length) {
      const errors = [];
      if (existingUsers.some(user => user.username === username)) {
        errors.push("username");
      }
      if (existingUsers.some(user => user.email === email)) {
        errors.push("email");
      }
      if (existingUsers.some(user => user.phone === phone)) {
        errors.push("phone");
      }
      throw new ConflictException(`${errors.join(", ")} already exit !`);
    }

    const user = this.create({ username, password: hashedPassword, email, phone });

    try {
      await this.save(user);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
