import { ApiProperty } from "@nestjs/swagger";

export class CreatePetSchema {
    @ApiProperty({ example: 'Jack', description: 'Pet name' })
    readonly name: string;

    @ApiProperty({example: '22.04.2018', description: 'Pet\'s date of birth in \'dd.mm.yyyy\' format'})
    readonly birth: string;

    @ApiProperty({example: 'Persian cat', description: 'Pet breed'})
    readonly breed: string;

    @ApiProperty({example: 'my-pet.jpg', description: 'Pet photo'})
    readonly image: any;
    
    @ApiProperty({
        example: 'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem',
        description: 'Pet description'
    })
    readonly comments: string;
}