package com.ibsys2.aimy.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ibsys2.aimy.domain.Bestellung;
import com.ibsys2.aimy.service.BestellungService;
import com.ibsys2.aimy.web.rest.errors.BadRequestAlertException;
import com.ibsys2.aimy.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Bestellung.
 */
@RestController
@RequestMapping("/api")
public class BestellungResource {

    private final Logger log = LoggerFactory.getLogger(BestellungResource.class);

    private static final String ENTITY_NAME = "bestellung";

    private final BestellungService bestellungService;

    public BestellungResource(BestellungService bestellungService) {
        this.bestellungService = bestellungService;
    }

    /**
     * POST  /bestellungs : Create a new bestellung.
     *
     * @param bestellung the bestellung to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bestellung, or with status 400 (Bad Request) if the bestellung has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/bestellungs")
    @Timed
    public ResponseEntity<Bestellung> createBestellung(@RequestBody Bestellung bestellung) throws URISyntaxException {
        log.debug("REST request to save Bestellung : {}", bestellung);
        if (bestellung.getId() != null) {
            throw new BadRequestAlertException("A new bestellung cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Bestellung result = bestellungService.save(bestellung);
        return ResponseEntity.created(new URI("/api/bestellungs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /bestellungs : Updates an existing bestellung.
     *
     * @param bestellung the bestellung to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bestellung,
     * or with status 400 (Bad Request) if the bestellung is not valid,
     * or with status 500 (Internal Server Error) if the bestellung couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/bestellungs")
    @Timed
    public ResponseEntity<Bestellung> updateBestellung(@RequestBody Bestellung bestellung) throws URISyntaxException {
        log.debug("REST request to update Bestellung : {}", bestellung);
        if (bestellung.getId() == null) {
            return createBestellung(bestellung);
        }
        Bestellung result = bestellungService.save(bestellung);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bestellung.getId().toString()))
            .body(result);
    }

    /**
     * GET  /bestellungs : get all the bestellungs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of bestellungs in body
     */
    @GetMapping("/bestellungs")
    @Timed
    public List<Bestellung> getAllBestellungs() {
        log.debug("REST request to get all Bestellungs");
        return bestellungService.findAll();
        }

    /**
     * GET  /bestellungs/:id : get the "id" bestellung.
     *
     * @param id the id of the bestellung to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bestellung, or with status 404 (Not Found)
     */
    @GetMapping("/bestellungs/{id}")
    @Timed
    public ResponseEntity<Bestellung> getBestellung(@PathVariable Long id) {
        log.debug("REST request to get Bestellung : {}", id);
        Bestellung bestellung = bestellungService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(bestellung));
    }

    /**
     * DELETE  /bestellungs/:id : delete the "id" bestellung.
     *
     * @param id the id of the bestellung to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/bestellungs/{id}")
    @Timed
    public ResponseEntity<Void> deleteBestellung(@PathVariable Long id) {
        log.debug("REST request to delete Bestellung : {}", id);
        bestellungService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
