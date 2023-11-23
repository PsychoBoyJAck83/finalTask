import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { timeout } from 'rxjs';

@Component({
  selector: 'thumbnail-view',
  templateUrl: './thumbnail-view.component.html',
  styleUrls: ['./thumbnail-view.component.scss'],
})
export class ThumbnailViewComponent implements OnInit /*, AfterViewChecked */ {
  baseUrl: string = '';
  allImageEntries: any[] = [];
  resizedImageList: any = {};

  constructor(public fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    console.log('ngOnInit()');
    this.baseUrl = this.fetchApiData.returnUrl();
    this.loadAllImageEntries();
    //this.loadResizedImageList();
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

  public handleImgError(event: Event, entry: any): void {
    let imgElement = event.target as HTMLImageElement;
    setTimeout(() => {
      imgElement.src = `${this.baseUrl}open/resized-images/${entry.imageFileName}`;
    }, 500);
  }

  public handleImgLoad(event: Event) {
    let imgElement = event.target as HTMLImageElement;
    imgElement.classList.remove('invisible');
  }
}
