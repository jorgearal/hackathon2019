package co.com.sky.mobility.skyMobility.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import co.com.sky.mobility.skyMobility.model.Ruta;


@Repository
public interface IRutaDao extends JpaRepository<Ruta, Integer> {
	
	@Query("SELECT r FROM Ruta r where r.origen.latitud = ?1 and r.origen.longitud = ?2 "
			+ "and r.destino.latitud = ?3 and r.destino.longitud = ?4 ")
	List<Ruta> findByOrigenDestino(String latitudOrigen, String longitudOrigen, 
			String latitudDestino, String longitudDestino );
	
	@Modifying
	@Transactional
	@Query(value ="UPDATE ruta SET estado= ?1 where id = ?2", nativeQuery = true)
	void updateEstado(int estado, int id);

}