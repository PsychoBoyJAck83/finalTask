import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'thumbnail-view',
  templateUrl: './thumbnail-view.component.html',
  styleUrls: ['./thumbnail-view.component.scss'],
})
export class ThumbnailViewComponent implements OnInit {
  allImageEntries: any[] = [];

  constructor(public fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    this.fetchApiData.getAll().subscribe((resp: any) => {
      this.allImageEntries = resp;
    });
  }

  testFileName = 'a.png';
}
