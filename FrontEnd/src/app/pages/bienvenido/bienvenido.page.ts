import { Component, OnInit,ViewChild, Inject, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';
import { DOCUMENT } from '@angular/common';

import { darkStyle } from './map-dark-style';

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
      console.log(this.markerDestination);
      
      //console.log(this.markerDestination.position);
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

 /*
 async presentFilter() {
   const modal = await this.modalCtrl.create({
     component: ScheduleFilterPage,
     componentProps: { excludedTracks: this.excludeTracks }
   });
   await modal.present();

   const { data } = await modal.onWillDismiss();
   if (data) {
     this.excludeTracks = data;
     // this.updateSchedule();
   }
 }
 */
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