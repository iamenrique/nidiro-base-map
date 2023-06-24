import {Component, OnDestroy} from '@angular/core';
import {TicketmasterApiService} from './services/ticketmaster/ticketmaster-api.service';
import {finalize, Subscription} from 'rxjs';
import {TicketmasterEvent} from './services/ticketmaster/models/ticketmaster-event';

@Component({
  selector: 'nid-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  isLoading = false;
  events: TicketmasterEvent[] = [];
  selectedEvent: TicketmasterEvent | undefined;

  private subscription = new Subscription();

  constructor(private ticketmasterApiService: TicketmasterApiService) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  requestEventsOnArea(position: {lat: number; long: number}) {
    this.isLoading = true;
    const subscription = this.ticketmasterApiService
      .searchEvents({
        lat: position.lat,
        long: position.long,
        radius: 5,
      })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((response) => {
        this.events = response._embedded.events;
        // TODO Enrique: Handle error
      });
    this.subscription.add(subscription);
  }

  focusEvent(event: TicketmasterEvent) {
    this.selectedEvent = event;
  }
}
