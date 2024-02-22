
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
  @Entity("carta_recomendacion_personalizada", { schema: "practica" })
  export class CartasPer {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;
  
    @Column("int", { name: "estudiante_id", unsigned: true })
    estudianteId: number;
  
    @Column("varchar", { name: "nombre_organismo", length: 100 })
    nombreOrganismo: string;
  
    @Column("varchar", { name: "nombre_supervisor", length: 50 })
    nombreSupervisor: string;
  
    @Column("varchar", { name: "sexo_supervisor", length: 20 })
    sexoSupervisor: string;
  
    @Column("varchar", { name: "cargo_supervisor", length: 50 })
    cargoSupervisor: string;
  
    @Column("varchar", { name: "division_departamento", length: 200 })
    divisionDepartamento: string;
  
    @Column("varchar", { name: "seccion_unidad", length: 100 })
    seccionUnidad: string;
  
    @Column("int", { name: "cantidad_generada", default: () => "'1'" })
    cantidadGenerada: number;
  
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
  
    @Column("varchar", { name: "nombre_archivo", nullable: true, length: 100 })
    nombreArchivo: string | null;
  
    @ManyToOne(
      () => Alumno,
      (alumnos) => alumnos.cartaRecomendacionPersonalizadas,
      { onDelete: "CASCADE", onUpdate: "CASCADE" }
    )
    @JoinColumn([{ name: "estudiante_id", referencedColumnName: "id" }])
    estudiante: Alumno;
  }
