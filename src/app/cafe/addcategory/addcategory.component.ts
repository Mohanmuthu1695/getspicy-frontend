import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/service/category.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UserService } from 'src/app/service/user.service';
import { globalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent {
  addCategory:any= FormGroup;
  responseMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private categorysER: CategoryService,
    private snackBar: SnackbarService,
    private matDialogRef: MatDialogRef<AddcategoryComponent>,
    private ngxService: NgxUiLoaderService
  ) {}
  ngOnInit(){
   this.addCategory=this.formBuilder.group({
    name:[null,[Validators.required]]
   })
  }
  onsubmit(){
    this.ngxService.start();
    const formData = this.addCategory.value;
    const data = {
   
      name: formData.name,
     
    };
    this.categorysER.addCategory(data).subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.matDialogRef.close();
        this.responseMessage = response?.message;
        this.snackBar.openSnackBar(this.responseMessage, '');
        window.location.reload();
        this.router.navigate(['/dashboard/category']);
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
