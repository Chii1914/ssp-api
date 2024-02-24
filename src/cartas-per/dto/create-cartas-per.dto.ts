import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCartasPerDto {

    @IsOptional()
    @IsString()
    readonly nombreArchivo: string;

    @IsString()
    readonly nombreSupervisor: string;

    @IsString()
    readonly cargoSupervisor: string;

    @IsString()
    readonly nombreOrganismo: string;

    @IsString()
    readonly sexoSupervisor: string;

    @IsString()
    readonly divisionDepartamento: string;

    @IsString()
    readonly seccionUnidad: string;

}
