import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SearchRequestParams} from './models';
import {SearchResponse} from './models/search-response';

@Injectable({
  providedIn: 'root',
})
export class TicketmasterApiService {
  constructor(private httpClient: HttpClient) {}

  searchEvents(params: SearchRequestParams) {
    const {lat, long, radius} = params;
    const unit = 'km';
    const url = `${environment.ticketmaster.api.host}/discovery/v2/events`;
    const httpParams: HttpParams = new HttpParams({
      fromObject: {
        apikey: environment.ticketmaster.api.key,
        latlong: `${lat},${long}`,
        radius,
        unit,
        locale: '*',
      },
    });

    return this.httpClient.get<SearchResponse>(url, {params: httpParams});
  }
}
