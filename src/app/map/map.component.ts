import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Feature, Map, View} from 'ol';
import {KnownPlaces} from './known-places';
import {fromLonLat} from 'ol/proj';
import {OSM} from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import {Circle, Point} from 'ol/geom';
import {Style} from 'ol/style';

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
    const featureOverlay = new VectorLayer({
      source: new VectorSource(),
      map: this.olMap,
    });
    const areaFeature = new Feature({
      geometry: new Circle(fromLonLat(initialPosition.lonLat), 500),
    });
    featureOverlay.getSource()?.addFeature(areaFeature);

    this.olMap.on('singleclick', (ev) => {
      areaFeature.getGeometry()?.setCenter(ev.coordinate);
    });
  }
}
