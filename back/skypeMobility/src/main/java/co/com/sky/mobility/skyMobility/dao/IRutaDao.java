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
	
	@Query("SELECT r, e1, e2 FROM Ruta r, Edificio e1, Edificio e2 WHERE r.origenId = e1.id AND e1.latitud = ?1 and e1.longitud = ?2 AND r.destinoId = e2.id AND"
			+ " e2.latitud = ?3 and e2.longitud = ?4 ")
	List<Ruta> findByOrigenDestino(String latitudOrigen, String longitudOrigen, 
			String latitudDestino, String longitudDestino );
	
	@Modifying
	@Transactional
	@Query(value ="UPDATE ruta SET estado= ?1 where id = ?2", nativeQuery = true)
	void updateEstado(int estado, int id);
	
	@Query("SELECT r FROM Ruta r where r.vehiculoId = ?1")
	List<Ruta> findByVehiculo(int vehiculoId);

}
