import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {baseUrl} from '../attendance/attendance-services/attendance.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  constructor(private http: HttpClient) {
  }


  changePwd(usr: string, oldpwd: string, newpwd: string) {
    const url = `${baseUrl}/api/ChangeTP/change?usr=${usr}&oldpwd=${oldpwd}&newpwd=${newpwd}`;
    return this.http.get(url);
  }
}
