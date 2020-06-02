import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

// Online Api Url
// https://lms-api20200528193541.azurewebsites.net
export const baseUrl = 'http://localhost:12345';
@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  constructor(private http: HttpClient) {
  }

  getStudentList(section: string, subjectName: string) {
    console.log('called');
    const url = `${baseUrl}/api/GetStudentsListForAttendance/GetStudentsList?sec_name=${section}&sub_name=${subjectName}`;
    return this.http.get(url);
  }

  // tslint:disable-next-line:max-line-length variable-name
  markAttendance(year: number, c_code: number, d_id: number, maj_id: number, rn: number, sub_name: string, section: string, date, attend: string) {
    // console.log('called');
    // tslint:disable-next-line:max-line-length
    const url = `${baseUrl}/api/StudentAttendance/MarkStudentAttendance?year=${year}&c_code=${c_code}&d_id=${d_id}&maj_id=${maj_id}&rn=${rn}&sub_name=${sub_name}&section=${section}&date=${date}&attend=${attend}`;
    return this.http.get(url);
  }

  // tslint:disable-next-line:variable-name
  checkAttendance(sub_name: string, section: string, date) {
    console.log('called');
    // tslint:disable-next-line:max-line-length
    const url = `${baseUrl}/api/StudentAttendance/CheckAttendance?sub_name=${sub_name}&section=${section}&date=${date}`;
    return this.http.get(url);
  }
}

