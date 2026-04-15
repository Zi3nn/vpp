import { IsString } from "class-validator";

export class CreateRoleDto {
    @IsString({ message :"nameRole phai la string"})
    nameRole :string
}
