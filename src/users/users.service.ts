import { userSignInDto } from './dto/user_signIn.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { userSignUpDto } from './dto/user_signUp.dto';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }
  async accessToken(user: UserEntity): Promise<string> {
    return sign(
      { id: user.user_id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME },
    );
  }
  async signUp(userSignUpDto: userSignUpDto): Promise<UserEntity> {
    const userExist = await this.findUserByEmail(userSignUpDto.email);
    if (userExist) throw new BadRequestException('Email is not Available');

    // Hash the password of the userSignUp instance
    userSignUpDto.password = await hash(userSignUpDto.password, 5);

    let user = this.usersRepository.create(userSignUpDto);
    user = await this.usersRepository.save(user);
    delete user.password;
    return user;
  }

  async signIn(userSignInDto: userSignInDto): Promise<UserEntity> {
    const userExist = await this.usersRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', { email: userSignInDto.email })
      .getOne();
    if (!userExist) throw new BadRequestException('User is not Registered');
    const matchPassword = await compare(
      userSignInDto.password,
      userExist.password,
    );
    if (!matchPassword) throw new BadRequestException('Password Mismatched');
    return userExist;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
