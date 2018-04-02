package com.ibsys2.aimy.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ibsys2.aimy.domain.Modus;
import com.ibsys2.aimy.service.ModusService;
import com.ibsys2.aimy.web.rest.errors.BadRequestAlertException;
import com.ibsys2.aimy.web.rest.util.HeaderUtil;
import com.ibsys2.aimy.web.rest.util.PaginationUtil;
import com.ibsys2.aimy.service.dto.ModusCriteria;
import com.ibsys2.aimy.service.ModusQueryService;
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
 * REST controller for managing Modus.
 */
@RestController
@RequestMapping("/api")
public class ModusResource {

    private final Logger log = LoggerFactory.getLogger(ModusResource.class);

    private static final String ENTITY_NAME = "modus";

    private final ModusService modusService;

    private final ModusQueryService modusQueryService;

    public ModusResource(ModusService modusService, ModusQueryService modusQueryService) {
        this.modusService = modusService;
        this.modusQueryService = modusQueryService;
    }

    /**
     * POST  /moduses : Create a new modus.
     *
     * @param modus the modus to create
     * @return the ResponseEntity with status 201 (Created) and with body the new modus, or with status 400 (Bad Request) if the modus has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/moduses")
    @Timed
    public ResponseEntity<Modus> createModus(@Valid @RequestBody Modus modus) throws URISyntaxException {
        log.debug("REST request to save Modus : {}", modus);
        if (modus.getId() != null) {
            throw new BadRequestAlertException("A new modus cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Modus result = modusService.save(modus);
        return ResponseEntity.created(new URI("/api/moduses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /moduses : Updates an existing modus.
     *
     * @param modus the modus to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated modus,
     * or with status 400 (Bad Request) if the modus is not valid,
     * or with status 500 (Internal Server Error) if the modus couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/moduses")
    @Timed
    public ResponseEntity<Modus> updateModus(@Valid @RequestBody Modus modus) throws URISyntaxException {
        log.debug("REST request to update Modus : {}", modus);
        if (modus.getId() == null) {
            return createModus(modus);
        }
        Modus result = modusService.save(modus);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, modus.getId().toString()))
            .body(result);
    }

    /**
     * GET  /moduses : get all the moduses.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of moduses in body
     */
    @GetMapping("/moduses")
    @Timed
    public ResponseEntity<List<Modus>> getAllModuses(ModusCriteria criteria,@ApiParam Pageable pageable) {
        log.debug("REST request to get Moduses by criteria: {}", criteria);
        Page<Modus> page = modusQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/moduses");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /moduses/:id : get the "id" modus.
     *
     * @param id the id of the modus to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the modus, or with status 404 (Not Found)
     */
    @GetMapping("/moduses/{id}")
    @Timed
    public ResponseEntity<Modus> getModus(@PathVariable Long id) {
        log.debug("REST request to get Modus : {}", id);
        Modus modus = modusService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(modus));
    }

    /**
     * DELETE  /moduses/:id : delete the "id" modus.
     *
     * @param id the id of the modus to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/moduses/{id}")
    @Timed
    public ResponseEntity<Void> deleteModus(@PathVariable Long id) {
        log.debug("REST request to delete Modus : {}", id);
        modusService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
