import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAlumnoDto {

    @IsOptional()
    @IsNumber()
    run: number;

    @IsOptional()
    @IsString()
    df: string;

    @IsOptional()
    @IsString()
    contrasena: string;

    @IsOptional()
    @IsString()
    primerNombre: string;

    @IsOptional()
    @IsString()
    segundoNombre: string;

    @IsOptional()
    @IsString()
    apellidoPaterno: string;

    @IsOptional()
    @IsString()
    apellidoMaterno: string;

    @IsOptional()
    @IsString()
    correoPersonal: string;

    @IsOptional()
    @IsString()
    correoInstitucional: string;

    @IsOptional()
    @IsString()
    telefono: string;

    @IsOptional()
    @IsString()
    ultimoSemAprobado: string;

    @IsOptional()
    @IsEnum(["Valparaíso", "Santiago"])
    sede: "Valparaíso" | "Santiago";

    @IsOptional()
    @IsNumber()
    anioIngreso: number;
    
    @IsOptional()
    @IsEnum(["masculino", "femenino"])
    sexo: "masculino" | "femenino";

    
    
}
