
import { PartialType } from '@nestjs/swagger';
import { CreateUserDto, CreateUserDtoType } from './create-user.dto';



export class UpdateUserDto extends PartialType(CreateUserDto) {

}
