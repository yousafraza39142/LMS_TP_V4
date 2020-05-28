import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import {Observable} from 'rxjs';
import { saveAs } from 'file-saver';
import {map} from 'rxjs/operators';
import {baseUrl} from '../main/attendance/attendance-services/attendance.service';

@Component({
  selector: 'app-download-file',
  templateUrl: './download-file.component.html',
  styleUrls: ['./download-file.component.css']
})
export class DownloadFileComponent implements OnInit {
  constructor(private http: HttpClient) { }
  attachmentFileName = 'Screenshot_2020-01-15-23-28-34-38.png';
  folderPath = '505c-f758';
  ngOnInit(): void {
  }
  DownLoadFiles() {
    const fileName = this.attachmentFileName;
    // file type extension
    const checkFileType =  fileName.split('.').pop();
    let fileType;
    if (checkFileType === '.txt') {
      fileType = 'text/plain';
    }
    if (checkFileType === '.pdf') {
      fileType = 'application/pdf';
    }
    if (checkFileType === '.doc') {
      fileType = 'application/vnd.ms-word';
    }
    if (checkFileType === '.docx') {
      fileType = 'application/vnd.ms-word';
    }
    if (checkFileType === '.xls') {
      fileType = 'application/vnd.ms-excel';
    }
    if (checkFileType === '.png') {
      fileType = 'image/png';
    }
    if (checkFileType === '.jpg') {
      fileType = 'image/jpeg';
    }
    if (checkFileType === '.jpeg') {
      fileType = 'image/jpeg';
    }
    if (checkFileType === '.gif') {
      fileType = 'image/gif';
    }
    if (checkFileType === '.csv') {
      fileType = 'text/csv';
    }
    this.DownloadFile(fileName, fileType)
      .subscribe(
        success => {
          saveAs(success, fileName);
        },
        err => {
          alert('Server error while downloading file.');
        }
      );
  }
  DownloadFile(filePath: string, fileType: string): Observable<any> {
    const fileExtension = fileType;
    const input = filePath;
    return this.http.post(`${baseUrl}/api/Download/DownloadFile?folderPath=` + this.folderPath + '&fileName=' + this.attachmentFileName, '',
      { responseType: 'blob',
                observe: 'response'})
      .pipe(
          map((res: any) => {
            return new Blob([res.body], { type: fileExtension });
        })
        // (res) => {
        //   const blob = new Blob([res.blob()], {type: fileExtension} );
        //   return blob;
        // }
      );
  }



  //   DownloadFile(filePath: string, fileType: string): Observable<any> {
  //
  //   let fileExtension = fileType;
  //   let input = filePath;
  //
  //   return this.http.get(this.yourApiUrl + "?fileName=" + input, {
  //     responseType: 'blob',
  //     observe: 'response'
  //   })
  //     .pipe(
  //       map((res: any) => {
  //         return new Blob([res.body], { type: fileExtension });
  //       })
  //     );
  // }
}



