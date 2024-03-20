import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_id_id_region", ["id", "idRegion"], { unique: true })
@Entity("comuna", { schema: "practica" })
export class Comuna {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", length: 70 })
  nombre: string;

  @Column("int", { name: "id_region" })
  idRegion: number;
}
