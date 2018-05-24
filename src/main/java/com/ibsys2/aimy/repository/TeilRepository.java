package com.ibsys2.aimy.repository;

import com.ibsys2.aimy.domain.Teil;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Teil entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TeilRepository extends JpaRepository<Teil, Long>, JpaSpecificationExecutor<Teil> {

}
