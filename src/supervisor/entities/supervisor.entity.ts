import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Practica } from "../../practica/entities/practica.entity";

@Entity("supervisor", { schema: "practica" })
export class Supervisor {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "nombre", length: 100 })
  nombre: string;

  @Column("varchar", { name: "cargo", length: 100 })
  cargo: string;

  @Column("varchar", { name: "correo", length: 100 })
  correo: string;

  @OneToMany(() => Practica, (practica) => practica.supervisor)
  practicas: Practica[];
}
