import { ApiProperty } from '@nestjs/swagger';
import { CategoryNotices } from 'src/global/enum/categoryNotices';

export class NoticeSwagger {
  @ApiProperty({
    description: 'Information about the user who created the notification',
    example: {
      _id: '611e270507081715c89c10e1',
      email: 'user@example.com',
      phone: '+1234567890',
    },
  })
  owner: {
    _id: string;
    email: string;
    phone: string;
  };

  @ApiProperty({
    example: 'Сute dog looking for a home',
  })
  title: string;

  @ApiProperty({
    example: 'Rich',
    required: false,
  })
  name: string;

  @ApiProperty({
    example: "['https://api.multiavatar.com/User.png', ...]",
    required: false,
  })
  imgUrl: string[];

  @ApiProperty({
    example: '01.01.2023',
    required: false,
  })
  birthday: string;

  @ApiProperty({
    example: 'Dog',
    required: false,
  })
  petType: string;

  @ApiProperty({
    example: 'Pomeranian',
    required: false,
  })
  breed: string;

  @ApiProperty({
    example: 'Lviv',
    required: false,
  })
  location: string;

  @ApiProperty({
    example: 'male',
    required: false,
  })
  sex: string;

  @ApiProperty({
    example: '150',
  })
  price: string;

  @ApiProperty({
    example: 'in good hands',
  })
  category: CategoryNotices;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur  Lorem ipsum dolor sit amet, consectetur Lorem',
  })
  comments: string;
}
