import { UnauthorizedException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2d from 'argon2';
import { UserInterface } from 'src/types/types';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    const passwordIsMatch = await argon2d.verify(user.password, password);
    if (user && passwordIsMatch) {
      return user;
    }
    throw new UnauthorizedException('Password is incorrect');
  }

  async login(user: UserInterface) {
    const { id, email } = user;
    return {
      id,
      email,
      token: this.jwtService.sign({ id: user.id, email: user.email }),
    };
  }
}
