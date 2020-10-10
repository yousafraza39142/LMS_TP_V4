import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {baseUrl} from '../attendance/attendance-services/attendance.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkAssessmentService {
  private fmId: number;

  constructor(private http: HttpClient) {
  }
  getSectionsForTeacherinCourse(fmId: number, subjectName: string, T_NO: number, SE_ID: number, C_CODE: number) {
    // tslint:disable-next-line:max-line-length
    const url = `${baseUrl}/api/SectionsTeacher/GetSectionsForCourse?fm_id=${fmId}&sub_name=${encodeURIComponent(subjectName)}&T_NO=${T_NO}&SE_ID=${SE_ID}&C_CODE=${C_CODE}`;
    return this.http.get(url);
  }

  getCourseForTeacher(fmId: number) {
    const url = `${baseUrl}/api/GetOfferedCoursesByTeacherId/GetOfferedCoursesByT_id?FM_ID=${fmId}&C_CODE=${11}`;
    return this.http.get(url);
  }

  // tslint:disable-next-line:variable-name max-line-length
  markAssessment(fm_id: number, year: number, c_code: number, dep_id: number, maj_id: number, rn: number, sub_nm: string, section: string, ass_title: string, ass_type: string, mark: number, T_NO: number, SE_ID: number) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${baseUrl}/api/MarkAssessments/mark?fm_id=${fm_id}&year=${year}&c_code=${c_code}&dep_id=${dep_id}&maj_id=${maj_id}&rn=${rn}&sub_nm=${encodeURIComponent(sub_nm)}&section=${section}&ass_title=${encodeURIComponent(ass_title)}&ass_type=${ass_type}&mark=${mark}&T_NO=${T_NO}&SE_ID=${SE_ID}`);
  }

  getSessionAndTermNo(fmId, courseTitle, cCode): Observable<any> {
    const url = `${baseUrl}/api/GetSessionAndTerminTeacher/GetSessionAndTerm?FM_ID=${fmId}&SUB_NAME=${courseTitle}&C_CODE=${cCode}`;
    return this.http.get(url);
  }
}
