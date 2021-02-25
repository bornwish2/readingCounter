import { NgModule } from '@angular/core';
import { SharedTwoModule } from 'src/app/shared/shared-two.module';

import { AbDanUploadedInfoRoutingModule } from './ab-dan-uploaded-info-routing.module';
import { AbDanUploadedInfoComponent } from './ab-dan-uploaded-info.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';


@NgModule({
  declarations: [AbDanUploadedInfoComponent, ImageViewerComponent],
  imports: [
    SharedTwoModule,
    AbDanUploadedInfoRoutingModule
  ]
})
export class AbDanUploadedInfoModule { }
