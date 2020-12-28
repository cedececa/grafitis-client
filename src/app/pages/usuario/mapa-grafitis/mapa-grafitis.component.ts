import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import {  NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { PublicacionEntity } from 'src/app/core/entities/publicacion.entity';
import { CreateGrafitisComponent } from './create-grafitis/create-grafitis.component';
import { GrafitisDetailComponent } from './grafitis-detail/grafitis-detail.component';
import { MapaGrafitisService } from './mapa-grafitis.service';

@Component({
  selector: 'app-mapa-grafitis',
  templateUrl: './mapa-grafitis.component.html',
  styleUrls: ['./mapa-grafitis.component.css'],
})
export class MapaGrafitisComponent implements OnInit {
  zoom = 12;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };
  markers$: Observable<any[]>;

  constructor(
    private nzModalService: NzModalService,
    private mapaGrafitisService: MapaGrafitisService,

  ) {}
  ngOnInit() {
    this.center = {
      lat: 36.7213028,
      lng: -4.4216366,
    };
    this.markers$ = this.mapaGrafitisService.entities$;

    /* this.mapaGrafitisService.entities$.subscribe(d=>{
      console.log(d)
    }) */
  }
  ngAfterViewInit() {
    this.initPanCurrentLocation();
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++;
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--;
  }

  openCreateGrafitisModal() {
    this.nzModalService.create({
      nzTitle: 'Crear Grafitis',
      nzContent: CreateGrafitisComponent,
      /* nzComponentParams: params, */
      nzWidth: '500px',
      nzFooter: null,
    });
  }

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  infoWindow: google.maps.InfoWindow;

  initPanCurrentLocation() {
    this.infoWindow = new google.maps.InfoWindow();
    const locationButton = document.createElement('button');
    locationButton.textContent = 'Centrar a tu ubicación actual';
    locationButton.classList.add('custom-map-control-button');

    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      locationButton
    );

    locationButton.addEventListener('click', () => {
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: any) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            this.infoWindow.setPosition(pos);
            this.infoWindow.setContent('Location found.');
            //this.infoWindow.open(this.map);
            this.map.center = pos;
          },
          () => {
            this.handleLocationError(
              true,
              this.infoWindow,
              this.map.getCenter()
            );
          }
        );
      } else {
        // Browser doesn't support Geolocation
        this.handleLocationError(false, this.infoWindow, this.map.getCenter());
      }
    });
  }

  handleLocationError(
    browserHasGeolocation: boolean,
    infoWindow: google.maps.InfoWindow,
    pos: google.maps.LatLng
  ) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? 'Error: The Geolocation service failed.'
        : "Error: Your browser doesn't support geolocation."
    );
    //infoWindow.open(this.map);
  }
  openGrafitiDetailModal(marker: any) {
    console.log(marker.publicacion);
    this.nzModalService.create({
      nzTitle: 'Detalles de Grafiti',
      nzContent: GrafitisDetailComponent,
      nzComponentParams: {
        publicacion: marker.publicacion,
      } as any,
      nzWidth: '60%',
      nzFooter: null,
    });
  }

  autorToBeSearched: string;
  filterByAutor(autor: string) {
    if (autor&&autor.length > 0) {
      this.mapaGrafitisService.filterByAutor(autor).subscribe();
    } else {
      this.mapaGrafitisService.getAll().subscribe();
    }
  }
}
