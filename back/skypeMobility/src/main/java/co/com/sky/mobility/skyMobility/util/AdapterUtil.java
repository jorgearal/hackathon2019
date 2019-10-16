package co.com.sky.mobility.skyMobility.util;

import java.util.ArrayList;
import java.util.List;

import co.com.sky.mobility.skyMobility.dto.EdificioDTO;
import co.com.sky.mobility.skyMobility.dto.PersonaDTO;
import co.com.sky.mobility.skyMobility.dto.VehiculoDTO;
import co.com.sky.mobility.skyMobility.model.Edificio;
import co.com.sky.mobility.skyMobility.model.Persona;
import co.com.sky.mobility.skyMobility.model.Vehiculo;


public class AdapterUtil {
	
	public static List<EdificioDTO> convertirEdificioToDto(List<Edificio> edificios){
		
		ArrayList<EdificioDTO> edificiosDto = new ArrayList<>();
		
		for (Edificio edificioEntity : edificios) {
			
			EdificioDTO edificio = new EdificioDTO();
			
			edificio.setNumber(edificioEntity.getId());
			edificio.setNombre(edificioEntity.getNombre());
			edificio.setLongitud(edificioEntity.getLongitud());
			edificio.setLatitud(edificioEntity.getLatitud());
		
			
			edificiosDto.add(edificio);
			
		}
		
		return edificiosDto;
		
	}
	
	public static PersonaDTO convertirPersonaToDto(Persona persona){
		
		PersonaDTO personaDto = new PersonaDTO();
		
		personaDto.setCedula(persona.getCedula());
		personaDto.setCelular(persona.getCelular());
		personaDto.setEmail(persona.getCorreo());
		personaDto.setFoto(persona.getFoto());
		personaDto.setNombre(persona.getNombres());
		personaDto.setId(persona.getId());
		personaDto.setPuntaje(persona.getPuntaje());
		personaDto.setEtiqueta(persona.getEtiqueta());
		personaDto.setReputacion(persona.getReputacion());
		
		return personaDto;
	}
	
	public static List<VehiculoDTO> convertirVehiculosToDto(List<Vehiculo> vehiculos){
		
		ArrayList<VehiculoDTO> vehiculosDto = new ArrayList<>();
		
		for (Vehiculo vehiculoEntity : vehiculos) {
			
			VehiculoDTO vehiculo = new VehiculoDTO();
			
		     vehiculo.setColor(vehiculoEntity.getColor());
		     vehiculo.setDescripcion(vehiculoEntity.getDescripcion());
		     vehiculo.setImagen(vehiculoEntity.getFoto());
		     vehiculo.setMarca(vehiculoEntity.getMarca());
		     vehiculo.setModelo(vehiculoEntity.getModelo());
		     vehiculo.setId(vehiculoEntity.getId());
		     vehiculo.setNumPuestos(vehiculoEntity.getNumeroPuestos());
		     vehiculo.setPlaca(vehiculoEntity.getPlaca());
		     vehiculo.setReferencia(vehiculoEntity.getReferencia());
		     vehiculo.setPersona(convertirPersonaToDto(vehiculoEntity.getPersona()));
		     vehiculo.setMatricula(vehiculoEntity.getMatricula());
		     
			vehiculosDto.add(vehiculo);
		}
		
		return vehiculosDto;
		
	}

}
