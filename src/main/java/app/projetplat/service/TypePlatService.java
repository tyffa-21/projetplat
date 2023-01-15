package app.projetplat.service;

import app.projetplat.domain.TypePlat;
import app.projetplat.repository.TypePlatRepository;
import app.projetplat.service.dto.TypePlatDTO;
import app.projetplat.service.mapper.TypePlatMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link TypePlat}.
 */
@Service
@Transactional
public class TypePlatService {

    private final Logger log = LoggerFactory.getLogger(TypePlatService.class);

    private final TypePlatRepository typePlatRepository;

    private final TypePlatMapper typePlatMapper;

    public TypePlatService(TypePlatRepository typePlatRepository, TypePlatMapper typePlatMapper) {
        this.typePlatRepository = typePlatRepository;
        this.typePlatMapper = typePlatMapper;
    }

    /**
     * Save a typePlat.
     *
     * @param typePlatDTO the entity to save.
     * @return the persisted entity.
     */
    public TypePlatDTO save(TypePlatDTO typePlatDTO) {
        log.debug("Request to save TypePlat : {}", typePlatDTO);
        TypePlat typePlat = typePlatMapper.toEntity(typePlatDTO);
        typePlat = typePlatRepository.save(typePlat);
        return typePlatMapper.toDto(typePlat);
    }

    /**
     * Update a typePlat.
     *
     * @param typePlatDTO the entity to save.
     * @return the persisted entity.
     */
    public TypePlatDTO update(TypePlatDTO typePlatDTO) {
        log.debug("Request to update TypePlat : {}", typePlatDTO);
        TypePlat typePlat = typePlatMapper.toEntity(typePlatDTO);
        typePlat = typePlatRepository.save(typePlat);
        return typePlatMapper.toDto(typePlat);
    }

    /**
     * Partially update a typePlat.
     *
     * @param typePlatDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<TypePlatDTO> partialUpdate(TypePlatDTO typePlatDTO) {
        log.debug("Request to partially update TypePlat : {}", typePlatDTO);

        return typePlatRepository
            .findById(typePlatDTO.getId())
            .map(existingTypePlat -> {
                typePlatMapper.partialUpdate(existingTypePlat, typePlatDTO);

                return existingTypePlat;
            })
            .map(typePlatRepository::save)
            .map(typePlatMapper::toDto);
    }

    /**
     * Get all the typePlats.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<TypePlatDTO> findAll() {
        log.debug("Request to get all TypePlats");
        return typePlatRepository.findAll().stream().map(typePlatMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one typePlat by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<TypePlatDTO> findOne(Long id) {
        log.debug("Request to get TypePlat : {}", id);
        return typePlatRepository.findById(id).map(typePlatMapper::toDto);
    }

    /**
     * Delete the typePlat by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete TypePlat : {}", id);
        typePlatRepository.deleteById(id);
    }
}
