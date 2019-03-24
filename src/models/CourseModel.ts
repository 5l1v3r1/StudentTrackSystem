export class CourseModel {
  id: number;
  name?: string;
  description: string;

  constructor(courseResponse: any) {
    this.id = courseResponse.id;
    this.name = courseResponse.name;
    this.description = courseResponse.description;
  }
}