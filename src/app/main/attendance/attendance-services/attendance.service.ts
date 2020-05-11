import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  baseUrl = 'http://localhost:12345';

  constructor(private http: HttpClient) {
  }

  getStudentList(section: string, subjectName: string) {
    console.log('called');
    const url = `${this.baseUrl}/api/GetStudentsListForAttendance/GetStudentsList?sec_name=${section}&sub_name=${subjectName}`;
    return this.http.get(url);
  }
}

