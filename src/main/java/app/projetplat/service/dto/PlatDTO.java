package app.projetplat.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link app.projetplat.domain.Plat} entity.
 */
@Schema(description = "The Employee entity.")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PlatDTO implements Serializable {

    private Long id;

    /**
     * The firstname attribute.
     */
    @Schema(description = "The firstname attribute.")
    private String nom;

    private Integer prix;

    private String description;

    private TypePlatDTO typePlat;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Integer getPrix() {
        return prix;
    }

    public void setPrix(Integer prix) {
        this.prix = prix;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TypePlatDTO getTypePlat() {
        return typePlat;
    }

    public void setTypePlat(TypePlatDTO typePlat) {
        this.typePlat = typePlat;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PlatDTO)) {
            return false;
        }

        PlatDTO platDTO = (PlatDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, platDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PlatDTO{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", prix=" + getPrix() +
            ", description='" + getDescription() + "'" +
            ", typePlat=" + getTypePlat() +
            "}";
    }
}
