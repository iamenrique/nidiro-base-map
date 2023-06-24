import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {TicketmasterEvent} from '../../services/ticketmaster/models/ticketmaster-event';

@Component({
  selector: 'nid-events-list-item',
  templateUrl: './events-list-item.component.html',
  styleUrls: ['./events-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsListItemComponent {
  @Input() event!: TicketmasterEvent;
}
