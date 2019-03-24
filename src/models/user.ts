// Use declare class to describe a class or class-like object. Classes can have properties and methods as well as a constructor.

export class UserModel {
  id: number = 0;
  username: string = '';
  first_name: string = '';
  last_name: string = '';
  phone_number: string = '';
  user_type: number = 0;
  classroom?: number = 0;
  courseGroup?: number = 0;
  joined_date: string = '';
}