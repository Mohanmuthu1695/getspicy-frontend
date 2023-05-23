import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UserService } from 'src/app/service/user.service';
import { globalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  resposeMessage:any;
constructor(private ngxSpinner:NgxUiLoaderService,private dialog:MatDialog,private route:Router,private snackbar:SnackbarService,private users:UserService){
this.ngxSpinner.start()
this.tableData();
}
  ngOnInit() {
    
  }
  tableData() {
    this.users.getUser().subscribe({
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
  };
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  changeStatus(item: any) {
    this.ngxSpinner.start();
  
    const data = {
      status: !item.action?'false' : 'true',
      id: item.id
    };
  
    this.users.updateUser(data).subscribe({
      next: (response: any) => {
        this.ngxSpinner.stop();
        this.resposeMessage = response?.message;
        this.snackbar.openSnackBar(this.resposeMessage, 'success' );
  
        // Toggle the item.action property in the local data source
        item.action = !item.action;
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
  
  
}
