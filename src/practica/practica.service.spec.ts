import { Test, TestingModule } from '@nestjs/testing';
import { PracticaService } from './practica.service';

describe('PracticaService', () => {
  let service: PracticaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PracticaService],
    }).compile();

    service = module.get<PracticaService>(PracticaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
