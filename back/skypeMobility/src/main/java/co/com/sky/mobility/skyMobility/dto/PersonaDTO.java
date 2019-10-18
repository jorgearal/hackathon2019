package co.com.sky.mobility.skyMobility.dto;

public class PersonaDTO {
	
	 private int id;
	 
	 private String cedula;
	 
	 private String nombres;
	 
	 private String apellidos;
	 
	 private String password;
	 
	 private String email;
	 
	 private String celular;
	 
	 private int puntaje;
	 
	 private String foto;
	 
	 private int etiqueta;
	 
	 private double reputacion;
	 
	 private int confirmaViaje;

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

	public String getNombres() {
		return nombres;
	}

	public void setNombres(String nombres) {
		this.nombres = nombres;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCelular() {
		return celular;
	}

	public void setCelular(String celular) {
		this.celular = celular;
	}

	public int getPuntaje() {
		return puntaje;
	}

	public void setPuntaje(int puntaje) {
		this.puntaje = puntaje;
	}

	public String getFoto() {
		return foto;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}

	public int getEtiqueta() {
		return etiqueta;
	}

	public void setEtiqueta(int etiqueta) {
		this.etiqueta = etiqueta;
	}

	public double getReputacion() {
		return reputacion;
	}

	public void setReputacion(double reputacion) {
		this.reputacion = reputacion;
	}

	/**
	 * @return the apellidos
	 */
	public String getApellidos() {
		return apellidos;
	}

	/**
	 * @param apellidos the apellidos to set
	 */
	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * @return the confirmaViaje
	 */
	public int getConfirmaViaje() {
		return confirmaViaje;
	}

	/**
	 * @param confirmaViaje the confirmaViaje to set
	 */
	public void setConfirmaViaje(int confirmaViaje) {
		this.confirmaViaje = confirmaViaje;
	}

}
