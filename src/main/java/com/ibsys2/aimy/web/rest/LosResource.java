package com.ibsys2.aimy.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ibsys2.aimy.domain.Los;
import com.ibsys2.aimy.service.LosService;
import com.ibsys2.aimy.web.rest.errors.BadRequestAlertException;
import com.ibsys2.aimy.web.rest.util.HeaderUtil;
import com.ibsys2.aimy.web.rest.util.PaginationUtil;
import com.ibsys2.aimy.service.dto.LosCriteria;
import com.ibsys2.aimy.service.LosQueryService;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Los.
 */
@RestController
@RequestMapping("/api")
public class LosResource {

    private final Logger log = LoggerFactory.getLogger(LosResource.class);

    private static final String ENTITY_NAME = "los";

    private final LosService losService;

    private final LosQueryService losQueryService;

    public LosResource(LosService losService, LosQueryService losQueryService) {
        this.losService = losService;
        this.losQueryService = losQueryService;
    }

    /**
     * POST  /los : Create a new los.
     *
     * @param los the los to create
     * @return the ResponseEntity with status 201 (Created) and with body the new los, or with status 400 (Bad Request) if the los has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/los")
    @Timed
    public ResponseEntity<Los> createLos(@Valid @RequestBody Los los) throws URISyntaxException {
        log.debug("REST request to save Los : {}", los);
        if (los.getId() != null) {
            throw new BadRequestAlertException("A new los cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Los result = losService.save(los);
        return ResponseEntity.created(new URI("/api/los/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /los : Updates an existing los.
     *
     * @param los the los to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated los,
     * or with status 400 (Bad Request) if the los is not valid,
     * or with status 500 (Internal Server Error) if the los couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/los")
    @Timed
    public ResponseEntity<Los> updateLos(@Valid @RequestBody Los los) throws URISyntaxException {
        log.debug("REST request to update Los : {}", los);
        if (los.getId() == null) {
            return createLos(los);
        }
        Los result = losService.save(los);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, los.getId().toString()))
            .body(result);
    }

    /**
     * GET  /los : get all the los.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of los in body
     */
    @GetMapping("/los")
    @Timed
    public ResponseEntity<List<Los>> getAllLos(LosCriteria criteria,@ApiParam Pageable pageable) {
        log.debug("REST request to get Los by criteria: {}", criteria);
        Page<Los> page = losQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/los");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /los/:id : get the "id" los.
     *
     * @param id the id of the los to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the los, or with status 404 (Not Found)
     */
    @GetMapping("/los/{id}")
    @Timed
    public ResponseEntity<Los> getLos(@PathVariable Long id) {
        log.debug("REST request to get Los : {}", id);
        Los los = losService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(los));
    }

    /**
     * DELETE  /los/:id : delete the "id" los.
     *
     * @param id the id of the los to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/los/{id}")
    @Timed
    public ResponseEntity<Void> deleteLos(@PathVariable Long id) {
        log.debug("REST request to delete Los : {}", id);
        losService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
