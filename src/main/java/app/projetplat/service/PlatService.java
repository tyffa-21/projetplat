package app.projetplat.service;

import app.projetplat.domain.Plat;
import app.projetplat.repository.PlatRepository;
import app.projetplat.service.dto.PlatDTO;
import app.projetplat.service.mapper.PlatMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Plat}.
 */
@Service
@Transactional
public class PlatService {

    private final Logger log = LoggerFactory.getLogger(PlatService.class);

    private final PlatRepository platRepository;

    private final PlatMapper platMapper;

    public PlatService(PlatRepository platRepository, PlatMapper platMapper) {
        this.platRepository = platRepository;
        this.platMapper = platMapper;
    }

    /**
     * Save a plat.
     *
     * @param platDTO the entity to save.
     * @return the persisted entity.
     */
    public PlatDTO save(PlatDTO platDTO) {
        log.debug("Request to save Plat : {}", platDTO);
        Plat plat = platMapper.toEntity(platDTO);
        plat = platRepository.save(plat);
        return platMapper.toDto(plat);
    }

    /**
     * Update a plat.
     *
     * @param platDTO the entity to save.
     * @return the persisted entity.
     */
    public PlatDTO update(PlatDTO platDTO) {
        log.debug("Request to update Plat : {}", platDTO);
        Plat plat = platMapper.toEntity(platDTO);
        plat = platRepository.save(plat);
        return platMapper.toDto(plat);
    }

    /**
     * Partially update a plat.
     *
     * @param platDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<PlatDTO> partialUpdate(PlatDTO platDTO) {
        log.debug("Request to partially update Plat : {}", platDTO);

        return platRepository
            .findById(platDTO.getId())
            .map(existingPlat -> {
                platMapper.partialUpdate(existingPlat, platDTO);

                return existingPlat;
            })
            .map(platRepository::save)
            .map(platMapper::toDto);
    }

    /**
     * Get all the plats.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<PlatDTO> findAll() {
        log.debug("Request to get all Plats");
        return platRepository.findAll().stream().map(platMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one plat by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<PlatDTO> findOne(Long id) {
        log.debug("Request to get Plat : {}", id);
        return platRepository.findById(id).map(platMapper::toDto);
    }

    /**
     * Delete the plat by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Plat : {}", id);
        platRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<Object> getPlatInservice() {
        List<Object> resultat = platRepository.getPlatInRepo();
        return resultat;
    }
}
