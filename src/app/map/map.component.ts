import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
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
import {TicketmasterEvent} from '../services/ticketmaster/models/ticketmaster-event';

@Component({
  selector: 'nid-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnChanges, AfterViewInit {
  @Input() eventToHighlight: TicketmasterEvent | undefined;
  private olMap: Map | undefined;
  private featureOverlay: VectorLayer<VectorSource> | undefined;

  @Output() areaMoved = new EventEmitter<{lat: number; long: number}>();

  @ViewChild('mapEl') mapEl: ElementRef<HTMLDivElement> | undefined;

  ngOnChanges(changes: SimpleChanges) {
    const eventToHighlightChange = changes['eventToHighlight'];
    if (eventToHighlightChange) {
      this.refreshFocusedEvent();
    }
  }

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
  }

  private refreshFocusedEvent() {
    const location = this.eventToHighlight?._embedded.venues[0].location;
    if (!location) return;
    this.featureOverlay?.getSource()?.addFeature(
      new Feature({
        geometry: new Point([+location.longitude, +location.latitude]),
      })
    );
  }
}
