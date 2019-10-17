package co.com.sky.mobility.skyMobility.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import co.com.sky.mobility.skyMobility.dao.IEdificioDao;
import co.com.sky.mobility.skyMobility.dao.IRutaDao;
import co.com.sky.mobility.skyMobility.dao.IVehiculoDao;
import co.com.sky.mobility.skyMobility.dto.EstadoDTO;
import co.com.sky.mobility.skyMobility.dto.RutaDTO;
import co.com.sky.mobility.skyMobility.model.Edificio;
import co.com.sky.mobility.skyMobility.model.Ruta;
import co.com.sky.mobility.skyMobility.model.Vehiculo;
import co.com.sky.mobility.skyMobility.util.AdapterUtil;


@RestController
@CrossOrigin
public class RutaController {
	
	@Autowired
	private IRutaDao rutaDao;
	
	@Autowired
	private IEdificioDao edificioDao;
	
	@Autowired
	private IVehiculoDao vehiculoDao;
	
	@GetMapping(value="api/v1/mobility/buscarRuta", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<RutaDTO>> buscarRuta(@RequestParam String latitudOrigen, @RequestParam String longitudOrigen,
			@RequestParam String latitudDestino, @RequestParam String longitudDestino){
		
		List<Ruta> rutaEntity =rutaDao.findByOrigenDestino(latitudOrigen, longitudOrigen, latitudDestino,
				longitudDestino);
		
		return ResponseEntity.ok(AdapterUtil.convertirRutasToDto(rutaEntity));
			
	}
	
	/**
	 * 
	 * @param ruta
	 * @return
	 */
	@PostMapping(value="api/v1/mobility/crearRuta", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity crearRuta(@RequestBody Ruta ruta){
		
		Edificio origen = edificioDao.findById(ruta.getOrigen().getId()).get();
		Edificio destino = edificioDao.findById(ruta.getDestino().getId()).get();
		Vehiculo vehiculo = vehiculoDao.findById(ruta.getVehiculo().getId()).get();
		
		Ruta nuevaRuta = new Ruta(ruta.getFechaPublicacion(), ruta.getFechaSalida(), vehiculo, ruta.getNumeroPersonas(), 
				ruta.getEstado(), origen, destino, ruta.getCupo(), ruta.getPuntos());
		
		rutaDao.save(ruta);
		return ResponseEntity.ok().build();
			
	}
	
	/**
	 * 
	 * @param ruta
	 * @return
	 */
	@PostMapping(value = "api/v1/mobility/cambiarEstadoRuta", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity cambiarEstadoRuta(@RequestBody EstadoDTO estado) {

		try {
			rutaDao.updateEstado(estado.getEstado(), estado.getIdRuta());

		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

		}

		return ResponseEntity.status(HttpStatus.OK).build();

	}

}
