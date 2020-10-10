import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AssessmentTypes} from '../../../../shared/AssessmentTypes';
import {baseUrl} from '../../../attendance/attendance-services/attendance.service';
import {TeacherData} from '../../../../auth/_services';

@Injectable({
  providedIn: 'root'
})
export class AssignmentApiService {


  constructor(private http: HttpClient) {

  }


  getAssessmentList(section: string, subjectName: string, type: AssessmentTypes, T_NO: number, SE_ID: number, C_CODE: number) {
    // subjectName = subjectName.replace('&', '%26');
    // tslint:disable-next-line:max-line-length
    const url = `${baseUrl}/api/GetAssignments/getAssignmentList?fm_id=${JSON.parse(localStorage.getItem('teacherInfo')).FM_ID}&section=${section}&sub_name=${encodeURIComponent(subjectName)}&type=${type}&T_NO=${T_NO}&SE_ID=${SE_ID}&C_CODE=${C_CODE}`;
    return this.http.get(url);
  }


  // tslint:disable-next-line:max-line-length
  getAssessmentListOfStudents(section: string, subjectName: string, assignmentTitle: string, type: AssessmentTypes, T_NO: number, SE_ID: number, C_CODE: number) {
    // tslint:disable-next-line:max-line-length
    subjectName = subjectName.replace('&', '%26');
    console.log(subjectName);
    console.log(
      encodeURIComponent(subjectName));
    // tslint:disable-next-line:max-line-length
    const url = `${baseUrl}/api/GetAssignments/getAssignmentsListOfStudents?fm_id=${JSON.parse(localStorage.getItem('teacherInfo')).FM_ID}&section=${section}&sub_name=${subjectName}&assignment_title=${assignmentTitle}&type=${type}&T_NO=${T_NO}&SE_ID=${SE_ID}&C_CODE=${C_CODE}`;
    return this.http.get(url);
  }

  /*
    getStudentList(section: string, subjectName: string) {
      console.log('called');
      const url = `${this.baseUrl}/api/GetStudentsListForAttendance/GetStudentsList?sec_name=${section}&sub_name=${subjectName}`;
      return this.http.get(url);
    }*/
}
