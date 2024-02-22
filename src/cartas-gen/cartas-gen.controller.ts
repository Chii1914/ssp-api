import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartasGenService } from './cartas-gen.service';
import { CreateCartasGenDto } from './dto/create-cartas-gen.dto';
import { UpdateCartasGenDto } from './dto/update-cartas-gen.dto';

@Controller('cartas-gen')
export class CartasGenController {
  constructor(private readonly cartasGenService: CartasGenService) {}

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
