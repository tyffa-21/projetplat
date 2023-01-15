package app.projetplat.web.rest;

import app.projetplat.repository.TypePlatRepository;
import app.projetplat.service.TypePlatService;
import app.projetplat.service.dto.TypePlatDTO;
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
 * REST controller for managing {@link app.projetplat.domain.TypePlat}.
 */
@RestController
@RequestMapping("/api")
public class TypePlatResource {

    private final Logger log = LoggerFactory.getLogger(TypePlatResource.class);

    private static final String ENTITY_NAME = "typePlat";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TypePlatService typePlatService;

    private final TypePlatRepository typePlatRepository;

    public TypePlatResource(TypePlatService typePlatService, TypePlatRepository typePlatRepository) {
        this.typePlatService = typePlatService;
        this.typePlatRepository = typePlatRepository;
    }

    /**
     * {@code POST  /type-plats} : Create a new typePlat.
     *
     * @param typePlatDTO the typePlatDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new typePlatDTO, or with status {@code 400 (Bad Request)} if the typePlat has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/type-plats")
    public ResponseEntity<TypePlatDTO> createTypePlat(@RequestBody TypePlatDTO typePlatDTO) throws URISyntaxException {
        log.debug("REST request to save TypePlat : {}", typePlatDTO);
        if (typePlatDTO.getId() != null) {
            throw new BadRequestAlertException("A new typePlat cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TypePlatDTO result = typePlatService.save(typePlatDTO);
        return ResponseEntity
            .created(new URI("/api/type-plats/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /type-plats/:id} : Updates an existing typePlat.
     *
     * @param id the id of the typePlatDTO to save.
     * @param typePlatDTO the typePlatDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated typePlatDTO,
     * or with status {@code 400 (Bad Request)} if the typePlatDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the typePlatDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/type-plats/{id}")
    public ResponseEntity<TypePlatDTO> updateTypePlat(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TypePlatDTO typePlatDTO
    ) throws URISyntaxException {
        log.debug("REST request to update TypePlat : {}, {}", id, typePlatDTO);
        if (typePlatDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, typePlatDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!typePlatRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TypePlatDTO result = typePlatService.update(typePlatDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, typePlatDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /type-plats/:id} : Partial updates given fields of an existing typePlat, field will ignore if it is null
     *
     * @param id the id of the typePlatDTO to save.
     * @param typePlatDTO the typePlatDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated typePlatDTO,
     * or with status {@code 400 (Bad Request)} if the typePlatDTO is not valid,
     * or with status {@code 404 (Not Found)} if the typePlatDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the typePlatDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/type-plats/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TypePlatDTO> partialUpdateTypePlat(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TypePlatDTO typePlatDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update TypePlat partially : {}, {}", id, typePlatDTO);
        if (typePlatDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, typePlatDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!typePlatRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TypePlatDTO> result = typePlatService.partialUpdate(typePlatDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, typePlatDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /type-plats} : get all the typePlats.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of typePlats in body.
     */
    @GetMapping("/type-plats")
    public List<TypePlatDTO> getAllTypePlats() {
        log.debug("REST request to get all TypePlats");
        return typePlatService.findAll();
    }

    /**
     * {@code GET  /type-plats/:id} : get the "id" typePlat.
     *
     * @param id the id of the typePlatDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the typePlatDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/type-plats/{id}")
    public ResponseEntity<TypePlatDTO> getTypePlat(@PathVariable Long id) {
        log.debug("REST request to get TypePlat : {}", id);
        Optional<TypePlatDTO> typePlatDTO = typePlatService.findOne(id);
        return ResponseUtil.wrapOrNotFound(typePlatDTO);
    }

    /**
     * {@code DELETE  /type-plats/:id} : delete the "id" typePlat.
     *
     * @param id the id of the typePlatDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/type-plats/{id}")
    public ResponseEntity<Void> deleteTypePlat(@PathVariable Long id) {
        log.debug("REST request to delete TypePlat : {}", id);
        typePlatService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
