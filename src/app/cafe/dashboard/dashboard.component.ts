import { AfterViewInit, Component } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DashboardService } from 'src/app/service/dashboard.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { globalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

responseMessage:any;
data:any;
ngAfterViewInit() {
  
}
constructor( private dashboardService:DashboardService,private ngxSpinner:NgxUiLoaderService,private snackbar:SnackbarService){
  this.ngxSpinner.start()
  this.getDashboardData();

}


getDashboardData() {
  this.dashboardService.getDashboardData().subscribe({
    next: (response: any) => {
      this.ngxSpinner.stop();
      this.data = response;
    },
    error: (error: any) => {
      this.ngxSpinner.stop();
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = globalConstants.genericError;
      }
      this.snackbar.openSnackBar(this.responseMessage, globalConstants.error);

      setTimeout(() => {
        this.snackbar.openSnackBar('', ''); // Pass empty parameters to hide the snackbar
      }, 3000);
    },
  });
}




}
