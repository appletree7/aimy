package com.ibsys2.aimy.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ibsys2.aimy.domain.Teil;
import com.ibsys2.aimy.service.TeilService;
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
 * REST controller for managing Teil.
 */
@RestController
@RequestMapping("/api")
public class TeilResource {

    private final Logger log = LoggerFactory.getLogger(TeilResource.class);

    private static final String ENTITY_NAME = "teil";

    private final TeilService teilService;

    public TeilResource(TeilService teilService) {
        this.teilService = teilService;
    }

    /**
     * POST  /teils : Create a new teil.
     *
     * @param teil the teil to create
     * @return the ResponseEntity with status 201 (Created) and with body the new teil, or with status 400 (Bad Request) if the teil has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/teils")
    @Timed
    public ResponseEntity<Teil> createTeil(@RequestBody Teil teil) throws URISyntaxException {
        log.debug("REST request to save Teil : {}", teil);
        if (teil.getId() != null) {
            throw new BadRequestAlertException("A new teil cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Teil result = teilService.save(teil);
        return ResponseEntity.created(new URI("/api/teils/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /teils : Updates an existing teil.
     *
     * @param teil the teil to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated teil,
     * or with status 400 (Bad Request) if the teil is not valid,
     * or with status 500 (Internal Server Error) if the teil couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/teils")
    @Timed
    public ResponseEntity<Teil> updateTeil(@RequestBody Teil teil) throws URISyntaxException {
        log.debug("REST request to update Teil : {}", teil);
        if (teil.getId() == null) {
            return createTeil(teil);
        }
        Teil result = teilService.save(teil);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, teil.getId().toString()))
            .body(result);
    }

    /**
     * GET  /teils : get all the teils.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of teils in body
     */
    @GetMapping("/teils")
    @Timed
    public List<Teil> getAllTeils() {
        log.debug("REST request to get all Teils");
        return teilService.findAll();
        }

    /**
     * GET  /teils/:id : get the "id" teil.
     *
     * @param id the id of the teil to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the teil, or with status 404 (Not Found)
     */
    @GetMapping("/teils/{id}")
    @Timed
    public ResponseEntity<Teil> getTeil(@PathVariable Long id) {
        log.debug("REST request to get Teil : {}", id);
        Teil teil = teilService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(teil));
    }

    /**
     * DELETE  /teils/:id : delete the "id" teil.
     *
     * @param id the id of the teil to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/teils/{id}")
    @Timed
    public ResponseEntity<Void> deleteTeil(@PathVariable Long id) {
        log.debug("REST request to delete Teil : {}", id);
        teilService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
