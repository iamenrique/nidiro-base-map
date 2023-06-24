import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Map, View} from 'ol';
import {KnownPlaces} from './known-places';
import {fromLonLat} from 'ol/proj';
import {OSM} from 'ol/source';
import TileLayer from 'ol/layer/Tile';

@Component({
  selector: 'nid-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements AfterViewInit {
  private olMap: Map | undefined;

  @ViewChild('mapEl') mapEl: ElementRef<HTMLDivElement> | undefined;

  ngAfterViewInit() {
    console.log('\x1B[46;97m>>>>>>', this.mapEl);
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
  }
}
