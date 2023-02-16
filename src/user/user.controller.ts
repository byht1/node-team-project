import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('test')
  test() {
    return this.userService.removeNoticeFromFavorite('63ed62b5c19e964d34ac9fae', '63ecf30a25d33bae0cd89451');
  }
}
