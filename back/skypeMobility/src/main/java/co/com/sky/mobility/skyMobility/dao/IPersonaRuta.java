package co.com.sky.mobility.skyMobility.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import co.com.sky.mobility.skyMobility.model.PersonaRuta;



@Repository
public interface IPersonaRuta extends JpaRepository<PersonaRuta, Integer> {
	
	@Query("SELECT r FROM PersonaRuta r where r.ruta.id = ?1")
	List<PersonaRuta> findByIdRuta(int rutaId);
}
