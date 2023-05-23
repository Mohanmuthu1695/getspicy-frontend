import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/service/category.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { globalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent {
  editCategory:any= FormGroup;
  responseMessage: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
    private formBuilder: FormBuilder,
    private router: Router,
    private categorysER: CategoryService,
    private snackBar: SnackbarService,
    private matDialogRef: MatDialogRef<EditcategoryComponent>,
    private ngxService: NgxUiLoaderService
  ) {}
  ngOnInit(){
   this.editCategory=this.formBuilder.group({
    id:[null,[Validators.required]],
    name:[null,[Validators.required]],

   });
   
   this.editCategory.patchValue(this.dialogData.data)
  }
  onsubmit(){
    this.ngxService.start();
    const formData = this.editCategory.value;
    const data = {
   id:formData.id,
      name: formData.name,
     
    };
    this.categorysER.updateCategory(data).subscribe({
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
