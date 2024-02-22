import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Practica } from "../../practica/entities/practica.entity";

@Entity("organismo", { schema: "practica" })
export class Organismo {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "nombre_organismo", length: 100 })
  nombreOrganismo: string;

  @Column("varchar", { name: "direccion", length: 100 })
  direccion: string;

  @Column("varchar", { name: "regionId", nullable: true, length: 10 })
  regionId: string | null;

  @Column("varchar", { name: "otraRegion", nullable: true, length: 50 })
  otraRegion: string | null;

  @Column("varchar", { name: "comunaId", nullable: true, length: 10 })
  comunaId: string | null;

  @Column("varchar", { name: "otraComuna", nullable: true, length: 50 })
  otraComuna: string | null;

  @Column("varchar", { name: "telefono", length: 20 })
  telefono: string;

  @Column("varchar", { name: "division_departamento", length: 100 })
  divisionDepartamento: string;

  @Column("varchar", { name: "seccion_unidad", length: 100 })
  seccionUnidad: string;

  @OneToMany(() => Practica, (practica) => practica.organismo)
  practicas: Practica[];
}
