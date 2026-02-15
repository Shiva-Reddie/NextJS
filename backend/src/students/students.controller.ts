import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Student } from './student.model';

@Controller('students')
export class StudentsController {
  private filePath = path.join(process.cwd(), 'src', 'data', 'students.json');

  @Get()
  getStudents() {
    const data = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  @Post()
  addStudent(@Body() newStudent: Student) {
    const data = fs.readFileSync(this.filePath, 'utf-8');
    const students = JSON.parse(data);

    const newId =
      students.length > 0
        ? Math.max(...students.map((s) => s.id)) + 1
        : 1;

    const studentToAdd = {
      id: newId,
      name: newStudent.name,
      age: newStudent.age,
      courseId: newStudent.courseId,
    };

    students.push(studentToAdd);

    fs.writeFileSync(this.filePath, JSON.stringify(students, null, 2));

    return {
      message: 'Student created successfully',
      student: studentToAdd,
    };
  }
}
