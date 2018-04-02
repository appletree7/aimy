package com.ibsys2.aimy.repository;

import com.ibsys2.aimy.domain.Arbeitsplatz;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Arbeitsplatz entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArbeitsplatzRepository extends JpaRepository<Arbeitsplatz, Long>, JpaSpecificationExecutor<Arbeitsplatz> {

}
