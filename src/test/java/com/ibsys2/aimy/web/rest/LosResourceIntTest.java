package com.ibsys2.aimy.web.rest;

import com.ibsys2.aimy.AimyApp;

import com.ibsys2.aimy.domain.Los;
import com.ibsys2.aimy.repository.LosRepository;
import com.ibsys2.aimy.service.LosService;
import com.ibsys2.aimy.web.rest.errors.ExceptionTranslator;
import com.ibsys2.aimy.service.dto.LosCriteria;
import com.ibsys2.aimy.service.LosQueryService;

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
 * Test class for the LosResource REST controller.
 *
 * @see LosResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AimyApp.class)
public class LosResourceIntTest {

    private static final Integer DEFAULT_PERIODE = 0;
    private static final Integer UPDATED_PERIODE = 1;

    private static final Integer DEFAULT_NUMMER = 1;
    private static final Integer UPDATED_NUMMER = 2;

    private static final Integer DEFAULT_MENGE = 0;
    private static final Integer UPDATED_MENGE = 1;

    private static final Double DEFAULT_DURCHLAUFZEIT = 0D;
    private static final Double UPDATED_DURCHLAUFZEIT = 1D;

    private static final Double DEFAULT_KOSTEN = 0D;
    private static final Double UPDATED_KOSTEN = 1D;

    @Autowired
    private LosRepository losRepository;

    @Autowired
    private LosService losService;

    @Autowired
    private LosQueryService losQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLosMockMvc;

    private Los los;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LosResource losResource = new LosResource(losService, losQueryService);
        this.restLosMockMvc = MockMvcBuilders.standaloneSetup(losResource)
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
    public static Los createEntity(EntityManager em) {
        Los los = new Los()
            .periode(DEFAULT_PERIODE)
            .nummer(DEFAULT_NUMMER)
            .menge(DEFAULT_MENGE)
            .durchlaufzeit(DEFAULT_DURCHLAUFZEIT)
            .kosten(DEFAULT_KOSTEN);
        return los;
    }

    @Before
    public void initTest() {
        los = createEntity(em);
    }

    @Test
    @Transactional
    public void createLos() throws Exception {
        int databaseSizeBeforeCreate = losRepository.findAll().size();

        // Create the Los
        restLosMockMvc.perform(post("/api/los")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(los)))
            .andExpect(status().isCreated());

