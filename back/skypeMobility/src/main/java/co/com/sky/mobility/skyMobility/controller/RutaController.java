package co.com.sky.mobility.skyMobility.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import co.com.sky.mobility.skyMobility.dao.IRutaDao;
import co.com.sky.mobility.skyMobility.dto.RutaDTO;
import co.com.sky.mobility.skyMobility.model.Ruta;
import co.com.sky.mobility.skyMobility.util.AdapterUtil;


@RestController
@CrossOrigin
public class RutaController {
	
	@Autowired
	private IRutaDao rutaDao;
	
	@GetMapping(value="api/v1/mobility/buscarRuta", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<RutaDTO>> buscarRuta(@RequestParam String latitudOrigen, @RequestParam String longitudOrigen,
			@RequestParam String latitudDestino, @RequestParam String longitudDestino){
		
		List<Ruta> rutaEntity =rutaDao.findByOrigenDestino(latitudOrigen, longitudOrigen, latitudDestino,
				longitudDestino);
		
		return ResponseEntity.ok(AdapterUtil.convertirRutasToDto(rutaEntity));
			
	}

}
