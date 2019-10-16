package co.com.sky.mobility.skyMobility.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table (name = "persona")
public class Persona {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "cedula", nullable = false, length = 20)
	private String cedula;
	
	@Column(name = "contraseña", nullable = false, length = 20)
	private String contrasenia;
	
	@Column(name = "nombres",length = 50)
	private String nombres;
	
	@Column(name = "apellidos",length = 50)
	private String apellidos;
	
	@Column(name = "email",length = 50)
	private String correo;
	
	@Column(name = "celular",length = 20)
	private String celular;
	
	@OneToOne
	(mappedBy = "persona")
	private Vehiculo vehiculo;
	
	@Column(name = "reputacion")
	private double reputacion;
	
	@Column(name = "puntaje")
	private int puntaje;
	
	@Column(name = "etiqueta")
	private int etiqueta;
	
	@Column(name = "foto",length = 100)
	private String foto;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCedula() {
		return cedula;
	}

	public void setCedula(String cedula) {
		this.cedula = cedula;
	}

	public String getContrasenia() {
		return contrasenia;
	}

	public void setContrasenia(String contrasenia) {
		this.contrasenia = contrasenia;
	}

	public String getNombres() {
		return nombres;
	}

	public void setNombres(String nombres) {
		this.nombres = nombres;
	}

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public String getCelular() {
		return celular;
	}

	public void setCelular(String celular) {
		this.celular = celular;
	}

	public Vehiculo getVehiculo() {
		return vehiculo;
	}

	public void setVehiculo(Vehiculo vehiculo) {
		this.vehiculo = vehiculo;
	}

	public double getReputacion() {
		return reputacion;
	}

	public void setReputacion(double reputacion) {
		this.reputacion = reputacion;
	}

	public int getPuntaje() {
		return puntaje;
	}

	public void setPuntaje(int puntaje) {
		this.puntaje = puntaje;
	}

	public int getEtiqueta() {
		return etiqueta;
	}

	public void setEtiqueta(int etiqueta) {
		this.etiqueta = etiqueta;
	}

	public String getFoto() {
		return foto;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}

	
	

}
