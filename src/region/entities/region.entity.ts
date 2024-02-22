import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("region", { schema: "practica" })
export class Region {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", length: 50 })
  nombre: string;

  @Column("varchar", { name: "simbolo", length: 4 })
  simbolo: string;

  @Column("int", { name: "orden" })
  orden: number;
}
