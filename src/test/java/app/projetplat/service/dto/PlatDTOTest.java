package app.projetplat.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import app.projetplat.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PlatDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlatDTO.class);
        PlatDTO platDTO1 = new PlatDTO();
        platDTO1.setId(1L);
        PlatDTO platDTO2 = new PlatDTO();
        assertThat(platDTO1).isNotEqualTo(platDTO2);
        platDTO2.setId(platDTO1.getId());
        assertThat(platDTO1).isEqualTo(platDTO2);
        platDTO2.setId(2L);
        assertThat(platDTO1).isNotEqualTo(platDTO2);
        platDTO1.setId(null);
        assertThat(platDTO1).isNotEqualTo(platDTO2);
    }
}
