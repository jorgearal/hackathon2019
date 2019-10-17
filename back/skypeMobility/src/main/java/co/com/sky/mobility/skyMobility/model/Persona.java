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
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table (name = "persona")
public class Persona implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "cedula", nullable = false, length = 20)
	private String cedula;
	
	@Column(name = "contraseña", nullable = false, length = 1000)
	private String contrasenia;
	
	@Column(name = "nombres", nullable = false, length = 50)
	private String nombres;
	
	@Column(name = "apellidos", nullable = false,length = 50)
	private String apellidos;
	
	@Column(name = "email", nullable = false,length = 50)
	private String correo;
	
	@Column(name = "celular",length = 20)
	private String celular;
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "persona")
	private Set<Vehiculo> vehiculosPersona;
	
	@Column(name = "reputacion")
	private double reputacion;
	
	@Column(name = "puntaje")
	private int puntaje;
	
	@Column(name = "etiqueta")
	private int etiqueta;
	
	@Lob
	@Column(name = "foto", length=100000)
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


	/**
	 * @return the vehiculosPersona
	 */
	public Set<Vehiculo> getVehiculosPersona() {
		return vehiculosPersona;
	}

	/**
	 * @param vehiculosPersona the vehiculosPersona to set
	 */
	public void setVehiculosPersona(Set<Vehiculo> vehiculosPersona) {
		this.vehiculosPersona = vehiculosPersona;
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