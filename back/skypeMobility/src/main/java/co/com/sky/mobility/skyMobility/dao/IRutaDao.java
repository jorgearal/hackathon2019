package co.com.sky.mobility.skyMobility.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import co.com.sky.mobility.skyMobility.model.Ruta;


@Repository
public interface IRutaDao extends CrudRepository<Ruta, Integer> {
	
	@Query("SELECT r FROM Ruta r where r.origen.latitud = ?1 and r.origen.longitud = ?2 "
			+ "and r.destino.latitud = ?3 and r.destino.longitud = ?4 ")
	List<Ruta> findByOrigenDestino(String latitudOrigen, String longitudOrigen, 
			String latitudDestino, String longitudDestino );

}
