import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe("UserController", () => {

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule.register()],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200);
  });


})