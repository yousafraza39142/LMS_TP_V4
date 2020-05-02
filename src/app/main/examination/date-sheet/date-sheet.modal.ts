export class DateSheetModal {
  public date: string;
  public day: string;
  public time: string;
  public courseName: string;
  constructor(date: string, day: string, time: string, courseName: string) {
    this.date = date;
    this.day = day;
    this.time = time;
    this.courseName = courseName;
  }
}
