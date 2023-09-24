import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from '@common/root/application/adapters';

describe('BcryptService', () => {
  let service: BcryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptService],
    }).compile();

    service = module.get<BcryptService>(BcryptService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();

    const hash = await service.hash("password");

    const compare = await service.compare("password", hash);

    expect(compare).toBe(true);

  });
});
