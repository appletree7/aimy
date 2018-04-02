package com.ibsys2.aimy.repository;

import com.ibsys2.aimy.domain.Teil;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Teil entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TeilRepository extends JpaRepository<Teil, Long>, JpaSpecificationExecutor<Teil> {
    @Query("select distinct teil from Teil teil left join fetch teil.subkomponentes")
    List<Teil> findAllWithEagerRelationships();

    @Query("select teil from Teil teil left join fetch teil.subkomponentes where teil.id =:id")
    Teil findOneWithEagerRelationships(@Param("id") Long id);

}
