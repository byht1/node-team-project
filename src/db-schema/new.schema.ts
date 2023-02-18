import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';

export type NewDocument = New & Document;

@Schema()
export class New {
    @ApiProperty({example: '63ecd2b5220356e340b77cf4'})
    _id: mongoose.Schema.Types.ObjectId;

    @ApiProperty({example: 'В День ветеринара в столиці пройде безкоштовний тренінг'})
    @Prop()
    title: string;

    @ApiProperty({example: 'https://ukr.media/animals/446231/'})
    @Prop()
    url: string;

    @ApiProperty({example: 'В неділю, 14 серпня, в Тимчасовому притулку для тварин «ВДНГ» пройде тренінг.'})
    @Prop()
    description: string;

    @ApiProperty({example: '2022-08-14'})
    @Prop()
    date: string;
}

export const NewSchema = SchemaFactory.createForClass(New)