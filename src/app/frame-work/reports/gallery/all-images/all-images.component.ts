import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { DownloadManagerService } from 'services/download-manager.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { IImageUrlAndInfos, IImageUrlInfoWrapper } from 'src/app/Interfaces/ireports';

@Component({
  selector: 'app-all-images',
  templateUrl: './all-images.component.html',
  styleUrls: ['./all-images.component.scss']
})
export class AllImagesComponent extends FactoryONE {

  allImagesDataSource: IImageUrlInfoWrapper;

  carouselImage: IImageUrlAndInfos;
  showCarousel: boolean = false;
  _isCollapsed: boolean = false;
  rowIndex: number = 0;
  trackNumber: number;

  constructor(
    private downloadManagerService: DownloadManagerService,
    private closeTabService: CloseTabService,
    private readingReportManagerService: ReadingReportManagerService
  ) {
    super();
  }

  connectToServer = async () => {
    if (!this.readingReportManagerService.verificationFollowUPTrackNumber(this.trackNumber))
      return;

    this.allImagesDataSource = await this.readingReportManagerService.getDataSource(ENInterfaces.ListAllImages, this.trackNumber);
    this.closeTabService.saveDataForRRGalleryReq = this.trackNumber;
    this.showAllImgs();
    this._isCollapsed = true;
  }
  classWrapper = async (canRefresh?: boolean) => {
    /* TODO: 
    JUST add to closeTabService.saveDataForRRGalleryReq from other
    components to process images
     */
    if (this.closeTabService.saveDataForRRGalleryReq) {
      this.trackNumber = this.closeTabService.saveDataForRRGalleryReq;
      this.allImagesDataSource = await this.readingReportManagerService.getDataSource(ENInterfaces.ListAllImages, this.trackNumber);
      this.showAllImgs();
      this._isCollapsed = true;
    }

  }
  showAllImgs = () => {
    this.allImagesDataSource.imageUrlAndInfos.forEach((item, i) => {
      this.getExactImg(item.fileRepositorayId, i);
    })
  }
  getImageDataSource = async (id: string): Promise<any> => {
    return await this.downloadManagerService.downloadFile(id);
  }
  getExactImg = async (id: string, index: number) => {
    this.allImagesDataSource[index] = this.getImageDataSource(id);
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.allImagesDataSource.imageUrlAndInfos[index].imageUrl = reader.result;
      this.closeTabService.saveDataForRRGallery[index] = reader.result;
    }, false);
    if (this.allImagesDataSource[index]) {
      reader.readAsDataURL(this.allImagesDataSource[index]);
    }
  }


  routeToOffload = (dataSource: IImageUrlAndInfos, rowIndex: number) => {
    scrollTo(0, 0);
    this.carouselImage = dataSource;
    this.rowIndex = rowIndex;
    this.showCarousel = true;
  }
  carouselNextItem = () => {
    this.rowIndex > this.allImagesDataSource.imageUrlAndInfos.length - 2 ? this.rowIndex = 0 : this.rowIndex++;
    this.carouselImage = this.allImagesDataSource.imageUrlAndInfos[this.rowIndex];
  }
  carouselPrevItem = () => {
    this.rowIndex < 1 ? this.rowIndex = this.allImagesDataSource.imageUrlAndInfos.length - 1 : this.rowIndex--;
    this.carouselImage = this.allImagesDataSource.imageUrlAndInfos[this.rowIndex];
  }
  carouselCancelClicked = () => {
    this.showCarousel = false;
  }

}
