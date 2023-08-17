import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller()
@ApiExcludeController()
export class AppController {

  @Get()
  Documentation(@Res() res) {
    return res.redirect('/api/docs');
  }

  @Get("/swagger/json")
  Hello(@Res() res) {
    const file = createReadStream(join(process.cwd(), 'src/swagger-spec.json'));
    file.pipe(res);
  }
}
