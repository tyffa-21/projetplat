package app.projetplat.repository;

import app.projetplat.domain.TypePlat;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the TypePlat entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TypePlatRepository extends JpaRepository<TypePlat, Long> {}
