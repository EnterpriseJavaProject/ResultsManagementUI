import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig } from '@angular/material/dialog';
import { StudentsListComponent } from '../students/components/students-list/students-list.component';

@Component({
  selector: 'app-confirmation-component',
  templateUrl: './confirmation-component.component.html',
  styleUrls: ['./confirmation-component.component.css']
})
export class ConfirmationComponentComponent implements OnInit{

  title: string;
  message: any;
  item_id;
  @Input()
  clickFunction;
  constructor(public dialogRef: MatDialogRef<StudentsListComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    ) {
    this.title = data.title;
   this.message = data.message;
   this.clickFunction= data.clickFunction
  
  
  }
  //   @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
  //   // Update view with given values
  //   this.dialog = data.dialogData
  //   this.title = data.title;
  //   this.message = data.message;
  //   // this.clickFunction = data.;
  // }

ngOnInit(){
this.item_id = localStorage.item_id
}
  onConfirm() {
this.clickFunction(this.item_id)  }

  onDismiss() {
    // Close the dialog, return false
    this.dialogRef.close();
  }
}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
// export class ConfirmDialogModel {

//   constructor(public title: string, public message: any) {
//   }
// }
