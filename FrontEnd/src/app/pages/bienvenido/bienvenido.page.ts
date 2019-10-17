import { Component, OnInit, ViewChild, Inject, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';
import { Destino } from '../../interfaces/destino';
import { DOCUMENT } from '@angular/common';

import { darkStyle } from './map-dark-style';

import {} from 'googlemaps';

@Component({
  selector: 'bienvenido',
  templateUrl: './bienvenido.page.html',
  styleUrls: ['./bienvenido.page.scss'],
})
export class BienvenidoPage implements OnInit, AfterViewInit {

 // Gets a reference to the list element
 @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;

  ios: boolean;
  markerDestination: google.maps.Marker;
  queryText: string;
  geocode: any;
  destinoSeleccionado = true;
  destino: Destino;
  map: google.maps.Map;

 constructor(
  @Inject(DOCUMENT) private doc: Document,
   public alertCtrl: AlertController,
   public loadingCtrl: LoadingController,
   public modalCtrl: ModalController,
   public router: Router,
   public toastCtrl: ToastController,
   public confData: ConferenceData,
   public user: UserData,
   public config: Config
 ) { }

 ngOnInit() {
   this.ios = this.config.get('mode') === 'ios';
 }

 buscarRuta() {
   this.router.navigate(['/app/tabs/buscarRuta']);
 }

 buscarDireccion() {
    if (this.queryText) {
      console.log('buscanado direccion: ' + this.queryText);
      if (this.markerDestination) {
        this.markerDestination.setMap(null);
      }
      codeAddress(this.queryText, (e) => {
        this.markerDestination = placeMarkerAndPanTo(e, this.map);
        if (this.markerDestination) {
          this.escribirDestino(this.queryText);
          this.destinoSeleccionado = false;
        }
      });
    }
 }

 escribirDestino(direccion) {
  this.destino = {
    lat: this.markerDestination.getPosition().lat(),
    lng: this.markerDestination.getPosition().lng(),
    direccion: direccion
  };
  localStorage.setItem('destino', JSON.stringify(this.destino));
 }

 async ngAfterViewInit() {
  const appEl = this.doc.querySelector('ion-app');
  let isDark = false;
  let style = [];
  if (appEl.classList.contains('dark-theme')) {
    style = darkStyle;
  }

  const googleMaps = await getGoogleMaps(
    'AIzaSyB8pf6ZdFQj5qw7rc_HSGrhUwQKfIe9ICw'
  );

  this.confData.getMap().subscribe((mapData: any) => {
    const mapEle = this.mapElement.nativeElement;

    this.map = new googleMaps.Map(mapEle, {
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      center: mapData.find((d: any) => d.center),
      zoom: 15,
      styles: style
    });

    this.map.addListener('click', (e) => {
      if (this.markerDestination) {
        this.markerDestination.setMap(null);
      }
      this.markerDestination = placeMarkerAndPanTo(e.latLng, this.map);

      if (!this.geocode) {
        this.geocode = new google.maps.Geocoder();
      }

      // console.log(this.markerDestination.getPosition().lat(), this.markerDestination.getPosition().lng());

      this.geocode.geocode({'location': this.markerDestination.getPosition()}, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            this.map.setZoom(18);
            this.queryText = results[0].formatted_address;
            this.destinoSeleccionado = false;
            this.escribirDestino(results[0].formatted_address);
            console.log(results[0].formatted_address);
          }
        }
      });
    });

    googleMaps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
    });
  });

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        const el = mutation.target as HTMLElement;
        isDark = el.classList.contains('dark-theme');
        if (this.map && isDark) {
          this.map.setOptions({styles: darkStyle});
        } else if (this.map) {
          this.map.setOptions({styles: []});
        }
      }
    });
  });
  observer.observe(appEl, {
    attributes: true
  });
 }
}

function codeAddress(direccion, funcRetorno) {
  // tslint:disable-next-line:prefer-const
  const geocoder = new google.maps.Geocoder();
  const address = direccion;
  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      funcRetorno(results[0].geometry.location);
    }
  });
}

function getGoogleMaps(apiKey: string): Promise<any> {
  const win = window as any;
  const googleModule = win.google;
  if (googleModule && googleModule.maps) {
    return Promise.resolve(googleModule.maps);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.31`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      const googleModule2 = win.google;
      if (googleModule2 && googleModule2.maps) {
        resolve(googleModule2.maps);
      } else {
        reject('google maps not available');
      }
    };
  });
}

function placeMarkerAndPanTo(latLng, map) {
  map.panTo(latLng);
  return new google.maps.Marker({
    position: latLng,
    map: map
  });
}
