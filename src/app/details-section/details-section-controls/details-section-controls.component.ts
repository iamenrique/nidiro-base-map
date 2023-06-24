import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'nid-details-section-controls',
  templateUrl: './details-section-controls.component.html',
  styleUrls: ['./details-section-controls.component.scss'],
})
export class DetailsSectionControlsComponent {
  areaSize = 3;

  @Output() areaSizeChanged = new EventEmitter<number>();
}
