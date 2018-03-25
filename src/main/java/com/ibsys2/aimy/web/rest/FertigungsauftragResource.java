package com.ibsys2.aimy.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ibsys2.aimy.domain.Fertigungsauftrag;
import com.ibsys2.aimy.service.FertigungsauftragService;
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
 * REST controller for managing Fertigungsauftrag.
 */
@RestController
@RequestMapping("/api")
public class FertigungsauftragResource {

    private final Logger log = LoggerFactory.getLogger(FertigungsauftragResource.class);

    private static final String ENTITY_NAME = "fertigungsauftrag";

    private final FertigungsauftragService fertigungsauftragService;

    public FertigungsauftragResource(FertigungsauftragService fertigungsauftragService) {
        this.fertigungsauftragService = fertigungsauftragService;
    }

    /**
     * POST  /fertigungsauftrags : Create a new fertigungsauftrag.
     *
     * @param fertigungsauftrag the fertigungsauftrag to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fertigungsauftrag, or with status 400 (Bad Request) if the fertigungsauftrag has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/fertigungsauftrags")
    @Timed
    public ResponseEntity<Fertigungsauftrag> createFertigungsauftrag(@Valid @RequestBody Fertigungsauftrag fertigungsauftrag) throws URISyntaxException {
        log.debug("REST request to save Fertigungsauftrag : {}", fertigungsauftrag);
        if (fertigungsauftrag.getId() != null) {
            throw new BadRequestAlertException("A new fertigungsauftrag cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Fertigungsauftrag result = fertigungsauftragService.save(fertigungsauftrag);
        return ResponseEntity.created(new URI("/api/fertigungsauftrags/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /fertigungsauftrags : Updates an existing fertigungsauftrag.
     *
     * @param fertigungsauftrag the fertigungsauftrag to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fertigungsauftrag,
     * or with status 400 (Bad Request) if the fertigungsauftrag is not valid,
     * or with status 500 (Internal Server Error) if the fertigungsauftrag couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/fertigungsauftrags")
    @Timed
    public ResponseEntity<Fertigungsauftrag> updateFertigungsauftrag(@Valid @RequestBody Fertigungsauftrag fertigungsauftrag) throws URISyntaxException {
        log.debug("REST request to update Fertigungsauftrag : {}", fertigungsauftrag);
        if (fertigungsauftrag.getId() == null) {
            return createFertigungsauftrag(fertigungsauftrag);
        }
        Fertigungsauftrag result = fertigungsauftragService.save(fertigungsauftrag);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fertigungsauftrag.getId().toString()))
            .body(result);
    }

    /**
     * GET  /fertigungsauftrags : get all the fertigungsauftrags.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of fertigungsauftrags in body
     */
    @GetMapping("/fertigungsauftrags")
    @Timed
    public List<Fertigungsauftrag> getAllFertigungsauftrags() {
        log.debug("REST request to get all Fertigungsauftrags");
        return fertigungsauftragService.findAll();
        }

    /**
     * GET  /fertigungsauftrags/:id : get the "id" fertigungsauftrag.
     *
     * @param id the id of the fertigungsauftrag to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fertigungsauftrag, or with status 404 (Not Found)
     */
    @GetMapping("/fertigungsauftrags/{id}")
    @Timed
    public ResponseEntity<Fertigungsauftrag> getFertigungsauftrag(@PathVariable Long id) {
        log.debug("REST request to get Fertigungsauftrag : {}", id);
        Fertigungsauftrag fertigungsauftrag = fertigungsauftragService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(fertigungsauftrag));
    }

    /**
     * DELETE  /fertigungsauftrags/:id : delete the "id" fertigungsauftrag.
     *
     * @param id the id of the fertigungsauftrag to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/fertigungsauftrags/{id}")
    @Timed
    public ResponseEntity<Void> deleteFertigungsauftrag(@PathVariable Long id) {
        log.debug("REST request to delete Fertigungsauftrag : {}", id);
        fertigungsauftragService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
