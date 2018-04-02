package com.ibsys2.aimy.repository;

import com.ibsys2.aimy.domain.Los;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Los entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LosRepository extends JpaRepository<Los, Long>, JpaSpecificationExecutor<Los> {

}
