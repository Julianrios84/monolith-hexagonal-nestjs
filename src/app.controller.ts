import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller()
@ApiExcludeController()
export class AppController {

  @Get()
  Documentation(@Res() res) {
    return res.redirect('/api/docs');
  }
}
