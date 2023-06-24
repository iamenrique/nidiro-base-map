import {Component, OnInit} from '@angular/core';
import {TicketmasterApiService} from './services/ticketmaster/ticketmaster-api.service';

@Component({
  selector: 'nid-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'nidiro-base-map';

  constructor(private ticketmasterApiService: TicketmasterApiService) {}

  ngOnInit() {
    this.ticketmasterApiService
      .searchEvents({
        lat: 20.7752898,
        long: -100.7226562,
        radius: 200,
      })
      .subscribe((response) => {
        console.log('\x1B[46;97m>>>>>>', response);
        response._embedded.events.forEach((r) => {
          console.log('\x1B[46;97m>>>>>>', r);
        });
      });
  }
}
