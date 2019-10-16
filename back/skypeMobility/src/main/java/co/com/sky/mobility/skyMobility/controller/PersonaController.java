package co.com.sky.mobility.skyMobility.controller;

import co.com.sky.mobility.skyMobility.dao.IPersonaDAO;
import co.com.sky.mobility.skyMobility.dto.PersonaDTO;
import co.com.sky.mobility.skyMobility.model.Persona;
import co.com.sky.mobility.skyMobility.util.AdapterUtil;
import org.springframework.beans.factory.annotation.Autowired;
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
        personaDAO.save(AdapterUtil.convertirDtoToPersona(personaDto));
        return ResponseEntity.ok().build();
    }

    /**
     *
     * @param id
     * @return
     */
    @GetMapping(value="api/v1/mobility/{id}/buscarPersona", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<PersonaDTO> buscarPersona(@PathVariable int id){
        Persona persona = personaDAO.findById(id).get();
        return ResponseEntity.ok(AdapterUtil.convertirPersonaToDto(persona));
    }
}
