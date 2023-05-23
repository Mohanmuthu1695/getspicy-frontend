import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import jwt_decode from 'jwt-decode';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LogoutComponent } from '../logout/logout.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit{
  showSideMenu= true;
  isAdmin: boolean;

  constructor(private router: Router,private auth: AuthService,private dialog: MatDialog,  private ngxService: NgxUiLoaderService){
    this.isAdmin = this.checkUserRole();
  }
  ngOnInit() {
   this.showSideMenu
  }
  isDropdownMenuVisible: boolean = false;
  toggleSideMenu() {
    this.showSideMenu = !this.showSideMenu;
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  showDropdownMenu() {
    this.isDropdownMenuVisible = true;
  }

  hideDropdownMenu() {
    this.isDropdownMenuVisible = false;
  }

 
  checkUserRole(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const userRole = decodedToken.role;

      // Check if the user has an admin role
      return userRole === 'admin';
    }

    return false;
  }
  logout() {
    // Remove token from local storage
    localStorage.removeItem('token');
    // Refresh the page
  
    this.router.navigate(['/home']);
  }
  changePassword() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "500px";
    this.dialog.open(LogoutComponent, dialogConfig);
  }
  
}
