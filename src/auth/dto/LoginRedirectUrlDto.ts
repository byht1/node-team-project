import { ApiProperty } from '@nestjs/swagger';

export class LoginRedirectUrlDto {
  @ApiProperty({ example: 'https://byht1.github.io/react-team-project?access_token=token' })
  redirectUrl: string;
}
