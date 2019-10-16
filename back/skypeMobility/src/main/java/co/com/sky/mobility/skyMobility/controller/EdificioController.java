package co.com.sky.mobility.skyMobility.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import co.com.sky.mobility.skyMobility.dao.IEdificioDao;
import co.com.sky.mobility.skyMobility.dto.EdificioDTO;
import co.com.sky.mobility.skyMobility.model.Edificio;
import co.com.sky.mobility.skyMobility.util.AdapterUtil;

@RestController
@CrossOrigin
public class EdificioController {
	
	@Autowired
	private IEdificioDao edificioDao;
	
	@GetMapping(value="api/v1/mobility/listarUbicaciones", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<EdificioDTO>> listarEdificios(){
		
		List<Edificio> edificios =edificioDao.findAll();
		
		return ResponseEntity.ok(AdapterUtil.convertirEdificioToDto(edificios));
		
		
	}

}
