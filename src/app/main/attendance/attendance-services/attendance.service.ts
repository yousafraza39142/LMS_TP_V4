import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

// Online Api Url
// export const baseUrl = 'https://lms-api-ravian.azurewebsites.net';

export const baseUrl = 'http://localhost:12345';
@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private fmId: number;
  constructor(private http: HttpClient) {
    if (JSON.parse(localStorage.getItem('teacherInfo'))) {
      this.fmId = JSON.parse(localStorage.getItem('teacherInfo')).FM_ID;
    } else {
      this.fmId = -1;
    }
  }

  getStudentList(section: string, subjectName: string) {
    console.log('called');
    const url = `${baseUrl}/api/GetStudentsListForAttendance/GetStudentsList?fm_id=${this.fmId}&sec_name=${section}&sub_name=${subjectName}`;
    return this.http.get(url);
  }

  // tslint:disable-next-line:max-line-length variable-name
  markAttendance(year: number, c_code: number, d_id: number, maj_id: number, rn: number, sub_name: string, section: string, date, attend: string) {
    // console.log('called');
    // tslint:disable-next-line:max-line-length
    const url = `${baseUrl}/api/StudentAttendance/MarkStudentAttendance?fm_id=${this.fmId}&year=${year}&c_code=${c_code}&d_id=${d_id}&maj_id=${maj_id}&rn=${rn}&sub_name=${sub_name}&section=${section}&date=${date}&attend=${attend}`;
    return this.http.get(url);
  }

  // tslint:disable-next-line:variable-name
  checkAttendance(sub_name: string, section: string, date) {
    console.log('called');
    // tslint:disable-next-line:max-line-length
    const url = `${baseUrl}/api/StudentAttendance/CheckAttendance?fm_id=${this.fmId}&sub_name=${sub_name}&section=${section}&date=${date}`;
    return this.http.get(url);
  }
}

