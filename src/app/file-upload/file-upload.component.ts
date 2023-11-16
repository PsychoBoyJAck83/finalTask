// file-upload.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'file-upload',
  templateUrl: 'file-upload.component.html',
  styleUrls: ['file-upload.component.scss'],
})
export class FileUploadComponent {
  constructor(
    public fetchApiData: FetchApiDataService,
    private http: HttpClient
  ) {}

  fileName = '';
  @Input() imageTitle = '';
  @Input() imageComment = '';

  formData = new FormData();

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file: File = inputElement.files[0];

      if (file) {
        this.fileName = file.name;

        this.formData.append('myFile', file);
      }
    }
  }

  formSubmit() {
    this.formData.append('imageTitle', this.imageTitle);
    this.formData.append('imageComment', this.imageComment);
    this.fileName = '';
    this.imageTitle = '';
    this.imageComment = '';

    const upload$ = this.fetchApiData.upload(this.formData);

    upload$.subscribe();
  }
}
