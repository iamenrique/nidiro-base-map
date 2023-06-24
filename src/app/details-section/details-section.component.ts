import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'nid-details-section',
  templateUrl: './details-section.component.html',
  styleUrls: ['./details-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsSectionComponent {
  areaSizeModified(areaSize: number) {
    console.log('\x1B[46;97m>>>>>>', areaSize);
  }
}
