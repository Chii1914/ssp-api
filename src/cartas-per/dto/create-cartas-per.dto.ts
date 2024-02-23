import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCartasPerDto {

    @IsString()
    readonly nombreSupervisor: string;

    @IsString()
    readonly organismo: string;

    @IsString()
    readonly nombreOrganismo: string;

    @IsString()
    readonly sexoSupervisor: string;

    @IsString()
    readonly divisionDepartamento: string;

    @IsString()
    readonly seccionUnidad: string;

}
