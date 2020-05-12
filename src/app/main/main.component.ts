import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as fromApp from './../store/app.reducers';
import {Store} from '@ngrx/store';
import {CourseModal} from '../shared/course.modal';
import {AppComponentEventEmitterService} from './event-emmiter.service';
import {FadeIn} from '../transitions';
import {AuthenticationService} from '../auth/_services';

declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [
    FadeIn()
  ]
})
export class MainComponent implements OnInit {
  public semesterCourses: CourseModal[];
  public teacherName: string;
  public FM_ID: string;
  showResetForm = false;
  showChangePassword = false;

  constructor(private router: Router,
              private store: Store<fromApp.AppState>,
              private clickEvent: AppComponentEventEmitterService,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService) {
  }


  onHomeClicked() {
    this.router.navigate(['timeTable'], {relativeTo: this.route});
  }

  OncourseUploadClicked() {
    this.router.navigate(['courseUpload'], {relativeTo: this.route});
  }

  OnStudentQueriesClicked() {
    this.router.navigate(['studentQueries'], {relativeTo: this.route});
  }

  OnTeacherInfoClicked() {
    this.router.navigate(['teacherInformation'], {relativeTo: this.route});
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
    this.teacherName = JSON.parse(localStorage.getItem('teacherInfo')).NM;
    this.FM_ID = JSON.parse(localStorage.getItem('teacherInfo')).FM_ID;
    // jquery
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
  OnAssignmentClicked() {
    console.log('clicked Assignments');
    this.router.navigate(['assignment'], {relativeTo: this.route});
  }

  OnProjectsClicked() {
    this.router.navigate(['project'], {relativeTo: this.route});
  }

  OnPresentationClicked() {
    this.router.navigate(['presentation'], {relativeTo: this.route});
  }

  OnLabClicked() {
    this.router.navigate(['lab'], {relativeTo: this.route});
  }

  OnMidTermClicked() {
    this.router.navigate(['midTerm'], {relativeTo: this.route});
  }

  OnFinalTermClicked() {
    this.router.navigate(['finalTerm'], {relativeTo: this.route});
  }

  OnAttendanceClicked() {
    this.router.navigate(['attendance'], {relativeTo: this.route});
  }

  OnViewStudentProfileClicked() {
    this.router.navigate(['viewStudentProfile'], {relativeTo: this.route});
  }
  onLogout() {
    this.authenticationService.logout();
    this.router.navigate(['/auth']);
  }

  OnChangePasswordClicked() {
    this.showChangePassword = true;
  }

  onCloseChangePasswordForm() {
    this.showChangePassword = false;
  }
}
