import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import { AuthService } from './auth.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RouteGaurdService {
  constructor(
    private router: Router,
    private snackBar: SnackbarService,
    public auth: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const userRole = decodedToken.role;

      // Use AuthService methods or properties if needed
      if (this.auth.isAuthenticate()) {
        if (userRole === 'admin') {
          // Allow access for admin role
          return true;
        } else if (userRole === 'user') {
          // Check route data for user access
          const allowedRoles = route.data['roles'] as string[];
          if (allowedRoles && allowedRoles.includes('user')) {
            // Allow access for specific user routes
            return true;
          } else {
            // Unauthorized user access
            this.snackBar.openSnackBar('Unauthorized access.', 'error');
            localStorage.removeItem('token');
            // Refresh the page
            window.location.reload();
            this.router.navigate(['/home']);
            return false;
          }
        }
      }
    }

    // User is not logged in or invalid role
    this.snackBar.openSnackBar('Invalid user role.', 'error');
   
    this.router.navigate(['/home']);
    return false;
  }
}
