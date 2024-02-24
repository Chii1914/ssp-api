import { IsDate, IsIn,IsInt, IsString, IsOptional } from "class-validator";

export class CreateCartasGenDto {

    @IsOptional()
    @IsInt()
    cantidad_generada: number;

    @IsOptional()
    @IsString()
    nombre_archivo: string;

    @IsOptional()
    @IsIn([0,1])
    revisado: number;

    @IsOptional()
    @IsDate()
    fecha_creado: Date;

    @IsOptional()
    @IsDate()
    fecha_actualizacion: Date;

}
