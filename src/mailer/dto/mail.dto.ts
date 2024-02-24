import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EmailDto {
  @IsEmail()
  @IsNotEmpty()
  readonly to: string;

  @IsString()
  @IsNotEmpty()
  readonly subject: string;

  @IsString()
  @IsNotEmpty()
  readonly text: string;

  @IsString()
  @IsOptional()
  readonly html?: string;

  @IsString()
  @IsOptional()
  readonly cc?: string;

  @IsString()
  @IsOptional()
  readonly name_file?: string;

  @IsString()
  @IsOptional()
  readonly path_file?: string;
}