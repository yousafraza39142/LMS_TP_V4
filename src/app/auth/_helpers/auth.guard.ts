import {Injectable} from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  Route,
  UrlSegment
} from '@angular/router';

import {AuthenticationService} from '../_services';
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanLoad {
  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (this.authenticationService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['auth']);
      return false;
    }
  }
}
