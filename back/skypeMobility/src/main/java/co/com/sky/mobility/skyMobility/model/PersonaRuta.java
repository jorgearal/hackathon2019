package co.com.sky.mobility.skyMobility.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table (name = "persona_ruta")
public class PersonaRuta {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@OneToOne
	@JoinColumn(name = "ruta_id")
	Ruta ruta;
	
	@OneToOne
	@JoinColumn(name = "persona_id")
	Persona persona;
	
	int confirmaViaje;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Ruta getRuta() {
		return ruta;
	}

	public void setRuta(Ruta ruta) {
		this.ruta = ruta;
	}

	public Persona getPersona() {
		return persona;
	}

	public void setPersona(Persona persona) {
		this.persona = persona;
	}

	public int getConfirmaViaje() {
		return confirmaViaje;
	}

	public void setConfirmaViaje(int confirmaViaje) {
		this.confirmaViaje = confirmaViaje;
	}
	
	

}
