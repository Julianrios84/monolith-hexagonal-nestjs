import { Test } from "@nestjs/testing";
import { AppModule } from '../../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { GetDto } from "@users/root/application/dto";

describe("UserController", () => {

  let app: INestApplication;
  let httpServer: any

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init()

    httpServer = app.getHttpServer();
  })

  afterAll(async () => {
    await app.close()
  })

  describe('GetUsers', () => {
    it("should return array of records", async () => {
      const response = await request(httpServer).get('/user')
      expect(response.status).toBe(200);
    })
  })

})