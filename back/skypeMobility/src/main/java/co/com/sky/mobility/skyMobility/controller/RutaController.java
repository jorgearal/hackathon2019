package co.com.sky.mobility.skyMobility.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import co.com.sky.mobility.skyMobility.dao.IPersonaDAO;
import co.com.sky.mobility.skyMobility.dao.IRutaDao;
import co.com.sky.mobility.skyMobility.dao.IVehiculoDao;
import co.com.sky.mobility.skyMobility.dto.EstadoDTO;
import co.com.sky.mobility.skyMobility.dto.RutaDTO;
import co.com.sky.mobility.skyMobility.model.Persona;
import co.com.sky.mobility.skyMobility.model.Ruta;
import co.com.sky.mobility.skyMobility.model.Vehiculo;
import co.com.sky.mobility.skyMobility.util.AdapterUtil;


@RestController
@CrossOrigin
public class RutaController {
	
	@Autowired
	private IRutaDao rutaDao;
	
	@Autowired
	private IPersonaDAO personaDao;
	
	@Autowired
	private IVehiculoDao vehiculoDao;

	@GetMapping(value="api/v1/mobility/buscarRuta", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<RutaDTO>> buscarRuta(@RequestParam String latitudOrigen, @RequestParam String longitudOrigen,
			@RequestParam String latitudDestino, @RequestParam String longitudDestino){
		
		Object rutaEntity = rutaDao.findByOrigenDestino(latitudOrigen, longitudOrigen, latitudDestino,
				longitudDestino);
		
		List<Object> data = (List<Object>) rutaEntity;
		List<RutaDTO> rutas = AdapterUtil.buildRutasDto(data);
		
		return ResponseEntity.ok(rutas);
			
	}
	
	/**
	 * 
	 * @param ruta
	 * @return
	 */
	@PostMapping(value="api/v1/mobility/crearRuta", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity crearRuta(@RequestBody Ruta ruta){
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
	
	/**
	 * 
	 * @param idPersona
	 * @return
	 */
	@GetMapping(value="api/v1/mobility/{idPersona}/misRutas", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Ruta>> misRutas(@PathVariable int idPersona){
		
		Persona persona = personaDao.findById(idPersona).get();
		List<Ruta> rutas = new ArrayList<>();
		List<Vehiculo> vehiculosPersona = vehiculoDao.findByPersonaId(persona.getId());
		
		for (Vehiculo v : vehiculosPersona) {
			List<Ruta> vehiculoRutas = rutaDao.findByVehiculo(v.getId());
			rutas.addAll(vehiculoRutas);
		}
		
		return ResponseEntity.ok(rutas);
			
	}

}
