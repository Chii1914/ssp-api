import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Res } from '@nestjs/common';
import { CartasPerService } from './cartas-per.service';
import { CreateCartasPerDto } from './dto/create-cartas-per.dto';
import { UpdateCartasPerDto } from './dto/update-cartas-per.dto';
import { Response } from 'express';
import { FilesService } from 'src/files/files.service';

@Controller('cartas-per')
export class CartasPerController {
  constructor(private readonly cartasPerService: CartasPerService, private readonly filesService: FilesService) {}

  @Post(':rut')
  createByRut(@Param('rut') rut: number, @Body() createCartasGenDto: CreateCartasPerDto) {
    const {nombreOrganismo, nombreSupervisor, cargoSupervisor, sexoSupervisor, divisionDepartamento, seccionUnidad } = createCartasGenDto;
    return this.cartasPerService.createById(
      nombreOrganismo,
      nombreSupervisor,
      cargoSupervisor,
      sexoSupervisor,
      divisionDepartamento,
      seccionUnidad,
      rut,
      createCartasGenDto
    );
  }


  @Post()
  create(@Body() createCartasPerDto: CreateCartasPerDto) {
    return this.cartasPerService.create(createCartasPerDto);
  }


  @Get('file/:rut')
  async getFile(@Param('rut') rut: string, @Res() res: Response) {
    const file = this.filesService.getFile(rut + '/' + rut + '-carta_personalizada.docx');

    if (!file) {
      throw new NotFoundException('File not found');
    }

    res.download(file.path, rut  + '-carta_personalizada', (err) => {
      if (err) {
        // Log error internally; don't expose details to the client
        throw new NotFoundException('File not found');
      }
    });
  }

  @Get('snrev/:sede')
  findAllsnRev(@Param('sede') sede: string){
    return this.cartasPerService.findAllsnRev(sede);
  }

  @Get('rev/:sede')
  findAllRev(@Param('sede') sede: string){
    return this.cartasPerService.findAllRev(sede);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartasPerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartasPerDto: UpdateCartasPerDto) {
    return this.cartasPerService.update(+id, updateCartasPerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartasPerService.remove(+id);
  }
}
