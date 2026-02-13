import { Controller, Get } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Controller('courses')
export class CoursesController {
  @Get()
  getCourses() {
const filePath = path.join(process.cwd(), 'src', 'data', 'courses.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }
}
