import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {TicketmasterEvent} from '../../services/ticketmaster/models/ticketmaster-event';
import {CommunicationService} from '../../services/communication.service';

@Component({
  selector: 'nid-events-list-item',
  templateUrl: './events-list-item.component.html',
  styleUrls: ['./events-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsListItemComponent {
  @Input() event!: TicketmasterEvent;

  constructor(private communicationService: CommunicationService) {}

  highlightInMap() {
    this.communicationService.notifySelectionChange(this.event);
  }
}
