package co.com.sky.mobility.skyMobility.controller;

import java.util.ArrayList;
import java.util.List;

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

import co.com.sky.mobility.skyMobility.dao.IEdificioDao;
import co.com.sky.mobility.skyMobility.dao.IPersonaDAO;
import co.com.sky.mobility.skyMobility.dao.IPersonaRuta;
import co.com.sky.mobility.skyMobility.dao.IRutaDao;
import co.com.sky.mobility.skyMobility.dao.IVehiculoDao;
import co.com.sky.mobility.skyMobility.dto.EdificioDTO;
import co.com.sky.mobility.skyMobility.dto.EstadoDTO;
import co.com.sky.mobility.skyMobility.dto.RutaDTO;
import co.com.sky.mobility.skyMobility.dto.VehiculoDTO;
import co.com.sky.mobility.skyMobility.model.Edificio;
import co.com.sky.mobility.skyMobility.model.Persona;
import co.com.sky.mobility.skyMobility.model.PersonaRuta;
import co.com.sky.mobility.skyMobility.model.Ruta;
import co.com.sky.mobility.skyMobility.model.Vehiculo;
import co.com.sky.mobility.skyMobility.util.AdapterUtil;
import co.com.sky.mobility.skyMobility.util.DateUtil;


@RestController
@CrossOrigin
public class RutaController {
	
	@Autowired
	private IRutaDao rutaDao;
	
	@Autowired
	private IPersonaDAO personaDao;
	
	@Autowired
	private IVehiculoDao vehiculoDao;
	
	@Autowired
	private IEdificioDao edificioDao;
	
	@Autowired
	private IPersonaRuta personaRutaDao;

	/**
	 * 
	 * @param latitudOrigen
	 * @param longitudOrigen
	 * @param latitudDestino
	 * @param longitudDestino
	 * @return
	 */
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
	public ResponseEntity crearRuta(@RequestBody RutaDTO rutaDto){

		try {
			rutaDto.setFechaReg(DateUtil.tomarFechaActualString());
			rutaDto.setDuracion(DateUtil.estimarTiempoRuta());

			EdificioDTO origenDto = rutaDto.getOrigen();
			EdificioDTO destinoDto = rutaDto.getDestino();
			Ruta rutaToSave = AdapterUtil.rutaDtoToEntity(rutaDto);
			
			int idOrigen = origenDto.getNumber();
			int idDestino = destinoDto.getNumber();

			if (origenDto.getNumber() == 0) {
				Edificio origen = edificioDao.save(AdapterUtil.edificioDtoToEntity(origenDto));
				idOrigen = origen.getId();
			}

			if (destinoDto.getNumber() == 0) {
				Edificio destino = edificioDao.save(AdapterUtil.edificioDtoToEntity(destinoDto));
				idDestino = destino.getId();
			}
			
			rutaToSave.setOrigenId(idOrigen);
			rutaToSave.setDestinoId(idDestino);

			rutaDao.save(rutaToSave);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
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
	@GetMapping(value="api/v1/mobility/misRutas/{idPersona}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<RutaDTO>> misRutas(@PathVariable int idPersona){
		
		Persona persona = personaDao.findById(idPersona).get();
		List<RutaDTO> rutasDto = new ArrayList<>();
		List<Vehiculo> vehiculosPersona = vehiculoDao.findByPersonaId(persona.getId());
		
		vehiculosPersona.forEach(x -> {
			List<Ruta> vehiculoRutas = rutaDao.findByVehiculoEstado(x.getId(), 3); // 3 estado terminado
			vehiculoRutas.forEach(y -> { 
				rutasDto.add(AdapterUtil.buildRutaDTOView(y, edificioDao.findById(y.getOrigenId()).get(), edificioDao.findById(y.getDestinoId()).get()));
			});
		});

		return ResponseEntity.ok(rutasDto);
			
	}
	

	/**
	 * 
	 * @param idVehiculo
	 * @return
	 */
	@GetMapping(value="api/v1/mobility/vehiculoViajeActivo/{idVehiculo}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<VehiculoDTO> vehiculoViajeActivo(@PathVariable int idVehiculo){
		Vehiculo vehiculo = vehiculoDao.findById(idVehiculo).get();
		return findActiveRoutes(vehiculo);
	}
	

	/**
	 * 
	 * @param idVehiculo
	 * @return
	 */
	@GetMapping(value="api/v1/mobility/vehiculoViajeActivo", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<VehiculoDTO> vehiculoViajeActivo(@RequestParam String placa){
		Vehiculo vehiculo = vehiculoDao.findByTitle(placa).get(0);
		return findActiveRoutes(vehiculo);
	}
	
	/** 
	 * @param idVehiculo placa, nombre conductor, lista pasajeros, 
	 * @return
	 */
	@GetMapping(value="api/v1/mobility/rutaPorId/{idRuta}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RutaDTO> rutaPorId(@PathVariable int idRuta){
		
		RutaDTO rutaDto = new RutaDTO();
		
		if (idRuta > 0) {
			Ruta ruta = rutaDao.findById(idRuta).get();
			if (ruta != null && ruta.getId()  > 0) {
				Vehiculo vehiculo = vehiculoDao.findById(ruta.getVehiculoId()).get();
				Persona conductor = personaDao.findById(vehiculo.getPersonaId()).get();
				
				List<PersonaRuta> pasajeros = personaRutaDao.findByIdRuta(idRuta);
				rutaDto = AdapterUtil.buildRutaDTOViewPasajeros(ruta, edificioDao.findById(ruta.getOrigenId()).get(), edificioDao.findById(ruta.getDestinoId()).get(), vehiculo, conductor, pasajeros);
				
			}
		}
		return ResponseEntity.ok(rutaDto);
	}
	
	/**
	 * 
	 * @param vehiculo
	 * @return
	 */
	private ResponseEntity<VehiculoDTO> findActiveRoutes(Vehiculo vehiculo) {
		
		if (vehiculo != null) {
			List<Ruta> rutas = rutaDao.findByStatusAndVehiculo(vehiculo.getId(), 1);
			List<RutaDTO> rutasDto = new ArrayList<>();
			rutas.forEach(y -> { 
				rutasDto.add(AdapterUtil.buildRutaDTOView(y, edificioDao.findById(y.getOrigenId()).get(), edificioDao.findById(y.getDestinoId()).get()));
			});
			
			VehiculoDTO vehiculoDto = AdapterUtil.convertirVehiculoToDto(vehiculo);
			vehiculoDto.setRutas(rutasDto);
			
			return ResponseEntity.ok(vehiculoDto);
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

}
