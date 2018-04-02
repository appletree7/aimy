package com.ibsys2.aimy.repository;

import com.ibsys2.aimy.domain.Kennzahlen;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Kennzahlen entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KennzahlenRepository extends JpaRepository<Kennzahlen, Long>, JpaSpecificationExecutor<Kennzahlen> {

}
