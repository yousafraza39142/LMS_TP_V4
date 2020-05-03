import {Component, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as fromApp from './../store/app.reducers';
import {Store} from '@ngrx/store';
import {CourseModal} from './course/course.modal';
import {AppComponentEventEmitterService} from './event-emmiter.service';
import { User } from '../auth/_models/user';
import { AuthenticationService } from '../auth/_services/authentication.service';

declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  // from the role based authentication
  loading = false;
  currentUser: User;
  userFromApi: User;


  IsUserLoggedIn = false;
  public semesterCourses: CourseModal[];
  showResetForm = false;


  constructor(private router: Router,
              private store: Store<fromApp.AppState>,
              private route: ActivatedRoute,
              private clickEvent: AppComponentEventEmitterService,
              private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  OnStudentInformationClicked() {
    this.router.navigate(['studentInformation'], {relativeTo: this.route});
  }

  onHomeClicked() {
    this.router.navigate(['home'], {relativeTo: this.route});
  }

  OnFeeStructureClicked() {
    this.router.navigate(['feeStructure'], {relativeTo: this.route});
  }

  OnSemesterTranscriptClicked() {
    this.router.navigate(['semesterTranscript'], {relativeTo: this.route});
  }

  OnCompleteTranscriptClicked() {
    this.router.navigate(['completeTranscript'], {relativeTo: this.route});
  }

  OnDateSheetClicked() {
    this.router.navigate(['dateSheet'], {relativeTo: this.route});
  }

  OnTeacherAssesmentClicked() {
    this.router.navigate(['teacherAssessment'], {relativeTo: this.route});
  }

  OnCompliantClicked() {
    this.router.navigate(['complaints'], {relativeTo: this.route});
  }

  OnTimeTableClicked() {
    this.router.navigate(['timeTable'], {relativeTo: this.route});
  }

  OnCourseClicked() {
    this.router.navigate(['course'], {relativeTo: this.route});
  }

  OnPreviousCoursesClicked() {
    this.router.navigate(['previousCourses'], {relativeTo: this.route});
  }

  OnShowMenuListItem(id: string) {
    /*const menu = document.getElementById(id);
    const ul = menu.getElementsByTagName('ul')[0];
    if (ul.classList.contains('mm-show')) {
      ul.classList.remove('mm-show');
      menu.classList.remove('mm-active');
    } else {
      ul.classList.add('mm-show');
      menu.classList.add('mm-active');
    }*/
  }

  OnnavBarHamBtnClicked() {
    const HamButton = document.getElementById('navBarHamBtn');
    const mainDivContainingNav = document.getElementById('main-container');
    if (HamButton.classList.contains('is-active')) {
      HamButton.classList.remove('is-active');
      mainDivContainingNav.classList.remove('sidebar-mobile-open');
    } else {
      HamButton.classList.add('is-active');
      mainDivContainingNav.classList.add('sidebar-mobile-open');
    }
  }

  OnnavBarHamBtn_lgClicked() {
    const hamButtonLg = document.getElementById('navBarHamBtn-lg');
    const mainDivContainingNav = document.getElementById('main-container');
    if (hamButtonLg.classList.contains('is-active')) {
      hamButtonLg.classList.remove('is-active');
      mainDivContainingNav.classList.remove('closed-sidebar');
      this.clickEvent.announceClick(false);
    } else {
      hamButtonLg.classList.add('is-active');
      mainDivContainingNav.classList.add('closed-sidebar');
      this.clickEvent.announceClick(true);
    }
  }

  OnAppHeaderMobileMenu() {
    const mobileMenu = document.getElementById('app-header-mobile-menu');
    const buttonContent = document.getElementById('content_mobile');
    const buttonActivated = mobileMenu.classList.contains('active');
    if (buttonActivated) {
      mobileMenu.classList.remove('active');
      buttonContent.classList.remove('header-mobile-open');
    } else {
      mobileMenu.classList.add('active');
      buttonContent.classList.add('header-mobile-open');
    }
  }

  ngOnInit(): void {
    // from the role based authentiction
    this.loading = true;

    this.store.select('fromCourse').subscribe(
      state => {
        this.semesterCourses = state.semesterCourses;
      }
    );

    $('.menu-list ul').on('click', () => {
      if (window.innerWidth < 992) {
        $('#navBarHamBtn').removeClass('is-active');
        $('#main-container').removeClass('sidebar-mobile-open');
      }
    });
    $('ul.vertical-nav-menu > li:not(.menu-list):not(.app-sidebar__heading)').on('click', () => {
      if (window.innerWidth < 992) {
        $('#navBarHamBtn').removeClass('is-active');
        $('#main-container').removeClass('sidebar-mobile-open');
      }
    });
  }

  onCloseResetForm() {
    this.showResetForm = false;
  }

  onShowResetForm() {
    this.showResetForm = true;
  }
  onLogout() {
    this.authenticationService.logout();
    this.router.navigate(['/auth']);
  }
}
