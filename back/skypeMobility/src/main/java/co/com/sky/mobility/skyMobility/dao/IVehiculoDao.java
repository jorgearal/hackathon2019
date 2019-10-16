package co.com.sky.mobility.skyMobility.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import co.com.sky.mobility.skyMobility.model.Vehiculo;


@Repository
public interface IVehiculoDao extends JpaRepository<Vehiculo, Integer> {
	
	@Query("SELECT v FROM Vehiculo v where v.placa = ?1")
	List<Vehiculo> findByTitle(String placa);

}
