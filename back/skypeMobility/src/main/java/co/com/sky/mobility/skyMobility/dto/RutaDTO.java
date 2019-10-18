package co.com.sky.mobility.skyMobility.dto;

import java.util.List;

public class RutaDTO {
	
	private int id;
	
    private String fechaReg;
    
    private String fechaSalida;
    
    private int numPersonas;
    
    private int estado;
    
    private EdificioDTO origen;
    
    private EdificioDTO destino;
    
    private VehiculoDTO vehiculo;
    
    private int cupo;
    
    private String duracion;
    
    private List<PersonaDTO> pasajeros;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFechaReg() {
		return fechaReg;
	}

	public void setFechaReg(String fechaReg) {
		this.fechaReg = fechaReg;
	}

	public String getFechaSalida() {
		return fechaSalida;
	}

	public void setFechaSalida(String fechaSalida) {
		this.fechaSalida = fechaSalida;
	}

	public int getNumPersonas() {
		return numPersonas;
	}

	public void setNumPersonas(int numPersonas) {
		this.numPersonas = numPersonas;
	}

	public int getEstado() {
		return estado;
	}

	public void setEstado(int estado) {
		this.estado = estado;
	}

	public int getCupo() {
		return cupo;
	}

	public void setCupo(int cupo) {
		this.cupo = cupo;
	}

	public EdificioDTO getOrigen() {
		return origen;
	}

	public void setOrigen(EdificioDTO origen) {
		this.origen = origen;
	}

	public EdificioDTO getDestino() {
		return destino;
	}

	public void setDestino(EdificioDTO destino) {
		this.destino = destino;
	}

	/**
	 * @return the vehiculo
	 */
	public VehiculoDTO getVehiculo() {
		return vehiculo;
	}

	/**
	 * @param vehiculo the vehiculo to set
	 */
	public void setVehiculo(VehiculoDTO vehiculo) {
		this.vehiculo = vehiculo;
	}

	/**
	 * @return the duracion
	 */
	public String getDuracion() {
		return duracion;
	}

	/**
	 * @param duracion the duracion to set
	 */
	public void setDuracion(String duracion) {
		this.duracion = duracion;
	}

	/**
	 * @return the pasajeros
	 */
	public List<PersonaDTO> getPasajeros() {
		return pasajeros;
	}

	/**
	 * @param pasajeros the pasajeros to set
	 */
	public void setPasajeros(List<PersonaDTO> pasajeros) {
		this.pasajeros = pasajeros;
	}
	
}
