import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailsSectionComponent} from './details-section.component';
import {DetailsSectionControlsComponent} from './details-section-controls/details-section-controls.component';
import {MatSliderModule} from '@angular/material/slider';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [DetailsSectionComponent, DetailsSectionControlsComponent],
  exports: [DetailsSectionComponent],
  imports: [CommonModule, MatSliderModule, FormsModule],
})
export class DetailsSectionModule {}
