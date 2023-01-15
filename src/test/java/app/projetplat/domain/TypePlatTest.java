package app.projetplat.domain;

import static org.assertj.core.api.Assertions.assertThat;

import app.projetplat.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TypePlatTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TypePlat.class);
        TypePlat typePlat1 = new TypePlat();
        typePlat1.setId(1L);
        TypePlat typePlat2 = new TypePlat();
        typePlat2.setId(typePlat1.getId());
        assertThat(typePlat1).isEqualTo(typePlat2);
        typePlat2.setId(2L);
        assertThat(typePlat1).isNotEqualTo(typePlat2);
        typePlat1.setId(null);
        assertThat(typePlat1).isNotEqualTo(typePlat2);
    }
}
