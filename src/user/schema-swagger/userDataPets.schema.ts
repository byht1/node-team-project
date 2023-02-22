import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class UserDataPets {
  @ApiProperty({ name: '_id', example: '6373c0bca5a6e4c9556f1e7a' })
  _id: ObjectId;

  @ApiProperty({ example: 'test@gmail.com' })
  email: string;

  @ApiProperty({ example: 'James Allen' })
  name: string;

  @ApiProperty({ example: '+380964752260' })
  phone: string;

  @ApiProperty({
    example: false,
  })
  verify: boolean;

  @ApiProperty({
    example: 'https://api.multiavatar.com/1.png',
  })
  photo: string;

  @ApiProperty({
    example: [
      {
        _id: '63f139e997fc630d8da1ff68',
        name: 'Jack',
        birth: '22.04.2018',
        breed: 'Persian cat',
        image: 'https://api.multiavatar.com/pet.png',
        comments:
          'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem',
        owner: '63f37a8cbf6f72e7f1b27ba3',
      },
    ],
  })
  cards: {
    _id: '63f139e997fc630d8da1ff68';
    name: 'Jack';
    birth: '22.04.2018';
    breed: 'Persian cat';
    image: 'https://api.multiavatar.com/pet.png';
    comments: 'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem';
    owner: '63f37a8cbf6f72e7f1b27ba3';
  }[];

  @ApiProperty({
    example: '20.08.1999',
  })
  birthday: string;
}
