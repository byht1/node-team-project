import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';

interface IWorkDaySchedule {
  isOpen: boolean;
  from?: string;
  to?: string;
}

export type FriendDocument = Friend & Document;

@Schema()
export class Friend {
  @ApiProperty({ example: '63ed3f54220356e340b78d1d' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: "Притулок для бездомних тварин 'Сіріус'" })
  @Prop()
  title: string;

  @ApiProperty({ example: 'site url' })
  @Prop()
  url: string;

  @ApiProperty({ example: 'address url' })
  @Prop()
  addressUrl: string;

  @ApiProperty({ example: 'image url' })
  @Prop()
  imageUrl: string;

  @ApiProperty({ example: 'Fedorivka, Kyiv Oblast, Ukraine, 07372' })
  @Prop()
  address: string;

  @ApiProperty({
    example: [
      {
        isOpen: true,
        from: '11:00',
        to: '16:00',
      },
    ],
  })
  @Prop()
  workDays: IWorkDaySchedule[];

  @ApiProperty({ example: '+380931934069' })
  @Prop()
  phone: string;

  @ApiProperty({ example: 'friend@gmail.com' })
  @Prop()
  email: string;
}

export const FriendSchema = SchemaFactory.createForClass(Friend);
