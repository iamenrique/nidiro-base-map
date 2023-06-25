import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import {Feature, Map, View} from 'ol';
import {KnownPlaces} from './known-places';
import {fromLonLat, toLonLat} from 'ol/proj';
import {OSM} from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import {Circle, Point} from 'ol/geom';
import {CommunicationService} from '../services/communication.service';
import {TicketmasterEvent} from '../services/ticketmaster/models/ticketmaster-event';
import {Subscription} from 'rxjs';

@Component({
  selector: 'nid-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements AfterViewInit, OnDestroy {
  private olMap: Map | undefined;
  private featureOverlay: VectorLayer<VectorSource> | undefined;
  private subscriptions = new Subscription();

  @Output() areaMoved = new EventEmitter<{lat: number; long: number}>();

  @ViewChild('mapEl') mapEl: ElementRef<HTMLDivElement> | undefined;

  constructor(private communicationService: CommunicationService) {}

  ngAfterViewInit() {
    const initialPosition = KnownPlaces.MexicoCity;
    this.olMap = new Map({
      view: new View({
        center: fromLonLat(initialPosition.lonLat),
        zoom: initialPosition.zoom,
        minZoom: 3,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: this.mapEl?.nativeElement,
    });
    this.featureOverlay = new VectorLayer({
      source: new VectorSource(),
      map: this.olMap,
    });
    const areaFeature = new Feature({
      geometry: new Circle(fromLonLat(initialPosition.lonLat), 500),
    });
    this.featureOverlay.getSource()?.addFeature(areaFeature);

    this.olMap.on('singleclick', (ev) => {
      areaFeature.getGeometry()?.setCenter(ev.coordinate);
      const lonLat = toLonLat(ev.coordinate);
      this.areaMoved.emit({long: lonLat[0], lat: lonLat[1]});
    });

    this.watchForEventSelectionChanges();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private refreshFocusedEvent(eventToHighlight: TicketmasterEvent) {
    const location = eventToHighlight._embedded.venues[0].location;
    if (!location) return;
    this.featureOverlay?.getSource()?.addFeature(
      new Feature({
        geometry: new Point(fromLonLat([+location.longitude, +location.latitude])),
      })
    );
  }

  private watchForEventSelectionChanges() {
    const subscription = this.communicationService.watchForSelectionChanges().subscribe((event) => {
      this.refreshFocusedEvent(event);
    });

    this.subscriptions.add(subscription);
  }
}
