package co.com.sky.mobility.skyMobility.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import co.com.sky.mobility.skyMobility.model.Persona;

@Repository
public interface IPersonaDAO extends JpaRepository<Persona, Integer> {
	
	@Query("SELECT p FROM Persona p where p.correo = ?1")
	Persona findByCorreo(String correo);
}
