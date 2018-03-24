package com.ibsys2.aimy.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ibsys2.aimy.domain.Arbeitsplatz;
import com.ibsys2.aimy.service.ArbeitsplatzService;
import com.ibsys2.aimy.web.rest.errors.BadRequestAlertException;
import com.ibsys2.aimy.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Arbeitsplatz.
 */
@RestController
@RequestMapping("/api")
public class ArbeitsplatzResource {

    private final Logger log = LoggerFactory.getLogger(ArbeitsplatzResource.class);

    private static final String ENTITY_NAME = "arbeitsplatz";

    private final ArbeitsplatzService arbeitsplatzService;

    public ArbeitsplatzResource(ArbeitsplatzService arbeitsplatzService) {
        this.arbeitsplatzService = arbeitsplatzService;
    }

    /**
     * POST  /arbeitsplatzs : Create a new arbeitsplatz.
     *
     * @param arbeitsplatz the arbeitsplatz to create
     * @return the ResponseEntity with status 201 (Created) and with body the new arbeitsplatz, or with status 400 (Bad Request) if the arbeitsplatz has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/arbeitsplatzs")
    @Timed
    public ResponseEntity<Arbeitsplatz> createArbeitsplatz(@Valid @RequestBody Arbeitsplatz arbeitsplatz) throws URISyntaxException {
        log.debug("REST request to save Arbeitsplatz : {}", arbeitsplatz);
        if (arbeitsplatz.getId() != null) {
            throw new BadRequestAlertException("A new arbeitsplatz cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Arbeitsplatz result = arbeitsplatzService.save(arbeitsplatz);
        return ResponseEntity.created(new URI("/api/arbeitsplatzs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /arbeitsplatzs : Updates an existing arbeitsplatz.
     *
     * @param arbeitsplatz the arbeitsplatz to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated arbeitsplatz,
     * or with status 400 (Bad Request) if the arbeitsplatz is not valid,
     * or with status 500 (Internal Server Error) if the arbeitsplatz couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/arbeitsplatzs")
    @Timed
    public ResponseEntity<Arbeitsplatz> updateArbeitsplatz(@Valid @RequestBody Arbeitsplatz arbeitsplatz) throws URISyntaxException {
        log.debug("REST request to update Arbeitsplatz : {}", arbeitsplatz);
        if (arbeitsplatz.getId() == null) {
            return createArbeitsplatz(arbeitsplatz);
        }
        Arbeitsplatz result = arbeitsplatzService.save(arbeitsplatz);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, arbeitsplatz.getId().toString()))
            .body(result);
    }

    /**
     * GET  /arbeitsplatzs : get all the arbeitsplatzs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of arbeitsplatzs in body
     */
    @GetMapping("/arbeitsplatzs")
    @Timed
    public List<Arbeitsplatz> getAllArbeitsplatzs() {
        log.debug("REST request to get all Arbeitsplatzs");
        return arbeitsplatzService.findAll();
        }

    /**
     * GET  /arbeitsplatzs/:id : get the "id" arbeitsplatz.
     *
     * @param id the id of the arbeitsplatz to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the arbeitsplatz, or with status 404 (Not Found)
     */
    @GetMapping("/arbeitsplatzs/{id}")
    @Timed
    public ResponseEntity<Arbeitsplatz> getArbeitsplatz(@PathVariable Long id) {
        log.debug("REST request to get Arbeitsplatz : {}", id);
        Arbeitsplatz arbeitsplatz = arbeitsplatzService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(arbeitsplatz));
    }

    /**
     * DELETE  /arbeitsplatzs/:id : delete the "id" arbeitsplatz.
     *
     * @param id the id of the arbeitsplatz to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/arbeitsplatzs/{id}")
    @Timed
    public ResponseEntity<Void> deleteArbeitsplatz(@PathVariable Long id) {
        log.debug("REST request to delete Arbeitsplatz : {}", id);
        arbeitsplatzService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
