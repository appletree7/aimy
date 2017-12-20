package com.ibsys2.aimy.repository;

import com.ibsys2.aimy.domain.Bestellung;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Bestellung entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BestellungRepository extends JpaRepository<Bestellung, Long> {

}
