import { Component, ElementRef, ViewChild } from '@angular/core';
import { jsPDF } from "jspdf";
import { TableService } from 'src/app/application/service/table.service';

@Component({
  selector: 'app-employee-documents',
  templateUrl: './employee-documents.component.html',
  styleUrls: ['./employee-documents.component.scss']
})
export class EmployeeDocumentsComponent {

  constructor(
  ) { }

  generatePDF() {
    
  }
}