import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { GlobalConstants } from '../shared/global-constant';
import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(public authService: AuthService,
    public router:Router,
    private snackbarService: SnackbarService) { }

    canActivate(route: ActivatedRouteSnapshot): boolean{
      let expectedRoleArray = route.data;
      expectedRoleArray = expectedRoleArray.expectedRole;
      const token:any= localStorage.getItem('token');
      var tokenPayload: any;
      try{
        // tokenPayload = jwt_decode(token);
        tokenPayload = token;
      } catch(err){
        localStorage.clear();
        this.router.navigate(['/']);

      }

      let checkRole = false;
      for(let i=0;i<expectedRoleArray.length;i++){
        if(expectedRoleArray[i] == tokenPayload.role){
          checkRole = true;
        }
      }
      if(tokenPayload.role == 'user' || tokenPayload.role == 'admin') {
        if(this.authService.isAuthenticated() && checkRole){
         return true;
        }
        this.snackbarService.openSnackBar(GlobalConstants.unauthorized, GlobalConstants.error);
        this.router.navigate(['/bike-rental/dashboard']);
        return false;
      }else {
        this.router.navigate(['/']);
        localStorage.clear();
        return false;
      }
    }
}
