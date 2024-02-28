import { Controller, Get, Post, Body, Patch, Param, Delete, Res, NotFoundException } from '@nestjs/common';
import { CartasGenService } from './cartas-gen.service';
import { CreateCartasGenDto } from './dto/create-cartas-gen.dto';
import { UpdateCartasGenDto } from './dto/update-cartas-gen.dto';
import { Response } from 'express';
import { FilesService } from '../files/files.service';

@Controller('cartas-gen')
export class CartasGenController {
  constructor(private readonly cartasGenService: CartasGenService, private readonly filesService: FilesService) { }

  @Post(':rut')
  createByRut(@Param('rut') rut: number, @Body() createCartasGenDto: CreateCartasGenDto) {
    return this.cartasGenService.createById(rut, createCartasGenDto);
  }

  @Post()
  create(@Body() createCartasGenDto: CreateCartasGenDto) {
    return this.cartasGenService.create(createCartasGenDto);
  }

  @Get('file/:rut')
  async getFile(@Param('rut') rut: string, @Res() res: Response) {
    const file = this.filesService.getFile(rut + '/' + rut + '-carta_generica.docx');

    if (!file) {
      throw new NotFoundException('File not found');
    }

    res.download(file.path, rut + '-carta_generica', (err) => {
      if (err) {
        // Log error internally; don't expose details to the client
        throw new NotFoundException('File not found');
      }
    });
  }

  @Get('snrev/:sede')
  findAllsnRev(@Param('sede') sede: string){
    return this.cartasGenService.findAllsnRev(sede);
  }

  @Get('rev/:sede')
  findAllRev(@Param('sede') sede: string){
    return this.cartasGenService.findAllRev(sede);
  }

  @Patch(':rut')
  updateByRut(@Param('rut') rut: string, @Body() updateCartasGenDto: UpdateCartasGenDto) {
    return this.cartasGenService.updateByRun(rut, updateCartasGenDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartasGenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartasGenDto: UpdateCartasGenDto) {
    return this.cartasGenService.update(+id, updateCartasGenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartasGenService.remove(+id);
  }
}
