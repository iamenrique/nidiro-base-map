import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {TicketmasterEvent} from './ticketmaster/models/ticketmaster-event';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private selectionChange$ = new Subject<TicketmasterEvent>();

  notifySelectionChange(event: TicketmasterEvent): void {
    this.selectionChange$.next(event);
  }

  watchForSelectionChanges(): Observable<TicketmasterEvent> {
    return this.selectionChange$;
  }
}
