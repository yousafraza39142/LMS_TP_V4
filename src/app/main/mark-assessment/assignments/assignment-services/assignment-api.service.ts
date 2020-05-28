import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AssessmentTypes} from '../../../../shared/AssessmentTypes';
import {baseUrl} from '../../../attendance/attendance-services/attendance.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentApiService {


  constructor(private http: HttpClient) {
  }


  getAssignmentList(section: string, subjectName: string, type: AssessmentTypes) {
    const url = `${baseUrl}/api/GetAssignments/getAssignmentList?section=${section}&sub_name=${subjectName}&type=${type}`;
    return this.http.get(url);
  }


  getAssignmentsListOfStudents(section: string, subjectName: string, assignmentTitle: string, type: AssessmentTypes) {
    // tslint:disable-next-line:max-line-length
    const url = `${baseUrl}/api/GetAssignments/getAssignmentsListOfStudents?section=${section}&sub_name=${subjectName}&assignment_title=${assignmentTitle}&type=${type}`;
    return this.http.get(url);
  }
/*
  getStudentList(section: string, subjectName: string) {
    console.log('called');
    const url = `${this.baseUrl}/api/GetStudentsListForAttendance/GetStudentsList?sec_name=${section}&sub_name=${subjectName}`;
    return this.http.get(url);
  }*/
}
