import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthenticationService} from './services/authentication.service';
import {RouterService} from './services/router.service';


@Injectable()
export class CanActivateRouteGuard implements CanActivate {
  private bearerToken: any;
  constructor(public authService: AuthenticationService, public router: RouterService) {
    this.bearerToken = this.authService.getBearerToken();
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const booleanPromise = this.authService.isUserAuthenticated(this.bearerToken);
      return booleanPromise.then((authenticated) => {
        if (!authenticated) {
          this.router.routeToLogin();
        }
        return authenticated;
      });
  }
}
