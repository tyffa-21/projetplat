package app.projetplat.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import app.projetplat.IntegrationTest;
import app.projetplat.domain.Plat;
import app.projetplat.repository.PlatRepository;
import app.projetplat.service.dto.PlatDTO;
import app.projetplat.service.mapper.PlatMapper;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link PlatResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PlatResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final Integer DEFAULT_PRIX = 1;
    private static final Integer UPDATED_PRIX = 2;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/plats";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PlatRepository platRepository;

    @Autowired
    private PlatMapper platMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPlatMockMvc;

    private Plat plat;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Plat createEntity(EntityManager em) {
        Plat plat = new Plat().nom(DEFAULT_NOM).prix(DEFAULT_PRIX).description(DEFAULT_DESCRIPTION);
        return plat;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Plat createUpdatedEntity(EntityManager em) {
        Plat plat = new Plat().nom(UPDATED_NOM).prix(UPDATED_PRIX).description(UPDATED_DESCRIPTION);
        return plat;
    }

    @BeforeEach
    public void initTest() {
        plat = createEntity(em);
    }

    @Test
    @Transactional
    void createPlat() throws Exception {
        int databaseSizeBeforeCreate = platRepository.findAll().size();
        // Create the Plat
        PlatDTO platDTO = platMapper.toDto(plat);
        restPlatMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(platDTO)))
            .andExpect(status().isCreated());

        // Validate the Plat in the database
        List<Plat> platList = platRepository.findAll();
        assertThat(platList).hasSize(databaseSizeBeforeCreate + 1);
        Plat testPlat = platList.get(platList.size() - 1);
        assertThat(testPlat.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testPlat.getPrix()).isEqualTo(DEFAULT_PRIX);
        assertThat(testPlat.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    void createPlatWithExistingId() throws Exception {
        // Create the Plat with an existing ID
        plat.setId(1L);
        PlatDTO platDTO = platMapper.toDto(plat);

        int databaseSizeBeforeCreate = platRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlatMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(platDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Plat in the database
        List<Plat> platList = platRepository.findAll();
        assertThat(platList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllPlats() throws Exception {
        // Initialize the database
        platRepository.saveAndFlush(plat);

        // Get all the platList
        restPlatMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(plat.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].prix").value(hasItem(DEFAULT_PRIX)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }

    @Test
    @Transactional
    void getPlat() throws Exception {
        // Initialize the database
        platRepository.saveAndFlush(plat);

        // Get the plat
        restPlatMockMvc
            .perform(get(ENTITY_API_URL_ID, plat.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(plat.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.prix").value(DEFAULT_PRIX))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    void getNonExistingPlat() throws Exception {
        // Get the plat
        restPlatMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingPlat() throws Exception {
        // Initialize the database
        platRepository.saveAndFlush(plat);

        int databaseSizeBeforeUpdate = platRepository.findAll().size();

        // Update the plat
        Plat updatedPlat = platRepository.findById(plat.getId()).get();
        // Disconnect from session so that the updates on updatedPlat are not directly saved in db
        em.detach(updatedPlat);
        updatedPlat.nom(UPDATED_NOM).prix(UPDATED_PRIX).description(UPDATED_DESCRIPTION);
        PlatDTO platDTO = platMapper.toDto(updatedPlat);

        restPlatMockMvc
            .perform(
                put(ENTITY_API_URL_ID, platDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(platDTO))
            )
            .andExpect(status().isOk());

        // Validate the Plat in the database
        List<Plat> platList = platRepository.findAll();
        assertThat(platList).hasSize(databaseSizeBeforeUpdate);
        Plat testPlat = platList.get(platList.size() - 1);
        assertThat(testPlat.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testPlat.getPrix()).isEqualTo(UPDATED_PRIX);
        assertThat(testPlat.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void putNonExistingPlat() throws Exception {
        int databaseSizeBeforeUpdate = platRepository.findAll().size();
        plat.setId(count.incrementAndGet());

        // Create the Plat
        PlatDTO platDTO = platMapper.toDto(plat);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlatMockMvc
            .perform(
                put(ENTITY_API_URL_ID, platDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(platDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Plat in the database
        List<Plat> platList = platRepository.findAll();
        assertThat(platList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPlat() throws Exception {
        int databaseSizeBeforeUpdate = platRepository.findAll().size();
        plat.setId(count.incrementAndGet());

        // Create the Plat
        PlatDTO platDTO = platMapper.toDto(plat);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlatMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(platDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Plat in the database
        List<Plat> platList = platRepository.findAll();
        assertThat(platList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPlat() throws Exception {
        int databaseSizeBeforeUpdate = platRepository.findAll().size();
        plat.setId(count.incrementAndGet());

        // Create the Plat
        PlatDTO platDTO = platMapper.toDto(plat);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlatMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(platDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Plat in the database
        List<Plat> platList = platRepository.findAll();
        assertThat(platList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePlatWithPatch() throws Exception {
        // Initialize the database
        platRepository.saveAndFlush(plat);

        int databaseSizeBeforeUpdate = platRepository.findAll().size();

        // Update the plat using partial update
        Plat partialUpdatedPlat = new Plat();
        partialUpdatedPlat.setId(plat.getId());

        partialUpdatedPlat.nom(UPDATED_NOM).prix(UPDATED_PRIX).description(UPDATED_DESCRIPTION);

        restPlatMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPlat.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPlat))
            )
            .andExpect(status().isOk());

        // Validate the Plat in the database
        List<Plat> platList = platRepository.findAll();
        assertThat(platList).hasSize(databaseSizeBeforeUpdate);
        Plat testPlat = platList.get(platList.size() - 1);
        assertThat(testPlat.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testPlat.getPrix()).isEqualTo(UPDATED_PRIX);
        assertThat(testPlat.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void fullUpdatePlatWithPatch() throws Exception {
        // Initialize the database
        platRepository.saveAndFlush(plat);

        int databaseSizeBeforeUpdate = platRepository.findAll().size();

        // Update the plat using partial update
        Plat partialUpdatedPlat = new Plat();
        partialUpdatedPlat.setId(plat.getId());

        partialUpdatedPlat.nom(UPDATED_NOM).prix(UPDATED_PRIX).description(UPDATED_DESCRIPTION);

        restPlatMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPlat.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPlat))
            )
            .andExpect(status().isOk());

        // Validate the Plat in the database
        List<Plat> platList = platRepository.findAll();
        assertThat(platList).hasSize(databaseSizeBeforeUpdate);
        Plat testPlat = platList.get(platList.size() - 1);
        assertThat(testPlat.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testPlat.getPrix()).isEqualTo(UPDATED_PRIX);
        assertThat(testPlat.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void patchNonExistingPlat() throws Exception {
        int databaseSizeBeforeUpdate = platRepository.findAll().size();
        plat.setId(count.incrementAndGet());

        // Create the Plat
        PlatDTO platDTO = platMapper.toDto(plat);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlatMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, platDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(platDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Plat in the database
        List<Plat> platList = platRepository.findAll();
        assertThat(platList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPlat() throws Exception {
        int databaseSizeBeforeUpdate = platRepository.findAll().size();
        plat.setId(count.incrementAndGet());

        // Create the Plat
        PlatDTO platDTO = platMapper.toDto(plat);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlatMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(platDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Plat in the database
        List<Plat> platList = platRepository.findAll();
        assertThat(platList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPlat() throws Exception {
        int databaseSizeBeforeUpdate = platRepository.findAll().size();
        plat.setId(count.incrementAndGet());

        // Create the Plat
        PlatDTO platDTO = platMapper.toDto(plat);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlatMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(platDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Plat in the database
        List<Plat> platList = platRepository.findAll();
        assertThat(platList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePlat() throws Exception {
        // Initialize the database
        platRepository.saveAndFlush(plat);

        int databaseSizeBeforeDelete = platRepository.findAll().size();

        // Delete the plat
        restPlatMockMvc
            .perform(delete(ENTITY_API_URL_ID, plat.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Plat> platList = platRepository.findAll();
        assertThat(platList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
