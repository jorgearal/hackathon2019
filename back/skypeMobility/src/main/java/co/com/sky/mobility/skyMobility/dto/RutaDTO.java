package co.com.sky.mobility.skyMobility.dto;



public class RutaDTO {
	
	private int id;
	
    private String fechaReg;
    
    private String fechaSalida;
    
    private int numPersonas;
    
    private int estado;
    
    private EdificioDTO origen;
    
    private EdificioDTO destino;
    
    private int cupo;

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
	
	
    
    
	
	
	
	

}
