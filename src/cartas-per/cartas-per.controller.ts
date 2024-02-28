import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartasPerService } from './cartas-per.service';
import { CreateCartasPerDto } from './dto/create-cartas-per.dto';
import { UpdateCartasPerDto } from './dto/update-cartas-per.dto';

@Controller('cartas-per')
export class CartasPerController {
  constructor(private readonly cartasPerService: CartasPerService) {}

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
