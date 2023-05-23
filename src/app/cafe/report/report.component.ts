import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BillService } from 'src/app/service/bill.service';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { globalConstants } from 'src/app/shared/global-constants';
import { saveAs } from 'file-saver';
import { MatSnackBar,MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent implements OnInit {
  
  displayedColumns:string[]=['username','category','price','quantity','total','edit']
  dataSource:any=[];
  manageorderForm:any=FormGroup;
  category:any=[];
  products:any=[];
  price:any;
  totalAmount:number=0;
  totalvalue:number=0;
  responseMessage:any;
  allProduct:any=[]
  filteredProducts: any[] = [];  // Holds the array of products based on selected category
selectedProduct: any;
selectedName: string;
selectedPrice: number;
selectedCategory: string;
  quantityValue: number;
  constructor( private snackBar: MatSnackBar,private formBuilder: FormBuilder,private ngxSpinner:NgxUiLoaderService, private productSer:ProductService,private categorySer:CategoryService,private snackbarS:SnackbarService,private billSer:BillService){
 this.getCategory()
 this.getProduct()

  }
  ngOnInit() {
    // this.ngxSpinner.start()
    this.manageorderForm=this.formBuilder.group({
      name:[null,[Validators.required]],
      email:[null,[Validators.required,Validators.email]],
      contactNumber:['',[Validators.required]],
      payementMethod:[null,[Validators.required]],
      pName:[null,[Validators.required]],
      cName:[null,[Validators.required]],
      quantity:[null,[Validators.required]],
      price:[null,[Validators.required]],
      total:[null,[Validators.required]]
  });


}


getCategory() {
  this.categorySer.getCategory().subscribe({
    next: (response: any) => {
      this.ngxSpinner.stop();
      this.category = response;
    },
    error: (error: any) => {
      this.ngxSpinner.stop();
      console.log(error);

      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = globalConstants.genericError;
      }

      this.snackbarS.openSnackBar(this.responseMessage, globalConstants.error);

      setTimeout(() => {
        this.snackbarS.openSnackBar('', ''); // Pass empty parameters to hide the snackbar
      }, 3000);
    }
  });
};

getProduct(){
  this.productSer.getProduct().subscribe({next:(response:any)=>{
    this.allProduct=response

  }})
}
onCategoryChange() {
  this.filteredProducts = this.allProduct.filter(product => product.categoryName === this.selectedCategory);
  this.selectedName = null;
  this.selectedPrice = null;
}

onNameChange() {
  const selectedProduct = this.filteredProducts.find(product => product.name === this.selectedName);
  this.selectedPrice = selectedProduct ? selectedProduct.price : null;
}


// Method to update price based on selected product




validateProductAddBtn(){
  if(this.manageorderForm.controls['total'].value ===1 ||this.manageorderForm.controls['total'].value ===null ){
    return true;
  }
  else{
    return false;
  }
};
validateSubmitBtn(){
  if(this.manageorderForm.controls['name'].value === null ||this.manageorderForm.controls['total'].value === 0 ||this.manageorderForm.controls['payementMethod'].value === null ||this.manageorderForm.controls['contactNumber'].value === null ||this.manageorderForm.controls['email'].value === null  ){
    return true;
  }else{
    return false;
  }
};
addTable() {
  var formData = this.manageorderForm.value;
  var productId = formData.product?.id;
  var productname=formData.product?.name;
  var existingProduct = this.dataSource.find((item) => item.name === productname);

  if (existingProduct === undefined) {
    this.totalAmount += formData.total;
    this.dataSource.push({
      id: productId,
      name: formData?.pName,
      category: formData?.cName,
      quantity: formData?.quantity,
      price: formData?.price,
      total: this.manageorderForm.controls['total'].value
    });
    this.dataSource = [...this.dataSource];
    this.snackbarS.openSnackBar(globalConstants.productAdd, globalConstants.error);
  } else {
    this.snackbarS.openSnackBar(globalConstants.productExistError, globalConstants.error);
  }
}
calculateTotalPrice(): number {
  let totalPrice = 0;
  for (let item of this.dataSource) {
    totalPrice += item.total;
  }
  return totalPrice;
}


deleteRow(index: number) {
  const deletedItem = this.dataSource.splice(index, 1)[0];
  this.totalAmount -= deletedItem.total;
}


deleteFromTable(value:any,element:any){
  this.totalAmount=this.totalAmount - element.total
  this.dataSource.splice(value,1);
  this.dataSource=[...this.dataSource];

};
submitAction() {
  this.ngxSpinner.start();
  var formData = this.manageorderForm.value;
  var data = {
    name: formData.name,
    email: formData.email,
    contactNumber: formData.contactNumber,
    payementMethod: formData.payementMethod,
    totalAmount: this.calculateTotalPrice(),
    productDetails: JSON.stringify(this.dataSource),
    total:formData.total  }
  this.billSer.generateReport(data).subscribe({
    next: (response: any) => {
      this.downloadPdf(response?.uuid);
      this.manageorderForm.reset();
      this.totalAmount = 0;
      this.ngxSpinner.stop();
      this.dataSource = [];
    },
    // ...
  });
}

downloadPdf(fileName: any) {
  var data = {
    uuid: fileName
  }
  this.billSer.getPdf(data).subscribe({
    next: (response: any) => {
      saveAs(response, fileName + '.pdf');
      this.ngxSpinner.stop();
    },
    error: (error: any) => {
      console.log(error);
      this.ngxSpinner.stop();
    }
  });
}
}
