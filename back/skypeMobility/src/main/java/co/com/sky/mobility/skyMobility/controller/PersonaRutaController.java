package co.com.sky.mobility.skyMobility.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import co.com.sky.mobility.skyMobility.dao.IPersonaRuta;
import co.com.sky.mobility.skyMobility.dto.PersonaRutaDTO;
import co.com.sky.mobility.skyMobility.model.PersonaRuta;
import co.com.sky.mobility.skyMobility.util.AdapterUtil;

@RestController
@CrossOrigin
public class PersonaRutaController {
	
	@Autowired
	IPersonaRuta personaRutaDao;
	
	@GetMapping(value="api/v1/mobility/buscarPasajerosRuta", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<PersonaRuta>> buscarPasajerosRuta(int idRuta){
		
		List<PersonaRuta>personaRuta = personaRutaDao.findByIdRuta(idRuta);
		
		return ResponseEntity.ok((personaRuta));
		
	}

	/**
	 * 
	 * @param idRuta
	 * @param idPersona
	 * @return
	 */
	@PostMapping(value="api/v1/mobility/suscribir", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<PersonaRutaDTO> suscribir(@RequestBody PersonaRutaDTO personaRutaDto) {
		PersonaRuta personaRuta = personaRutaDao.save(AdapterUtil.convertToEntity(personaRutaDto));
		return ResponseEntity.ok(AdapterUtil.convertToDTO(personaRuta));
	}
}
