package app.projetplat.service.mapper;

import app.projetplat.domain.Plat;
import app.projetplat.domain.TypePlat;
import app.projetplat.service.dto.PlatDTO;
import app.projetplat.service.dto.TypePlatDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Plat} and its DTO {@link PlatDTO}.
 */
@Mapper(componentModel = "spring")
public interface PlatMapper extends EntityMapper<PlatDTO, Plat> {
    @Mapping(target = "typePlat", source = "typePlat", qualifiedByName = "typePlatId")
    PlatDTO toDto(Plat s);

    @Named("typePlatId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    TypePlatDTO toDtoTypePlatId(TypePlat typePlat);
}
