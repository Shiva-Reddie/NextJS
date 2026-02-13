// import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service'; 

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
// }


import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class AppController {
  @Get()
  getData() {
    return { message: 'Backend is connected' };
  }
}


import * as fs from 'fs';
import * as path from 'path';

@Controller('students')
export class StudentsController {
  @Get()
  getStudents() {
    const filePath = path.join(__dirname, '..', 'data', 'students.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }
}
