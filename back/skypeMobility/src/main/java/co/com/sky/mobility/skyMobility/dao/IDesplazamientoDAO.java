/**
 * 
 */
package co.com.sky.mobility.skyMobility.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import co.com.sky.mobility.skyMobility.model.Desplazamiento;

/**
 * @author cguzmanp
 *
 */
@Repository
public interface IDesplazamientoDAO extends JpaRepository<Desplazamiento, Integer> {

	@Query("SELECT d FROM Desplazamiento d where d.idRuta = ?1")
	List<Desplazamiento> findByIdRuta(Integer idRuta);
}
