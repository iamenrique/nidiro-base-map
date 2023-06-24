import {PagedResponse} from './paged-response';
import {TicketmasterEvent} from './ticketmaster-event';

interface SearchResponseContent {
  events: TicketmasterEvent[];
}

export type SearchResponse = PagedResponse<SearchResponseContent>;
