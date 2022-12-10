import { ApiProperty } from '@nestjs/swagger';

export type CreateUserDtoType = {
    email: string
    name: string
}

export class CreateUserDto {
    
    @ApiProperty()
    email: string

    @ApiProperty()
    name: string
}
