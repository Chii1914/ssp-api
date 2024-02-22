import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { Alumno } from "../../alumno/entities/alumno.entity";
  
  @Index("estudiante_id", ["estudianteId"], {})
  @Entity("carta_recomendacion_generica", { schema: "practica" })
  export class CartasGen {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;
  
    @Column("int", { name: "estudiante_id", unsigned: true })
    estudianteId: number;
  
    @Column("int", { name: "cantidad_generada" })
    cantidadGenerada: number;
  
    @Column("varchar", { name: "nombre_archivo", nullable: true, length: 100 })
    nombreArchivo: string | null;
  
    @Column("tinyint", { name: "revisado", width: 1, default: () => "'0'" })
    revisado: boolean;
  
    @Column("timestamp", {
      name: "fecha_creado",
      default: () => "CURRENT_TIMESTAMP",
    })
    fechaCreado: Date;
  
    @Column("timestamp", {
      name: "fecha_actualizacion",
      default: () => "CURRENT_TIMESTAMP",
    })
    fechaActualizacion: Date;
  
    @ManyToOne(() => Alumno, (alumnos) => alumnos.cartaRecomendacionGenericas, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "estudiante_id", referencedColumnName: "id" }])
    estudiante: Alumno;
  }
  