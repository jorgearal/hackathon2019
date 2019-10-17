package co.com.sky.mobility.skyMobility.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import co.com.sky.mobility.skyMobility.model.Vehiculo;


@Repository
public interface IVehiculoDao extends JpaRepository<Vehiculo, Integer> {
	
	@Query("SELECT v FROM Vehiculo v where v.placa = ?1")
	List<Vehiculo> findByTitle(String placa);
    
	@Modifying
	@Transactional
	@Query(value ="UPDATE vehiculo SET persona_id= ?1 where placa = ?2", nativeQuery = true)
	void updatePersona(int id, String cedula);
	
	@Query("SELECT v FROM Vehiculo v where v.personaId = ?1")
	List<Vehiculo> findByPersonaId(int personaId);
	
}
