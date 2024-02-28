import { IsDate, IsIn,IsInt, IsString, IsOptional, IsBoolean } from "class-validator";

export class CreateCartasGenDto {

    @IsOptional()
    @IsInt()
    cantidad_generada: number;

    @IsOptional()
    @IsString()
    nombre_archivo: string;

    @IsOptional()
    @IsBoolean()
    revisado: boolean;

    @IsOptional()
    @IsDate()
    fecha_creado: Date;

    @IsOptional()
    @IsDate()
    fecha_actualizacion: Date;

}
