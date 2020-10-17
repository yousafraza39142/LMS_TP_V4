import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

// Online Api Url
// export const baseUrl = 'http://192.168.147.2:82';
// export const baseUrl = 'http://111.68.103.118:10025/';
export const baseUrl = 'http://localhost:12345';
@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private fmId: number;

  constructor(private http: HttpClient) {
  }

  getStudentList(section: string, subjectName: string, termNo: number, seId: number, cCode: number) {
    console.log('called');
    // tslint:disable-next-line:max-line-length
    const url = `${baseUrl}/api/GetStudentsListForAttendance/GetStudentsList?fm_id=${JSON.parse(localStorage.getItem('teacherInfo')).FM_ID}&sec_name=${section}&sub_name=${encodeURIComponent(subjectName)}&T_NO=${termNo}&SE_ID=${seId}&C_CODE=${cCode}`;
    return this.http.get(url);
  }

  // tslint:disable-next-line:max-line-length variable-name
  markAttendance(year: number, c_code: number, d_id: number, maj_id: number, rn: number, sub_name: string, section: string, date, attend: string, termNo: number, seId: number) {
    // console.log('called');
    // tslint:disable-next-line:max-line-length
    const url = `${baseUrl}/api/StudentAttendance/MarkStudentAttendance?fm_id=${JSON.parse(localStorage.getItem('teacherInfo')).FM_ID}&year=${year}&c_code=${c_code}&d_id=${d_id}&maj_id=${maj_id}&rn=${rn}&sub_name=${encodeURIComponent(sub_name)}&section=${section}&date=${date}&attend=${attend}&T_NO=${termNo}&SE_ID=${seId}`;
    return this.http.get(url);
  }

  // tslint:disable-next-line:variable-name
  checkAttendance(sub_name: string, section: string, date, termNo: number, seId: number, cCode: number) {
    console.log('called');
    // tslint:disable-next-line:max-line-length
    const url = `${baseUrl}/api/StudentAttendance/CheckAttendance?fm_id=${JSON.parse(localStorage.getItem('teacherInfo')).FM_ID}&sub_name=${encodeURIComponent(sub_name)}&section=${section}&date=${date}&T_NO=${termNo}&SE_ID=${seId}&C_CODE=${cCode}`;
    return this.http.get(url);
  }

  // tslint:disable-next-line:variable-name max-line-length
  getStudentCourseAttendance(year: number, c_code: number, d_id: number, maj_id: number, rn: number, sub_code: string, termNo: number, seId: number) {
    // tslint:disable-next-line:max-line-length
    const url = `${baseUrl}/api/StudentAttendance/getStudentAttendanceByCourseCode?year=${year}&c_code=${c_code}&d_id=${d_id}&maj_id=${maj_id}&rn=${rn}&sub_code=${encodeURIComponent(sub_code)}&T_NO=${termNo}&SE_ID=${seId}`;
    return this.http.get(url);
  }
}

