package com.ibsys2.aimy.repository;

import com.ibsys2.aimy.domain.Fertigungsauftrag;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Fertigungsauftrag entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FertigungsauftragRepository extends JpaRepository<Fertigungsauftrag, Long>, JpaSpecificationExecutor<Fertigungsauftrag> {

}
