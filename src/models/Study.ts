export class StudyModel {
  courseId: number;
  courseName?: string;
  begining: number;
  end: number;
  amount: number;

  constructor(studyResponse : any) {
    this.courseId = studyResponse.id;
    this.begining = studyResponse.begining;
    this.end = studyResponse.end;
    this.amount = studyResponse.amount;
  }
}