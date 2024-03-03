import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { CartasGen } from "../../cartas-gen/entities/cartas-gen.entity";
  import { CartasPer } from "../../cartas-per/entities/cartas-per.entity";
  import { Practica } from "../../practica/entities/practica.entity";
  
  @Index("idx_id_run", ["id", "run"], { unique: true })
  @Entity("alumnos", { schema: "practica" })
  export class Alumno {
    @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
    id: number;
  
    @Column("int", { name: "run" })
    run: number | null;
  
    @Column("char", { name: "df", length: 1 })
    df: string | null;
  
    @Column("varchar", { name: "contrasena", length: 100 })
    contrasena: string | null;
  
    @Column("varchar", { name: "primer_nombre", length: 55 })
    primerNombre: string | null;
  
    @Column("varchar", { name: "segundo_nombre", length: 55 })
    segundoNombre: string | null;
  
    @Column("varchar", { name: "apellido_paterno", length: 55 })
    apellidoPaterno: string | null;
  
    @Column("varchar", { name: "apellido_materno", length: 55 })
    apellidoMaterno: string | null;
  
    @Column("varchar", { name: "correo_personal", nullable: true, length: 55 })
    correoPersonal: string | null;
  
    @Column("varchar", { name: "correo_institucional", length: 55 })
    correoInstitucional: string | null;
  
    @Column("varchar", { name: "telefono", nullable: true, length: 20 })
    telefono: string | null;
  
    @Column("varchar", { name: "ultimo_sem_aprobado", length: 20 })
    ultimoSemAprobado: string | null;
  
    @Column("enum", { name: "sede", enum: ["Valparaíso", "Santiago"] })
    sede: "Valparaíso" | "Santiago" | null;
  
    @Column("int", { name: "anio_ingreso" })
    anioIngreso: number | null;
  
    @Column("enum", { name: "sexo", enum: ["masculino", "femenino"] })
    sexo: "masculino" | "femenino" | null;
  
    @OneToMany(
      () => CartasGen,
      (cartaRecomendacionGenerica) => cartaRecomendacionGenerica.estudiante
    )
    cartaRecomendacionGenericas: CartasGen[];
  
    @OneToMany(
      () => CartasPer,
      (cartaRecomendacionPersonalizada) =>
        cartaRecomendacionPersonalizada.estudiante
    )
    cartaRecomendacionPersonalizadas: CartasPer[];
  
    @OneToMany(() => Practica, (practica) => practica.alumno)
    practicas: Practica[];
  }
  