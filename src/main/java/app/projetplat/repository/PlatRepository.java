package app.projetplat.repository;

import app.projetplat.domain.Plat;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Plat entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlatRepository extends JpaRepository<Plat, Long> {
    @Query(value = "SELECT * FROM plat", nativeQuery = true)
    List<Object> getPlatInRepo();
    //    @Query(value = "\tSelect nom,prix,description,libelle \n" +
    //        "\tFROM plat p,typePlat t\n" +
    //        "WHERE p.type_plat_id=t.id",nativeQuery = true)
    //    List<Object> getPlatInRepolib();
}
