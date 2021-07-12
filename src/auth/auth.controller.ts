import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthCredentialDTO } from './dtos/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  async getUsers() {
    return this.authService.getUsers();
  }

  @Post('/signUp')
  async signUp(@Body() authCredentialDTO: AuthCredentialDTO) {
    return this.authService.signUp(authCredentialDTO);
  }

  @Post('/signIn')
  async signIn(
    @Body() authCredentialDTO: AuthCredentialDTO,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialDTO);
  }
}
