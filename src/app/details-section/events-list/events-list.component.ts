import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {TicketmasterEvent} from '../../services/ticketmaster/models/ticketmaster-event';

@Component({
  selector: 'nid-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsListComponent {
  @Input() events!: TicketmasterEvent[];
}
