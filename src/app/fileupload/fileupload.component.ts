import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {
  title = 'fileupload';
  remark = '';
  myFiles: string[] = [];
  sMsg: string = '';
  constructor(private httpService: HttpClient) { }

  ngOnInit() {
  }
  getFileDetails(e) {
    //console.log (e.target.files);
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
  }

  uploadFiles() {
      const frmData = new FormData();
      for (var i = 0; i < this.myFiles.length; i++) {
        frmData.append('fileUpload', this.myFiles[i]);
      }
      this.httpService.post('http://localhost:12345/api/upload/UploadFiles', frmData).subscribe(
        data => {
          // SHOW A MESSAGE RECEIVED FROM THE WEB API.
          // this.sMsg = data as string;
          // console.log(this.sMsg);
        }
      );
    }
}
