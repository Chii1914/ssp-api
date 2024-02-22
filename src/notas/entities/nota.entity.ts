import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Evaluacione } from "../../evaluaciones/entities/evaluacione.entity";

@Entity("notas", { schema: "practica" })
export class Nota {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "nota_uno", nullable: true, default: () => "'10'" })
  notaUno: number | null;

  @Column("int", { name: "nota_dos", nullable: true })
  notaDos: number | null;

  @Column("int", { name: "nota_tres", nullable: true })
  notaTres: number | null;

  @Column("int", { name: "nota_cuatro", nullable: true })
  notaCuatro: number | null;

  @Column("int", { name: "nota_cinco", nullable: true })
  notaCinco: number | null;

  @Column("int", { name: "nota_seis", nullable: true })
  notaSeis: number | null;

  @Column("int", { name: "nota_siete", nullable: true })
  notaSiete: number | null;

  @Column("int", { name: "nota_ocho", nullable: true })
  notaOcho: number | null;

  @Column("int", { name: "nota_nueve", nullable: true })
  notaNueve: number | null;

  @Column("int", { name: "nota_diez", nullable: true })
  notaDiez: number | null;

  @Column("int", { name: "nota_once", nullable: true })
  notaOnce: number | null;

  @Column("int", { name: "nota_doce", nullable: true })
  notaDoce: number | null;

  @Column("int", { name: "nota_trece", nullable: true })
  notaTrece: number | null;

  @Column("decimal", {
    name: "nota_promedio",
    nullable: true,
    precision: 2,
    scale: 1,
  })
  notaPromedio: string | null;

  @Column("varchar", {
    name: "supervisor_evaluador",
    nullable: true,
    length: 200,
  })
  supervisorEvaluador: string | null;

  @Column("varchar", {
    name: "supervisor_evaluador_correo",
    nullable: true,
    length: 200,
  })
  supervisorEvaluadorCorreo: string | null;

  @Column("varchar", { name: "observaciones", nullable: true, length: 910 })
  observaciones: string | null;

  @OneToMany(() => Evaluacione, (evaluaciones) => evaluaciones.notas)
  evaluaciones: Evaluacione[];
}
