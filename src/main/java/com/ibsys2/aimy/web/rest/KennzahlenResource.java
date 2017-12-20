package com.ibsys2.aimy.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ibsys2.aimy.domain.Kennzahlen;
import com.ibsys2.aimy.service.KennzahlenService;
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
 * REST controller for managing Kennzahlen.
 */
@RestController
@RequestMapping("/api")
public class KennzahlenResource {

    private final Logger log = LoggerFactory.getLogger(KennzahlenResource.class);

    private static final String ENTITY_NAME = "kennzahlen";

    private final KennzahlenService kennzahlenService;

    public KennzahlenResource(KennzahlenService kennzahlenService) {
        this.kennzahlenService = kennzahlenService;
    }

    /**
     * POST  /kennzahlens : Create a new kennzahlen.
     *
     * @param kennzahlen the kennzahlen to create
     * @return the ResponseEntity with status 201 (Created) and with body the new kennzahlen, or with status 400 (Bad Request) if the kennzahlen has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/kennzahlens")
    @Timed
    public ResponseEntity<Kennzahlen> createKennzahlen(@RequestBody Kennzahlen kennzahlen) throws URISyntaxException {
        log.debug("REST request to save Kennzahlen : {}", kennzahlen);
        if (kennzahlen.getId() != null) {
            throw new BadRequestAlertException("A new kennzahlen cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Kennzahlen result = kennzahlenService.save(kennzahlen);
        return ResponseEntity.created(new URI("/api/kennzahlens/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /kennzahlens : Updates an existing kennzahlen.
     *
     * @param kennzahlen the kennzahlen to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated kennzahlen,
     * or with status 400 (Bad Request) if the kennzahlen is not valid,
     * or with status 500 (Internal Server Error) if the kennzahlen couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/kennzahlens")
    @Timed
    public ResponseEntity<Kennzahlen> updateKennzahlen(@RequestBody Kennzahlen kennzahlen) throws URISyntaxException {
        log.debug("REST request to update Kennzahlen : {}", kennzahlen);
        if (kennzahlen.getId() == null) {
            return createKennzahlen(kennzahlen);
        }
        Kennzahlen result = kennzahlenService.save(kennzahlen);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, kennzahlen.getId().toString()))
            .body(result);
    }

    /**
     * GET  /kennzahlens : get all the kennzahlens.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of kennzahlens in body
     */
    @GetMapping("/kennzahlens")
    @Timed
    public List<Kennzahlen> getAllKennzahlens() {
        log.debug("REST request to get all Kennzahlens");
        return kennzahlenService.findAll();
        }

    /**
     * GET  /kennzahlens/:id : get the "id" kennzahlen.
     *
     * @param id the id of the kennzahlen to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the kennzahlen, or with status 404 (Not Found)
     */
    @GetMapping("/kennzahlens/{id}")
    @Timed
    public ResponseEntity<Kennzahlen> getKennzahlen(@PathVariable Long id) {
        log.debug("REST request to get Kennzahlen : {}", id);
        Kennzahlen kennzahlen = kennzahlenService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(kennzahlen));
    }

    /**
     * DELETE  /kennzahlens/:id : delete the "id" kennzahlen.
     *
     * @param id the id of the kennzahlen to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/kennzahlens/{id}")
    @Timed
    public ResponseEntity<Void> deleteKennzahlen(@PathVariable Long id) {
        log.debug("REST request to delete Kennzahlen : {}", id);
        kennzahlenService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
