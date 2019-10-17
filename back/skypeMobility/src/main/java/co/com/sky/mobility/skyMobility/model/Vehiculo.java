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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedNativeQueries;
import javax.persistence.NamedNativeQuery;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table (name = "vehiculo")
@NamedNativeQueries({
@NamedNativeQuery(name = "Vehiculo.updatePersona", query = "UPDATE vehiculo SET persona_id =?1 WHERE placa =?2")
})
public class Vehiculo implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "placa", nullable = false, length = 20)
	private String placa;
	
	@Column(name = "marca", length = 20)
	private String marca;
	
	@Column(name = "referencia", length = 50)
	private String referencia;
	
	@Column(name = "puestos_numero")
	private int numeroPuestos;
	
	@Column(name = "modelo")
	private int modelo;
	
	@Column(name = "color", length = 20)
	private String color;
	
	@Column(name = "descripcion", length = 50)
	private String descripcion;
	
	@Column(name = "foto", length = 100)
	private String foto;
	
	@Column(name = "matricula", nullable = false, length = 100)
	private String matricula;
	
	@ManyToOne
	@JoinColumn(name = "persona_id")
	private Persona persona;
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "vehiculo")
	private Set<Ruta> rutasVehiculo;
	
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

	public int getNumeroPuestos() {
		return numeroPuestos;
	}

	public void setNumeroPuestos(int numeroPuestos) {
		this.numeroPuestos = numeroPuestos;
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

	public String getFoto() {
		return foto;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}

	public Persona getPersona() {
		return persona;
	}

	public void setPersona(Persona persona) {
		this.persona = persona;
	}

	public String getMatricula() {
		return matricula;
	}

	public void setMatricula(String matricula) {
		this.matricula = matricula;
	}
	
	
	
	

}
