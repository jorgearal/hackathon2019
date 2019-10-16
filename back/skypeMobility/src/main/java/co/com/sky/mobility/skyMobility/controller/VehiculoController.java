package co.com.sky.mobility.skyMobility.controller;

import java.util.List;
import java.util.Optional;

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

import co.com.sky.mobility.skyMobility.dao.IPersonaDAO;
import co.com.sky.mobility.skyMobility.dao.IVehiculoDao;
import co.com.sky.mobility.skyMobility.dto.VehiculoDTO;
import co.com.sky.mobility.skyMobility.model.Persona;
import co.com.sky.mobility.skyMobility.model.Vehiculo;
import co.com.sky.mobility.skyMobility.util.AdapterUtil;

@RestController
@CrossOrigin
public class VehiculoController {
	
	@Autowired
	private IVehiculoDao vehiculoDao;
	@Autowired
	private IPersonaDAO personaDao;
	
	@GetMapping(value="api/v1/mobility/buscarVehiculo", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<VehiculoDTO>> buscarVehiculo(@RequestParam String placa){
		
		List<Vehiculo> vehiculos =vehiculoDao.findByTitle(placa);
		
		return ResponseEntity.ok(AdapterUtil.convertirVehiculosToDto(vehiculos));
		
		
	}
	
	@PostMapping(value="api/v1/encuestas/guardarVehiculo", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<VehiculoDTO>> guardarVehiculo(@RequestBody VehiculoDTO vehiculo){
		
		try {
			Optional<Persona> persona = personaDao.findById(vehiculo.getPersona().getId());
			
			Vehiculo vehiculoEntity =AdapterUtil.convertirVehiculoDtoToVehiculo(vehiculo);
			
			vehiculoEntity.setPersona(persona.get());
			
			vehiculoDao.save(vehiculoEntity);
			
			vehiculoDao.updatePersona(vehiculo.getPersona().getId(), vehiculo.getPlaca());
			
		} catch (Exception e) {
			
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			
		}
		
		
		return ResponseEntity.status(HttpStatus.OK).build();
		
		
	}
	


}