        // Validate the Los in the database
        List<Los> losList = losRepository.findAll();
        assertThat(losList).hasSize(databaseSizeBeforeCreate + 1);
        Los testLos = losList.get(losList.size() - 1);
        assertThat(testLos.getPeriode()).isEqualTo(DEFAULT_PERIODE);
        assertThat(testLos.getNummer()).isEqualTo(DEFAULT_NUMMER);
        assertThat(testLos.getMenge()).isEqualTo(DEFAULT_MENGE);
        assertThat(testLos.getDurchlaufzeit()).isEqualTo(DEFAULT_DURCHLAUFZEIT);
        assertThat(testLos.getKosten()).isEqualTo(DEFAULT_KOSTEN);
    }

    @Test
    @Transactional
    public void createLosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = losRepository.findAll().size();

        // Create the Los with an existing ID
        los.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLosMockMvc.perform(post("/api/los")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(los)))
            .andExpect(status().isBadRequest());

        // Validate the Los in the database
        List<Los> losList = losRepository.findAll();
        assertThat(losList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkPeriodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = losRepository.findAll().size();
        // set the field null
        los.setPeriode(null);

        // Create the Los, which fails.

        restLosMockMvc.perform(post("/api/los")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(los)))
            .andExpect(status().isBadRequest());

        List<Los> losList = losRepository.findAll();
        assertThat(losList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNummerIsRequired() throws Exception {
        int databaseSizeBeforeTest = losRepository.findAll().size();
        // set the field null
        los.setNummer(null);

        // Create the Los, which fails.

        restLosMockMvc.perform(post("/api/los")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(los)))
            .andExpect(status().isBadRequest());

        List<Los> losList = losRepository.findAll();
        assertThat(losList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLos() throws Exception {
        // Initialize the database
        losRepository.saveAndFlush(los);

        // Get all the losList
        restLosMockMvc.perform(get("/api/los?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(los.getId().intValue())))
            .andExpect(jsonPath("$.[*].periode").value(hasItem(DEFAULT_PERIODE)))
            .andExpect(jsonPath("$.[*].nummer").value(hasItem(DEFAULT_NUMMER)))
            .andExpect(jsonPath("$.[*].menge").value(hasItem(DEFAULT_MENGE)))
            .andExpect(jsonPath("$.[*].durchlaufzeit").value(hasItem(DEFAULT_DURCHLAUFZEIT.doubleValue())))
            .andExpect(jsonPath("$.[*].kosten").value(hasItem(DEFAULT_KOSTEN.doubleValue())));
    }

    @Test
    @Transactional
    public void getLos() throws Exception {
        // Initialize the database
        losRepository.saveAndFlush(los);

        // Get the los
        restLosMockMvc.perform(get("/api/los/{id}", los.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(los.getId().intValue()))
            .andExpect(jsonPath("$.periode").value(DEFAULT_PERIODE))
            .andExpect(jsonPath("$.nummer").value(DEFAULT_NUMMER))
            .andExpect(jsonPath("$.menge").value(DEFAULT_MENGE))
            .andExpect(jsonPath("$.durchlaufzeit").value(DEFAULT_DURCHLAUFZEIT.doubleValue()))
            .andExpect(jsonPath("$.kosten").value(DEFAULT_KOSTEN.doubleValue()));
    }

    @Test
    @Transactional
    public void getAllLosByPeriodeIsEqualToSomething() throws Exception {
        // Initialize the database
        losRepository.saveAndFlush(los);

        // Get all the losList where periode equals to DEFAULT_PERIODE
        defaultLosShouldBeFound("periode.equals=" + DEFAULT_PERIODE);

        // Get all the losList where periode equals to UPDATED_PERIODE
        defaultLosShouldNotBeFound("periode.equals=" + UPDATED_PERIODE);
    }

    @Test
    @Transactional
    public void getAllLosByPeriodeIsInShouldWork() throws Exception {
        // Initialize the database
        losRepository.saveAndFlush(los);

        // Get all the losList where periode in DEFAULT_PERIODE or UPDATED_PERIODE
        defaultLosShouldBeFound("periode.in=" + DEFAULT_PERIODE + "," + UPDATED_PERIODE);

        // Get all the losList where periode equals to UPDATED_PERIODE
        defaultLosShouldNotBeFound("periode.in=" + UPDATED_PERIODE);
    }

    @Test
    @Transactional
    public void getAllLosByPeriodeIsNullOrNotNull() throws Exception {
        // Initialize the database
        losRepository.saveAndFlush(los);

        // Get all the losList where periode is not null
        defaultLosShouldBeFound("periode.specified=true");

        // Get all the losList where periode is null
        defaultLosShouldNotBeFound("periode.specified=false");
    }

    @Test
    @Transactional
    public void getAllLosByPeriodeIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        losRepository.saveAndFlush(los);

        // Get all the losList where periode greater than or equals to DEFAULT_PERIODE
        defaultLosShouldBeFound("periode.greaterOrEqualThan=" + DEFAULT_PERIODE);

        // Get all the losList where periode greater than or equals to UPDATED_PERIODE
        defaultLosShouldNotBeFound("periode.greaterOrEqualThan=" + UPDATED_PERIODE);
    }

    @Test
    @Transactional
    public void getAllLosByPeriodeIsLessThanSomething() throws Exception {
        // Initialize the database
        losRepository.saveAndFlush(los);

        // Get all the losList where periode less than or equals to DEFAULT_PERIODE
        defaultLosShouldNotBeFound("periode.lessThan=" + DEFAULT_PERIODE);

        // Get all the losList where periode less than or equals to UPDATED_PERIODE
        defaultLosShouldBeFound("periode.lessThan=" + UPDATED_PERIODE);
    }


    @Test
    @Transactional
    public void getAllLosByNummerIsEqualToSomething() throws Exception {
        // Initialize the database
        losRepository.saveAndFlush(los);

        // Get all the losList where nummer equals to DEFAULT_NUMMER
        defaultLosShouldBeFound("nummer.equals=" + DEFAULT_NUMMER);

        // Get all the losList where nummer equals to UPDATED_NUMMER
        defaultLosShouldNotBeFound("nummer.equals=" + UPDATED_NUMMER);
    }

    @Test
    @Transactional
    public void getAllLosByNummerIsInShouldWork() throws Exception {
        // Initialize the database
        losRepository.saveAndFlush(los);

        // Get all the losList where nummer in DEFAULT_NUMMER or UPDATED_NUMMER
        defaultLosShouldBeFound("nummer.in=" + DEFAULT_NUMMER + "," + UPDATED_NUMMER);

        // Get all the losList where nummer equals to UPDATED_NUMMER
        defaultLosShouldNotBeFound("nummer.in=" + UPDATED_NUMMER);
    }

    @Test
    @Transactional
    public void getAllLosByNummerIsNullOrNotNull() throws Exception {
        // Initialize the database
        losRepository.saveAndFlush(los);

        // Get all the losList where nummer is not null
        defaultLosShouldBeFound("nummer.specified=true");

        // Get all the losList where nummer is null
        defaultLosShouldNotBeFound("nummer.specified=false");
    }

    @Test
    @Transactional
    public void getAllLosByNummerIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        losRepository.saveAndFlush(los);

        // Get all the losList where nummer greater than or equals to DEFAULT_NUMMER
        defaultLosShouldBeFound("nummer.greaterOrEqualThan=" + DEFAULT_NUMMER);

        // Get all the losList where nummer greater than or equals to UPDATED_NUMMER
        defaultLosShouldNotBeFound("nummer.greaterOrEqualThan=" + UPDATED_NUMMER);
    }

    @Test
    @Transactional
    public void getAllLosByNummerIsLessThanSomething() throws Exception {
        // Initialize the database
        losRepository.saveAndFlush(los);

        // Get all the losList where nummer less than or equals to DEFAULT_NUMMER
        defaultLosShouldNotBeFound("nummer.lessThan=" + DEFAULT_NUMMER);

        // Get all the losList where nummer less than or equals to UPDATED_NUMMER
        defaultLosShouldBeFound("nummer.lessThan=" + UPDATED_NUMMER);
    }


    @Test
    @Transactional
    public void getAllLosByMengeIsEqualToSomething() throws Exception {
        // Initialize the database
        losRepository.saveAndFlush(los);

        // Get all the losList where menge equals to DEFAULT_MENGE
        defaultLosShouldBeFound("menge.equals=" + DEFAULT_MENGE);

        // Get all the losList where menge equals to UPDATED_MENGE
        defaultLosShouldNotBeFound("menge.equals=" + UPDATED_MENGE);
    }

    @Test
    @Transactional
    public void getAllLosByMengeIsInShouldWork() throws Exception {
        // Initialize the database
        losRepository.saveAndFlush(los);

        // Get all the losList where menge in DEFAULT_MENGE or UPDATED_MENGE
        defaultLosShouldBeFound("menge.in=" + DEFAULT_MENGE + "," + UPDATED_MENGE);

        // Get all the losList where menge equals to UPDATED_MENGE
        defaultLosShouldNotBeFound("menge.in=" + UPDATED_MENGE);
    }

    @Test
    @Transactional
    public void getAllLosByMengeIsNullOrNotNull() throws Exception {
        // Initialize the database
        losRepository.saveAndFlush(los);

        // Get all the losList where menge is not null
        defaultLosShouldBeFound("menge.specified=true");

        // Get all the losList where menge is null
        defaultLosShouldNotBeFound("menge.specified=false");
    }

    @Test
    @Transactional
    public void getAllLosByMengeIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        losRepository.saveAndFlush(los);

        // Get all the losList where menge greater than or equals to DEFAULT_MENGE
        defaultLosShouldBeFound("menge.greaterOrEqualThan=" + DEFAULT_MENGE);

        // Get all the losList where menge greater than or equals to UPDATED_MENGE
        defaultLosShouldNotBeFound("menge.greaterOrEqualThan=" + UPDATED_MENGE);
    }

    @Test
    @Transactional
    public void getAllLosByMengeIsLessThanSomething() throws Exception {
        // Initialize the database
        losRepository.saveAndFlush(los);

        // Get all the losList where menge less than or equals to DEFAULT_MENGE
        defaultLosShouldNotBeFound("menge.lessThan=" + DEFAULT_MENGE);

        // Get all the losList where menge less than or equals to UPDATED_MENGE
        defaultLosShouldBeFound("menge.lessThan=" + UPDATED_MENGE);
    }


    @Test
    @Transactional
    public void getAllLosByDurchlaufzeitIsEqualToSomething() throws Exception {
        // Initialize the database
        losRepository.saveAndFlush(los);

        // Get all the losList where durchlaufzeit equals to DEFAULT_DURCHLAUFZEIT
        defaultLosShouldBeFound("durchlaufzeit.equals=" + DEFAULT_DURCHLAUFZEIT);

        // Get all the losList where durchlaufzeit equals to UPDATED_DURCHLAUFZEIT
        defaultLosShouldNotBeFound("durchlaufzeit.equals=" + UPDATED_DURCHLAUFZEIT);
    }

    @Test
    @Transactional
    public void getAllLosByDurchlaufzeitIsInShouldWork() throws Exception {
        // Initialize the database
        losRepository.saveAndFlush(los);

        // Get all the losList where durchlaufzeit in DEFAULT_DURCHLAUFZEIT or UPDATED_DURCHLAUFZEIT
        defaultLosShouldBeFound("durchlaufzeit.in=" + DEFAULT_DURCHLAUFZEIT + "," + UPDATED_DURCHLAUFZEIT);

        // Get all the losList where durchlaufzeit equals to UPDATED_DURCHLAUFZEIT
        defaultLosShouldNotBeFound("durchlaufzeit.in=" + UPDATED_DURCHLAUFZEIT);
    }

    @Test
    @Transactional
    public void getAllLosByDurchlaufzeitIsNullOrNotNull() throws Exception {
        // Initialize the database
        losRepository.saveAndFlush(los);

        // Get all the losList where durchlaufzeit is not null
        defaultLosShouldBeFound("durchlaufzeit.specified=true");

        // Get all the losList where durchlaufzeit is null
        defaultLosShouldNotBeFound("durchlaufzeit.specified=false");
    }

    @Test
    @Transactional
    public void getAllLosByKostenIsEqualToSomething() throws Exception {
        // Initialize the database
        losRepository.saveAndFlush(los);

        // Get all the losList where kosten equals to DEFAULT_KOSTEN
        defaultLosShouldBeFound("kosten.equals=" + DEFAULT_KOSTEN);

        // Get all the losList where kosten equals to UPDATED_KOSTEN
        defaultLosShouldNotBeFound("kosten.equals=" + UPDATED_KOSTEN);
    }

    @Test
    @Transactional
    public void getAllLosByKostenIsInShouldWork() throws Exception {
        // Initialize the database
        losRepository.saveAndFlush(los);

        // Get all the losList where kosten in DEFAULT_KOSTEN or UPDATED_KOSTEN
        defaultLosShouldBeFound("kosten.in=" + DEFAULT_KOSTEN + "," + UPDATED_KOSTEN);

        // Get all the losList where kosten equals to UPDATED_KOSTEN
        defaultLosShouldNotBeFound("kosten.in=" + UPDATED_KOSTEN);
    }

    @Test
    @Transactional
    public void getAllLosByKostenIsNullOrNotNull() throws Exception {
        // Initialize the database
        losRepository.saveAndFlush(los);

        // Get all the losList where kosten is not null
        defaultLosShouldBeFound("kosten.specified=true");

        // Get all the losList where kosten is null
        defaultLosShouldNotBeFound("kosten.specified=false");
    }
    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultLosShouldBeFound(String filter) throws Exception {
        restLosMockMvc.perform(get("/api/los?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(los.getId().intValue())))
            .andExpect(jsonPath("$.[*].periode").value(hasItem(DEFAULT_PERIODE)))
            .andExpect(jsonPath("$.[*].nummer").value(hasItem(DEFAULT_NUMMER)))
            .andExpect(jsonPath("$.[*].menge").value(hasItem(DEFAULT_MENGE)))
            .andExpect(jsonPath("$.[*].durchlaufzeit").value(hasItem(DEFAULT_DURCHLAUFZEIT.doubleValue())))
            .andExpect(jsonPath("$.[*].kosten").value(hasItem(DEFAULT_KOSTEN.doubleValue())));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultLosShouldNotBeFound(String filter) throws Exception {
        restLosMockMvc.perform(get("/api/los?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());
    }


    @Test
    @Transactional
    public void getNonExistingLos() throws Exception {
        // Get the los
        restLosMockMvc.perform(get("/api/los/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLos() throws Exception {
        // Initialize the database
        losService.save(los);

        int databaseSizeBeforeUpdate = losRepository.findAll().size();

        // Update the los
        Los updatedLos = losRepository.findOne(los.getId());
        updatedLos
            .periode(UPDATED_PERIODE)
            .nummer(UPDATED_NUMMER)
            .menge(UPDATED_MENGE)
            .durchlaufzeit(UPDATED_DURCHLAUFZEIT)
            .kosten(UPDATED_KOSTEN);

        restLosMockMvc.perform(put("/api/los")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLos)))
            .andExpect(status().isOk());

        // Validate the Los in the database
        List<Los> losList = losRepository.findAll();
        assertThat(losList).hasSize(databaseSizeBeforeUpdate);
        Los testLos = losList.get(losList.size() - 1);
        assertThat(testLos.getPeriode()).isEqualTo(UPDATED_PERIODE);
        assertThat(testLos.getNummer()).isEqualTo(UPDATED_NUMMER);
        assertThat(testLos.getMenge()).isEqualTo(UPDATED_MENGE);
        assertThat(testLos.getDurchlaufzeit()).isEqualTo(UPDATED_DURCHLAUFZEIT);
        assertThat(testLos.getKosten()).isEqualTo(UPDATED_KOSTEN);
    }

    @Test
    @Transactional
    public void updateNonExistingLos() throws Exception {
        int databaseSizeBeforeUpdate = losRepository.findAll().size();

        // Create the Los

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restLosMockMvc.perform(put("/api/los")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(los)))
            .andExpect(status().isCreated());

        // Validate the Los in the database
        List<Los> losList = losRepository.findAll();
        assertThat(losList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteLos() throws Exception {
        // Initialize the database
        losService.save(los);

        int databaseSizeBeforeDelete = losRepository.findAll().size();

        // Get the los
        restLosMockMvc.perform(delete("/api/los/{id}", los.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Los> losList = losRepository.findAll();
        assertThat(losList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Los.class);
        Los los1 = new Los();
        los1.setId(1L);
        Los los2 = new Los();
        los2.setId(los1.getId());
        assertThat(los1).isEqualTo(los2);
        los2.setId(2L);
        assertThat(los1).isNotEqualTo(los2);
        los1.setId(null);
        assertThat(los1).isNotEqualTo(los2);
    }
}
