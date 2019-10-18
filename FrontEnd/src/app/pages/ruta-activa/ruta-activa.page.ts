import { Component, OnInit,ViewChild, Inject, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';
import { DOCUMENT } from '@angular/common';

import { darkStyle } from './map-dark-style';

import {} from 'googlemaps';
import { RutaService } from '../../services/ruta.service';

@Component({
  selector: 'rutaActiva',
  templateUrl: './ruta-activa.page.html',
  styleUrls: ['./ruta-activa.page.scss'],
})
export class RutaActivaPage implements OnInit, AfterViewInit {

 // Gets a reference to the list element
 @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;
  ios: boolean;
  markerDestination: google.maps.Marker;
  queryText: string;
  geocode: any;
  destinoSeleccionado: boolean = true;
  map: google.maps.Map;
  modo: boolean = true;
  opciones: any;

  puntosRuta: google.maps.LatLng[];
  actualPosition: any;
  contador: number = 35;

  puntos: number = 100;
  co2: number = 0;
  paso: boolean = true;

  estaciones: any[] = new Array<any>();
  estacionesCard: any[] = new Array<any>();

  iconRojoUrl = 'data:image/png;base64,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';
  iconVerdeUrl = 'data:image/png;base64,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';

 constructor(
  @Inject(DOCUMENT) private doc: Document,
   public alertCtrl: AlertController,
   public loadingCtrl: LoadingController,
   public modalCtrl: ModalController,
   public router: Router,
   public toastCtrl: ToastController,
   public confData: ConferenceData,
   public user: UserData,
   public rutaService: RutaService,
   public config: Config
 ) { }

 ngOnInit() {
    this.loadingCtrl.create({
      duration: 3000,
      message: 'Cargando rutas',
    }).then((a) => {
      a.present();
    });
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

  this.confData.getMap().subscribe((mapData: any) => {
    const mapEle = this.mapElement.nativeElement;

    this.map = new googleMaps.Map(mapEle, {
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      center: mapData.find((d: any) => d.center),
      zoom: 11,
      styles: style
    });

    obtenerPosicionUsuario(this.map);
    placeMarkerAndPanTo(this.map);

    setTimeout(() => {
      trazarRuta(this.map, (res: google.maps.DirectionsResult) => {
        this.puntosRuta = res.routes[0].overview_path;

        this.estaciones.push(new google.maps.Marker({
          position: this.puntosRuta[40],
          map: this.map,
          icon: {
            url: this.iconRojoUrl,
            scaledSize: new google.maps.Size(60, 60)
          }
         }));
         this.estaciones.push(new google.maps.Marker({
          position: this.puntosRuta[50],
          map: this.map,
          icon: {
            url: this.iconRojoUrl,
            scaledSize: new google.maps.Size(60, 60)
          }
         }));
      });
    }, 1000);

    setTimeout(() => {
      trazarRuta(this.map, () => {});
    }, 2000);

    setTimeout(() => {
      trazarRuta(this.map, () => {});
    }, 3000);

    setTimeout(() => {
      this.map.panTo(this.puntosRuta[this.contador]);
      this.map.setZoom(18);
      
      setInterval(() => {
        if(this.actualPosition) {
          this.actualPosition.setMap(null);
        }
        this.actualPosition = new google.maps.Marker({
          position: {
            'lat': this.puntosRuta[this.contador].lat(),
            'lng': this.puntosRuta[this.contador].lng(),
          },
          map: this.map,
          icon: {
            url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABfUlEQVRIic2UP0sDQRDFf2fsPP+0VqJitDJfIChBSWkXu3wI7bSzVhsttVVRv0QwEuzSHqJgIfinMUo6hVjcW2+9XJK9oJAHw2RnZt/bzOwtDBhaMmcM/dNBUgkUgWMgsGIBcKRc31gArona0smqqk2FAtAQwROwBeSAEVkO2AaeVdPQHueTG/JTEXaCD5yp9g3Hf1LVhhPAc6j3LJFqr+IiUVt8l9MIPlG7fg0+fovW5Q+AZgqBJnCo36VuhYFOsZiC3CCnvUFSMn710rTHwE/g6fihuQw3jkQuE/Rkd1rP9CEwK39r8bWp1uTXrNgusJpAmAd2rLXZU0uo/YG5pi/AmGIlxSrAsqyimLkxE8CrYivdBDyiD+1c6wxwT/sAH4Bh1VwqdoXD/OaJnoqyYpsJAhvKlYmeimwvcoMl4B2oaz1qibaAD2BcubpyeVdygyzhc21eyX1LYE+xAmFL59KS25iUnwI+gS9gOpb7M1wQDt8ZmZQCj8CN/GDgGzh5bGskBNLRAAAAAElFTkSuQmCC',
            scaledSize: new google.maps.Size(20, 20)
          }
         });

         this.map.panTo(this.puntosRuta[this.contador]);

         if(this.contador === 40) {
          this.paso = false;
           this.rutaService.consultarDesplazamientoRutaId(17).subscribe((res: any[]) => {
            if(res[res.length-1].latitud === this.puntosRuta[this.contador].lat().toString() && 
              res[res.length-1].longitud === this.puntosRuta[this.contador].lng().toString()) {
                this.estaciones[0].icon.url = this.iconVerdeUrl;
                this.estacionesCard.push('Industriales');
                this.puntos += 50;
                this.contador++;
                this.paso = true;
            }
           });
         } else if(this.contador === 50) {
          this.paso = false;
          this.rutaService.consultarDesplazamientoRutaId(17).subscribe((res: any[]) => {
            if(res[res.length-1].latitud === this.puntosRuta[this.contador].lat().toString() && 
               res[res.length-1].longitud === this.puntosRuta[this.contador].lng().toString()) {
                this.estaciones[1].icon.url = this.iconVerdeUrl;
                this.estacionesCard.push('Poblado');
                this.puntos += 50;
                this.contador++;
                this.paso = true;
             }
          });
         }

         if(this.contador < this.puntosRuta.length - 1 && this.paso) {
          this.puntos += 0.2;
          this.co2 -= 0.4 * (google.maps.geometry.spherical.computeDistanceBetween (this.puntosRuta[this.contador], this.puntosRuta[this.contador + 1])/1000);
          this.contador++;
         }
      }, 1000);
    }, 4000);

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

function placeMarkerAndPanTo(map) {
  let destino = JSON.parse(localStorage.getItem('destino'));

  return new google.maps.Marker({
    position: {
      'lat': destino.lat,
      'lng': destino.lng
    },
    map: map,
    icon: {
      url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAAEFElEQVRYhe1Wb2gbZRx+LpdL8z/taNe0W12m20qxpeuUui8OqTC3fSg4kIkIE1SmQ1C7QbtO8YNDGCp+ERG/DDYpMvHPl0wdTkU2VLbWIp1L6VbSpE3a9JJcmlwu9+e91w/WdiGrzV0aQcgD+ZDfPc/vee73vnf3AjXUUMP/G8wG9bEA2AnAv/w/DuA2AL3SxpUG3Gpr9b1vsVt7nV0tDltbvQMAlKhQyE/E87qk/qbElk4AmPvPA1qbXIO2Vt+rWwb7/I5dTffsI00m6NzZH+NKLPOBxovvmfFhzYi4Zs8nDYc6jm07c6iJa3SteZNco4vZ1N/p0YR8r7qQC+g5OVj1gNxm93Fv385XWl/b11DW/BnA88g2uzIr3K8tZDN6Xh014md0iX32HY0Tu0ae3QpLsVRdyCI/HgcAOHtawW12F12nOsXU0xeihelkJ4Clcg0NTdDW5H7DP7DvoD2wybJS1CmyH15Hy88iju9+Eo8623Hn02vg/4yi7uEWgPn7RhiGgbXR5RJ/j2l6XvmpXE9DE7S11U+0f370Qca6mi97bhzPB/bj9MmhIu6Zd9/BuegVuI92r9SoSjD51PkJZVboKtfTsj5lBYzVa/feHY4qBM7xDIZPDJaQT588BcdYGlQlqw04FqzX7jPgaShgPVvvKNoS8qyAh7p7wDClC8EwDPZ074EcFYrq1ganBUBDNQISvaAW8VmnDXwquaaAT/Jg3XVFNV1SWABqNQJmiSAVfbo4vweh6G0kEokSciKRwGRsuuRpJhmJAMhVIyDVZZK8e08BAPtCFw4c6cfMzMxKLRwO44kj/WBfLH4WqEKgy4Q34AmrEbJeUL7OjUY7PXsDK5vO0eWH+JIVjx87DHsOAChkLwvLyx1wPNBYpM9ej+p6QfvCiKfRF3Wg4WDHL21vH/CvTy1FZPhSTLg8uRdAtFyNkSUGgLD4R4wnomJQBpCsjPzNeR4GwgFmDguUphmO3e/q2VK3PnkVi+dvZMRfIwNUI7eM6IxOECSnXEwHb8X1gla2Rs+rEL4NzRFJ+cqon5njFoWKpC6rfZ7e+xzlCOY/upYWx2Zfp4qx6QEmJggARJQ+y3wXuqMuZNflKvElCFemQiSnfGnGy1RAAFSJLz0TGb60CPovLJ0iciqYUGNLz5n0MXeiXkYKRG9mWGa3s6uFuxdh8cJoLns1/LFeUC+aNTE7QQCAyotDiyNjM3IkXXJNDqcoPzI2paXzb1biUVFAAJo6n+2PDAXjVFv9TFOVYGYoOKfy4mEAZG35+qhkif9BijJ0Tp5O9fke2+EAgOhbl5NSaHGAytrVSptvREDQvDZBUtJ2xsa2SzcXNOGbyREtJZ7diN4bCQvX7PmBa/Z+j8q3TtXgXP7VUEMNNSzjL1zdpFFH2FLKAAAAAElFTkSuQmCC',
      scaledSize: new google.maps.Size(50, 50)
    }
   });
}

function obtenerPosicionUsuario(map) {
  navigator.geolocation.getCurrentPosition((posicion) => {
    let destino = JSON.parse(localStorage.getItem('destino'));
    destino.latDest = posicion.coords.latitude;
    destino.lngDest = posicion.coords.longitude;
    localStorage.setItem('destino', JSON.stringify(destino));

    new google.maps.Marker({
      position: {
        'lat': posicion.coords.latitude,
        'lng': posicion.coords.longitude
      }, map: map,
      icon: {
        url: 'data:image/png;base64,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',
        scaledSize: new google.maps.Size(50, 50)
      }
    });
  }, (e) => {
    console.log('Error ' + e);
  });
}


function trazarRuta(map, resultado) {
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer({
    suppressMarkers: true
  });
  var destino = JSON.parse(localStorage.getItem('destino'));
  const request = <google.maps.DirectionsRequest>{};
   
  request.destination = destino.lat + ', ' + destino.lng,
  request.origin =  destino.latDest + ', ' + destino.lngDest,
  request.travelMode = google.maps.TravelMode.DRIVING;

  directionsService.route(request, function(result, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      resultado(result);
      directionsRenderer.setDirections(result);
      directionsRenderer.setMap(map);
    }
  });
}