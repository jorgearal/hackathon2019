package co.com.sky.mobility.skyMobility.dto;

public class PersonaRutaDTO {
	
	private int id;
	
	RutaDTO rutaDto;
	
	PersonaDTO personaDto;
	
	int confirmaViaje;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public RutaDTO getRutaDto() {
		return rutaDto;
	}

	public void setRutaDto(RutaDTO rutaDto) {
		this.rutaDto = rutaDto;
	}

	public PersonaDTO getPersonaDto() {
		return personaDto;
	}

	public void setPersonaDto(PersonaDTO personaDto) {
		this.personaDto = personaDto;
	}

	public int getConfirmaViaje() {
		return confirmaViaje;
	}

	public void setConfirmaViaje(int confirmaViaje) {
		this.confirmaViaje = confirmaViaje;
	}
	
	

}
