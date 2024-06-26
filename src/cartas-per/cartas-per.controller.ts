import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Res, UseGuards, Request } from '@nestjs/common';
import { CartasPerService } from './cartas-per.service';
import { CreateCartasPerDto } from './dto/create-cartas-per.dto';
import { UpdateCartasPerDto } from './dto/update-cartas-per.dto';
import { Response } from 'express';
import { Roles } from 'src/common/roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { FilesService } from 'src/files/files.service';
import { run } from 'node:test';

@Controller('cartas-per')
export class CartasPerController {
  constructor(private readonly cartasPerService: CartasPerService, private readonly filesService: FilesService) {}

  @Post('crear')
  @UseGuards(AuthGuard('jwt'))
  @Roles('alumno')
  createByRut(@Request() req: any, @Body() createCartasGenDto: CreateCartasPerDto) {
    const {nombreOrganismo, nombreSupervisor, cargoSupervisor, sexoSupervisor, divisionDepartamento, seccionUnidad } = createCartasGenDto;
    return this.cartasPerService.createById(
      nombreOrganismo,
      nombreSupervisor,
      cargoSupervisor,
      sexoSupervisor,
      divisionDepartamento,
      seccionUnidad,
      req.user.mail,
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

  @Patch(':rut')
  updateByRut(@Param('rut') rut: string, @Body() updateCartasPerDto: UpdateCartasPerDto) {
    return this.cartasPerService.updateByRun(rut, updateCartasPerDto);
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

  @Delete(':run')
  remove(@Param('run') run: string) {
    return this.cartasPerService.remove(run);
  }
}
