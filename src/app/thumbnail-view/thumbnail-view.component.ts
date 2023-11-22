import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'thumbnail-view',
  templateUrl: './thumbnail-view.component.html',
  styleUrls: ['./thumbnail-view.component.scss'],
})
export class ThumbnailViewComponent implements OnInit {
  baseUrl: string = '';
  allImageEntries: any[] = [];
  resizedImageList: any[] = [];

  constructor(public fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    this.baseUrl = this.fetchApiData.returnUrl();
    this.loadAllImageEntries();
    this.loadResizedImageList();
    if (this.allImageEntries.length !== this.resizedImageList.length) {
      this.loadAllImageEntries();
      this.loadResizedImageList();
    }

    this.fetchApiData.refreshNeeded$.subscribe(() => {
      this.loadAllImageEntries();
    });
  }

  private loadAllImageEntries(): void {
    this.fetchApiData.getAll().subscribe((resp: any) => {
      this.allImageEntries = resp;
    });
  }

  private loadResizedImageList(): void {
    this.fetchApiData.getResizedImages().subscribe((resp: any) => {
      this.resizedImageList = resp;
    });
  }
}
