import { Controller, Post, Body, UseFilters, UseInterceptors, HttpCode, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto'
import { AuthService } from './auth.service'
import { CreateUserValidationFilter } from '../common/filters/create-user-validation-exception.filter'
import { ResponseInterceptor } from '../common/interceptors/response.interceptor'
import { loginDto } from './dto/login.dto';
import { AuthGuard } from '../common/guards/auth/auth.guard';
import { RolesGuard } from '../common/guards/rbac/rbac.guard';
import { Roles } from '../common/decorators/roles.decorator';



@Controller('auth')
export class AuthController {

    constructor(private readonly AuthService: AuthService) { }

    @Post('signup')
@UseInterceptors(ResponseInterceptor)
    // @UseGuards(AuthGuard)
    // @Roles('superadmin')
    // @UseFilters(CreateUserValidationFilter)
    async signUp(@Body() createUserDto: CreateUserDto) {
        const result = await this.AuthService.signUp(createUserDto);
        return {
            message: 'Signup Successful',
            data: result,
        }
    }



    @Post('login')
    @HttpCode(201)
    async login(@Body() loginDto: loginDto) {
        const result = await this.AuthService.login(loginDto);
        return {
            statusCode: 201,
            message: "Login Successful",
            data: result
        }
    }

}
