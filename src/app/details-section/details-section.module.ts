import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {DetailsSectionComponent} from './details-section.component';
import {DetailsSectionControlsComponent} from './details-section-controls/details-section-controls.component';
import {MatSliderModule} from '@angular/material/slider';
import {FormsModule} from '@angular/forms';
import {EventsListComponent} from './events-list/events-list.component';
import {EventsListItemComponent} from './events-list-item/events-list-item.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [DetailsSectionComponent, DetailsSectionControlsComponent, EventsListComponent, EventsListItemComponent],
  exports: [DetailsSectionComponent],
  imports: [CommonModule, MatSliderModule, FormsModule, MatCardModule, NgOptimizedImage, MatButtonModule],
})
export class DetailsSectionModule {}
