import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {TicketmasterEvent} from '../services/ticketmaster/models/ticketmaster-event';

@Component({
  selector: 'nid-details-section',
  templateUrl: './details-section.component.html',
  styleUrls: ['./details-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsSectionComponent {
  @Input() events!: TicketmasterEvent[];
  @Output() eventSelected = new EventEmitter<TicketmasterEvent>();

  areaSizeModified(areaSize: number) {
    console.log('\x1B[46;97m>>>>>>', areaSize);
  }
}
