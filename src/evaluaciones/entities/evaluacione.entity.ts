import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { Nota } from "../../notas/entities/nota.entity";
  import { Practica } from "../../practica/entities/practica.entity";
  
  @Index("notasId", ["notasId"], {})
  @Entity("evaluaciones", { schema: "practica" })
  export class Evaluacione {
    @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
    id: number;
  
    @Column("int", { name: "notasId", unsigned: true })
    notasId: number;
  
    @Column("enum", {
      name: "evaluacion",
      enum: ["Sin Acción", "Aprobada", "Reprobada"],
    })
    evaluacion: "Sin Acción" | "Aprobada" | "Reprobada";
  
    @Column("date", { name: "fecha_evaluacion" })
    fechaEvaluacion: string;
  
    @Column("timestamp", {
      name: "fecha_actualizacion",
      default: () => "CURRENT_TIMESTAMP",
    })
    fechaActualizacion: Date;
  
    @ManyToOne(() => Nota, (notas) => notas.evaluaciones, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "notasId", referencedColumnName: "id" }])
    notas: Nota;
  
    @OneToMany(() => Practica, (practica) => practica.evaluacion)
    practicas: Practica[];
  }
  