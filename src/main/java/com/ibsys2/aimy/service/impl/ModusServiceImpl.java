package com.ibsys2.aimy.service.impl;

import com.ibsys2.aimy.service.ModusService;
import com.ibsys2.aimy.domain.Modus;
import com.ibsys2.aimy.repository.ModusRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing Modus.
 */
@Service
@Transactional
public class ModusServiceImpl implements ModusService{

    private final Logger log = LoggerFactory.getLogger(ModusServiceImpl.class);

    private final ModusRepository modusRepository;

    public ModusServiceImpl(ModusRepository modusRepository) {
        this.modusRepository = modusRepository;
    }

    /**
     * Save a modus.
     *
     * @param modus the entity to save
     * @return the persisted entity
     */
    @Override
    public Modus save(Modus modus) {
        log.debug("Request to save Modus : {}", modus);
        return modusRepository.save(modus);
    }

    /**
     *  Get all the moduses.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Modus> findAll() {
        log.debug("Request to get all Moduses");
        return modusRepository.findAll();
    }


    /**
     *  get all the moduses where Bestellung is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Modus> findAllWhereBestellungIsNull() {
        log.debug("Request to get all moduses where Bestellung is null");
        return StreamSupport
            .stream(modusRepository.findAll().spliterator(), false)
            .filter(modus -> modus.getBestellung() == null)
            .collect(Collectors.toList());
    }

    /**
     *  Get one modus by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Modus findOne(Long id) {
        log.debug("Request to get Modus : {}", id);
        return modusRepository.findOne(id);
    }

    /**
     *  Delete the  modus by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Modus : {}", id);
        modusRepository.delete(id);
    }
}
