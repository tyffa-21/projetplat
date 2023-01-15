package app.projetplat.web.rest;

import app.projetplat.repository.PlatRepository;
import app.projetplat.service.PlatService;
import app.projetplat.service.dto.PlatDTO;
import app.projetplat.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link app.projetplat.domain.Plat}.
 */
@RestController
@RequestMapping("/api")
public class PlatResource {

    private final Logger log = LoggerFactory.getLogger(PlatResource.class);

    private static final String ENTITY_NAME = "plat";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlatService platService;

    private final PlatRepository platRepository;

    public PlatResource(PlatService platService, PlatRepository platRepository) {
        this.platService = platService;
        this.platRepository = platRepository;
    }

    /**
     * {@code POST  /plats} : Create a new plat.
     *
     * @param platDTO the platDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new platDTO, or with status {@code 400 (Bad Request)} if the plat has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/plats")
    public ResponseEntity<PlatDTO> createPlat(@RequestBody PlatDTO platDTO) throws URISyntaxException {
        log.debug("REST request to save Plat : {}", platDTO);
        if (platDTO.getId() != null) {
            throw new BadRequestAlertException("A new plat cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlatDTO result = platService.save(platDTO);
        return ResponseEntity
            .created(new URI("/api/plats/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /plats/:id} : Updates an existing plat.
     *
     * @param id the id of the platDTO to save.
     * @param platDTO the platDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated platDTO,
     * or with status {@code 400 (Bad Request)} if the platDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the platDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/plats/{id}")
    public ResponseEntity<PlatDTO> updatePlat(@PathVariable(value = "id", required = false) final Long id, @RequestBody PlatDTO platDTO)
        throws URISyntaxException {
        log.debug("REST request to update Plat : {}, {}", id, platDTO);
        if (platDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, platDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!platRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PlatDTO result = platService.update(platDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, platDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /plats/:id} : Partial updates given fields of an existing plat, field will ignore if it is null
     *
     * @param id the id of the platDTO to save.
     * @param platDTO the platDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated platDTO,
     * or with status {@code 400 (Bad Request)} if the platDTO is not valid,
     * or with status {@code 404 (Not Found)} if the platDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the platDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/plats/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<PlatDTO> partialUpdatePlat(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody PlatDTO platDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Plat partially : {}, {}", id, platDTO);
        if (platDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, platDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!platRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PlatDTO> result = platService.partialUpdate(platDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, platDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /plats} : get all the plats.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of plats in body.
     */
    @GetMapping("/plats")
    public List<PlatDTO> getAllPlats() {
        log.debug("REST request to get all Plats");
        return platService.findAll();
    }

    /**
     * {@code GET  /plats/:id} : get the "id" plat.
     *
     * @param id the id of the platDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the platDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/plats/{id}")
    public ResponseEntity<PlatDTO> getPlat(@PathVariable Long id) {
        log.debug("REST request to get Plat : {}", id);
        Optional<PlatDTO> platDTO = platService.findOne(id);
        return ResponseUtil.wrapOrNotFound(platDTO);
    }

    /**
     * {@code DELETE  /plats/:id} : delete the "id" plat.
     *
     * @param id the id of the platDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/plats/{id}")
    public ResponseEntity<Void> deletePlat(@PathVariable Long id) {
        log.debug("REST request to delete Plat : {}", id);
        platService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    @GetMapping("/listeplat")
    public List<Object> getPlatInCont() {
        List<Object> resultat = platService.getPlatInservice();
        return resultat;
    }
}
