import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-students-result',
  templateUrl: './students-result.component.html',
  styleUrls: ['./students-result.component.scss']
})
export class StudentsResultComponent implements OnInit {
  @ViewChild('content') content:ElementRef; 

  Data = [  
    { module_code: 101, module_name: 'Nitin', score: 1234, grade:'A' },  
    { module_code: 102, module_name: 'Sonu', score: 1234, grade:'A' },  
    { module_code: 103, module_name: 'Mohit', score: 1234, grade:'A' },  
    { module_code: 104, module_name: 'Rahul', score: 1234, grade:'A' },  
    { module_code: 105, module_name: 'Kunal', score: 1234, grade:'A' }  
  ]; 
  constructor() { }

  ngOnInit(): void {
  }
  public openPDF():void {
    let DATA = document.getElementById('content');
   
    html2canvas(DATA,{scale:2}).then(canvas => {
        let fileWidth = 210;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
         PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
        PDF.save('my-result.pdf');
    });     
  }

  public downloadAsPDF() {
    const doc = new jsPDF();

    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const pdfTable = this.content.nativeElement;

  //   doc.html(pdfTable.innerHTML, 15, 15, {
  //     width: 190,
  //     'elementHandlers': specialElementHandlers
  //   });

  //   doc.save('tableToPdf.pdf');
  // }

  doc.html(pdfTable.innerHTML, {
    callback: function (doc) {
      doc.save('tableToPdf.pdf');
    }
 });
}
}
