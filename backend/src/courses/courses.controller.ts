import { Controller, Get, Post, Body } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('courses')
export class CoursesController {

  constructor(private readonly coursesService: CoursesService) {}

  // GET /courses
  @Get()
  getCourses() {
    return this.coursesService.getAllCourses();
  }

  // POST /courses
@Post()
addCourse(@Body() body: CreateCourseDto) {
  return this.coursesService.addCourse(body);
}

}
