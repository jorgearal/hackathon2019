import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { PersonaService } from '../../providers/persona-service';
import { Config, AlertController } from '@ionic/angular';
import { UserData } from '../../providers/user-data';
import { DOCUMENT } from '@angular/common';
import { ConferenceData } from '../../providers/conference-data';
import { darkStyle } from '../../../assets/js/map-dark-style';
import { Router } from '@angular/router';
import { Ruta } from '../../models/ruta-model';

var map;

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
  queryText: string;
  ruta: Ruta;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private personaService: PersonaService,
    public config: Config,
    public confData: ConferenceData,
    private alertCtrl: AlertController, private router: Router) {
    console.log("******************");
    console.log(this.personaService.servicioPrueba());
    this.ruta = new Ruta();
    this.registrar =true;
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


  presentConfirmStarRuta() {
    if (this.ruta.id) {
      this.router.navigateByUrl('/iniciarViaje/' + this.ruta.id);
    } else {
      console.log(">>>> No hay ruta seleccionada..");
      
    }


    /*const alert = this.alertCtrl.create({
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
    }).then(alert => alert.present());*/
  }

  buscarDireccion() {
    if (this.queryText) {
      console.log("buscanado direccion: " + this.queryText);

      codeAddress(map, this.queryText);

    }
  }

  calcularRuta() {
    console.log("----------------------------------77 ------------------------------");
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    var haight = new google.maps.LatLng(6.2381291999999995, -75.5858772);
    var oceanBeach = new google.maps.LatLng(37.7683909618184, -122.51089453697205);
    var mapOptions = {
      zoom: 14,
      center: haight
    }
    //var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsRenderer.setMap(map);

    var selectedMode = 'DRIVING';// document.getElementById('mode').value;
    var request = {
      origin: haight,
      destination: oceanBeach,
      // Note that JavaScript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: google.maps.TravelMode[selectedMode]
    };
    console.log("----------------------------------88 ------------------------------");
    directionsService.route(request, function (response, status) {
      console.log(">>>>>>>>> status : " + status);
      if (status == 'OK') {
        directionsRenderer.setDirections(response);
      }
    });

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

    //let map;

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
        var geocode = new google.maps.Geocoder();
        geocode.geocode({ 'location': this.markerDestination.position }, (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              map.setZoom(18);

              this.queryText = results[0].formatted_address;
              this.queryText = results[0].formatted_address;

              console.log(results[0]);
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

    obtener();

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
var markers = [];

function codeAddress(map, direccion) {
  var geocoder;
  geocoder = new google.maps.Geocoder();
  var address = direccion;
  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status == 'OK') {
      setAllMap(map);
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
      markers.push(marker);
      console.log("Encontre!! la ruta");

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function agregarPuntoActual(latitud, longitud) {
  var marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: { lat: latitud, lng: longitud }
  });
}

function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}

function obtener() { navigator.geolocation.getCurrentPosition(mostrar, gestionarErrores); }


function mostrar(posicion) {
  console.log("Latitud " + posicion.coords.latitude);
  console.log("Longitud " + posicion.coords.longitude);
  console.log("Longitud " + posicion.coords.accuracy);
  agregarPuntoActual(posicion.coords.latitude, posicion.coords.longitude);
}

function gestionarErrores(error) {
  console.log("Error " + error);
}

var haight;
var oceanBeach;

function initMap() {
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();
  haight = new google.maps.LatLng(6.2381291999999995, -75.5858772);
  oceanBeach = new google.maps.LatLng(37.7683909618184, -122.51089453697205);
  var mapOptions = {
    zoom: 14,
    center: haight
  }
  //var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  directionsRenderer.setMap(map);
}


/*function calcRoute() {
  var selectedMode = document.getElementById('mode').value;
  var request = {
    origin: haight,
    destination: oceanBeach,
    // Note that JavaScript allows us to access the constant
    // using square brackets and a string value as its
    // "property."
    travelMode: google.maps.TravelMode[selectedMode]
  };
  directionsService.route(request, function (response, status) {
    if (status == 'OK') {
      directionsRenderer.setDirections(response);
    }
  });
}*/