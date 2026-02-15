export class Student {
  id: number;
  name: string;
  age: number;
  courseId: number;

  constructor(id: number, name: string, age: number, courseId: number) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.courseId = courseId;
  }
}
