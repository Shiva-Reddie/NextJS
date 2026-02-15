import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CoursesService {

  // Get full path of JSON file
  private filePath = path.join(process.cwd(), 'src', 'data', 'courses.json');

  // Get all courses
  getAllCourses() {
    const data = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  // Add new course
  addCourse(courseData: { name: string, duration: string }) {

    const data = fs.readFileSync(this.filePath, 'utf-8');
    const courses = JSON.parse(data);

    // Generate new ID
   const newCourse = {
  id: courses.length ? courses[courses.length - 1].id + 1 : 1,
  name: courseData.name,
  duration: courseData.duration
};
    
    courses.push(newCourse);

    fs.writeFileSync(this.filePath, JSON.stringify(courses, null, 2));

    return newCourse;
  }
}
