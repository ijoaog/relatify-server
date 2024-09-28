import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
// import { CreateUsuerDto } from './dto/create-usuer.dto';
// import { UpdateUsuerDto } from './dto/update-usuer.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() createUsuerDto: CreateUsuerDto) {
  //   return this.usersService.create(createUsuerDto);
  // }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @Get(':USER_NAME')
  findOne(@Param('USER_NAME') USER_NAME: string) {
    return this.usersService.findOne(USER_NAME);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUsuerDto: UpdateUsuerDto) {
  //   return this.usersService.update(+id, updateUsuerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
