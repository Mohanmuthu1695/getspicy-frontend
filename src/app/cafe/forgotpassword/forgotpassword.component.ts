import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UserService } from 'src/app/service/user.service';
import { globalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  forgotPasswordForm:any= FormGroup;
  responseMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: SnackbarService,
    private matDialogRef: MatDialogRef<ForgotpasswordComponent>,
    private ngxService: NgxUiLoaderService
  ) {}
  ngOnInit(){
   this.forgotPasswordForm=this.formBuilder.group({
    email:[null,[Validators.required,Validators.email]]
   })
  }
  onsubmit(){
    this.ngxService.start();
    const formData = this.forgotPasswordForm.value;
    const data = {
   
      email: formData.email,
     
    };
    this.userService.forgotPassword(data).subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.matDialogRef.close();
        this.responseMessage = response?.message;
        this.snackBar.openSnackBar(this.responseMessage, '');
        this.router.navigate(['/']);
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
