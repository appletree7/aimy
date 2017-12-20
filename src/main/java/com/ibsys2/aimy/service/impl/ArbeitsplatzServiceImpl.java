package com.ibsys2.aimy.service.impl;

import com.ibsys2.aimy.service.ArbeitsplatzService;
import com.ibsys2.aimy.domain.Arbeitsplatz;
import com.ibsys2.aimy.repository.ArbeitsplatzRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Arbeitsplatz.
 */
@Service
@Transactional
public class ArbeitsplatzServiceImpl implements ArbeitsplatzService{

    private final Logger log = LoggerFactory.getLogger(ArbeitsplatzServiceImpl.class);

    private final ArbeitsplatzRepository arbeitsplatzRepository;

    public ArbeitsplatzServiceImpl(ArbeitsplatzRepository arbeitsplatzRepository) {
        this.arbeitsplatzRepository = arbeitsplatzRepository;
    }

    /**
     * Save a arbeitsplatz.
     *
     * @param arbeitsplatz the entity to save
     * @return the persisted entity
     */
    @Override
    public Arbeitsplatz save(Arbeitsplatz arbeitsplatz) {
        log.debug("Request to save Arbeitsplatz : {}", arbeitsplatz);
        return arbeitsplatzRepository.save(arbeitsplatz);
    }

    /**
     *  Get all the arbeitsplatzs.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Arbeitsplatz> findAll() {
        log.debug("Request to get all Arbeitsplatzs");
        return arbeitsplatzRepository.findAll();
    }

    /**
     *  Get one arbeitsplatz by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Arbeitsplatz findOne(Long id) {
        log.debug("Request to get Arbeitsplatz : {}", id);
        return arbeitsplatzRepository.findOne(id);
    }

    /**
     *  Delete the  arbeitsplatz by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Arbeitsplatz : {}", id);
        arbeitsplatzRepository.delete(id);
    }
}
