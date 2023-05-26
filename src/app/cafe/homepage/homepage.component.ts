import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from 'src/app/cage/signup/signup.component';
import { ForgotpasswordComponent } from '../forgotpassword/forgotpassword.component';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LandingLoginComponent } from '../landing-login/landing-login.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  showDetails: boolean = false;
  isScrolled: boolean = false;
  isDropdownMenuVisible: boolean = false;
  tokennotExist: boolean = true;
  tokenExist: boolean = true;
  tokenExist1: boolean = false;
  constructor(private dialog: MatDialog, private router: Router, private userService: UserService, private ngxService: NgxUiLoaderService) {

  }
  ngOnInit() {
    if (localStorage.getItem('token') !== null) {
      this.userService.checkUser().subscribe({
        next: (response: any) => {
          this.tokenExist = true;
          this.tokenExist1 = true;
          this.tokennotExist = false;
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    } else {
      this.tokenExist1 = false
    };
    if (localStorage.getItem('token') !== null) {
      this.userService.checkUser().subscribe({
        next: (response: any) => { }
      });

      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = "800px";
      this.dialog.open(LandingLoginComponent, dialogConfig);


    }

  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 0;
  }
  showDropdownMenu() {
    this.isDropdownMenuVisible = true;
  }

  hideDropdownMenu() {



    setTimeout(() => {
      this.isDropdownMenuVisible = false;
    }, 2000);
  }

  signup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "500px";
    this.dialog.open(SignupComponent, dialogConfig);
  }
  forgotPassword() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "500px";
    this.dialog.open(ForgotpasswordComponent, dialogConfig);
  }
  login() {
    if (localStorage.getItem('token') !== null) {
      this.userService.checkUser().subscribe({
        next: (response: any) => { }
      });
      this.router.navigate(['/dashboard']);
    }

    else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = "500px";
      this.dialog.open(LoginComponent, dialogConfig);
    }
  };
  logout() {
    // Remove token from local storage
    localStorage.removeItem('token');
    // Refresh the page
    window.location.reload();
  }
  landingLogin() {
  }
  orderNow(){
    if (localStorage.getItem('token') !== null) {
      this.userService.checkUser().subscribe({
        next: (response: any) => { }
      });
      this.router.navigate(['/dashboard/report']);
    }

    else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = "500px";
      this.dialog.open(LoginComponent, dialogConfig);
    }
  }
}
