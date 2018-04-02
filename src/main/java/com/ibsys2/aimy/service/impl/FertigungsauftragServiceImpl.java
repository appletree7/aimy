package com.ibsys2.aimy.service.impl;

import com.ibsys2.aimy.service.FertigungsauftragService;
import com.ibsys2.aimy.domain.Fertigungsauftrag;
import com.ibsys2.aimy.repository.FertigungsauftragRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Fertigungsauftrag.
 */
@Service
@Transactional
public class FertigungsauftragServiceImpl implements FertigungsauftragService{

    private final Logger log = LoggerFactory.getLogger(FertigungsauftragServiceImpl.class);

    private final FertigungsauftragRepository fertigungsauftragRepository;

    public FertigungsauftragServiceImpl(FertigungsauftragRepository fertigungsauftragRepository) {
        this.fertigungsauftragRepository = fertigungsauftragRepository;
    }

    /**
     * Save a fertigungsauftrag.
     *
     * @param fertigungsauftrag the entity to save
     * @return the persisted entity
     */
    @Override
    public Fertigungsauftrag save(Fertigungsauftrag fertigungsauftrag) {
        log.debug("Request to save Fertigungsauftrag : {}", fertigungsauftrag);
        return fertigungsauftragRepository.save(fertigungsauftrag);
    }

    /**
     *  Get all the fertigungsauftrags.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Fertigungsauftrag> findAll(Pageable pageable) {
        log.debug("Request to get all Fertigungsauftrags");
        return fertigungsauftragRepository.findAll(pageable);
    }

    /**
     *  Get one fertigungsauftrag by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Fertigungsauftrag findOne(Long id) {
        log.debug("Request to get Fertigungsauftrag : {}", id);
        return fertigungsauftragRepository.findOne(id);
    }

    /**
     *  Delete the  fertigungsauftrag by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Fertigungsauftrag : {}", id);
        fertigungsauftragRepository.delete(id);
    }
}
