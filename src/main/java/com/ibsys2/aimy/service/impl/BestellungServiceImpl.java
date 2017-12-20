package com.ibsys2.aimy.service.impl;

import com.ibsys2.aimy.service.BestellungService;
import com.ibsys2.aimy.domain.Bestellung;
import com.ibsys2.aimy.repository.BestellungRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Bestellung.
 */
@Service
@Transactional
public class BestellungServiceImpl implements BestellungService{

    private final Logger log = LoggerFactory.getLogger(BestellungServiceImpl.class);

    private final BestellungRepository bestellungRepository;

    public BestellungServiceImpl(BestellungRepository bestellungRepository) {
        this.bestellungRepository = bestellungRepository;
    }

    /**
     * Save a bestellung.
     *
     * @param bestellung the entity to save
     * @return the persisted entity
     */
    @Override
    public Bestellung save(Bestellung bestellung) {
        log.debug("Request to save Bestellung : {}", bestellung);
        return bestellungRepository.save(bestellung);
    }

    /**
     *  Get all the bestellungs.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Bestellung> findAll() {
        log.debug("Request to get all Bestellungs");
        return bestellungRepository.findAll();
    }

    /**
     *  Get one bestellung by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Bestellung findOne(Long id) {
        log.debug("Request to get Bestellung : {}", id);
        return bestellungRepository.findOne(id);
    }

    /**
     *  Delete the  bestellung by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Bestellung : {}", id);
        bestellungRepository.delete(id);
    }
}
