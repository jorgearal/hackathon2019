package co.com.sky.mobility.skyMobility.dao;

import co.com.sky.mobility.skyMobility.model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPersonaDAO extends JpaRepository<Persona, Integer> {
}
