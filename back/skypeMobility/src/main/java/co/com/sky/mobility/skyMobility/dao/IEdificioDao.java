package co.com.sky.mobility.skyMobility.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import co.com.sky.mobility.skyMobility.model.Edificio;


@Repository
public interface IEdificioDao extends JpaRepository<Edificio, Integer> {

}
