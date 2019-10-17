import { Component, OnInit,ViewChild, Inject, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';
import { DOCUMENT } from '@angular/common';

import { darkStyle } from './map-dark-style';

import {} from 'googlemaps';

@Component({
  selector: 'buscarRuta',
  templateUrl: './buscar-ruta.page.html',
  styleUrls: ['./buscar-ruta.page.scss'],
})
export class BuscarRutaPage implements OnInit, AfterViewInit {

 // Gets a reference to the list element
 @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;

  ios: boolean;
  markerDestination: google.maps.Marker;
  queryText: string;
  geocode: any;
  destinoSeleccionado: boolean = true;

  modo: boolean = true;
  opciones: any;

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
   /*
    this.loadingCtrl.create({
      duration: 4000,
      message: 'Cargando rutas',
    }).then((a) => {
      a.present();
    });
    */
   this.listarOpciones();
    this.ios = this.config.get('mode') === 'ios';
 }

 cambiarModo(modo: string) {
  if(modo === 'eco') {
    this.modo = true;
  } else if(modo === 'otros') {
    this.modo = false;
  }
  this.listarOpciones();
 }

 listarOpciones() {
  if(!this.modo) {
    this.confData.getTrivago().subscribe((otrosData: any) => {
      this.opciones = otrosData;
    });
  } else {
    this.confData.getOtros().subscribe((otrosData: any) => {
      this.opciones = otrosData;
    });
  }
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

  let map;

  this.confData.getMap().subscribe((mapData: any) => {
    const mapEle = this.mapElement.nativeElement;

    map = new googleMaps.Map(mapEle, {
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      center: mapData.find((d: any) => d.center),
      zoom: 15,
      styles: style
    });

    map.addListener('click', (e) => {
      this.markerDestination = placeMarkerAndPanTo(e.latLng, map, this.markerDestination);
      
      if(!this.geocode) {
        this.geocode = new google.maps.Geocoder();
      }
      console.log(this.markerDestination.getPosition().lat(), this.markerDestination.getPosition().lng());
      this.geocode.geocode({'location': this.markerDestination.getPosition()}, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            map.setZoom(18);
            this.queryText = results[0].formatted_address;
            this.destinoSeleccionado = false;
            console.log(results[0].formatted_address);
          }
        }
      });
    });

    googleMaps.event.addListenerOnce(map, 'idle', () => {
      mapEle.classList.add('show-map');
    });
  });

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        const el = mutation.target as HTMLElement;
        isDark = el.classList.contains('dark-theme');
        if (map && isDark) {
          map.setOptions({styles: darkStyle});
        } else if (map) {
          map.setOptions({styles: []});
        }
      }
    });
  });
  observer.observe(appEl, {
    attributes: true
  });
 }
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

function placeMarkerAndPanTo(latLng, map, marker) {
  if(marker) {
    marker.setMap(null);
  }
  
  map.panTo(latLng);
  return new google.maps.Marker({
    position: latLng,
    map: map
  });
}
