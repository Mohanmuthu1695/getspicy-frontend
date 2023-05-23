import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { globalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  appProduct:any= FormGroup;
  responseMessage: any;
 categrey:any[]=[]
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private producs: ProductService,
    private snackBar: SnackbarService,
    private matDialogRef: MatDialogRef<AddProductComponent>,
    private ngxService: NgxUiLoaderService,
    private categry:CategoryService
  ) {
    this.getCategory()
  }
  ngOnInit(){
   this.appProduct=this.formBuilder.group({
    name:[null,[Validators.required]],
    categoryID:[null,[Validators.required]],
    description:[null,[Validators.required]],
    price:[null,[Validators.required]]

   })
  }
  onsubmit(){
    this.ngxService.start();
    const formData = this.appProduct.value;
    const data = {
   
      name: formData.name,
      categoryID:formData.categoryID,
      description:formData.description,
      price:formData.price
     
    };
    this.producs.addProduct(data).subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.matDialogRef.close();
        this.responseMessage = response?.message;
        this.snackBar.openSnackBar(this.responseMessage, '');
        window.location.reload();
        this.router.navigate(['/dashboard/product']);
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
 getCategory() {
    this.categry.getCategory().subscribe( (response: any) => {
       this.categrey=response;
      },
     
    );
  }
}
