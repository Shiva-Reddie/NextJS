import { Controller, Get } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Controller('students')
export class StudentsController {
  @Get()
  getStudents() {
    const filePath = path.join(process.cwd(), 'src', 'data', 'students.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }
}
