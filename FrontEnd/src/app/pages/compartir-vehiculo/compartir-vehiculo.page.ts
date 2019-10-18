import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { PersonaService } from '../../providers/persona-service';
import { Config, AlertController } from '@ionic/angular';
import { UserData } from '../../providers/user-data';
import { DOCUMENT } from '@angular/common';
import { ConferenceData } from '../../providers/conference-data';
import { darkStyle } from '../../../assets/js/map-dark-style';
import { Router } from '@angular/router';
import { Ruta } from '../../models/ruta-model';
import { Destino } from '../../interfaces/destino';

import { } from 'googlemaps';
import { DestinoMap } from '../../models/destino.model';
import { RutaService } from '../../services/ruta.service';
import { Persona } from '../../models/persona-model';
import { VehiculoService } from '../../services/vehiculo.service';
import { Constantes } from '../../shared/constantes';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'compartir-vehiculo',
  templateUrl: './compartir-vehiculo.page.html',
  styleUrls: ['./compartir-vehiculo.page.scss'],
})
export class CompartirVehiculoPage implements OnInit {

  cupos = 5;
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;
  ios: boolean;
  markerDestination: google.maps.Marker;

  registrar = true;
  queryText: string;
  ruta: Ruta;
  map: google.maps.Map;
  destinoSeleccionado = true;
  destino: DestinoMap;
  origen: Destino;

  infoVehiculo: any;
  infoRuta: any;
  infoUsuario: any;

  visible: boolean = false;

  newRuta: any = { "numeroPersonas": "7" };
  maxcupos: number = 5;

