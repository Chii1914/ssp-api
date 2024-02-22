import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("firmas", { schema: "practica" })
export class Firma {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "nombre_firmante", length: 55 })
  nombreFirmante: string;

  @Column("varchar", { name: "vocativo", length: 55 })
  vocativo: string;

  @Column("varchar", { name: "firma_sec", length: 50 })
  firmaSec: string;

  @Column("varchar", { name: "cargo", length: 100 })
  cargo: string;

  @Column("enum", { name: "sede", enum: ["Valparaíso", "Santiago"] })
  sede: "Valparaíso" | "Santiago";
}
