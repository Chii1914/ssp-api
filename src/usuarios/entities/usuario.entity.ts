import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("usuarios", { schema: "practica" })
export class Usuario {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "usuario", length: 55 })
  usuario: string;

  @Column("varchar", { name: "nombre", length: 55 })
  nombre: string;

  @Column("varchar", { name: "apellido", length: 55 })
  apellido: string;

  @Column("varchar", { name: "contrasena", length: 255 })
  contrasena: string;

  @Column("varchar", { name: "correo", length: 55 })
  correo: string;

  @Column("enum", { name: "sede", enum: ["Valparaíso", "Santiago"] })
  sede: "Valparaíso" | "Santiago";

  @Column("enum", { name: "tipo_usuario", enum: ["1", "2"] })
  tipoUsuario: "1" | "2";
}
