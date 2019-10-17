package co.com.sky.mobility.skyMobility.model;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
	
	@ManyToOne
	@JoinColumn(name = "vehiculo_id")
	private Vehiculo vehiculo;
	
	@Column(name = "numeroPersonas")
	private int numeroPersonas;
	
	@Column(name = "estado")
	private int estado;
	
	@ManyToOne
	@JoinColumn(name = "edificio_origen_id")
	private Edificio origen;
	
	@ManyToOne
	@JoinColumn(name = "edificio_destino_id")
	private Edificio destino;
	
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
	 * @param vehiculo
	 * @param numeroPersonas
	 * @param estado
	 * @param origen
	 * @param destino
	 * @param cupo
	 * @param puntos
	 */
	public Ruta(Date fechaPublicacion, Date fechaSalida, Vehiculo vehiculo, int numeroPersonas, int estado, Edificio origen, Edificio destino, int cupo, int puntos) {
		this.fechaPublicacion = fechaPublicacion; 
		this.fechaSalida = fechaSalida;
		this.vehiculo = vehiculo; 
		this.numeroPersonas = numeroPersonas; 
		this.estado = estado; 
		this.origen = origen; 
		this.destino = destino; 
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

	public Vehiculo getVehiculo() {
		return vehiculo;
	}

	public void setVehiculo(Vehiculo vehiculo) {
		this.vehiculo = vehiculo;
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

	public Edificio getOrigen() {
		return origen;
	}

	public void setOrigen(Edificio origen) {
		this.origen = origen;
	}

	public Edificio getDestino() {
		return destino;
	}

	public void setDestino(Edificio destino) {
		this.destino = destino;
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
