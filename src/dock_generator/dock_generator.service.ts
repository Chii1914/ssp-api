import { Injectable } from '@nestjs/common';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class DockGeneratorService {

   crear_cg(data: Object) {
        fs.mkdir(path.join(__dirname, "..", "..", "public", "documentos", data['run'].toString()), { recursive: true }, (err) => { console.log(err) });
        const pathTemplate = path.join(__dirname, "..", "..", "public", "plantillas", "carta_generica_plantilla.docx");
        const outputPath = path.join(__dirname, "..", "..", "public", "documentos", data['run'].toString());
        const content = fs.readFileSync(path.resolve(pathTemplate), 'binary'); //De donde se lee la template 
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });
        doc.render({
            sede: data['sede'],
            dia:  data['dia'],
            mes: data['mes'],
            anio: data['anio'],
            extracto1: data['extracto1'],
            primer_nombre: data['primer_nombre'],
            segundo_nombre: data['segundo_nombre'],
            apellido_paterno: data['apellido_paterno'],
            apellido_materno: data['apellido_materno'],
            run: data['rut'],
            extracto2: data['extracto2'],
            extracto3: data['extracto3'],
            ultimo_sem_aprobado: data['ultimo_sem_aprobado'],
            nombre_firmante: data['nombre_firmante'],
            cargo_firmante: data['cargo_firmante'],
            firma_firmante: data['firma_firmante'],
            firma_sec: data['firma_sec'],
            extracto4: data['extracto4'],
            piepagina: data['piepagina'],
        });
        const buf = doc.getZip().generate({
            type: "nodebuffer", 
            compression: "DEFLATE",
        });
        fs.writeFileSync(path.resolve(path.resolve(outputPath), data['nombre_archivo']), buf);
    }

    crear_cp(data: Object) { 
        fs.mkdir(path.join(__dirname, "..", "..", "public", "documentos", data['run'].toString()), { recursive: true }, (err) => { console.log(err) });
        const pathTemplate = path.join(__dirname, "..", "..", "public", "plantillas", "carta_personalizada_plantilla.docx");
        const outputPath = path.join(__dirname, "..", "..", "public", "documentos", data['run'].toString()); 
        const content = fs.readFileSync(path.resolve(pathTemplate), 'binary'); //De donde se lee la template 
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });
        doc.render({
            sede: data['sede'],
            dia:  data['dia'],
            mes: data['mes'],
            anio: data['anio'],
            extracto1_supervisor: data['extracto1_supervisor'],
            nombre_supervisor: data['nombre_supervisor'],
            division_departamento: data['division_departamento'],
            seccion_unidad: data['seccion_unidad'],
            extracto2_supervisor: data['extracto2_supervisor'],
            extracto1_alumno: data['extracto1_alumno'],
            primer_nombre: data['primer_nombre'],
            segundo_nombre: data['segundo_nombre'],
            apellido_paterno: data['apellido_paterno'],
            apellido_materno: data['apellido_materno'],
            run: data['run'],
            df: data['df'],
            extracto2_alumno: data['extracto2_alumno'],
            extracto3_alumno: data['extracto3_alumno'],
            ultimo_sem_aprobado: data['ultimo_sem_aprobado'],
            nombre_firmante: data['nombre_firmante'],
            cargo_firmante: data['cargo_firmante'],
            firma_firmante: data['firma_firmante'],
            firma_sec: data['firma_sec'],
            extracto4: data['extracto4'],
            piepagina: data['piepagina'],
        });
        const buf = doc.getZip().generate({
            type: "nodebuffer", 
            compression: "DEFLATE",
        });
        fs.writeFileSync(path.resolve(path.resolve(outputPath), data['nombre_archivo']), buf);

    }

    //Sujeto a creación postulación práctica
    crear_postulacion(data: Object) {
        fs.mkdir(path.join(__dirname, "..", "..", "public", "documentos", data['run'].toString()), { recursive: true }, (err) => { console.log(err) });
        const pathTemplate = path.join(__dirname, "..", "..", "public", "plantillas", "postulacion_plantilla.docx");
        const outputPath = path.join(__dirname, "..", "..", "public", "documentos", data['run'].toString()); 
        const content = fs.readFileSync(path.resolve(pathTemplate), 'binary'); //De donde se lee la template 
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });
        doc.render({
            sede: data['sede'],
            dia:  data['dia'],
            mes: data['mes'],
            anio: data['anio'],
            extracto1_supervisor: data['extracto1_supervisor'],
            nombre_supervisor: data['nombre_supervisor'],
            division_departamento: data['division_departamento'],
            seccion_unidad: data['seccion_unidad'],
            extracto2_supervisor: data['extracto2_supervisor'],
            extracto1_alumno: data['extracto1_alumno'],
            primer_nombre: data['primer_nombre'],
            segundo_nombre: data['segundo_nombre'],
            apellido_paterno: data['apellido_paterno'],
            apellido_materno: data['apellido_materno'],
            run: data['run'],
            df: data['df'],
            extracto2_alumno: data['extracto2_alumno'],
            extracto3_alumno: data['extracto3_alumno'],
            ultimo_sem_aprobado: data['ultimo_sem_aprobado'],
            nombre_firmante: data['nombre_firmante'],
            cargo_firmante: data['cargo_firmante'],
            firma_firmante: data['firma_firmante'],
            firma_sec: data['firma_sec'],
            extracto4: data['extracto4'],
            piepagina: data['piepagina'],
        });
        const buf = doc.getZip().generate({
            type: "nodebuffer", 
            compression: "DEFLATE",
        });
        fs.writeFileSync(path.resolve(path.resolve(outputPath), data['nombre_archivo']), buf);
     }
}
