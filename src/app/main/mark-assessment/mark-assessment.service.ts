import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {baseUrl} from '../attendance/attendance-services/attendance.service';

@Injectable({
  providedIn: 'root'
})
export class MarkAssessmentService {
  private fmId: number;

  constructor(private http: HttpClient) {
    if (JSON.parse(localStorage.getItem('teacherInfo'))) {
      this.fmId = JSON.parse(localStorage.getItem('teacherInfo')).FM_ID;
    } else {
      this.fmId = -1;
    }
  }


  getSectionsForTeacherinCourse(fmId: number, subjectName: string) {
    const url = `${baseUrl}/api/SectionsTeacher/GetSectionsForCourse?fm_id=${fmId}&sub_name=${subjectName}`;
    return this.http.get(url);
  }


  getCourseForTeacher(fmId: number) {
    const url = `${baseUrl}/api/CoursesForTeacher/GetCoursesForTeacher?fm_id=${fmId}`;
    return this.http.get(url);
  }

  // tslint:disable-next-line:variable-name max-line-length
  markAssessment(year: number, c_code: number, dep_id: number, maj_id: number, rn: number, sub_nm: string, section: string, ass_title: string, ass_type: string, mark: number) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${baseUrl}/api/MarkAssessments/mark?year=${year}&c_code=${c_code}&dep_id=${dep_id}&maj_id=${maj_id}&rn=${rn}&sub_nm=${sub_nm}&section=${section}&ass_title=${ass_title}&ass_type=${ass_type}&mark=${mark}`);
  }
}
