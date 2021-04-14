import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

import { IOutputManager } from './../Interfaces/imanage';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class OutputManagerService {
  fileUrl;
  dbfOutput: IOutputManager = {
    zoneId: 0,
    fromDate: null,
    toDate: null
  };

  constructor(
    private utilsService: UtilsService
  ) { }

  get getDBFOutPut(): IOutputManager {
    return this.dbfOutput;
  }

  checkVertification = (val: IOutputManager): boolean => {
    if (this.utilsService.isNullTextValidation(val.fromDate)) {
      this.utilsService.snackBarMessageWarn('مقدار از تاریخ را وارد نمایید');
      return false;
    }
    if (this.utilsService.isNullTextValidation(val.toDate)) {
      this.utilsService.snackBarMessageWarn('مقدار تا تاریخ را وارد نمایید');
      return false;
    }
    if (this.utilsService.isNull(val.zoneId)) {
      this.utilsService.snackBarMessageWarn('ناحیه ای انتخاب نشده است');
      return false;
    }
    return true;
  }
  // Exports

  downloadFile(data: any, type: string) {
    const downloadURL = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = downloadURL;
    link.download = `${new Date().toLocaleDateString() + type}`;
    link.click();
  }
  exportPdf(data: any, column?: any) {
    let someTest;
    column = column._columns;
    column.forEach(element => {
      someTest += element.header
    });
    console.log(data.value);
    console.log(someTest);


    const doc = new jsPDF('landscape', 'em', 'a4');
    const finalY = 10;

    // doc.addFileToVFS('assets/fonts/BLotus.woff', 'BLotus');
    // doc.addFont('assets/fonts/BLotus.woff', 'BLotus', 'normal');

    // doc.setFont('BLotus');
    // doc.setLanguage('fa-IR');
    // autoTable(doc, { startY: finalY, head: column, body: data });
    // doc.save('product.pdf');

    doc.setFont('tahoma');
    doc.setLanguage('ar-AE');
    autoTable(data.value, someTest);
    // autoTable(column._value, {})
    autoTable(doc, { startY: finalY, head: column, body: column._value });
    doc.save('product.pdf');

  }
  downloadTestFile = (data: any[], contentType: string) => {
    const doc = new jsPDF();
    // doc.text(20, 20, data,);

    const blob = new Blob(data, { type: contentType });
    console.log(1);

    this.downloadFile(blob, contentType);
    console.log(blob.text());
    console.log(blob.arrayBuffer);
    console.log(blob);
    doc.save('product.pdf');
  }

  exportExcel(dataSource: any) {
    const worksheet = XLSX.utils.json_to_sheet(dataSource);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "products", '.xlsx');
  }
  exportCSV(dataSource: any) {
    const worksheet = XLSX.utils.json_to_sheet(dataSource);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "products", '.csv');
  }
  saveAsExcelFile(buffer: any, fileName: string, EXCEL_EXTENSION: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }
}
