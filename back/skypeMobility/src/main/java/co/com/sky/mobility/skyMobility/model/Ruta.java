package co.com.sky.mobility.skyMobility.model;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name = "ruta")
public class Ruta implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "fecha_publicacion", nullable = false)
	private Date fechaPublicacion;
	
	@Column(name = "fecha_hora_salida", nullable = false)
	private Date fechaSalida;
	
	@Column(name = "vehiculo_id")
	private int vehiculoId;
	
	@Column(name = "numeroPersonas")
	private int numeroPersonas;
	
	@Column(name = "estado")
	private int estado;
	
	@Column(name = "edificio_origen_id")
	private int origenId;
	
	@Column(name = "edificio_destino_id")
	private int destinoId;
	
	@Column(name = "cupo")
	private int cupo;
	
	@Column(name = "puntos")
	private int puntos;
	
	public Ruta() {
	}
	
	/**
	 * 
	 * @param fechaPublicacion
	 * @param fechaSalida
	 * @param vehiculoId
	 * @param numeroPersonas
	 * @param estado
	 * @param origen
	 * @param destino
	 * @param cupo
	 * @param puntos
	 */
	public Ruta(Date fechaPublicacion, Date fechaSalida, int vehiculoId, int numeroPersonas, int estado, int origenId, int destinoId, int cupo, int puntos) {
		this.fechaPublicacion = fechaPublicacion; 
		this.fechaSalida = fechaSalida;
		this.vehiculoId = vehiculoId; 
		this.numeroPersonas = numeroPersonas; 
		this.estado = estado; 
		this.origenId = origenId; 
		this.destinoId = destinoId; 
		this.cupo = cupo;
		this.puntos = puntos;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getFechaPublicacion() {
		return fechaPublicacion;
	}

	public void setFechaPublicacion(Date fechaPublicacion) {
		this.fechaPublicacion = fechaPublicacion;
	}

	public Date getFechaSalida() {
		return fechaSalida;
	}

	public void setFechaSalida(Date fechaSalida) {
		this.fechaSalida = fechaSalida;
	}


	/**
	 * @return the vehiculoId
	 */
	public int getVehiculoId() {
		return vehiculoId;
	}

	/**
	 * @param vehiculoId the vehiculoId to set
	 */
	public void setVehiculoId(int vehiculoId) {
		this.vehiculoId = vehiculoId;
	}

	public int getNumeroPersonas() {
		return numeroPersonas;
	}

	public void setNumeroPersonas(int numeroPersonas) {
		this.numeroPersonas = numeroPersonas;
	}

	public int getEstado() {
		return estado;
	}

	public void setEstado(int estado) {
		this.estado = estado;
	}

	
	/**
	 * @return the origenId
	 */
	public int getOrigenId() {
		return origenId;
	}

	/**
	 * @param origenId the origenId to set
	 */
	public void setOrigenId(int origenId) {
		this.origenId = origenId;
	}

	/**
	 * @return the destinoId
	 */
	public int getDestinoId() {
		return destinoId;
	}

	/**
	 * @param destinoId the destinoId to set
	 */
	public void setDestinoId(int destinoId) {
		this.destinoId = destinoId;
	}

	public int getCupo() {
		return cupo;
	}

	public void setCupo(int cupo) {
		this.cupo = cupo;
	}

	public int getPuntos() {
		return puntos;
	}

	public void setPuntos(int puntos) {
		this.puntos = puntos;
	}
	
	
	
	
	
	
	
	

}
