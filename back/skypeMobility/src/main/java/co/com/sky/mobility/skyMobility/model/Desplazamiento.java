/**
 * 
 */
package co.com.sky.mobility.skyMobility.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author cguzmanp
 *
 */
@Entity
@Table(name = "desplazamiento")
public class Desplazamiento {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "latitud")
	private String latitud;
	
	@Column(name = "longitud")
	private String longitud;
	
	@Column(name = "id_vehiculo")
	private Integer idVehiculo;
	
	@Column(name = "id_ruta")
	private Integer idRuta;
	/**
	 * @return the id
	 */
	public Integer getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(Integer id) {
		this.id = id;
	}
	/**
	 * @return the latitud
	 */
	public String getLatitud() {
		return latitud;
	}
	/**
	 * @param latitud the latitud to set
	 */
	public void setLatitud(String latitud) {
		this.latitud = latitud;
	}
	/**
	 * @return the longitud
	 */
	public String getLongitud() {
		return longitud;
	}
	/**
	 * @param longitud the longitud to set
	 */
	public void setLongitud(String longitud) {
		this.longitud = longitud;
	}
	/**
	 * @return the idVehiculo
	 */
	public Integer getIdVehiculo() {
		return idVehiculo;
	}
	/**
	 * @param idVehiculo the idVehiculo to set
	 */
	public void setIdVehiculo(Integer idVehiculo) {
		this.idVehiculo = idVehiculo;
	}
	/**
	 * @return the idRuta
	 */
	public Integer getIdRuta() {
		return idRuta;
	}
	/**
	 * @param idRuta the idRuta to set
	 */
	public void setIdRuta(Integer idRuta) {
		this.idRuta = idRuta;
	}
	
	
}
