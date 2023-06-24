import {Component, OnDestroy} from '@angular/core';
import {TicketmasterApiService} from './services/ticketmaster/ticketmaster-api.service';
import {finalize, Subscription} from 'rxjs';

@Component({
  selector: 'nid-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  isLoading = false;

  private subscription = new Subscription();

  constructor(private ticketmasterApiService: TicketmasterApiService) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  requestEventsOnArea(position: {lat: number; long: number}) {
    console.log('\x1B[46;97m>>>>>>', position);
    this.isLoading = true;
    const subscription = this.ticketmasterApiService
      .searchEvents({
        lat: position.lat,
        long: position.long,
        radius: 200,
      })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((response) => {
        response._embedded.events.forEach((r) => {
          console.log('\x1B[46;97m>>>>>>', r);
        });
        // TODO Enrique: Handle error
      });
    this.subscription.add(subscription);
  }
}
