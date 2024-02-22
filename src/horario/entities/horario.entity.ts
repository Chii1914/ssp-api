import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { Practica } from "../../practica/entities/practica.entity";
  
  @Index("idx_practicaId_dia", ["practicaId", "dia"], { unique: true })
  @Entity("horario", { schema: "practica" })
  export class Horario {
    @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
    id: number;
  
    @Column("int", { name: "practicaId", nullable: true, unsigned: true })
    practicaId: number | null;
  
    @Column("enum", {
      name: "dia",
      enum: [
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
        "Domingo",
      ],
    })
    dia:
      | "Lunes"
      | "Martes"
      | "Miercoles"
      | "Jueves"
      | "Viernes"
      | "Sabado"
      | "Domingo";
  
    @Column("time", { name: "hora_manana_entrada", nullable: true })
    horaMananaEntrada: string | null;
  
    @Column("time", { name: "hora_manana_salida", nullable: true })
    horaMananaSalida: string | null;
  
    @Column("time", { name: "hora_tarde_entrada", nullable: true })
    horaTardeEntrada: string | null;
  
    @Column("time", { name: "hora_tarde_salida", nullable: true })
    horaTardeSalida: string | null;
  
    @ManyToOne(() => Practica, (practica) => practica.horarios, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "practicaId", referencedColumnName: "id" }])
    practica: Practica;
  }
  