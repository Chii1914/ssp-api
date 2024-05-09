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
            dia: data['dia'],
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
            dia: data['dia'],
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
        // Create directory path
        const outputDir = path.join(__dirname, "..", "..", "public", "documentos", data['run'].toString());
        fs.mkdirSync(outputDir, { recursive: true });

        // Read the Word template
        const templatePath = path.join(__dirname, "..", "..", "public", "plantillas", "postulacion_plantilla.docx");
        const templateContent = fs.readFileSync(path.resolve(templatePath), 'binary');
        const zip = new PizZip(templateContent);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        // Render the template with data
        doc.render({
            dia: data['dia'],
            mes: data['mes'],
            anio: data['anio'],
            primer_nombre: data['primer_nombre'],
            segundo_nombre: data['segundo_nombre'],
            apellido_paterno: data['apellido_paterno'],
            apellido_materno: data['apellido_materno'],
            run: data['run'],
            df: data['df'],
            telefono: data['telefono'],
            correo_institucional: data['correo_institucional'],
            correo_personal: data['correo_personal'],
            sede: data['sede'],
            practica: data['practica'],
            anio_ingreso: data['anio_ingreso'],
            ultimo_sem_aprobado: data['ultimo_sem_aprobado'],
            homologacion: data['homologacion'],
            nombre_organismo: data['nombre_organismo'],
            direccion_organismo: data['direccion_organismo'],
            division_departamento: data['division_departamento'],
            seccion_unidad: data['seccion_unidad'],
            nombre_supervisor: data['nombre_supervisor'],
            cargo_supervisor: data['cargo_supervisor'],
            correo_supervisor: data['correo_supervisor'],
            fecha_inicio: data['fecha_inicio'],
            fecha_termino: data['fecha_termino'],
            hora_lunes_manana_entrada: data['hora_lunes_manana_entrada'],
            hora_lunes_manana_salida: data['hora_lunes_manana_salida'],
            hora_lunes_tarde_entrada: data['hora_lunes_tarde_entrada'],
            hora_lunes_tarde_salida: data['hora_lunes_tarde_salida'],
            total_horas_lunes: data['total_horas_lunes'],
            hora_martes_manana_entrada: data['hora_martes_manana_entrada'],
            hora_martes_manana_salida: data['hora_martes_manana_salida'],
            hora_martes_tarde_entrada: data['hora_martes_tarde_entrada'],
            hora_martes_tarde_salida: data['hora_martes_tarde_salida'],
            total_horas_martes: data['total_horas_martes'],
            hora_miercoles_manana_entrada: data['hora_miercoles_manana_entrada'],
            hora_miercoles_manana_salida: data['hora_miercoles_manana_salida'],
            hora_miercoles_tarde_entrada: data['hora_miercoles_tarde_entrada'],
            hora_miercoles_tarde_salida: data['hora_miercoles_tarde_salida'],
            total_horas_miercoles: data['total_horas_miercoles'],
            hora_jueves_manana_entrada: data['hora_jueves_manana_entrada'],
            hora_jueves_manana_salida: data['hora_jueves_manana_salida'],
            hora_jueves_tarde_entrada: data['hora_jueves_tarde_entrada'],
            hora_jueves_tarde_salida: data['hora_jueves_tarde_salida'],
            total_horas_jueves: data['total_horas_jueves'],
            hora_viernes_manana_entrada: data['hora_viernes_manana_entrada'],
            hora_viernes_manana_salida: data['hora_viernes_manana_salida'],
            hora_viernes_tarde_entrada: data['hora_viernes_tarde_entrada'],
            hora_viernes_tarde_salida: data['hora_viernes_tarde_salida'],
            total_horas_viernes: data['total_horas_viernes'],
            total_horas_semanales: data['total_horas_semanales'],
            descripcion: data['descripcion'],
            piepagina: data['piepagina'],
        });

        // Generate the Word document buffer
        const buf = doc.getZip().generate({
            type: "nodebuffer",
            compression: "DEFLATE",
        });

        // Ensure the filename is unique
        let contador = 0;
        let nomArchivo = data['nombre_archivo'] || `${data['run']}-postulacion(${data['practica']}).docx`;
        let enlace = path.join(outputDir, nomArchivo);

        while (fs.existsSync(enlace)) {
            contador++;
            nomArchivo = `${data['run']}-postulacion-${contador}-(${data['practica']}).docx`;
            enlace = path.join(outputDir, nomArchivo);
        }
    
        
        // Write the file to the output path
        fs.writeFileSync(enlace, buf);
        return nomArchivo;
    }
}
