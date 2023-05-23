import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { globalConstants } from 'src/app/shared/global-constants';
import { AddProductComponent } from '../add-product/add-product.component';
import { UpdateProductComponent } from '../update-product/update-product.component';
import jwt_decode from 'jwt-decode';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-product-m',
  templateUrl: './product-m.component.html',
  styleUrls: ['./product-m.component.css']
})
export class ProductMComponent {
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  resposeMessage:any;
  isAdmin: boolean;
  
    constructor(private auth: AuthService, private products:ProductService,private ngxSpinner:NgxUiLoaderService,private dialog:MatDialog,private route:Router,private snackbar:SnackbarService){
  this.ngxSpinner.start()
  this.tableData()
  this.isAdmin = this.checkUserRole();
    }
    ngOnInit() {
      console.log(this.dataSource)
    }
    tableData() {
      this.products.getProduct().subscribe({
        next: (response: any) => {
          this.ngxSpinner.stop();
          this.dataSource = new MatTableDataSource(response);
        },
        error: (error: any) => {
          this.ngxSpinner.stop();
          console.log(error);
          if (error.error?.message) {
            this.resposeMessage = error.error?.message;
          } else {
            this.resposeMessage = globalConstants.genericError;
          }
          this.snackbar.openSnackBar(this.resposeMessage, globalConstants.error);
    
          setTimeout(() => {
            this.snackbar.openSnackBar('', ''); // Pass empty parameters to hide the snackbar
          }, 3000);
        }
      });
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
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    createProduct(){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = "500px";
      this.dialog.open(AddProductComponent, dialogConfig);
    }
    updateProduct(){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = "500px";
      this.dialog.open(UpdateProductComponent, dialogConfig);
    }
}
