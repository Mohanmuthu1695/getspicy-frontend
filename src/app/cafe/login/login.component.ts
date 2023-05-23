import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UserService } from 'src/app/service/user.service';
import { globalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:any= FormGroup;
  responseMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: SnackbarService,
    private matDialogRef: MatDialogRef<LoginComponent>,
    private ngxService: NgxUiLoaderService
  ) {}
  ngOnInit(){
   this.loginForm=this.formBuilder.group({
    email:[null,[Validators.required,Validators.email]],
    password:['']
   })
  }
  onsubmit(){
    this.ngxService.start();
    const formData = this.loginForm.value;
    const data = {
   
      email: formData.email,
      password:formData.password
     
    };
    this.userService.login(data).subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.matDialogRef.close();
        localStorage.setItem ("token",response.token);
        this.responseMessage = JSON.stringify(response.token);
        // this.responseMessage = response?.message;
        // this.snackBar.openSnackBar(this.responseMessage, '');
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = globalConstants.genericError;
        }
        this.snackBar.openSnackBar(this.responseMessage, globalConstants.error);
        
          setTimeout(() => {
            this.snackBar.openSnackBar('', ''); // Pass empty parameters to hide the snackbar
          }, 3000);
      }
    });
}
}