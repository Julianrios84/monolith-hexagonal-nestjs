import { UUIDService } from '@common/root/application/adapters';
import { Test, TestingModule } from '@nestjs/testing';

describe('UUIDService', () => {
  let service: UUIDService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UUIDService],
    }).compile();

    service = module.get<UUIDService>(UUIDService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
    const uuid = await service.create()
    expect(uuid).toHaveLength(36)
  });
});
