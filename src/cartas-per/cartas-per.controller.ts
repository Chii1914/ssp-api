import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartasPerService } from './cartas-per.service';
import { CreateCartasPerDto } from './dto/create-cartas-per.dto';
import { UpdateCartasPerDto } from './dto/update-cartas-per.dto';

@Controller('cartas-per')
export class CartasPerController {
  constructor(private readonly cartasPerService: CartasPerService) {}

  @Post(':rut')
  createByRut(@Param('rut') rut: number, @Body() createCartasGenDto: CreateCartasPerDto) {
    const {nombreSupervisor, organismo, nombreOrganismo, sexoSupervisor, divisionDepartamento, seccionUnidad } = createCartasGenDto;
    return this.cartasPerService.createById(
      nombreSupervisor,
      organismo,
      nombreOrganismo,
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

  @Get()
  findAll() {
    return this.cartasPerService.findAll();
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
