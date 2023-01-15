package app.projetplat.service.mapper;

import app.projetplat.domain.TypePlat;
import app.projetplat.service.dto.TypePlatDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TypePlat} and its DTO {@link TypePlatDTO}.
 */
@Mapper(componentModel = "spring")
public interface TypePlatMapper extends EntityMapper<TypePlatDTO, TypePlat> {}
