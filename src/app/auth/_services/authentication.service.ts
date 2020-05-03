import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from '../_models';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient,
                private store: Store<fromApp.AppState>) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.get<any>('http://localhost:12345/api/Authentication/StudentLogin?',
          { params: { _username: username, _password: password }})
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user[0].ROLNO.length > 4) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user[0]));
                    // here we are adding the student info from the api and putting it on the student information store
                  // for the fruther processing of the service
                    this.store.select('fromStudentService').subscribe(
                      state => {
                        state.studentInformation.year = user[0].YEAR;
                        state.studentInformation.classCode = user[0].C_CODE;
                        state.studentInformation.departmentId = user[0].D_ID;
                        state.studentInformation.majorId = user[0].MAJ_ID;
                        state.studentInformation.rn = user[0].RN;
                        state.studentInformation.rollNumber = user[0].ROLNO;
                        state.studentInformation.dateOfBirth = user[0].DOB;
                        state.studentInformation.address = user[0].ADD1;
                        state.studentInformation.fId = user[0].F_NO;
                        state.studentInformation.sessionId = user[0].SE_ID;
                        state.studentInformation.gender = user[0].GENDER;
                        state.studentInformation.religion = user[0].RELIG;
                        state.studentInformation.MorE = user[0].MRM_EVE;
                        state.studentInformation.degreeNumber = user[0].CGPA;
                        state.studentInformation.degreeRegYear = user[0].DEG_REC_YEAR;
                        state.studentInformation.registrationNo = user[0].REG_NO;
                        state.studentInformation.studentName = user[0].NM;
                        state.studentInformation.fatherName = user[0].F_NM;
                        state.studentInformation.cnic = user[0].NIC;
                        state.studentInformation.phoneNumber = user[0].MOB;
                        state.studentInformation.cgpa = user[0].CGPA;
                        state.studentInformation.email = user[0].EMAIL;
                        state.studentInformation.password = password;
                        console.log(state.studentInformation);
                      }
                    );
                    this.currentUserSubject.next(user[0]);
                }
                return user[0];
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
