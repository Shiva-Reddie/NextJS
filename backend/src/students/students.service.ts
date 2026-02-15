import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentsService {
  private filePath = path.join(process.cwd(), 'src', 'data', 'students.json');

  findAll() {
    const data = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  create(dto: CreateStudentDto) {
    const students = this.findAll();

    const newId =
      students.length > 0
        ? Math.max(...students.map((s) => s.id)) + 1
        : 1;

    const student = { id: newId, ...dto };

    students.push(student);

    fs.writeFileSync(this.filePath, JSON.stringify(students, null, 2));

    return {
      message: 'Student created successfully',
      student,
    };
  }
}
