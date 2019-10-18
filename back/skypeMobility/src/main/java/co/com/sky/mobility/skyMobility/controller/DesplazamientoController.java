/**
 * 
 */
package co.com.sky.mobility.skyMobility.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import co.com.sky.mobility.skyMobility.dao.IDesplazamientoDAO;
import co.com.sky.mobility.skyMobility.dto.DesplazamientoDTO;
import co.com.sky.mobility.skyMobility.model.Desplazamiento;
import co.com.sky.mobility.skyMobility.util.AdapterUtil;

/**
 * @author cguzmanp
 *
 */
@RestController
@CrossOrigin
public class DesplazamientoController {
	
	@Autowired
	private IDesplazamientoDAO desplazamientoDao;

	/**
	 * 
	 * @param idVehiculo
	 * @return
	 */
	@GetMapping(value="api/v1/mobility/desplazamientoRuta/{idRuta}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<DesplazamientoDTO>> desplazamientoRuta(@PathVariable int idRuta){
		List<Desplazamiento> desplazamientos = desplazamientoDao.findByIdRuta(idRuta);
		List<DesplazamientoDTO> results = new ArrayList<DesplazamientoDTO>();
		
		desplazamientos.forEach(x -> {
			results.add(AdapterUtil.convertToDto(x));
		});
		
		return ResponseEntity.ok(results);
	}
}
