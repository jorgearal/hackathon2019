package co.com.sky.mobility.skyMobility.controller;

import co.com.sky.mobility.skyMobility.dao.IPersonaDAO;
import co.com.sky.mobility.skyMobility.dto.PersonaDTO;
import co.com.sky.mobility.skyMobility.model.Persona;
import co.com.sky.mobility.skyMobility.util.AdapterUtil;
import co.com.sky.mobility.skyMobility.util.SecurityUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class PersonaController {

	@Autowired
	private IPersonaDAO personaDAO;

	/**
	 *
	 * @param personaDto
	 * @return
	 */
	@PostMapping(value="api/v1/mobility/crearActualizarPersona", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity saveOrUpdate(@RequestBody PersonaDTO personaDto) {
		try {
			personaDAO.save(AdapterUtil.convertirDtoToPersona(personaDto, false));
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

	}

	/**
	 *
	 * @param id
	 * @return
	 */
	@GetMapping(value="api/v1/mobility/buscarPersona/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<PersonaDTO> buscarPersona(@PathVariable int id) {
		Persona persona = personaDAO.findById(id).get();
		return ResponseEntity.ok(AdapterUtil.convertirPersonaToDto(persona));
	}

	/**
	 *
	 * @param personaDto
	 * @return
	 */
	@PostMapping(value="api/v1/mobility/autenticar", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<Persona> autenticar(@RequestBody PersonaDTO personaDto) {

		String correo = personaDto.getEmail();
		Persona persona = personaDAO.findByCorreo(correo);

		if (persona == null)
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();


		String password = persona.getContrasenia();
		try {
			String passwordDecrypted = SecurityUtil.decryptPassword(password);
			if (!passwordDecrypted.equals(personaDto.getPassword()))
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

		return ResponseEntity.ok(persona);
	}

	/**
	 *
	 * @param personaDto
	 * @return
	 */
	@PostMapping(value="api/v1/mobility/cambiarPassword", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity cambiarPassword(@RequestBody PersonaDTO personaDto) {
		try {
			personaDAO.save(AdapterUtil.convertirDtoToPersona(personaDto, true));
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}
