import { ApiProperty } from '@nestjs/swagger';
import { CategoryNotices } from 'src/global/enum/categoryNotices';

export class CreateNoticeSchema {
  @ApiProperty({ example: 'Сute dog looking for a home' })
  readonly title: string;

  @ApiProperty({
    example: 'Dog',
    required: false,
  })
  readonly petType: string;

  @ApiProperty({
    example: 'Rich',
    required: false,
  })
  readonly name: string;

  @ApiProperty({
    example: '2020-08-31',
    required: false,
  })
  readonly birthday: string;

  @ApiProperty({
    example: 'Pomeranian',
    required: false,
  })
  readonly bread: string;

  @ApiProperty({
    example: 'Lviv',
    required: false,
  })
  readonly location: string;

  @ApiProperty({
    description: "One of 'male', 'female' ",
    example: 'male',
    required: false,
  })
  readonly sex: string;

  @ApiProperty({
    example: '150',
  })
  readonly price: string;

  @ApiProperty({
    description: "One of 'sell', 'lost/found', 'in good hands'",
    example: 'in good hands',
  })
  readonly category: CategoryNotices;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur  Lorem ipsum dolor sit amet, consectetur Lorem',
  })
  readonly comments: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
      example: "['https://team-project-react-node.s3.amazonaws.com/image/3f0cd17f-d25f-491a-8cce-00bf993edc5f.jpg']",
    },

    required: false,
  })
  readonly picture: string[];
}
