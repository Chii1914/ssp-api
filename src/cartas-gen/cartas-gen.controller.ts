import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartasGenService } from './cartas-gen.service';
import { CreateCartasGenDto } from './dto/create-cartas-gen.dto';
import { UpdateCartasGenDto } from './dto/update-cartas-gen.dto';

@Controller('cartas-gen')
export class CartasGenController {
  constructor(private readonly cartasGenService: CartasGenService) {}

  @Post()
  createByRut(@Body() createCartasGenDto: CreateCartasGenDto) {
    /*
    TODO: Implementar la creación de cartas genéricas por rut
    -> Se debe buscar el estudiante por su rut
    -> Se debe buscar la última carta genérica creada para el estudiante, si no existe crear de una con los datos del estudiante enseguida
    -> Guardar en la base de datos los datos de la carta genérica, sumar uno al count_cg. Si esta ya existía desde antes solo cambiar fecha de actualización y count_cg
    -> Generar documento dependiendo de lo que sucedió (docx)
    -> Envío de correo con la carta generada
    */

    return this.cartasGenService.create(createCartasGenDto);
  }

  @Post()
  create(@Body() createCartasGenDto: CreateCartasGenDto) {
    return this.cartasGenService.create(createCartasGenDto);
  }

  @Get()
  findAll() {
    return this.cartasGenService.findAll();
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
