import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarkAssessmentService {

  baseUrl = 'http://localhost:12345';

  constructor(private http: HttpClient) {
  }


  getSectionsForTeacherinCourse(fmId: number, subjectName: string) {
    const url = `${this.baseUrl}/api/SectionsTeacher/GetSectionsForCourse?fm_id=${fmId}&sub_name=${subjectName}`;
    return this.http.get(url);
  }


  getCourseForTeacher(fmId: number) {
    const url = `${this.baseUrl}/api/CoursesForTeacher/GetCoursesForTeacher?fm_id=${fmId}`;
    return this.http.get(url);
  }
}