  fechaSelected: string;
  horaSelected: string;
  showError: boolean = false;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private personaService: PersonaService,
    public config: Config,
    public confData: ConferenceData,
    private alertCtrl: AlertController,
    private router: Router,
    private rutaService: RutaService,
    private vehiculoService: VehiculoService) {

    this.ruta = new Ruta();
    this.registrar = true;
    this.origen = new DestinoMap();

  }

  ngOnInit() {
    this.ios = this.config.get('mode') === 'ios';
    //consultar el ultimo viaje, para activar o desactivar el boton de inicial
    this.cargarUsuarioSesion();
  }

  cargarUsuarioSesion() {
    this.infoUsuario = JSON.stringify(localStorage.getItem("usuario"));
    if (this.infoUsuario && this.infoUsuario.id != null) {
      this.consultarInfoVehiculo(this.infoUsuario.id);
    } else {
      this.consultarInfoVehiculo(1);
    }
  }

  consultarInfoVehiculo(idPersona) {
    this.vehiculoService.consultarVehiculoXIdPersona(idPersona).subscribe(
      (data) => {
        this.infoVehiculo = data[0];
        this.maxcupos = this.infoVehiculo.numeroPuestos;
        this.newRuta.numeroPersonas = this.maxcupos;
        this.newRuta.vehiculo = this.infoVehiculo;
        this.newRuta.cupo = this.maxcupos;
        console.log("=============== Vehiculo 7777 ===============" + this.infoVehiculo.numeroPuestos);
        console.log(JSON.stringify(this.infoVehiculo));
        this.consultarRutaActiva(this.infoVehiculo.id);
      },
      (error) => {
        this.mostrarMensaje(Constantes.MENSAJE_ERROR_SERVICIO);
      });
  }

  consultarRutaActiva(idvehiculo) {
    this.rutaService.consultarRutaXVehiculoId(idvehiculo).subscribe(
      (data) => {
        console.log("++++++++++++++++1111111");

        console.log(">>>>>>>>>>>>>>>>2222222" + JSON.stringify(data));
        if (data.rutas.length > 0) {
          this.infoRuta = data.rutas[0];
          this.visible = true;
          this.mostrarMensaje("Ya tiene una ruta activa para la dirección " + this.infoRuta.destino.direccion + ".");
          this.registrar = false;
          this.pintarRutaViaje();
        } else {
          this.registrar = true;
        }

        console.log("=============== Ruta ===============");
        console.log(JSON.stringify(this.infoRuta));
      },
      (error) => { this.mostrarMensaje(Constantes.MENSAJE_ERROR_SERVICIO); });
  }

  cambiarPasajeros(ev: any) {
    console.log(ev.detail.value);
    this.newRuta.numeroPersonas = ev.detail.value;
  }


  registrarRuta() {
    var error = false;
    if (!this.fechaSelected) {
      error = true;
    }

    if (!this.destino) {
      error = true;
    }

    if (!this.origen) {
      error = true;
    }

    if (error) {
      this.mostrarMensaje("Debe ingresar información en los campos marcados como obligatorios");
      return;
    }
    var fechaRuta = new Date(this.fechaSelected + " " + this.horaSelected);


    this.newRuta.fechaSalida = 
    this.newRuta.estado = 0;

    console.log('*** Registrando ruta ***');
    this.newRuta.numeroPersonas = this.cupos;

    var origen = {};
    origen.latitud = this.origen.lat;
    origen.longitud = this.origen.lng;
    origen.direccion = this.origen.direccion;
    this.newRuta.origen = origen;

    var destino = {};
    destino.latitud = this.destino.lat;
    destino.longitud = this.destino.lng;
    destino.direccion = this.destino.direccion;
    this.newRuta.destino = destino;


    console.log(JSON.stringify(this.newRuta));
    this.rutaService.registrarRuta(this.newRuta).subscribe((data) => {
      this.mostrarMensaje("La Ruta se registró exitosamente.");
      this. consultarRutaActiva(this.infoVehiculo.id);
    }, (error) => {
      this.mostrarMensaje(Constantes.MENSAJE_ERROR_SERVICIO);
    });
  }

  limpiarYCargarMapa(){

  }

  iniciarViaje() {
    console.log("*** Iniciando viaje ***");
  }

  cancelarViaje() {
    const alert = this.alertCtrl.create({
      message: 'Esta seguro de cancelar el viaje?',
      subHeader: 'Confirmación',
      buttons: [{
        text: 'Aceptar', handler: () => {
          this.confirmarCancelarViaje();
        }
      }, {
        text: 'Cancel', handler: () => {
          console.log("Cancelar viaje..");
        }
      }]
    }).then(alert => alert.present());
  }

  confirmarCancelarViaje() {
    this.rutaService.cambiarEstadoRuta(this.infoRuta.id, 4).subscribe(
      (data) => {
        this.visible = false;
        this.mostrarMensaje("El viaje se canceló exitosamente!!");
        this.registrar = true;
      },
      (error) => {
        this.mostrarMensaje(Constantes.MENSAJE_ERROR_SERVICIO);
      })
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

  escribirDestino(direccion) {
    this.destino = {
      lat: this.markerDestination.getPosition().lat(),
      lng: this.markerDestination.getPosition().lng(),
      direccion: direccion
    };
    console.log(JSON.stringify(this.destino));
    localStorage.setItem('destino', JSON.stringify(this.destino));

    placeMarkerAndPanToDos(this.map);

    setTimeout(() => {
      trazarRuta(this.map);
    }, 1000);

  }

  buscarDireccion() {
    if (this.queryText) {
      console.log('buscanado direccion: ' + this.queryText);
      if (this.markerDestination) {
        this.markerDestination.setMap(null);
      }
      codeAddress(this.map, this.queryText, (e) => {
        this.markerDestination = placeMarkerAndPanTo(e, this.map);
        if (this.markerDestination) {
          this.escribirDestino(this.queryText);
          this.destinoSeleccionado = false;
        }
      });
    }
  }

  pintarRutaViaje() {
    var destino = {
      lat: this.infoRuta.destino.latitud,
      lng: this.infoRuta.destino.longitud,
      direccion: this.infoRuta.destino.direccion
    };
    console.log(JSON.stringify(this.destino));
    localStorage.setItem('destino', JSON.stringify(destino));


    var origen = {
      lat: this.infoRuta.origen.latitud,
      lng: this.infoRuta.origen.longitud,
      direccion: this.infoRuta.origen.direccion
    };
    localStorage.setItem('origen', JSON.stringify(origen));
    setTimeout(() => {
      trazarRuta(this.map);
    }, 1000);

  }


  mostrarMensaje(texto) {
    const alert = this.alertCtrl.create({
      message: texto,
      subHeader: 'Información',
      buttons: [{
        text: 'Aceptar', handler: () => {
        }
      }]
    }).then(alert => alert.present());
  }


  presentConfirmStarRuta() {
    if (this.infoRuta.id) {
      this.router.navigateByUrl('/iniciarViaje/' + this.infoRuta.id);
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

      obtenerPosicionUsuario(this.map, this.origen);


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
            this.map.setOptions({ styles: darkStyle });
          } else if (this.map) {
            this.map.setOptions({ styles: [] });
          }
        }
      });
    });
    observer.observe(appEl, {
      attributes: true
    });
  }

}

