package app.projetplat.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import app.projetplat.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TypePlatDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TypePlatDTO.class);
        TypePlatDTO typePlatDTO1 = new TypePlatDTO();
        typePlatDTO1.setId(1L);
        TypePlatDTO typePlatDTO2 = new TypePlatDTO();
        assertThat(typePlatDTO1).isNotEqualTo(typePlatDTO2);
        typePlatDTO2.setId(typePlatDTO1.getId());
        assertThat(typePlatDTO1).isEqualTo(typePlatDTO2);
        typePlatDTO2.setId(2L);
        assertThat(typePlatDTO1).isNotEqualTo(typePlatDTO2);
        typePlatDTO1.setId(null);
        assertThat(typePlatDTO1).isNotEqualTo(typePlatDTO2);
    }
}
