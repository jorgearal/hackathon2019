package co.com.sky.mobility.skyMobility.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import co.com.sky.mobility.skyMobility.dao.IVehiculoDao;
import co.com.sky.mobility.skyMobility.dto.VehiculoDTO;
import co.com.sky.mobility.skyMobility.model.Vehiculo;
import co.com.sky.mobility.skyMobility.util.AdapterUtil;

@RestController
@CrossOrigin
public class VehiculoController {
	
	@Autowired
	private IVehiculoDao vehiculoDao;
	
	@GetMapping(value="api/v1/mobility/buscarVehiculo", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<VehiculoDTO>> buscarVehiculo(@RequestParam String placa){
		
		List<Vehiculo> vehiculos =vehiculoDao.findByTitle(placa);
		
		return ResponseEntity.ok(AdapterUtil.convertirVehiculosToDto(vehiculos));
		
		
	}

}
