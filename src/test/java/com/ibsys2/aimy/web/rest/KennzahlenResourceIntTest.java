package com.ibsys2.aimy.web.rest;

import com.ibsys2.aimy.AimyApp;

import com.ibsys2.aimy.domain.Kennzahlen;
import com.ibsys2.aimy.repository.KennzahlenRepository;
import com.ibsys2.aimy.service.KennzahlenService;
import com.ibsys2.aimy.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.ibsys2.aimy.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the KennzahlenResource REST controller.
 *
 * @see KennzahlenResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AimyApp.class)
public class KennzahlenResourceIntTest {

    private static final Integer DEFAULT_PERIODE = 1;
    private static final Integer UPDATED_PERIODE = 2;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Double DEFAULT_AKTUELL = 1D;
    private static final Double UPDATED_AKTUELL = 2D;

    private static final Double DEFAULT_DURCHSCHNITT = 1D;
    private static final Double UPDATED_DURCHSCHNITT = 2D;

    private static final Double DEFAULT_GESAMT = 1D;
    private static final Double UPDATED_GESAMT = 2D;

    @Autowired
    private KennzahlenRepository kennzahlenRepository;

    @Autowired
    private KennzahlenService kennzahlenService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restKennzahlenMockMvc;

    private Kennzahlen kennzahlen;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final KennzahlenResource kennzahlenResource = new KennzahlenResource(kennzahlenService);
        this.restKennzahlenMockMvc = MockMvcBuilders.standaloneSetup(kennzahlenResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Kennzahlen createEntity(EntityManager em) {
        Kennzahlen kennzahlen = new Kennzahlen()
            .periode(DEFAULT_PERIODE)
            .name(DEFAULT_NAME)
            .aktuell(DEFAULT_AKTUELL)
            .durchschnitt(DEFAULT_DURCHSCHNITT)
            .gesamt(DEFAULT_GESAMT);
        return kennzahlen;
    }

    @Before
    public void initTest() {
        kennzahlen = createEntity(em);
    }

    @Test
    @Transactional
    public void createKennzahlen() throws Exception {
        int databaseSizeBeforeCreate = kennzahlenRepository.findAll().size();

        // Create the Kennzahlen
        restKennzahlenMockMvc.perform(post("/api/kennzahlens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kennzahlen)))
            .andExpect(status().isCreated());

        // Validate the Kennzahlen in the database
        List<Kennzahlen> kennzahlenList = kennzahlenRepository.findAll();
        assertThat(kennzahlenList).hasSize(databaseSizeBeforeCreate + 1);
        Kennzahlen testKennzahlen = kennzahlenList.get(kennzahlenList.size() - 1);
        assertThat(testKennzahlen.getPeriode()).isEqualTo(DEFAULT_PERIODE);
        assertThat(testKennzahlen.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testKennzahlen.getAktuell()).isEqualTo(DEFAULT_AKTUELL);
        assertThat(testKennzahlen.getDurchschnitt()).isEqualTo(DEFAULT_DURCHSCHNITT);
        assertThat(testKennzahlen.getGesamt()).isEqualTo(DEFAULT_GESAMT);
    }

    @Test
    @Transactional
    public void createKennzahlenWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = kennzahlenRepository.findAll().size();

        // Create the Kennzahlen with an existing ID
        kennzahlen.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restKennzahlenMockMvc.perform(post("/api/kennzahlens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kennzahlen)))
            .andExpect(status().isBadRequest());

        // Validate the Kennzahlen in the database
        List<Kennzahlen> kennzahlenList = kennzahlenRepository.findAll();
        assertThat(kennzahlenList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllKennzahlens() throws Exception {
        // Initialize the database
        kennzahlenRepository.saveAndFlush(kennzahlen);

        // Get all the kennzahlenList
        restKennzahlenMockMvc.perform(get("/api/kennzahlens?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(kennzahlen.getId().intValue())))
            .andExpect(jsonPath("$.[*].periode").value(hasItem(DEFAULT_PERIODE)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].aktuell").value(hasItem(DEFAULT_AKTUELL.doubleValue())))
            .andExpect(jsonPath("$.[*].durchschnitt").value(hasItem(DEFAULT_DURCHSCHNITT.doubleValue())))
            .andExpect(jsonPath("$.[*].gesamt").value(hasItem(DEFAULT_GESAMT.doubleValue())));
    }

    @Test
    @Transactional
    public void getKennzahlen() throws Exception {
        // Initialize the database
        kennzahlenRepository.saveAndFlush(kennzahlen);

        // Get the kennzahlen
        restKennzahlenMockMvc.perform(get("/api/kennzahlens/{id}", kennzahlen.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(kennzahlen.getId().intValue()))
            .andExpect(jsonPath("$.periode").value(DEFAULT_PERIODE))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.aktuell").value(DEFAULT_AKTUELL.doubleValue()))
            .andExpect(jsonPath("$.durchschnitt").value(DEFAULT_DURCHSCHNITT.doubleValue()))
            .andExpect(jsonPath("$.gesamt").value(DEFAULT_GESAMT.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingKennzahlen() throws Exception {
        // Get the kennzahlen
        restKennzahlenMockMvc.perform(get("/api/kennzahlens/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateKennzahlen() throws Exception {
        // Initialize the database
        kennzahlenService.save(kennzahlen);

        int databaseSizeBeforeUpdate = kennzahlenRepository.findAll().size();

        // Update the kennzahlen
        Kennzahlen updatedKennzahlen = kennzahlenRepository.findOne(kennzahlen.getId());
        updatedKennzahlen
            .periode(UPDATED_PERIODE)
            .name(UPDATED_NAME)
            .aktuell(UPDATED_AKTUELL)
            .durchschnitt(UPDATED_DURCHSCHNITT)
            .gesamt(UPDATED_GESAMT);

        restKennzahlenMockMvc.perform(put("/api/kennzahlens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedKennzahlen)))
            .andExpect(status().isOk());

        // Validate the Kennzahlen in the database
        List<Kennzahlen> kennzahlenList = kennzahlenRepository.findAll();
        assertThat(kennzahlenList).hasSize(databaseSizeBeforeUpdate);
        Kennzahlen testKennzahlen = kennzahlenList.get(kennzahlenList.size() - 1);
        assertThat(testKennzahlen.getPeriode()).isEqualTo(UPDATED_PERIODE);
        assertThat(testKennzahlen.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testKennzahlen.getAktuell()).isEqualTo(UPDATED_AKTUELL);
        assertThat(testKennzahlen.getDurchschnitt()).isEqualTo(UPDATED_DURCHSCHNITT);
        assertThat(testKennzahlen.getGesamt()).isEqualTo(UPDATED_GESAMT);
    }

    @Test
    @Transactional
    public void updateNonExistingKennzahlen() throws Exception {
        int databaseSizeBeforeUpdate = kennzahlenRepository.findAll().size();

        // Create the Kennzahlen

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restKennzahlenMockMvc.perform(put("/api/kennzahlens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kennzahlen)))
            .andExpect(status().isCreated());

        // Validate the Kennzahlen in the database
        List<Kennzahlen> kennzahlenList = kennzahlenRepository.findAll();
        assertThat(kennzahlenList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteKennzahlen() throws Exception {
        // Initialize the database
        kennzahlenService.save(kennzahlen);

        int databaseSizeBeforeDelete = kennzahlenRepository.findAll().size();

        // Get the kennzahlen
        restKennzahlenMockMvc.perform(delete("/api/kennzahlens/{id}", kennzahlen.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Kennzahlen> kennzahlenList = kennzahlenRepository.findAll();
        assertThat(kennzahlenList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Kennzahlen.class);
        Kennzahlen kennzahlen1 = new Kennzahlen();
        kennzahlen1.setId(1L);
        Kennzahlen kennzahlen2 = new Kennzahlen();
        kennzahlen2.setId(kennzahlen1.getId());
        assertThat(kennzahlen1).isEqualTo(kennzahlen2);
        kennzahlen2.setId(2L);
        assertThat(kennzahlen1).isNotEqualTo(kennzahlen2);
        kennzahlen1.setId(null);
        assertThat(kennzahlen1).isNotEqualTo(kennzahlen2);
    }
}