function codeAddress(map, direccion, funcRetorno) {
  // tslint:disable-next-line:prefer-const
  setAllMap(map);
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
var markers = [];

function placeMarkerAndPanToDos(map) {
  let destino = JSON.parse(localStorage.getItem('destino'));

  var marker = new google.maps.Marker({
    map: map,
    position: {
      'lat': destino.lat,
      'lng': destino.lng
    },
    icon: {
      url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAAEFElEQVRYhe1Wb2gbZRx+LpdL8z/taNe0W12m20qxpeuUui8OqTC3fSg4kIkIE1SmQ1C7QbtO8YNDGCp+ERG/DDYpMvHPl0wdTkU2VLbWIp1L6VbSpE3a9JJcmlwu9+e91w/WdiGrzV0aQcgD+ZDfPc/vee73vnf3AjXUUMP/G8wG9bEA2AnAv/w/DuA2AL3SxpUG3Gpr9b1vsVt7nV0tDltbvQMAlKhQyE/E87qk/qbElk4AmPvPA1qbXIO2Vt+rWwb7/I5dTffsI00m6NzZH+NKLPOBxovvmfFhzYi4Zs8nDYc6jm07c6iJa3SteZNco4vZ1N/p0YR8r7qQC+g5OVj1gNxm93Fv385XWl/b11DW/BnA88g2uzIr3K8tZDN6Xh014md0iX32HY0Tu0ae3QpLsVRdyCI/HgcAOHtawW12F12nOsXU0xeihelkJ4Clcg0NTdDW5H7DP7DvoD2wybJS1CmyH15Hy88iju9+Eo8623Hn02vg/4yi7uEWgPn7RhiGgbXR5RJ/j2l6XvmpXE9DE7S11U+0f370Qca6mi97bhzPB/bj9MmhIu6Zd9/BuegVuI92r9SoSjD51PkJZVboKtfTsj5lBYzVa/feHY4qBM7xDIZPDJaQT588BcdYGlQlqw04FqzX7jPgaShgPVvvKNoS8qyAh7p7wDClC8EwDPZ074EcFYrq1ganBUBDNQISvaAW8VmnDXwquaaAT/Jg3XVFNV1SWABqNQJmiSAVfbo4vweh6G0kEokSciKRwGRsuuRpJhmJAMhVIyDVZZK8e08BAPtCFw4c6cfMzMxKLRwO44kj/WBfLH4WqEKgy4Q34AmrEbJeUL7OjUY7PXsDK5vO0eWH+JIVjx87DHsOAChkLwvLyx1wPNBYpM9ej+p6QfvCiKfRF3Wg4WDHL21vH/CvTy1FZPhSTLg8uRdAtFyNkSUGgLD4R4wnomJQBpCsjPzNeR4GwgFmDguUphmO3e/q2VK3PnkVi+dvZMRfIwNUI7eM6IxOECSnXEwHb8X1gla2Rs+rEL4NzRFJ+cqon5njFoWKpC6rfZ7e+xzlCOY/upYWx2Zfp4qx6QEmJggARJQ+y3wXuqMuZNflKvElCFemQiSnfGnGy1RAAFSJLz0TGb60CPovLJ0iciqYUGNLz5n0MXeiXkYKRG9mWGa3s6uFuxdh8cJoLns1/LFeUC+aNTE7QQCAyotDiyNjM3IkXXJNDqcoPzI2paXzb1biUVFAAJo6n+2PDAXjVFv9TFOVYGYoOKfy4mEAZG35+qhkif9BijJ0Tp5O9fke2+EAgOhbl5NSaHGAytrVSptvREDQvDZBUtJ2xsa2SzcXNOGbyREtJZ7diN4bCQvX7PmBa/Z+j8q3TtXgXP7VUEMNNSzjL1zdpFFH2FLKAAAAAElFTkSuQmCC',
      scaledSize: new google.maps.Size(50, 50)
    }
  });
  markers.push(marker);

  return markers;
}



function obtenerPosicionUsuario(map, origen) {
  navigator.geolocation.getCurrentPosition((posicion) => {
    console.log('----------> Latitud ' + posicion.coords.latitude);
    console.log('----------> Longitud ' + posicion.coords.longitude);
    console.log('----------> Presicion ' + posicion.coords.accuracy);


    origen.lat = posicion.coords.latitude;
    origen.lng = posicion.coords.longitude;
    localStorage.setItem('origen', JSON.stringify(origen));

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

function trazarRuta(map) {
  console.log('INICIAR TRAZA');
  var directionsService = new google.maps.DirectionsService();
  //directionsService.set('directions', null);
  var directionsRenderer = new google.maps.DirectionsRenderer({
    suppressMarkers: true, directions: null
  });
  var origen = JSON.parse(localStorage.getItem('origen'));
  var destino = JSON.parse(localStorage.getItem('destino'));
  const request = <google.maps.DirectionsRequest>{};

  request.origin = origen.lat + ', ' + origen.lng,
    request.destination = destino.lat + ', ' + destino.lng,
    request.travelMode = google.maps.TravelMode.DRIVING;

  directionsService.route(request, function (result, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsRenderer.setDirections(null);
      directionsRenderer.setDirections(result);
      directionsRenderer.setMap(map);
    }
  });
}

function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}