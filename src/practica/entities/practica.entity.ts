import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { Horario } from "../../horario/entities/horario.entity";
  import { Alumno } from "../../alumno/entities/alumno.entity";
  import { Organismo } from "../../organismo/entities/organismo.entity";
  import { Supervisor } from "../../supervisor/entities/supervisor.entity";
  import { Evaluacione } from "../../evaluaciones/entities/evaluacione.entity";
  
  @Index(
    "idx_alumnoId_organismoId_supervisorId",
    ["alumnoId", "organismoId", "supervisorId"],
    { unique: true }
  )
  @Index("fk_practica_supervisor", ["supervisorId"], {})
  @Index("fk_practica_organismo", ["organismoId"], {})
  @Index("evaluacionId", ["evaluacionId"], {})
  @Entity("practica", { schema: "practica" })
  export class Practica {
    @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
    id: number;
  
    @Column("int", { name: "alumnoId", nullable: true, unsigned: true })
    alumnoId: number | null;
  
    @Column("int", { name: "organismoId", nullable: true, unsigned: true })
    organismoId: number | null;
  
    @Column("int", { name: "supervisorId", nullable: true, unsigned: true })
    supervisorId: number | null;
  
    @Column("int", { name: "evaluacionId", nullable: true, unsigned: true })
    evaluacionId: number | null;
  
    @Column("enum", { name: "ocasion", enum: ["Primera", "Segunda"] })
    ocasion: "Primera" | "Segunda";
  
    @Column("enum", {
      name: "estado",
      enum: ["Sin acción", "Aceptada", "Rechazada"],
      default: () => "'Sin acción'",
    })
    estado: "Sin acción" | "Aceptada" | "Rechazada";
  
    @Column("varchar", {
      name: "descripcion_estado",
      nullable: true,
      length: 100,
    })
    descripcionEstado: string | null;
  
    @Column("date", { name: "fecha_inicio" })
    fechaInicio: string;
  
    @Column("date", { name: "fecha_termino" })
    fechaTermino: string;
  
    @Column("varchar", { name: "descripcion", length: 900 })
    descripcion: string;
  
    @Column("int", { name: "horas_practica" })
    horasPractica: number;
  
    @Column("tinyint", { name: "homologacion" })
    homologacion: number;
  
    @Column("varchar", { name: "informe_pdf", nullable: true, length: 200 })
    informePdf: string | null;
  
    @Column("varchar", { name: "nombre_archivo", nullable: true, length: 100 })
    nombreArchivo: string | null;
  
    @Column("date", { name: "fecha_cambio_estado", nullable: true })
    fechaCambioEstado: string | null;
  
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
  
    @OneToMany(() => Horario, (horario) => horario.practica)
    horarios: Horario[];
  
    @ManyToOne(() => Alumno, (alumnos) => alumnos.practicas, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "alumnoId", referencedColumnName: "id" }])
    alumno: Alumno;
  
    @ManyToOne(() => Organismo, (organismo) => organismo.practicas, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "organismoId", referencedColumnName: "id" }])
    organismo: Organismo;
  
    @ManyToOne(() => Supervisor, (supervisor) => supervisor.practicas, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "supervisorId", referencedColumnName: "id" }])
    supervisor: Supervisor;
  
    @ManyToOne(() => Evaluacione, (evaluaciones) => evaluaciones.practicas, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "evaluacionId", referencedColumnName: "id" }])
    evaluacion: Evaluacione;
  }
  