import { Controller, Get, Post, Req, Delete, Param, ParseIntPipe, Patch, Body } from '@nestjs/common';
import { AppService } from '../app.service';
import { UsersService } from './users.service'

@Controller()
export class UsersController {

    constructor(private readonly UsersService: UsersService) { }

    @Post("user")
    addUser(@Req() req: Request) {
        console.log(req.body);

        return this.UsersService.addUser(req.body);
    };

    @Get("user")
    getUsers() {
        return this.UsersService.getUsers();
    }

    @Patch("user/:id")
    updateUsers(@Body() body: any, @Param("id", ParseIntPipe) id: number) {
        return this.UsersService.updateUsers(body, id)
    }

    @Delete("user/:id")
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.UsersService.deleteUsers(id);
    }





}
