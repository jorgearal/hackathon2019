package co.com.sky.mobility.skyMobility.util;

import java.util.ArrayList;
import java.util.List;

import co.com.sky.mobility.skyMobility.dto.EdificioDTO;
import co.com.sky.mobility.skyMobility.dto.PersonaDTO;
import co.com.sky.mobility.skyMobility.dto.RutaDTO;
import co.com.sky.mobility.skyMobility.dto.VehiculoDTO;
import co.com.sky.mobility.skyMobility.model.Edificio;
import co.com.sky.mobility.skyMobility.model.Persona;
import co.com.sky.mobility.skyMobility.model.Ruta;
import co.com.sky.mobility.skyMobility.model.Vehiculo;

public class AdapterUtil {

	public static List<EdificioDTO> convertirEdificioToDto(List<Edificio> edificios) {

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
	
	public static EdificioDTO convertirEdificioToDto(Edificio edificio) {

		EdificioDTO edificioDto = new EdificioDTO();

		edificioDto.setNumber(edificio.getId());
		edificioDto.setNombre(edificio.getNombre());
		edificioDto.setLongitud(edificio.getLongitud());
		edificioDto.setLatitud(edificio.getLatitud());

		return edificioDto;

	}

	public static EdificioDTO edificioToDto(Edificio edificio) {

		EdificioDTO edificioDto = new EdificioDTO();

		edificioDto.setNumber(edificio.getId());
		edificioDto.setNombre(edificio.getNombre());
		edificioDto.setLongitud(edificio.getLongitud());
		edificioDto.setLatitud(edificio.getLatitud());

		return edificioDto;

	}

	public static List<RutaDTO> convertirRutasToDto(List<Ruta> rutas) {

		List<RutaDTO> rutasDto = new ArrayList<RutaDTO>();
		
		for (Ruta ruta : rutas) {
			
			RutaDTO rutaDto = new RutaDTO();
			
			rutaDto.setCupo(ruta.getCupo());
			rutaDto.setEstado(ruta.getEstado());
			rutaDto.setId(ruta.getId());
			rutaDto.setNumPersonas(ruta.getNumeroPersonas());
			
			rutaDto.setOrigen(new EdificioDTO());
			rutaDto.getOrigen().setNumber(ruta.getOrigenId());
			
			rutaDto.setDestino(new EdificioDTO());
			rutaDto.getDestino().setNumber(ruta.getDestinoId());

			rutaDto.setFechaReg(ruta.getFechaPublicacion().toString());
			rutaDto.setFechaSalida(ruta.getFechaSalida().toString());
			
			rutasDto.add(rutaDto);
			
		}

		return rutasDto;

	}

	public static RutaDTO convertirRutaToDto(Ruta ruta) {

		RutaDTO rutaDto = new RutaDTO();

		rutaDto.setCupo(ruta.getCupo());
		rutaDto.setEstado(ruta.getEstado());
		rutaDto.setId(ruta.getId());
		rutaDto.setNumPersonas(ruta.getNumeroPersonas());
		rutaDto.setOrigen(new EdificioDTO());
		rutaDto.getOrigen().setNumber(ruta.getOrigenId());
		
		rutaDto.setDestino(new EdificioDTO());
		rutaDto.getDestino().setNumber(ruta.getDestinoId());

		rutaDto.setFechaReg(ruta.getFechaPublicacion().toString());
		rutaDto.setFechaSalida(ruta.getFechaSalida().toString());

		return rutaDto;

	}

	public static PersonaDTO convertirPersonaToDto(Persona persona) {

		PersonaDTO personaDto = new PersonaDTO();

		personaDto.setCedula(persona.getCedula());
		personaDto.setCelular(persona.getCelular());
		personaDto.setEmail(persona.getCorreo());
		personaDto.setFoto(persona.getFoto());
		personaDto.setNombres(persona.getNombres());
		personaDto.setApellidos(persona.getApellidos());
		personaDto.setId(persona.getId());
		personaDto.setPuntaje(persona.getPuntaje());
		personaDto.setEtiqueta(persona.getEtiqueta());
		personaDto.setReputacion(persona.getReputacion());

		return personaDto;
	}

	/**
	 * 
	 * @param personaDto
	 * @param updatePass
	 * @return
	 * @throws Exception
	 */
	public static Persona convertirDtoToPersona(PersonaDTO personaDto, boolean updatePass) throws Exception {

		Persona persona = new Persona();

		persona.setCedula(personaDto.getCedula());
		persona.setCelular(personaDto.getCelular());
		persona.setCorreo(personaDto.getEmail());
		persona.setFoto(personaDto.getFoto());
		persona.setNombres(personaDto.getNombres());
		persona.setApellidos(personaDto.getApellidos());
		persona.setId(personaDto.getId());
		persona.setPuntaje(personaDto.getPuntaje());
		persona.setEtiqueta(personaDto.getEtiqueta());
		persona.setReputacion(personaDto.getReputacion());

		if (personaDto.getId() == 0 || updatePass)
			persona.setContrasenia(SecurityUtil.encryptPassword(personaDto.getPassword()));

		return persona;
	}

	public static List<VehiculoDTO> convertirVehiculosToDto(List<Vehiculo> vehiculos) {

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
			vehiculo.setPersona(new PersonaDTO());
			vehiculo.getPersona().setId(vehiculoEntity.getPersonaId());
			vehiculo.setMatricula(vehiculoEntity.getMatricula());

			vehiculosDto.add(vehiculo);
		}

		return vehiculosDto;

	}

