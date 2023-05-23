import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BillService } from 'src/app/service/bill.service';
import { CategoryService } from 'src/app/service/category.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { globalConstants } from 'src/app/shared/global-constants';
import { ViewBillProductComponent } from '../view-bill-product/view-bill-product.component';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent {

  dispalyedColumns:string[]=['name','edit'];
dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

resposeMessage:any;

  constructor( private bills:BillService, private catogerys:CategoryService,private ngxSpinner:NgxUiLoaderService,private dialog:MatDialog,private route:Router,private snackbar:SnackbarService){
this.ngxSpinner.start()
this.tableData()

  }
  ngOnInit() {
    console.log(this.dataSource)
  }
  tableData() {
    this.bills.getBills().subscribe({
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
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  viewbill(value:any){
const dialogs=new MatDialogConfig();
dialogs.data={
  data:value
};
   dialogs.width="100%";
   const dialog= this.dialog.open(ViewBillProductComponent);
   this.route.events.subscribe(()=>{
    dialog.close();
   })

  }
  deletebill(id:any){
    this.ngxSpinner.start();
    this.bills.deleteBills(id).subscribe({next:(response:any)=>{
      this.ngxSpinner.stop();

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
     
    })
  }
}
