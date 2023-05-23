import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UserService } from 'src/app/service/user.service';
import { globalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  responseMessage: any;
  updatePasswordForm:any=FormGroup
  constructor(  private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: SnackbarService,
    private matDialogRef: MatDialogRef<LogoutComponent>,
    private ngxService: NgxUiLoaderService){

  }
  ngOnInit(){

    this.updatePasswordForm=this.formBuilder.group({
      email:[null,[Validators.required,Validators.email]],
      oldPassword:[null,[Validators.required]],
      newPassword:[null,[Validators.required]]
     })
  }
  onsubmit(){
    this.ngxService.start();
    const formData = this.updatePasswordForm.value;
    const data = {
   
      email: formData.email,
      oldPassword:formData.oldPassword,
      newPassword:formData.newPassword
     
    };
    this.userService.updatePassword(data).subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.matDialogRef.close();
        this.responseMessage = response?.message;
        this.snackBar.openSnackBar(this.responseMessage, '');
        localStorage.clear()
        this.router.navigate(['/home']);
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
