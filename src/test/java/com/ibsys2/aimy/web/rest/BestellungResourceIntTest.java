package com.ibsys2.aimy.web.rest;

import com.ibsys2.aimy.AimyApp;

import com.ibsys2.aimy.domain.Bestellung;
import com.ibsys2.aimy.domain.Modus;
import com.ibsys2.aimy.domain.Teil;
import com.ibsys2.aimy.repository.BestellungRepository;
import com.ibsys2.aimy.service.BestellungService;
import com.ibsys2.aimy.web.rest.errors.ExceptionTranslator;
import com.ibsys2.aimy.service.dto.BestellungCriteria;
import com.ibsys2.aimy.service.BestellungQueryService;

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

import com.ibsys2.aimy.domain.enumeration.Bestellstatus;
/**
 * Test class for the BestellungResource REST controller.
 *
 * @see BestellungResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AimyApp.class)
public class BestellungResourceIntTest {

    private static final Integer DEFAULT_PERIODE = 0;
    private static final Integer UPDATED_PERIODE = 1;

    private static final Integer DEFAULT_NUMMER = 0;
    private static final Integer UPDATED_NUMMER = 1;

    private static final Double DEFAULT_LIEFERZEIT = 0D;
    private static final Double UPDATED_LIEFERZEIT = 1D;

    private static final Integer DEFAULT_KAUFMENGE = 0;
    private static final Integer UPDATED_KAUFMENGE = 1;

    private static final Double DEFAULT_MATERIALKOSTEN = 0D;
    private static final Double UPDATED_MATERIALKOSTEN = 1D;

    private static final Double DEFAULT_BESTELLKOSTEN = 0D;
    private static final Double UPDATED_BESTELLKOSTEN = 1D;

    private static final Double DEFAULT_GESAMTKOSTEN = 0D;
    private static final Double UPDATED_GESAMTKOSTEN = 1D;

    private static final Double DEFAULT_STUECKKOSTEN = 0D;
    private static final Double UPDATED_STUECKKOSTEN = 1D;

    private static final Bestellstatus DEFAULT_BESTELLSTATUS = Bestellstatus.GELIEFERT;
    private static final Bestellstatus UPDATED_BESTELLSTATUS = Bestellstatus.UNTERWEGS;

    @Autowired
    private BestellungRepository bestellungRepository;

    @Autowired
    private BestellungService bestellungService;

    @Autowired
    private BestellungQueryService bestellungQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBestellungMockMvc;

    private Bestellung bestellung;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BestellungResource bestellungResource = new BestellungResource(bestellungService, bestellungQueryService);
        this.restBestellungMockMvc = MockMvcBuilders.standaloneSetup(bestellungResource)
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
    public static Bestellung createEntity(EntityManager em) {
        Bestellung bestellung = new Bestellung()
            .periode(DEFAULT_PERIODE)
            .nummer(DEFAULT_NUMMER)
            .lieferzeit(DEFAULT_LIEFERZEIT)
            .kaufmenge(DEFAULT_KAUFMENGE)
            .materialkosten(DEFAULT_MATERIALKOSTEN)
            .bestellkosten(DEFAULT_BESTELLKOSTEN)
            .gesamtkosten(DEFAULT_GESAMTKOSTEN)
            .stueckkosten(DEFAULT_STUECKKOSTEN)
            .bestellstatus(DEFAULT_BESTELLSTATUS);
        // Add required entity
        Modus modus = ModusResourceIntTest.createEntity(em);
        em.persist(modus);
        em.flush();
        bestellung.setModus(modus);
        return bestellung;
    }

    @Before
    public void initTest() {
        bestellung = createEntity(em);
    }

    @Test
    @Transactional
    public void createBestellung() throws Exception {
        int databaseSizeBeforeCreate = bestellungRepository.findAll().size();

        // Create the Bestellung
        restBestellungMockMvc.perform(post("/api/bestellungs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bestellung)))
            .andExpect(status().isCreated());

        // Validate the Bestellung in the database
        List<Bestellung> bestellungList = bestellungRepository.findAll();
        assertThat(bestellungList).hasSize(databaseSizeBeforeCreate + 1);
        Bestellung testBestellung = bestellungList.get(bestellungList.size() - 1);
        assertThat(testBestellung.getPeriode()).isEqualTo(DEFAULT_PERIODE);
        assertThat(testBestellung.getNummer()).isEqualTo(DEFAULT_NUMMER);
        assertThat(testBestellung.getLieferzeit()).isEqualTo(DEFAULT_LIEFERZEIT);
        assertThat(testBestellung.getKaufmenge()).isEqualTo(DEFAULT_KAUFMENGE);
        assertThat(testBestellung.getMaterialkosten()).isEqualTo(DEFAULT_MATERIALKOSTEN);
        assertThat(testBestellung.getBestellkosten()).isEqualTo(DEFAULT_BESTELLKOSTEN);
        assertThat(testBestellung.getGesamtkosten()).isEqualTo(DEFAULT_GESAMTKOSTEN);
        assertThat(testBestellung.getStueckkosten()).isEqualTo(DEFAULT_STUECKKOSTEN);
        assertThat(testBestellung.getBestellstatus()).isEqualTo(DEFAULT_BESTELLSTATUS);
    }

    @Test
    @Transactional
    public void createBestellungWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bestellungRepository.findAll().size();

        // Create the Bestellung with an existing ID
        bestellung.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBestellungMockMvc.perform(post("/api/bestellungs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bestellung)))
            .andExpect(status().isBadRequest());

        // Validate the Bestellung in the database
        List<Bestellung> bestellungList = bestellungRepository.findAll();
        assertThat(bestellungList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkPeriodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = bestellungRepository.findAll().size();
        // set the field null
        bestellung.setPeriode(null);

        // Create the Bestellung, which fails.

        restBestellungMockMvc.perform(post("/api/bestellungs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bestellung)))
            .andExpect(status().isBadRequest());

        List<Bestellung> bestellungList = bestellungRepository.findAll();
        assertThat(bestellungList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNummerIsRequired() throws Exception {
        int databaseSizeBeforeTest = bestellungRepository.findAll().size();
        // set the field null
        bestellung.setNummer(null);

        // Create the Bestellung, which fails.

        restBestellungMockMvc.perform(post("/api/bestellungs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bestellung)))
            .andExpect(status().isBadRequest());

        List<Bestellung> bestellungList = bestellungRepository.findAll();
        assertThat(bestellungList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBestellungs() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList
        restBestellungMockMvc.perform(get("/api/bestellungs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bestellung.getId().intValue())))
            .andExpect(jsonPath("$.[*].periode").value(hasItem(DEFAULT_PERIODE)))
            .andExpect(jsonPath("$.[*].nummer").value(hasItem(DEFAULT_NUMMER)))
            .andExpect(jsonPath("$.[*].lieferzeit").value(hasItem(DEFAULT_LIEFERZEIT.doubleValue())))
            .andExpect(jsonPath("$.[*].kaufmenge").value(hasItem(DEFAULT_KAUFMENGE)))
            .andExpect(jsonPath("$.[*].materialkosten").value(hasItem(DEFAULT_MATERIALKOSTEN.doubleValue())))
            .andExpect(jsonPath("$.[*].bestellkosten").value(hasItem(DEFAULT_BESTELLKOSTEN.doubleValue())))
            .andExpect(jsonPath("$.[*].gesamtkosten").value(hasItem(DEFAULT_GESAMTKOSTEN.doubleValue())))
            .andExpect(jsonPath("$.[*].stueckkosten").value(hasItem(DEFAULT_STUECKKOSTEN.doubleValue())))
            .andExpect(jsonPath("$.[*].bestellstatus").value(hasItem(DEFAULT_BESTELLSTATUS.toString())));
    }

    @Test
    @Transactional
    public void getBestellung() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get the bestellung
        restBestellungMockMvc.perform(get("/api/bestellungs/{id}", bestellung.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bestellung.getId().intValue()))
            .andExpect(jsonPath("$.periode").value(DEFAULT_PERIODE))
            .andExpect(jsonPath("$.nummer").value(DEFAULT_NUMMER))
            .andExpect(jsonPath("$.lieferzeit").value(DEFAULT_LIEFERZEIT.doubleValue()))
            .andExpect(jsonPath("$.kaufmenge").value(DEFAULT_KAUFMENGE))
            .andExpect(jsonPath("$.materialkosten").value(DEFAULT_MATERIALKOSTEN.doubleValue()))
            .andExpect(jsonPath("$.bestellkosten").value(DEFAULT_BESTELLKOSTEN.doubleValue()))
            .andExpect(jsonPath("$.gesamtkosten").value(DEFAULT_GESAMTKOSTEN.doubleValue()))
            .andExpect(jsonPath("$.stueckkosten").value(DEFAULT_STUECKKOSTEN.doubleValue()))
            .andExpect(jsonPath("$.bestellstatus").value(DEFAULT_BESTELLSTATUS.toString()));
    }

    @Test
    @Transactional
    public void getAllBestellungsByPeriodeIsEqualToSomething() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where periode equals to DEFAULT_PERIODE
        defaultBestellungShouldBeFound("periode.equals=" + DEFAULT_PERIODE);

        // Get all the bestellungList where periode equals to UPDATED_PERIODE
        defaultBestellungShouldNotBeFound("periode.equals=" + UPDATED_PERIODE);
    }

    @Test
    @Transactional
    public void getAllBestellungsByPeriodeIsInShouldWork() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where periode in DEFAULT_PERIODE or UPDATED_PERIODE
        defaultBestellungShouldBeFound("periode.in=" + DEFAULT_PERIODE + "," + UPDATED_PERIODE);

        // Get all the bestellungList where periode equals to UPDATED_PERIODE
        defaultBestellungShouldNotBeFound("periode.in=" + UPDATED_PERIODE);
    }

    @Test
    @Transactional
    public void getAllBestellungsByPeriodeIsNullOrNotNull() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where periode is not null
        defaultBestellungShouldBeFound("periode.specified=true");

        // Get all the bestellungList where periode is null
        defaultBestellungShouldNotBeFound("periode.specified=false");
    }

    @Test
    @Transactional
    public void getAllBestellungsByPeriodeIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where periode greater than or equals to DEFAULT_PERIODE
        defaultBestellungShouldBeFound("periode.greaterOrEqualThan=" + DEFAULT_PERIODE);

        // Get all the bestellungList where periode greater than or equals to UPDATED_PERIODE
        defaultBestellungShouldNotBeFound("periode.greaterOrEqualThan=" + UPDATED_PERIODE);
    }

    @Test
    @Transactional
    public void getAllBestellungsByPeriodeIsLessThanSomething() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where periode less than or equals to DEFAULT_PERIODE
        defaultBestellungShouldNotBeFound("periode.lessThan=" + DEFAULT_PERIODE);

        // Get all the bestellungList where periode less than or equals to UPDATED_PERIODE
        defaultBestellungShouldBeFound("periode.lessThan=" + UPDATED_PERIODE);
    }


    @Test
    @Transactional
    public void getAllBestellungsByNummerIsEqualToSomething() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where nummer equals to DEFAULT_NUMMER
        defaultBestellungShouldBeFound("nummer.equals=" + DEFAULT_NUMMER);

        // Get all the bestellungList where nummer equals to UPDATED_NUMMER
        defaultBestellungShouldNotBeFound("nummer.equals=" + UPDATED_NUMMER);
    }

    @Test
    @Transactional
    public void getAllBestellungsByNummerIsInShouldWork() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where nummer in DEFAULT_NUMMER or UPDATED_NUMMER
        defaultBestellungShouldBeFound("nummer.in=" + DEFAULT_NUMMER + "," + UPDATED_NUMMER);

        // Get all the bestellungList where nummer equals to UPDATED_NUMMER
        defaultBestellungShouldNotBeFound("nummer.in=" + UPDATED_NUMMER);
    }

    @Test
    @Transactional
    public void getAllBestellungsByNummerIsNullOrNotNull() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where nummer is not null
        defaultBestellungShouldBeFound("nummer.specified=true");

        // Get all the bestellungList where nummer is null
        defaultBestellungShouldNotBeFound("nummer.specified=false");
    }

    @Test
    @Transactional
    public void getAllBestellungsByNummerIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where nummer greater than or equals to DEFAULT_NUMMER
        defaultBestellungShouldBeFound("nummer.greaterOrEqualThan=" + DEFAULT_NUMMER);

        // Get all the bestellungList where nummer greater than or equals to UPDATED_NUMMER
        defaultBestellungShouldNotBeFound("nummer.greaterOrEqualThan=" + UPDATED_NUMMER);
    }

    @Test
    @Transactional
    public void getAllBestellungsByNummerIsLessThanSomething() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where nummer less than or equals to DEFAULT_NUMMER
        defaultBestellungShouldNotBeFound("nummer.lessThan=" + DEFAULT_NUMMER);

        // Get all the bestellungList where nummer less than or equals to UPDATED_NUMMER
        defaultBestellungShouldBeFound("nummer.lessThan=" + UPDATED_NUMMER);
    }


    @Test
    @Transactional
    public void getAllBestellungsByLieferzeitIsEqualToSomething() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where lieferzeit equals to DEFAULT_LIEFERZEIT
        defaultBestellungShouldBeFound("lieferzeit.equals=" + DEFAULT_LIEFERZEIT);

        // Get all the bestellungList where lieferzeit equals to UPDATED_LIEFERZEIT
        defaultBestellungShouldNotBeFound("lieferzeit.equals=" + UPDATED_LIEFERZEIT);
    }

    @Test
    @Transactional
    public void getAllBestellungsByLieferzeitIsInShouldWork() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where lieferzeit in DEFAULT_LIEFERZEIT or UPDATED_LIEFERZEIT
        defaultBestellungShouldBeFound("lieferzeit.in=" + DEFAULT_LIEFERZEIT + "," + UPDATED_LIEFERZEIT);

        // Get all the bestellungList where lieferzeit equals to UPDATED_LIEFERZEIT
        defaultBestellungShouldNotBeFound("lieferzeit.in=" + UPDATED_LIEFERZEIT);
    }

    @Test
    @Transactional
    public void getAllBestellungsByLieferzeitIsNullOrNotNull() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where lieferzeit is not null
        defaultBestellungShouldBeFound("lieferzeit.specified=true");

        // Get all the bestellungList where lieferzeit is null
        defaultBestellungShouldNotBeFound("lieferzeit.specified=false");
    }

    @Test
    @Transactional
    public void getAllBestellungsByKaufmengeIsEqualToSomething() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where kaufmenge equals to DEFAULT_KAUFMENGE
        defaultBestellungShouldBeFound("kaufmenge.equals=" + DEFAULT_KAUFMENGE);

        // Get all the bestellungList where kaufmenge equals to UPDATED_KAUFMENGE
        defaultBestellungShouldNotBeFound("kaufmenge.equals=" + UPDATED_KAUFMENGE);
    }

    @Test
    @Transactional
    public void getAllBestellungsByKaufmengeIsInShouldWork() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where kaufmenge in DEFAULT_KAUFMENGE or UPDATED_KAUFMENGE
        defaultBestellungShouldBeFound("kaufmenge.in=" + DEFAULT_KAUFMENGE + "," + UPDATED_KAUFMENGE);

        // Get all the bestellungList where kaufmenge equals to UPDATED_KAUFMENGE
        defaultBestellungShouldNotBeFound("kaufmenge.in=" + UPDATED_KAUFMENGE);
    }

    @Test
    @Transactional
    public void getAllBestellungsByKaufmengeIsNullOrNotNull() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where kaufmenge is not null
        defaultBestellungShouldBeFound("kaufmenge.specified=true");

        // Get all the bestellungList where kaufmenge is null
        defaultBestellungShouldNotBeFound("kaufmenge.specified=false");
    }

    @Test
    @Transactional
    public void getAllBestellungsByKaufmengeIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where kaufmenge greater than or equals to DEFAULT_KAUFMENGE
        defaultBestellungShouldBeFound("kaufmenge.greaterOrEqualThan=" + DEFAULT_KAUFMENGE);

        // Get all the bestellungList where kaufmenge greater than or equals to UPDATED_KAUFMENGE
        defaultBestellungShouldNotBeFound("kaufmenge.greaterOrEqualThan=" + UPDATED_KAUFMENGE);
    }

    @Test
    @Transactional
    public void getAllBestellungsByKaufmengeIsLessThanSomething() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where kaufmenge less than or equals to DEFAULT_KAUFMENGE
        defaultBestellungShouldNotBeFound("kaufmenge.lessThan=" + DEFAULT_KAUFMENGE);

        // Get all the bestellungList where kaufmenge less than or equals to UPDATED_KAUFMENGE
        defaultBestellungShouldBeFound("kaufmenge.lessThan=" + UPDATED_KAUFMENGE);
    }


    @Test
    @Transactional
    public void getAllBestellungsByMaterialkostenIsEqualToSomething() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where materialkosten equals to DEFAULT_MATERIALKOSTEN
        defaultBestellungShouldBeFound("materialkosten.equals=" + DEFAULT_MATERIALKOSTEN);

        // Get all the bestellungList where materialkosten equals to UPDATED_MATERIALKOSTEN
        defaultBestellungShouldNotBeFound("materialkosten.equals=" + UPDATED_MATERIALKOSTEN);
    }

    @Test
    @Transactional
    public void getAllBestellungsByMaterialkostenIsInShouldWork() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where materialkosten in DEFAULT_MATERIALKOSTEN or UPDATED_MATERIALKOSTEN
        defaultBestellungShouldBeFound("materialkosten.in=" + DEFAULT_MATERIALKOSTEN + "," + UPDATED_MATERIALKOSTEN);

        // Get all the bestellungList where materialkosten equals to UPDATED_MATERIALKOSTEN
        defaultBestellungShouldNotBeFound("materialkosten.in=" + UPDATED_MATERIALKOSTEN);
    }

    @Test
    @Transactional
    public void getAllBestellungsByMaterialkostenIsNullOrNotNull() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where materialkosten is not null
        defaultBestellungShouldBeFound("materialkosten.specified=true");

        // Get all the bestellungList where materialkosten is null
        defaultBestellungShouldNotBeFound("materialkosten.specified=false");
    }

    @Test
    @Transactional
    public void getAllBestellungsByBestellkostenIsEqualToSomething() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where bestellkosten equals to DEFAULT_BESTELLKOSTEN
        defaultBestellungShouldBeFound("bestellkosten.equals=" + DEFAULT_BESTELLKOSTEN);

        // Get all the bestellungList where bestellkosten equals to UPDATED_BESTELLKOSTEN
        defaultBestellungShouldNotBeFound("bestellkosten.equals=" + UPDATED_BESTELLKOSTEN);
    }

    @Test
    @Transactional
    public void getAllBestellungsByBestellkostenIsInShouldWork() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where bestellkosten in DEFAULT_BESTELLKOSTEN or UPDATED_BESTELLKOSTEN
        defaultBestellungShouldBeFound("bestellkosten.in=" + DEFAULT_BESTELLKOSTEN + "," + UPDATED_BESTELLKOSTEN);

        // Get all the bestellungList where bestellkosten equals to UPDATED_BESTELLKOSTEN
        defaultBestellungShouldNotBeFound("bestellkosten.in=" + UPDATED_BESTELLKOSTEN);
    }

    @Test
    @Transactional
    public void getAllBestellungsByBestellkostenIsNullOrNotNull() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where bestellkosten is not null
        defaultBestellungShouldBeFound("bestellkosten.specified=true");

        // Get all the bestellungList where bestellkosten is null
        defaultBestellungShouldNotBeFound("bestellkosten.specified=false");
    }

    @Test
    @Transactional
    public void getAllBestellungsByGesamtkostenIsEqualToSomething() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where gesamtkosten equals to DEFAULT_GESAMTKOSTEN
        defaultBestellungShouldBeFound("gesamtkosten.equals=" + DEFAULT_GESAMTKOSTEN);

        // Get all the bestellungList where gesamtkosten equals to UPDATED_GESAMTKOSTEN
        defaultBestellungShouldNotBeFound("gesamtkosten.equals=" + UPDATED_GESAMTKOSTEN);
    }

    @Test
    @Transactional
    public void getAllBestellungsByGesamtkostenIsInShouldWork() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where gesamtkosten in DEFAULT_GESAMTKOSTEN or UPDATED_GESAMTKOSTEN
        defaultBestellungShouldBeFound("gesamtkosten.in=" + DEFAULT_GESAMTKOSTEN + "," + UPDATED_GESAMTKOSTEN);

        // Get all the bestellungList where gesamtkosten equals to UPDATED_GESAMTKOSTEN
        defaultBestellungShouldNotBeFound("gesamtkosten.in=" + UPDATED_GESAMTKOSTEN);
    }

    @Test
    @Transactional
    public void getAllBestellungsByGesamtkostenIsNullOrNotNull() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where gesamtkosten is not null
        defaultBestellungShouldBeFound("gesamtkosten.specified=true");

        // Get all the bestellungList where gesamtkosten is null
        defaultBestellungShouldNotBeFound("gesamtkosten.specified=false");
    }

    @Test
    @Transactional
    public void getAllBestellungsByStueckkostenIsEqualToSomething() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where stueckkosten equals to DEFAULT_STUECKKOSTEN
        defaultBestellungShouldBeFound("stueckkosten.equals=" + DEFAULT_STUECKKOSTEN);

        // Get all the bestellungList where stueckkosten equals to UPDATED_STUECKKOSTEN
        defaultBestellungShouldNotBeFound("stueckkosten.equals=" + UPDATED_STUECKKOSTEN);
    }

    @Test
    @Transactional
    public void getAllBestellungsByStueckkostenIsInShouldWork() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where stueckkosten in DEFAULT_STUECKKOSTEN or UPDATED_STUECKKOSTEN
        defaultBestellungShouldBeFound("stueckkosten.in=" + DEFAULT_STUECKKOSTEN + "," + UPDATED_STUECKKOSTEN);

        // Get all the bestellungList where stueckkosten equals to UPDATED_STUECKKOSTEN
        defaultBestellungShouldNotBeFound("stueckkosten.in=" + UPDATED_STUECKKOSTEN);
    }

    @Test
    @Transactional
    public void getAllBestellungsByStueckkostenIsNullOrNotNull() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where stueckkosten is not null
        defaultBestellungShouldBeFound("stueckkosten.specified=true");

        // Get all the bestellungList where stueckkosten is null
        defaultBestellungShouldNotBeFound("stueckkosten.specified=false");
    }

    @Test
    @Transactional
    public void getAllBestellungsByBestellstatusIsEqualToSomething() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where bestellstatus equals to DEFAULT_BESTELLSTATUS
        defaultBestellungShouldBeFound("bestellstatus.equals=" + DEFAULT_BESTELLSTATUS);

        // Get all the bestellungList where bestellstatus equals to UPDATED_BESTELLSTATUS
        defaultBestellungShouldNotBeFound("bestellstatus.equals=" + UPDATED_BESTELLSTATUS);
    }

    @Test
    @Transactional
    public void getAllBestellungsByBestellstatusIsInShouldWork() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where bestellstatus in DEFAULT_BESTELLSTATUS or UPDATED_BESTELLSTATUS
        defaultBestellungShouldBeFound("bestellstatus.in=" + DEFAULT_BESTELLSTATUS + "," + UPDATED_BESTELLSTATUS);

        // Get all the bestellungList where bestellstatus equals to UPDATED_BESTELLSTATUS
        defaultBestellungShouldNotBeFound("bestellstatus.in=" + UPDATED_BESTELLSTATUS);
    }

    @Test
    @Transactional
    public void getAllBestellungsByBestellstatusIsNullOrNotNull() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList where bestellstatus is not null
        defaultBestellungShouldBeFound("bestellstatus.specified=true");

        // Get all the bestellungList where bestellstatus is null
        defaultBestellungShouldNotBeFound("bestellstatus.specified=false");
    }

    @Test
    @Transactional
    public void getAllBestellungsByModusIsEqualToSomething() throws Exception {
        // Initialize the database
        Modus modus = ModusResourceIntTest.createEntity(em);
        em.persist(modus);
        em.flush();
        bestellung.setModus(modus);
        bestellungRepository.saveAndFlush(bestellung);
        Long modusId = modus.getId();

        // Get all the bestellungList where modus equals to modusId
        defaultBestellungShouldBeFound("modusId.equals=" + modusId);

        // Get all the bestellungList where modus equals to modusId + 1
        defaultBestellungShouldNotBeFound("modusId.equals=" + (modusId + 1));
    }


    @Test
    @Transactional
    public void getAllBestellungsByKaufteilIsEqualToSomething() throws Exception {
        // Initialize the database
        Teil kaufteil = TeilResourceIntTest.createEntity(em);
        em.persist(kaufteil);
        em.flush();
        bestellung.setKaufteil(kaufteil);
        bestellungRepository.saveAndFlush(bestellung);
        Long kaufteilId = kaufteil.getId();

        // Get all the bestellungList where kaufteil equals to kaufteilId
        defaultBestellungShouldBeFound("kaufteilId.equals=" + kaufteilId);

        // Get all the bestellungList where kaufteil equals to kaufteilId + 1
        defaultBestellungShouldNotBeFound("kaufteilId.equals=" + (kaufteilId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultBestellungShouldBeFound(String filter) throws Exception {
        restBestellungMockMvc.perform(get("/api/bestellungs?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bestellung.getId().intValue())))
            .andExpect(jsonPath("$.[*].periode").value(hasItem(DEFAULT_PERIODE)))
            .andExpect(jsonPath("$.[*].nummer").value(hasItem(DEFAULT_NUMMER)))
            .andExpect(jsonPath("$.[*].lieferzeit").value(hasItem(DEFAULT_LIEFERZEIT.doubleValue())))
            .andExpect(jsonPath("$.[*].kaufmenge").value(hasItem(DEFAULT_KAUFMENGE)))
            .andExpect(jsonPath("$.[*].materialkosten").value(hasItem(DEFAULT_MATERIALKOSTEN.doubleValue())))
            .andExpect(jsonPath("$.[*].bestellkosten").value(hasItem(DEFAULT_BESTELLKOSTEN.doubleValue())))
            .andExpect(jsonPath("$.[*].gesamtkosten").value(hasItem(DEFAULT_GESAMTKOSTEN.doubleValue())))
            .andExpect(jsonPath("$.[*].stueckkosten").value(hasItem(DEFAULT_STUECKKOSTEN.doubleValue())))
            .andExpect(jsonPath("$.[*].bestellstatus").value(hasItem(DEFAULT_BESTELLSTATUS.toString())));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultBestellungShouldNotBeFound(String filter) throws Exception {
        restBestellungMockMvc.perform(get("/api/bestellungs?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());
    }


    @Test
    @Transactional
    public void getNonExistingBestellung() throws Exception {
        // Get the bestellung
        restBestellungMockMvc.perform(get("/api/bestellungs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBestellung() throws Exception {
        // Initialize the database
        bestellungService.save(bestellung);

        int databaseSizeBeforeUpdate = bestellungRepository.findAll().size();

        // Update the bestellung
        Bestellung updatedBestellung = bestellungRepository.findOne(bestellung.getId());
        updatedBestellung
            .periode(UPDATED_PERIODE)
            .nummer(UPDATED_NUMMER)
            .lieferzeit(UPDATED_LIEFERZEIT)
            .kaufmenge(UPDATED_KAUFMENGE)
            .materialkosten(UPDATED_MATERIALKOSTEN)
            .bestellkosten(UPDATED_BESTELLKOSTEN)
            .gesamtkosten(UPDATED_GESAMTKOSTEN)
            .stueckkosten(UPDATED_STUECKKOSTEN)
            .bestellstatus(UPDATED_BESTELLSTATUS);

        restBestellungMockMvc.perform(put("/api/bestellungs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBestellung)))
            .andExpect(status().isOk());

        // Validate the Bestellung in the database
        List<Bestellung> bestellungList = bestellungRepository.findAll();
        assertThat(bestellungList).hasSize(databaseSizeBeforeUpdate);
        Bestellung testBestellung = bestellungList.get(bestellungList.size() - 1);
        assertThat(testBestellung.getPeriode()).isEqualTo(UPDATED_PERIODE);
        assertThat(testBestellung.getNummer()).isEqualTo(UPDATED_NUMMER);
        assertThat(testBestellung.getLieferzeit()).isEqualTo(UPDATED_LIEFERZEIT);
        assertThat(testBestellung.getKaufmenge()).isEqualTo(UPDATED_KAUFMENGE);
        assertThat(testBestellung.getMaterialkosten()).isEqualTo(UPDATED_MATERIALKOSTEN);
        assertThat(testBestellung.getBestellkosten()).isEqualTo(UPDATED_BESTELLKOSTEN);
        assertThat(testBestellung.getGesamtkosten()).isEqualTo(UPDATED_GESAMTKOSTEN);
        assertThat(testBestellung.getStueckkosten()).isEqualTo(UPDATED_STUECKKOSTEN);
        assertThat(testBestellung.getBestellstatus()).isEqualTo(UPDATED_BESTELLSTATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingBestellung() throws Exception {
        int databaseSizeBeforeUpdate = bestellungRepository.findAll().size();

        // Create the Bestellung

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBestellungMockMvc.perform(put("/api/bestellungs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bestellung)))
            .andExpect(status().isCreated());

        // Validate the Bestellung in the database
        List<Bestellung> bestellungList = bestellungRepository.findAll();
        assertThat(bestellungList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBestellung() throws Exception {
        // Initialize the database
        bestellungService.save(bestellung);

        int databaseSizeBeforeDelete = bestellungRepository.findAll().size();

        // Get the bestellung
        restBestellungMockMvc.perform(delete("/api/bestellungs/{id}", bestellung.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Bestellung> bestellungList = bestellungRepository.findAll();
        assertThat(bestellungList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Bestellung.class);
        Bestellung bestellung1 = new Bestellung();
        bestellung1.setId(1L);
        Bestellung bestellung2 = new Bestellung();
        bestellung2.setId(bestellung1.getId());
        assertThat(bestellung1).isEqualTo(bestellung2);
        bestellung2.setId(2L);
        assertThat(bestellung1).isNotEqualTo(bestellung2);
        bestellung1.setId(null);
        assertThat(bestellung1).isNotEqualTo(bestellung2);
    }
}
