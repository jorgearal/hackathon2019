package co.com.sky.mobility.skyMobility.dto;

import java.util.List;

public class VehiculoDTO {

	private int id;
	
	private String placa;
	
	private String marca;
	
	private String referencia;
	
	private int numPuestos;
	
	private int modelo;
	
	private String color;
	
	private String descripcion;
	
	private String imagen;
		
    private PersonaDTO persona;
    
    private String matricula;
    
    private List<RutaDTO> rutas;
    
	private int tag;
	
	private String fechaSoat;
	
	private String fechaTecnicoMecanica;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPlaca() {
		return placa;
	}

	public void setPlaca(String placa) {
		this.placa = placa;
	}

	public String getMarca() {
		return marca;
	}

	public void setMarca(String marca) {
		this.marca = marca;
	}

	public String getReferencia() {
		return referencia;
	}

	public void setReferencia(String referencia) {
		this.referencia = referencia;
	}

	public int getNumPuestos() {
		return numPuestos;
	}

	public void setNumPuestos(int numPuestos) {
		this.numPuestos = numPuestos;
	}

	public int getModelo() {
		return modelo;
	}

	public void setModelo(int modelo) {
		this.modelo = modelo;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getImagen() {
		return imagen;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	public PersonaDTO getPersona() {
		return persona;
	}

	public void setPersona(PersonaDTO persona) {
		this.persona = persona;
	}

	public String getMatricula() {
		return matricula;
	}

	public void setMatricula(String matricula) {
		this.matricula = matricula;
	}

	/**
	 * @return the rutas
	 */
	public List<RutaDTO> getRutas() {
		return rutas;
	}

	/**
	 * @param rutas the rutas to set
	 */
	public void setRutas(List<RutaDTO> rutas) {
		this.rutas = rutas;
	}

	/**
	 * @return the tag
	 */
	public int getTag() {
		return tag;
	}

	/**
	 * @param tag the tag to set
	 */
	public void setTag(int tag) {
		this.tag = tag;
	}

	/**
	 * @return the fechaSoat
	 */
	public String getFechaSoat() {
		return fechaSoat;
	}

	/**
	 * @param fechaSoat the fechaSoat to set
	 */
	public void setFechaSoat(String fechaSoat) {
		this.fechaSoat = fechaSoat;
	}

	/**
	 * @return the fechaTecnicoMecanica
	 */
	public String getFechaTecnicoMecanica() {
		return fechaTecnicoMecanica;
	}

	/**
	 * @param fechaTecnicoMecanica the fechaTecnicoMecanica to set
	 */
	public void setFechaTecnicoMecanica(String fechaTecnicoMecanica) {
		this.fechaTecnicoMecanica = fechaTecnicoMecanica;
	}
    

}