	public static Vehiculo convertirVehiculoDtoToVehiculo(VehiculoDTO vehiculoDto) {

		Vehiculo vehiculo = new Vehiculo();

		vehiculo.setColor(vehiculoDto.getColor());
		vehiculo.setDescripcion(vehiculoDto.getDescripcion());
		vehiculo.setFoto(vehiculoDto.getImagen());
		vehiculo.setId(vehiculoDto.getId());
		vehiculo.setMarca(vehiculoDto.getMarca());
		vehiculo.setMatricula(vehiculoDto.getMatricula());
		vehiculo.setModelo(vehiculoDto.getModelo());
		vehiculo.setNumeroPuestos(vehiculoDto.getNumPuestos());
		vehiculo.setPersonaId(vehiculoDto.getPersona().getId());

		vehiculo.setPlaca(vehiculoDto.getPlaca());
		vehiculo.setReferencia(vehiculoDto.getReferencia());

		return vehiculo;

	}
	
	/**
	 * 
	 * @param result
	 * @return
	 */
	public static List<RutaDTO> buildRutasDto(List<Object> result) {
		
		List<RutaDTO> rutasDto = new ArrayList<>();
		
		result.forEach(x -> {
			Object[] data = (Object[]) x;
			Ruta r = (Ruta) data[0];
			Edificio o = (Edificio) data[1];
			Edificio d = (Edificio) data[2];
			
			rutasDto.add(buildRutaDTOView(r, o, d));
		});
		
		return rutasDto;
	}
	
	/**
	 * 
	 * @param ruta
	 * @param origen
	 * @param destino
	 * @return
	 */
	public static RutaDTO buildRutaDTOView (Ruta ruta, Edificio origen, Edificio destino) {
		
		RutaDTO rutaDto = new RutaDTO();
		rutaDto.setCupo(ruta.getCupo());
		rutaDto.setEstado(ruta.getEstado());
		rutaDto.setFechaReg(ruta.getFechaPublicacion().toString());
		rutaDto.setFechaSalida(ruta.getFechaSalida().toString());
		rutaDto.setId(ruta.getId());
		rutaDto.setNumPersonas(ruta.getNumeroPersonas());
		
		rutaDto.setVehiculo(new VehiculoDTO());
		rutaDto.getVehiculo().setId(ruta.getVehiculoId());
		
		rutaDto.setOrigen(convertirEdificioToDto(origen));
		rutaDto.setDestino(convertirEdificioToDto(destino));
		
		return rutaDto;
		
	}

}
