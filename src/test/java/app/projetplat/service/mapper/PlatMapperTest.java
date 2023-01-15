package app.projetplat.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PlatMapperTest {

    private PlatMapper platMapper;

    @BeforeEach
    public void setUp() {
        platMapper = new PlatMapperImpl();
    }
}
