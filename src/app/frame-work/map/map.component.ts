import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { Imap } from 'interfaces/imap.js';
import { ITHV } from 'interfaces/ioverall-config';
import { IReadingReportGISReq, IReadingReportGISResponse } from 'interfaces/ireports';
import { IListManagerPDXY } from 'interfaces/itrackings';
import { filter } from 'rxjs/internal/operators/filter';
import { Subscription } from 'rxjs/internal/Subscription';
import { DateJalaliService } from 'services/date-jalali.service';
import { MapItemsService } from 'services/DI/map-items.service';
import { EnvService } from 'services/env.service';
import { MapService } from 'services/map.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { UtilsService } from 'services/utils.service';
import { MathS } from 'src/app/classes/math-s';


declare let L;

const iconRetinaUrl = 'assets/imgs/leaflet/marker-icon-2x.png';
const iconUrl = 'assets/imgs/leaflet/marker-icon.png';
const shadowUrl = 'assets/imgs/leaflet/marker-shadow.png';

const simpleIcon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const defaultIcon = L.Icon.extend({
  options: {
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
  }
})
const myIcon = L.Icon.extend({
  options: {
    shadowUrl,
    iconSize: [25, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  }
});
const iconSimple = new myIcon({ iconUrl: 'assets/imgs/leaflet/marker-icon.png' });
const markerGreen = new defaultIcon({ iconUrl: 'assets/imgs/leaflet/marker_blue.png' });
const markerRed = new defaultIcon({ iconUrl: 'assets/imgs/leaflet/marker_red.png' });
L.Marker.prototype.options.icon = simpleIcon;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  extraDataSourceRes: IReadingReportGISResponse[] = [];

  private map: L.Map;
  private mapItems: Imap[];
  private layerGroup = new L.FeatureGroup();
  private markersDataSourceXY: IListManagerPDXY[] = [];

  polyline_configs: number;
  isShowMap: boolean = true;
  canShowOptionsButton: boolean = false;
  isShowMapConfig: boolean = false;
  subscription: Subscription[] = [];

  _selectedOrderId: number = 0;
  orderGroup: ITHV[] = [
    {
      title: 'eshterak',
      header: 'اشتراک',
      value: 0
    },
    {
      title: 'time',
      header: 'زمان',
      value: 1
    }
  ]
  _isOrderInAsc: boolean = false;
  onShowCounterReader = {
    trackNumber: '', day: '', distance: null, isPerday: null
  }
  _isCluster: boolean;

  constructor(
    public mapService: MapService,
    readonly mapItemsService: MapItemsService,
    private readingReportManagerService: ReadingReportManagerService,
    public route: ActivatedRoute,
    private router: Router,
    private utilsService: UtilsService,
    private envService: EnvService,
    private dateJalaliService: DateJalaliService
  ) { }

  private getMapItems = () => {
    this.mapItems = this.mapItemsService.getMapItems();
  }
  private initMap = () => {
    const OSM = this.mapItems[0];
    const SATELLITE = this.mapItems[1];
    // const Esri = this.mapItems[2];
    const
      streets = L.tileLayer(this.envService.OSMmapBoxUrl),
      satellite = L.tileLayer(this.envService.SATELLITEMapBoxUrl + this.envService.SATELLITEMapAccessToken)
    // esri = L.tileLayer(
    //   Esri.mapBoxUrl)

    // only one of base layers should be added to the map at instantiation
    this.map = L.map('map', {
      center: this.envService.mapCenter,
      zoom: 15,
      minZoom: 4,
      layers: [streets, this.layerGroup]
    });

    const baseMaps = {
      "Satellite": satellite,
      "OSM": streets,
      // "ESRI": esri
    };
    const overlays = {
      "لایه ها": this.layerGroup
    };

    L.control.layers(baseMaps, overlays).addTo(this.map);
  }
  private leafletDrawPolylines = (delay: number) => {
    const lines = [];
    this.markersDataSourceXY.forEach((items, i) => {
      setTimeout(() => {
        if (parseFloat(items.y) === 0)
          return;
        lines.push([parseFloat(items.y), parseFloat(items.x)]);
        L.polyline(lines, {
          color: '#0e4c92',
          weight: 1
        }).addTo(this.layerGroup);
      }, i * delay);
    })
  }
  private classWrapper = async () => {
    this.onShowCounterReader.trackNumber = this.route.snapshot.paramMap.get('trackNumber');
    this.onShowCounterReader.day = this.route.snapshot.paramMap.get('day');
    this.onShowCounterReader.isPerday = this.route.snapshot.paramMap.get('isPerday');
    this.canShowOptionsButton = true;

    if (this.onShowCounterReader.isPerday)
      this.markersDataSourceXY = await this.mapService.getXY(this.onShowCounterReader.trackNumber);
    else
      this.markersDataSourceXY = await this.mapService.getPointerMarks(this.onShowCounterReader);

    if (!this.mapService.validateGISAccuracy(this.markersDataSourceXY)) {
      this.utilsService.snackBarMessageWarn(EN_messages.notFound);
      return;
    }
    this.mapConfigOptions(200);
  }
  private makeClusterRouteObject = (): IReadingReportGISReq => {
    return {
      zoneId: parseInt(this.route.snapshot.paramMap.get('zoneId')),
      isCounterState: this.route.snapshot.paramMap.get('isCounterState') === 'true' ? true : false,
      counterStateId: parseInt(this.route.snapshot.paramMap.get('counterStateId')),
      isKarbariChange: this.route.snapshot.paramMap.get('isKarbariChange') === 'true' ? true : false,
      isAhadChange: this.route.snapshot.paramMap.get('isAhadChange') === 'true' ? true : false,
      isForbidden: this.route.snapshot.paramMap.get('isForbidden') === 'true' ? true : false,
      readingPeriodId: parseInt(this.route.snapshot.paramMap.get('readingPeriodId')),
      year: parseInt(this.route.snapshot.paramMap.get('year')),
      fromDate: this.route.snapshot.paramMap.get('fromDate'),
      toDate: this.route.snapshot.paramMap.get('toDate'),
      isCluster: this.route.snapshot.paramMap.get('isCluster') === 'true' ? true : false,
    }
  }
  private classWrapperCluster = async () => {
    this.extraDataSourceRes = await this.readingReportManagerService.portRRTest(ENInterfaces.ListToGis, this.makeClusterRouteObject());

    if (this.extraDataSourceRes.length === 0) {
      this.utilsService.snackBarMessageWarn(EN_messages.notFound);
      return;
    }
    this._isCluster ? this.extrasConfigOptionsCluster(this.extraDataSourceRes) : this.extrasConfigOptions(this.extraDataSourceRes);
  }
  private getRouteParams = () => {
    this.onShowCounterReader.distance = this.route.snapshot.paramMap.get('distance');

    if (!MathS.isNull(this.onShowCounterReader.distance)) {
      this.classWrapper();
      return;
    }
    this._isCluster = this.route.snapshot.paramMap.get('isCluster') == 'true' ? true :
      this.route.snapshot.paramMap.get('isCluster') == 'false' ? false : null
    if (this._isCluster == false || this._isCluster == true)
      this.classWrapperCluster();
  }
  ngOnInit(): void {
    this.getMapItems();
    this.initMap();
    this.getRouteParams();
    this.mapService.serviceInstantiate(this.map);
    this.mapService.addButtonsToLeaflet();
    this.removeLayerButtonLeaflet();
    this.myLocationButtonLeaflet();
  }
  private flyToDes = (lat: number, lag: number, zoom: number) => {
    if (lat === 0 || lag === 0)
      return;
    lat = parseFloat(lat.toString().substring(0, 6));
    lag = parseFloat(lag.toString().substring(0, 6));

    this.map.flyTo([(lat), (lag)], zoom);
  }
  private panToDes = (lat: number, lag: number) => {
    if (lat === 0 || lag === 0)
      return;
    lat = parseFloat(lat.toString().substring(0, 6));
    lag = parseFloat(lag.toString().substring(0, 6));

    this.map.panTo([(lat), (lag)]);
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
  // get X Y positions
  private getXYPosition = (method: string, xyData: any, delay?: number) => {
    xyData.map((items, i) => {
      setTimeout(() => {
        this[method](parseFloat(items.y), parseFloat(items.x), items);
        this.panToDes(parseFloat(items.y), parseFloat(items.x));
      }, i * delay);
    })
  }
  private markingOnMapNClusterNDelay = (method: string, xyData: any) => {
    this.flyToDes(this.envService.mapCenter[0], this.envService.mapCenter[1], 12);
    xyData.map((items, i) => {
      this[method](parseFloat(items.y), parseFloat(items.x), items);
    })
  }
  private getXYMarkerClusterPosition = (xyData: any) => {
    const markers = new L.markerClusterGroup();
    xyData.map((items) => {
      this.flyToDes(this.envService.mapCenter[0], this.envService.mapCenter[1], 11);
      markers.addLayer(L.marker([parseFloat(items.y), parseFloat(items.x)]).bindPopup(
        `${items.info1} <br>` + `${items.info2} <br> ${items.info3}`
      ));
    })
    this.layerGroup.addLayer(markers);
  }
  // 

  mapConfigOptions = (delay: number) => {
    this.removeAllLayers();

    if (this._selectedOrderId === 0) {
      this._isOrderInAsc ? this.markersDataSourceXY.sort(this.dateJalaliService.sortByEshterak) : this.markersDataSourceXY.sort(this.dateJalaliService.sortByEshterakDESC)
    }
    else {
      this._isOrderInAsc ? this.markersDataSourceXY.sort(this.dateJalaliService.sortByDatePersian) : this.markersDataSourceXY.sort(this.dateJalaliService.sortByDateDESCPersian)
    }

    this.getXYPosition('circleToLeaflet', this.markersDataSourceXY, delay);
    this.leafletDrawPolylines(delay);
  }
  private extrasConfigOptions = (xyData: any) => {
    this.removeAllLayers();
    this.markingOnMapNClusterNDelay('markWithoutCluster', xyData);
  }
  private extrasConfigOptionsCluster = (xyData: any) => {
    this.removeAllLayers();
    this.getXYMarkerClusterPosition(xyData);
  }
  showDashboard = (isShowMap: boolean) => {
    this.isShowMap = isShowMap;
    if (isShowMap) {
      this.router.navigate(['../wr']);
    }
    else {
      this.router.navigate(['wr/db']);
    }
    this.changeRouteDetected();
  }
  changeRouteDetected = () => {
    this.subscription.push(this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(res => {
        if (!res)
          return;
        if (this.router.url == '/wr')
          this.isShowMap = true;
      })
    )
  }
  private removeAllLayers = () => {
    this.layerGroup.clearLayers();
  }
  private removeLayerButtonLeaflet = () => {
    L.easyButton('fa-close', () => {
      this.removeAllLayers();
    }, 'بستن تمامی لایه ها').addTo(this.map);
  }
  private circleToLeaflet = (lat: number, lng: number, items) => {
    if (lat === 0)
      return;
    L.marker([lat, lng], { weight: 4, radius: 3, icon: items.counterStateTitle === 'بسته' ? markerRed : markerGreen }).addTo(this.layerGroup)
      .bindPopup(
        `${items.firstName}` + `${items.sureName} <br> ${items.eshterak}`,
      );
  }
  private markWithoutCluster = (lat: number, lng: number, items) => {
    if (lat === 0)
      return;
    L.circleMarker([lat, lng], { weight: 4, radius: 3, color: '#116fff' }).addTo(this.layerGroup)
      .bindPopup(
        `${items.info1} <br>` + `${items.info2} <br> ${items.info3}`
      );
  }
  private findMyLocationLeaflet = (e) => {
    const radius = parseFloat(MathS.getRange(e.accuracy));
    L.marker(e.latlng, { icon: iconSimple }).addTo(this.layerGroup)
      .bindPopup("شما در حدود تقریبی " + radius + " متر از این مکان قرار دارید").openPopup();

    this.flyToDes(e.latlng.lat, e.latlng.lng, 16);
  }
  private onLocationError = (e) => {
    alert(e.message);
  }
  private myLocationButtonLeaflet = () => {
    L.easyButton('fa-map-marker', () => {
      this.map.locate({ setView: true, maxZoom: 14 });
      this.removeAllLayers();
      this.map.on('locationfound', this.findMyLocationLeaflet);
      this.map.on('locationerror', this.onLocationError);
    }, 'مکان من').addTo(this.map);
  }
}