package co.com.sky.mobility.skyMobility.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedNativeQueries;
import javax.persistence.NamedNativeQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

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
	
	@Column(name = "persona_id")
	private int personaId;
	
	@Column(name = "tag")
	private int tag;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "fecha_soat")
	private Date fechaSoat;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "fecha_tecnico_mecanica")
	private Date fechaTecnicoMecanica;
	
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

	

	/**
	 * @return the personaId
	 */
	public int getPersonaId() {
		return personaId;
	}

	/**
	 * @param personaId the personaId to set
	 */
	public void setPersonaId(int personaId) {
		this.personaId = personaId;
	}

	public String getMatricula() {
		return matricula;
	}

	public void setMatricula(String matricula) {
		this.matricula = matricula;
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
	public Date getFechaSoat() {
		return fechaSoat;
	}

	/**
	 * @param fechaSoat the fechaSoat to set
	 */
	public void setFechaSoat(Date fechaSoat) {
		this.fechaSoat = fechaSoat;
	}

	/**
	 * @return the fechaTecnicoMecanica
	 */
	public Date getFechaTecnicoMecanica() {
		return fechaTecnicoMecanica;
	}

	/**
	 * @param fechaTecnicoMecanica the fechaTecnicoMecanica to set
	 */
	public void setFechaTecnicoMecanica(Date fechaTecnicoMecanica) {
		this.fechaTecnicoMecanica = fechaTecnicoMecanica;
	}

	
}
