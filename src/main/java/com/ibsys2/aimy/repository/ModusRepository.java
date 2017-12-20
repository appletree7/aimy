package com.ibsys2.aimy.repository;

import com.ibsys2.aimy.domain.Modus;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Modus entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ModusRepository extends JpaRepository<Modus, Long> {

}
