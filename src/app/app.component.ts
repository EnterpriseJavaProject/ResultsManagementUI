import { Component,OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { User ,Role} from './interfaces/all-models';
import { AuthService } from './services/auth.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ResultsManagement';
  user:User;
  constructor(private authenticationService: AuthService) {
    this.authenticationService.user.subscribe(x => this.user = x);
}

  ngOnInit() {
    /** spinner starts on init */
    // this.spinner.show();

    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);
  }
  get isAdmin() {
    return this.user && this.user.usertype === Role.Admin;
}
}
