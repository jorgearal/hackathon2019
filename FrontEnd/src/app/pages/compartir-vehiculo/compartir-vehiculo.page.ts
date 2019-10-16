import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { PersonaService } from '../../providers/persona-service';
import { Config, AlertController } from '@ionic/angular';
import { UserData } from '../../providers/user-data';
import { DOCUMENT } from '@angular/common';
import { ConferenceData } from '../../providers/conference-data';
import { darkStyle } from '../../../assets/js/map-dark-style';

@Component({
  selector: 'compartir-vehiculo',
  templateUrl: './compartir-vehiculo.page.html',
  styleUrls: ['./compartir-vehiculo.page.scss'],
})
export class CompartirVehiculoPage implements OnInit {

  cupos: number = 5;
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;
  ios: boolean;
  markerDestination: google.maps.Marker;

  registrar: boolean = true;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private personaService: PersonaService,
    public config: Config,
    public confData: ConferenceData,
    private alertCtrl: AlertController) {
    console.log("******************");
    console.log(this.personaService.servicioPrueba());
  }

  ngOnInit() {
    this.ios = this.config.get('mode') === 'ios';
    //consultar el ultimo viaje, para activar o desactivar el boton de inicial
  }


  registrarRuta() {
    console.log("*** Registrando ruta ***");
    
  }

  iniciarViaje() {
    console.log("*** Iniciando viaje ***");
  }

  cargarViajeActivo() {

  }

  presentConfirm() {
    const alert = this.alertCtrl.create({
      message: 'Esta seguro de compartir la ruta?',
      subHeader: 'Confirmación',
      buttons: [{
        text: 'Aceptar', handler: () => {
          this.registrarRuta();
        }
      }, {
        text: 'Cancel', handler: () => {
          console.log("Cancelar viaje..");
        }
      }]
    }).then(alert => alert.present());
  }

  
  presentConfirmStarRuta(){
    const alert = this.alertCtrl.create({
      message: 'Esta seguro de iniciar la ruta?',
      subHeader: 'Confirmación',
      buttons: [{
        text: 'Aceptar', handler: () => {
          this.iniciarViaje();
        }
      }, {
        text: 'Cancel', handler: () => {
          console.log("Cancelar viaje..");
        }
      }]
    }).then(alert => alert.present());
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
            map.setOptions({ styles: darkStyle });
          } else if (map) {
            map.setOptions({ styles: [] });
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
  if (marker) {
    marker.setMap(null);
  }

  map.panTo(latLng);
  return new google.maps.Marker({
    position: latLng,
    map: map
  });
}