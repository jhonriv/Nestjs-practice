import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(userObject: RegisterAuthDto) {
    const { password } = userObject;
    const textToHash = await hash(password, 10);
    userObject = { ...userObject, password: textToHash };
    return this.userModel.create(userObject);
  }

  async login(userObject: LoginAuthDto) {
    const { email, password } = userObject;
    const user = await this.userModel.findOne({ email });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    if (!(await compare(password, user.password)))
      throw new HttpException('Invalid credentials', HttpStatus.FORBIDDEN);

    const data = {
      user: { id: user._id, name: user.name, email: user.email },
      token: this.jwtService.sign({ id: user._id, email: user.email }),
    };

    return data;
  }
}
