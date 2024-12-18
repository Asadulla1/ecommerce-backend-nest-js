import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userSignUpDto } from './dto/user_signUp.dto';
import { UserEntity } from './entities/user.entity';
import { userSignInDto } from './dto/user_signIn.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signUp')
  async signUp(@Body() userSignUpDto: userSignUpDto): Promise<UserEntity> {
    return await this.usersService.signUp(userSignUpDto);
  }

  @Post('signIn')
  async signIn(@Body() userSignInDto: userSignInDto) {
    const user = await this.usersService.signIn(userSignInDto);
    const accessToken = await this.usersService.accessToken(user);

    return { accessToken, user };
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // return this.usersService.create(createUserDto);
    return 'hi';
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
