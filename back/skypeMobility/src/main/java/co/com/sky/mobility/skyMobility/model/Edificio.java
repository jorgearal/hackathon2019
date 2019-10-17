package co.com.sky.mobility.skyMobility.model;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table (name = "edificio")
public class Edificio implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "nombre", nullable = false, length = 50)
	private String nombre;
	
	@Column(name = "latitud", nullable = false, length = 50)
	private String latitud;
	
	@Column(name = "longitud", nullable = false, length = 50)
	private String longitud;
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "origen")
	private Set<Ruta> rutasOrigen;
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "destino")
	private Set<Ruta> rutasDestino;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getLatitud() {
		return latitud;
	}

	public void setLatitud(String latitud) {
		this.latitud = latitud;
	}

	public String getLongitud() {
		return longitud;
	}

	public void setLongitud(String longitud) {
		this.longitud = longitud;
	}

	/**
	 * @return the rutasOrigen
	 */
	public Set<Ruta> getRutasOrigen() {
		return rutasOrigen;
	}

	/**
	 * @param rutasOrigen the rutasOrigen to set
	 */
	public void setRutasOrigen(Set<Ruta> rutasOrigen) {
		this.rutasOrigen = rutasOrigen;
	}

	/**
	 * @return the rutasDestino
	 */
	public Set<Ruta> getRutasDestino() {
		return rutasDestino;
	}

	/**
	 * @param rutasDestino the rutasDestino to set
	 */
	public void setRutasDestino(Set<Ruta> rutasDestino) {
		this.rutasDestino = rutasDestino;
	}

}
