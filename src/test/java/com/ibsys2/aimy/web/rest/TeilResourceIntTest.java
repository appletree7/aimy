package com.ibsys2.aimy.web.rest;

import com.ibsys2.aimy.AimyApp;

import com.ibsys2.aimy.domain.Teil;
import com.ibsys2.aimy.domain.Teil;
import com.ibsys2.aimy.repository.TeilRepository;
import com.ibsys2.aimy.service.TeilService;
import com.ibsys2.aimy.web.rest.errors.ExceptionTranslator;
import com.ibsys2.aimy.service.dto.TeilCriteria;
import com.ibsys2.aimy.service.TeilQueryService;

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

import com.ibsys2.aimy.domain.enumeration.Teiltyp;
/**
 * Test class for the TeilResource REST controller.
 *
 * @see TeilResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AimyApp.class)
public class TeilResourceIntTest {

    private static final Teiltyp DEFAULT_TEILTYP = Teiltyp.PRODUKT;
    private static final Teiltyp UPDATED_TEILTYP = Teiltyp.ERZEUGNIS;

    private static final Integer DEFAULT_PERIODE = 0;
    private static final Integer UPDATED_PERIODE = 1;

    private static final Integer DEFAULT_NUMMER = 1;
    private static final Integer UPDATED_NUMMER = 2;

    private static final Integer DEFAULT_ISTMENGE = 0;
    private static final Integer UPDATED_ISTMENGE = 1;

    private static final Integer DEFAULT_STARTMENGE = 0;
    private static final Integer UPDATED_STARTMENGE = 1;

    private static final Double DEFAULT_PROZENTSATZ = 0D;
    private static final Double UPDATED_PROZENTSATZ = 1D;

    private static final Double DEFAULT_LAGERPREIS = 0D;
    private static final Double UPDATED_LAGERPREIS = 1D;

    private static final Double DEFAULT_LAGERWERT = 0D;
    private static final Double UPDATED_LAGERWERT = 1D;

    private static final Integer DEFAULT_SICHERHEITSBESTAND = 0;
    private static final Integer UPDATED_SICHERHEITSBESTAND = 1;

    private static final Integer DEFAULT_VERTRIEBSWUNSCH = 0;
    private static final Integer UPDATED_VERTRIEBSWUNSCH = 1;

    private static final Integer DEFAULT_GESAMTPRODUKTIONSMENGE = 0;
    private static final Integer UPDATED_GESAMTPRODUKTIONSMENGE = 1;

    private static final Integer DEFAULT_DIREKTVERKAUFMENGE = 0;
    private static final Integer UPDATED_DIREKTVERKAUFMENGE = 1;

    private static final Double DEFAULT_DIREKTVERKAUFSPREIS = 0D;
    private static final Double UPDATED_DIREKTVERKAUFSPREIS = 1D;

    private static final Double DEFAULT_STRAFE = 0D;
    private static final Double UPDATED_STRAFE = 1D;

    @Autowired
    private TeilRepository teilRepository;

    @Autowired
    private TeilService teilService;

    @Autowired
    private TeilQueryService teilQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTeilMockMvc;

    private Teil teil;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TeilResource teilResource = new TeilResource(teilService, teilQueryService);
        this.restTeilMockMvc = MockMvcBuilders.standaloneSetup(teilResource)
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
    public static Teil createEntity(EntityManager em) {
        Teil teil = new Teil()
            .teiltyp(DEFAULT_TEILTYP)
            .periode(DEFAULT_PERIODE)
            .nummer(DEFAULT_NUMMER)
            .istmenge(DEFAULT_ISTMENGE)
            .startmenge(DEFAULT_STARTMENGE)
            .prozentsatz(DEFAULT_PROZENTSATZ)
            .lagerpreis(DEFAULT_LAGERPREIS)
            .lagerwert(DEFAULT_LAGERWERT)
            .sicherheitsbestand(DEFAULT_SICHERHEITSBESTAND)
            .vertriebswunsch(DEFAULT_VERTRIEBSWUNSCH)
            .gesamtproduktionsmenge(DEFAULT_GESAMTPRODUKTIONSMENGE)
            .direktverkaufmenge(DEFAULT_DIREKTVERKAUFMENGE)
            .direktverkaufspreis(DEFAULT_DIREKTVERKAUFSPREIS)
            .strafe(DEFAULT_STRAFE);
        return teil;
    }

    @Before
    public void initTest() {
        teil = createEntity(em);
    }

    @Test
    @Transactional
    public void createTeil() throws Exception {
        int databaseSizeBeforeCreate = teilRepository.findAll().size();

        // Create the Teil
        restTeilMockMvc.perform(post("/api/teils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teil)))
            .andExpect(status().isCreated());

        // Validate the Teil in the database
        List<Teil> teilList = teilRepository.findAll();
        assertThat(teilList).hasSize(databaseSizeBeforeCreate + 1);
        Teil testTeil = teilList.get(teilList.size() - 1);
        assertThat(testTeil.getTeiltyp()).isEqualTo(DEFAULT_TEILTYP);
        assertThat(testTeil.getPeriode()).isEqualTo(DEFAULT_PERIODE);
        assertThat(testTeil.getNummer()).isEqualTo(DEFAULT_NUMMER);
        assertThat(testTeil.getIstmenge()).isEqualTo(DEFAULT_ISTMENGE);
        assertThat(testTeil.getStartmenge()).isEqualTo(DEFAULT_STARTMENGE);
        assertThat(testTeil.getProzentsatz()).isEqualTo(DEFAULT_PROZENTSATZ);
        assertThat(testTeil.getLagerpreis()).isEqualTo(DEFAULT_LAGERPREIS);
        assertThat(testTeil.getLagerwert()).isEqualTo(DEFAULT_LAGERWERT);
        assertThat(testTeil.getSicherheitsbestand()).isEqualTo(DEFAULT_SICHERHEITSBESTAND);
        assertThat(testTeil.getVertriebswunsch()).isEqualTo(DEFAULT_VERTRIEBSWUNSCH);
        assertThat(testTeil.getGesamtproduktionsmenge()).isEqualTo(DEFAULT_GESAMTPRODUKTIONSMENGE);
        assertThat(testTeil.getDirektverkaufmenge()).isEqualTo(DEFAULT_DIREKTVERKAUFMENGE);
        assertThat(testTeil.getDirektverkaufspreis()).isEqualTo(DEFAULT_DIREKTVERKAUFSPREIS);
        assertThat(testTeil.getStrafe()).isEqualTo(DEFAULT_STRAFE);
    }

    @Test
    @Transactional
    public void createTeilWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = teilRepository.findAll().size();

        // Create the Teil with an existing ID
        teil.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTeilMockMvc.perform(post("/api/teils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teil)))
            .andExpect(status().isBadRequest());

        // Validate the Teil in the database
        List<Teil> teilList = teilRepository.findAll();
        assertThat(teilList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkPeriodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = teilRepository.findAll().size();
        // set the field null
        teil.setPeriode(null);

        // Create the Teil, which fails.

        restTeilMockMvc.perform(post("/api/teils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teil)))
            .andExpect(status().isBadRequest());

        List<Teil> teilList = teilRepository.findAll();
        assertThat(teilList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNummerIsRequired() throws Exception {
        int databaseSizeBeforeTest = teilRepository.findAll().size();
        // set the field null
        teil.setNummer(null);

        // Create the Teil, which fails.

        restTeilMockMvc.perform(post("/api/teils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teil)))
            .andExpect(status().isBadRequest());

        List<Teil> teilList = teilRepository.findAll();
        assertThat(teilList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTeils() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList
        restTeilMockMvc.perform(get("/api/teils?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(teil.getId().intValue())))
            .andExpect(jsonPath("$.[*].teiltyp").value(hasItem(DEFAULT_TEILTYP.toString())))
            .andExpect(jsonPath("$.[*].periode").value(hasItem(DEFAULT_PERIODE)))
            .andExpect(jsonPath("$.[*].nummer").value(hasItem(DEFAULT_NUMMER)))
            .andExpect(jsonPath("$.[*].istmenge").value(hasItem(DEFAULT_ISTMENGE)))
            .andExpect(jsonPath("$.[*].startmenge").value(hasItem(DEFAULT_STARTMENGE)))
            .andExpect(jsonPath("$.[*].prozentsatz").value(hasItem(DEFAULT_PROZENTSATZ.doubleValue())))
            .andExpect(jsonPath("$.[*].lagerpreis").value(hasItem(DEFAULT_LAGERPREIS.doubleValue())))
            .andExpect(jsonPath("$.[*].lagerwert").value(hasItem(DEFAULT_LAGERWERT.doubleValue())))
            .andExpect(jsonPath("$.[*].sicherheitsbestand").value(hasItem(DEFAULT_SICHERHEITSBESTAND)))
            .andExpect(jsonPath("$.[*].vertriebswunsch").value(hasItem(DEFAULT_VERTRIEBSWUNSCH)))
            .andExpect(jsonPath("$.[*].gesamtproduktionsmenge").value(hasItem(DEFAULT_GESAMTPRODUKTIONSMENGE)))
            .andExpect(jsonPath("$.[*].direktverkaufmenge").value(hasItem(DEFAULT_DIREKTVERKAUFMENGE)))
            .andExpect(jsonPath("$.[*].direktverkaufspreis").value(hasItem(DEFAULT_DIREKTVERKAUFSPREIS.doubleValue())))
            .andExpect(jsonPath("$.[*].strafe").value(hasItem(DEFAULT_STRAFE.doubleValue())));
    }

    @Test
    @Transactional
    public void getTeil() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get the teil
        restTeilMockMvc.perform(get("/api/teils/{id}", teil.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(teil.getId().intValue()))
            .andExpect(jsonPath("$.teiltyp").value(DEFAULT_TEILTYP.toString()))
            .andExpect(jsonPath("$.periode").value(DEFAULT_PERIODE))
            .andExpect(jsonPath("$.nummer").value(DEFAULT_NUMMER))
            .andExpect(jsonPath("$.istmenge").value(DEFAULT_ISTMENGE))
            .andExpect(jsonPath("$.startmenge").value(DEFAULT_STARTMENGE))
            .andExpect(jsonPath("$.prozentsatz").value(DEFAULT_PROZENTSATZ.doubleValue()))
            .andExpect(jsonPath("$.lagerpreis").value(DEFAULT_LAGERPREIS.doubleValue()))
            .andExpect(jsonPath("$.lagerwert").value(DEFAULT_LAGERWERT.doubleValue()))
            .andExpect(jsonPath("$.sicherheitsbestand").value(DEFAULT_SICHERHEITSBESTAND))
            .andExpect(jsonPath("$.vertriebswunsch").value(DEFAULT_VERTRIEBSWUNSCH))
            .andExpect(jsonPath("$.gesamtproduktionsmenge").value(DEFAULT_GESAMTPRODUKTIONSMENGE))
            .andExpect(jsonPath("$.direktverkaufmenge").value(DEFAULT_DIREKTVERKAUFMENGE))
            .andExpect(jsonPath("$.direktverkaufspreis").value(DEFAULT_DIREKTVERKAUFSPREIS.doubleValue()))
            .andExpect(jsonPath("$.strafe").value(DEFAULT_STRAFE.doubleValue()));
    }

    @Test
    @Transactional
    public void getAllTeilsByTeiltypIsEqualToSomething() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where teiltyp equals to DEFAULT_TEILTYP
        defaultTeilShouldBeFound("teiltyp.equals=" + DEFAULT_TEILTYP);

        // Get all the teilList where teiltyp equals to UPDATED_TEILTYP
        defaultTeilShouldNotBeFound("teiltyp.equals=" + UPDATED_TEILTYP);
    }

    @Test
    @Transactional
    public void getAllTeilsByTeiltypIsInShouldWork() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where teiltyp in DEFAULT_TEILTYP or UPDATED_TEILTYP
        defaultTeilShouldBeFound("teiltyp.in=" + DEFAULT_TEILTYP + "," + UPDATED_TEILTYP);

        // Get all the teilList where teiltyp equals to UPDATED_TEILTYP
        defaultTeilShouldNotBeFound("teiltyp.in=" + UPDATED_TEILTYP);
    }

    @Test
    @Transactional
    public void getAllTeilsByTeiltypIsNullOrNotNull() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where teiltyp is not null
        defaultTeilShouldBeFound("teiltyp.specified=true");

        // Get all the teilList where teiltyp is null
        defaultTeilShouldNotBeFound("teiltyp.specified=false");
    }

    @Test
    @Transactional
    public void getAllTeilsByPeriodeIsEqualToSomething() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where periode equals to DEFAULT_PERIODE
        defaultTeilShouldBeFound("periode.equals=" + DEFAULT_PERIODE);

        // Get all the teilList where periode equals to UPDATED_PERIODE
        defaultTeilShouldNotBeFound("periode.equals=" + UPDATED_PERIODE);
    }

    @Test
    @Transactional
    public void getAllTeilsByPeriodeIsInShouldWork() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where periode in DEFAULT_PERIODE or UPDATED_PERIODE
        defaultTeilShouldBeFound("periode.in=" + DEFAULT_PERIODE + "," + UPDATED_PERIODE);

        // Get all the teilList where periode equals to UPDATED_PERIODE
        defaultTeilShouldNotBeFound("periode.in=" + UPDATED_PERIODE);
    }

    @Test
    @Transactional
    public void getAllTeilsByPeriodeIsNullOrNotNull() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where periode is not null
        defaultTeilShouldBeFound("periode.specified=true");

        // Get all the teilList where periode is null
        defaultTeilShouldNotBeFound("periode.specified=false");
    }

    @Test
    @Transactional
    public void getAllTeilsByPeriodeIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where periode greater than or equals to DEFAULT_PERIODE
        defaultTeilShouldBeFound("periode.greaterOrEqualThan=" + DEFAULT_PERIODE);

        // Get all the teilList where periode greater than or equals to UPDATED_PERIODE
        defaultTeilShouldNotBeFound("periode.greaterOrEqualThan=" + UPDATED_PERIODE);
    }

    @Test
    @Transactional
    public void getAllTeilsByPeriodeIsLessThanSomething() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where periode less than or equals to DEFAULT_PERIODE
        defaultTeilShouldNotBeFound("periode.lessThan=" + DEFAULT_PERIODE);

        // Get all the teilList where periode less than or equals to UPDATED_PERIODE
        defaultTeilShouldBeFound("periode.lessThan=" + UPDATED_PERIODE);
    }


    @Test
    @Transactional
    public void getAllTeilsByNummerIsEqualToSomething() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where nummer equals to DEFAULT_NUMMER
        defaultTeilShouldBeFound("nummer.equals=" + DEFAULT_NUMMER);

        // Get all the teilList where nummer equals to UPDATED_NUMMER
        defaultTeilShouldNotBeFound("nummer.equals=" + UPDATED_NUMMER);
    }

    @Test
    @Transactional
    public void getAllTeilsByNummerIsInShouldWork() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where nummer in DEFAULT_NUMMER or UPDATED_NUMMER
        defaultTeilShouldBeFound("nummer.in=" + DEFAULT_NUMMER + "," + UPDATED_NUMMER);

        // Get all the teilList where nummer equals to UPDATED_NUMMER
        defaultTeilShouldNotBeFound("nummer.in=" + UPDATED_NUMMER);
    }

    @Test
    @Transactional
    public void getAllTeilsByNummerIsNullOrNotNull() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where nummer is not null
        defaultTeilShouldBeFound("nummer.specified=true");

        // Get all the teilList where nummer is null
        defaultTeilShouldNotBeFound("nummer.specified=false");
    }

    @Test
    @Transactional
    public void getAllTeilsByNummerIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where nummer greater than or equals to DEFAULT_NUMMER
        defaultTeilShouldBeFound("nummer.greaterOrEqualThan=" + DEFAULT_NUMMER);

        // Get all the teilList where nummer greater than or equals to UPDATED_NUMMER
        defaultTeilShouldNotBeFound("nummer.greaterOrEqualThan=" + UPDATED_NUMMER);
    }

    @Test
    @Transactional
    public void getAllTeilsByNummerIsLessThanSomething() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where nummer less than or equals to DEFAULT_NUMMER
        defaultTeilShouldNotBeFound("nummer.lessThan=" + DEFAULT_NUMMER);

        // Get all the teilList where nummer less than or equals to UPDATED_NUMMER
        defaultTeilShouldBeFound("nummer.lessThan=" + UPDATED_NUMMER);
    }


    @Test
    @Transactional
    public void getAllTeilsByIstmengeIsEqualToSomething() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where istmenge equals to DEFAULT_ISTMENGE
        defaultTeilShouldBeFound("istmenge.equals=" + DEFAULT_ISTMENGE);

        // Get all the teilList where istmenge equals to UPDATED_ISTMENGE
        defaultTeilShouldNotBeFound("istmenge.equals=" + UPDATED_ISTMENGE);
    }

    @Test
    @Transactional
    public void getAllTeilsByIstmengeIsInShouldWork() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where istmenge in DEFAULT_ISTMENGE or UPDATED_ISTMENGE
        defaultTeilShouldBeFound("istmenge.in=" + DEFAULT_ISTMENGE + "," + UPDATED_ISTMENGE);

        // Get all the teilList where istmenge equals to UPDATED_ISTMENGE
        defaultTeilShouldNotBeFound("istmenge.in=" + UPDATED_ISTMENGE);
    }

    @Test
    @Transactional
    public void getAllTeilsByIstmengeIsNullOrNotNull() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where istmenge is not null
        defaultTeilShouldBeFound("istmenge.specified=true");

        // Get all the teilList where istmenge is null
        defaultTeilShouldNotBeFound("istmenge.specified=false");
    }

    @Test
    @Transactional
    public void getAllTeilsByIstmengeIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where istmenge greater than or equals to DEFAULT_ISTMENGE
        defaultTeilShouldBeFound("istmenge.greaterOrEqualThan=" + DEFAULT_ISTMENGE);

        // Get all the teilList where istmenge greater than or equals to UPDATED_ISTMENGE
        defaultTeilShouldNotBeFound("istmenge.greaterOrEqualThan=" + UPDATED_ISTMENGE);
    }

    @Test
    @Transactional
    public void getAllTeilsByIstmengeIsLessThanSomething() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where istmenge less than or equals to DEFAULT_ISTMENGE
        defaultTeilShouldNotBeFound("istmenge.lessThan=" + DEFAULT_ISTMENGE);

        // Get all the teilList where istmenge less than or equals to UPDATED_ISTMENGE
        defaultTeilShouldBeFound("istmenge.lessThan=" + UPDATED_ISTMENGE);
    }


    @Test
    @Transactional
    public void getAllTeilsByStartmengeIsEqualToSomething() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where startmenge equals to DEFAULT_STARTMENGE
        defaultTeilShouldBeFound("startmenge.equals=" + DEFAULT_STARTMENGE);

        // Get all the teilList where startmenge equals to UPDATED_STARTMENGE
        defaultTeilShouldNotBeFound("startmenge.equals=" + UPDATED_STARTMENGE);
    }

    @Test
    @Transactional
    public void getAllTeilsByStartmengeIsInShouldWork() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where startmenge in DEFAULT_STARTMENGE or UPDATED_STARTMENGE
        defaultTeilShouldBeFound("startmenge.in=" + DEFAULT_STARTMENGE + "," + UPDATED_STARTMENGE);

        // Get all the teilList where startmenge equals to UPDATED_STARTMENGE
        defaultTeilShouldNotBeFound("startmenge.in=" + UPDATED_STARTMENGE);
    }

    @Test
    @Transactional
    public void getAllTeilsByStartmengeIsNullOrNotNull() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where startmenge is not null
        defaultTeilShouldBeFound("startmenge.specified=true");

        // Get all the teilList where startmenge is null
        defaultTeilShouldNotBeFound("startmenge.specified=false");
    }

    @Test
    @Transactional
    public void getAllTeilsByStartmengeIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where startmenge greater than or equals to DEFAULT_STARTMENGE
        defaultTeilShouldBeFound("startmenge.greaterOrEqualThan=" + DEFAULT_STARTMENGE);

        // Get all the teilList where startmenge greater than or equals to UPDATED_STARTMENGE
        defaultTeilShouldNotBeFound("startmenge.greaterOrEqualThan=" + UPDATED_STARTMENGE);
    }

    @Test
    @Transactional
    public void getAllTeilsByStartmengeIsLessThanSomething() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where startmenge less than or equals to DEFAULT_STARTMENGE
        defaultTeilShouldNotBeFound("startmenge.lessThan=" + DEFAULT_STARTMENGE);

        // Get all the teilList where startmenge less than or equals to UPDATED_STARTMENGE
        defaultTeilShouldBeFound("startmenge.lessThan=" + UPDATED_STARTMENGE);
    }


    @Test
    @Transactional
    public void getAllTeilsByProzentsatzIsEqualToSomething() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where prozentsatz equals to DEFAULT_PROZENTSATZ
        defaultTeilShouldBeFound("prozentsatz.equals=" + DEFAULT_PROZENTSATZ);

        // Get all the teilList where prozentsatz equals to UPDATED_PROZENTSATZ
        defaultTeilShouldNotBeFound("prozentsatz.equals=" + UPDATED_PROZENTSATZ);
    }

    @Test
    @Transactional
    public void getAllTeilsByProzentsatzIsInShouldWork() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where prozentsatz in DEFAULT_PROZENTSATZ or UPDATED_PROZENTSATZ
        defaultTeilShouldBeFound("prozentsatz.in=" + DEFAULT_PROZENTSATZ + "," + UPDATED_PROZENTSATZ);

        // Get all the teilList where prozentsatz equals to UPDATED_PROZENTSATZ
        defaultTeilShouldNotBeFound("prozentsatz.in=" + UPDATED_PROZENTSATZ);
    }

    @Test
    @Transactional
    public void getAllTeilsByProzentsatzIsNullOrNotNull() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where prozentsatz is not null
        defaultTeilShouldBeFound("prozentsatz.specified=true");

        // Get all the teilList where prozentsatz is null
        defaultTeilShouldNotBeFound("prozentsatz.specified=false");
    }

    @Test
    @Transactional
    public void getAllTeilsByLagerpreisIsEqualToSomething() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where lagerpreis equals to DEFAULT_LAGERPREIS
        defaultTeilShouldBeFound("lagerpreis.equals=" + DEFAULT_LAGERPREIS);

        // Get all the teilList where lagerpreis equals to UPDATED_LAGERPREIS
        defaultTeilShouldNotBeFound("lagerpreis.equals=" + UPDATED_LAGERPREIS);
    }

    @Test
    @Transactional
    public void getAllTeilsByLagerpreisIsInShouldWork() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where lagerpreis in DEFAULT_LAGERPREIS or UPDATED_LAGERPREIS
        defaultTeilShouldBeFound("lagerpreis.in=" + DEFAULT_LAGERPREIS + "," + UPDATED_LAGERPREIS);

        // Get all the teilList where lagerpreis equals to UPDATED_LAGERPREIS
        defaultTeilShouldNotBeFound("lagerpreis.in=" + UPDATED_LAGERPREIS);
    }

    @Test
    @Transactional
    public void getAllTeilsByLagerpreisIsNullOrNotNull() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where lagerpreis is not null
        defaultTeilShouldBeFound("lagerpreis.specified=true");

        // Get all the teilList where lagerpreis is null
        defaultTeilShouldNotBeFound("lagerpreis.specified=false");
    }

    @Test
    @Transactional
    public void getAllTeilsByLagerwertIsEqualToSomething() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where lagerwert equals to DEFAULT_LAGERWERT
        defaultTeilShouldBeFound("lagerwert.equals=" + DEFAULT_LAGERWERT);

        // Get all the teilList where lagerwert equals to UPDATED_LAGERWERT
        defaultTeilShouldNotBeFound("lagerwert.equals=" + UPDATED_LAGERWERT);
    }

    @Test
    @Transactional
    public void getAllTeilsByLagerwertIsInShouldWork() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where lagerwert in DEFAULT_LAGERWERT or UPDATED_LAGERWERT
        defaultTeilShouldBeFound("lagerwert.in=" + DEFAULT_LAGERWERT + "," + UPDATED_LAGERWERT);

        // Get all the teilList where lagerwert equals to UPDATED_LAGERWERT
        defaultTeilShouldNotBeFound("lagerwert.in=" + UPDATED_LAGERWERT);
    }

    @Test
    @Transactional
    public void getAllTeilsByLagerwertIsNullOrNotNull() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where lagerwert is not null
        defaultTeilShouldBeFound("lagerwert.specified=true");

        // Get all the teilList where lagerwert is null
        defaultTeilShouldNotBeFound("lagerwert.specified=false");
    }

    @Test
    @Transactional
    public void getAllTeilsBySicherheitsbestandIsEqualToSomething() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where sicherheitsbestand equals to DEFAULT_SICHERHEITSBESTAND
        defaultTeilShouldBeFound("sicherheitsbestand.equals=" + DEFAULT_SICHERHEITSBESTAND);

        // Get all the teilList where sicherheitsbestand equals to UPDATED_SICHERHEITSBESTAND
        defaultTeilShouldNotBeFound("sicherheitsbestand.equals=" + UPDATED_SICHERHEITSBESTAND);
    }

    @Test
    @Transactional
    public void getAllTeilsBySicherheitsbestandIsInShouldWork() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where sicherheitsbestand in DEFAULT_SICHERHEITSBESTAND or UPDATED_SICHERHEITSBESTAND
        defaultTeilShouldBeFound("sicherheitsbestand.in=" + DEFAULT_SICHERHEITSBESTAND + "," + UPDATED_SICHERHEITSBESTAND);

        // Get all the teilList where sicherheitsbestand equals to UPDATED_SICHERHEITSBESTAND
        defaultTeilShouldNotBeFound("sicherheitsbestand.in=" + UPDATED_SICHERHEITSBESTAND);
    }

    @Test
    @Transactional
    public void getAllTeilsBySicherheitsbestandIsNullOrNotNull() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where sicherheitsbestand is not null
        defaultTeilShouldBeFound("sicherheitsbestand.specified=true");

        // Get all the teilList where sicherheitsbestand is null
        defaultTeilShouldNotBeFound("sicherheitsbestand.specified=false");
    }

    @Test
    @Transactional
    public void getAllTeilsBySicherheitsbestandIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where sicherheitsbestand greater than or equals to DEFAULT_SICHERHEITSBESTAND
        defaultTeilShouldBeFound("sicherheitsbestand.greaterOrEqualThan=" + DEFAULT_SICHERHEITSBESTAND);

        // Get all the teilList where sicherheitsbestand greater than or equals to UPDATED_SICHERHEITSBESTAND
        defaultTeilShouldNotBeFound("sicherheitsbestand.greaterOrEqualThan=" + UPDATED_SICHERHEITSBESTAND);
    }

    @Test
    @Transactional
    public void getAllTeilsBySicherheitsbestandIsLessThanSomething() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where sicherheitsbestand less than or equals to DEFAULT_SICHERHEITSBESTAND
        defaultTeilShouldNotBeFound("sicherheitsbestand.lessThan=" + DEFAULT_SICHERHEITSBESTAND);

        // Get all the teilList where sicherheitsbestand less than or equals to UPDATED_SICHERHEITSBESTAND
        defaultTeilShouldBeFound("sicherheitsbestand.lessThan=" + UPDATED_SICHERHEITSBESTAND);
    }


    @Test
    @Transactional
    public void getAllTeilsByVertriebswunschIsEqualToSomething() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where vertriebswunsch equals to DEFAULT_VERTRIEBSWUNSCH
        defaultTeilShouldBeFound("vertriebswunsch.equals=" + DEFAULT_VERTRIEBSWUNSCH);

        // Get all the teilList where vertriebswunsch equals to UPDATED_VERTRIEBSWUNSCH
        defaultTeilShouldNotBeFound("vertriebswunsch.equals=" + UPDATED_VERTRIEBSWUNSCH);
    }

    @Test
    @Transactional
    public void getAllTeilsByVertriebswunschIsInShouldWork() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where vertriebswunsch in DEFAULT_VERTRIEBSWUNSCH or UPDATED_VERTRIEBSWUNSCH
        defaultTeilShouldBeFound("vertriebswunsch.in=" + DEFAULT_VERTRIEBSWUNSCH + "," + UPDATED_VERTRIEBSWUNSCH);

        // Get all the teilList where vertriebswunsch equals to UPDATED_VERTRIEBSWUNSCH
        defaultTeilShouldNotBeFound("vertriebswunsch.in=" + UPDATED_VERTRIEBSWUNSCH);
    }

    @Test
    @Transactional
    public void getAllTeilsByVertriebswunschIsNullOrNotNull() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where vertriebswunsch is not null
        defaultTeilShouldBeFound("vertriebswunsch.specified=true");

        // Get all the teilList where vertriebswunsch is null
        defaultTeilShouldNotBeFound("vertriebswunsch.specified=false");
    }

    @Test
    @Transactional
    public void getAllTeilsByVertriebswunschIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where vertriebswunsch greater than or equals to DEFAULT_VERTRIEBSWUNSCH
        defaultTeilShouldBeFound("vertriebswunsch.greaterOrEqualThan=" + DEFAULT_VERTRIEBSWUNSCH);

        // Get all the teilList where vertriebswunsch greater than or equals to UPDATED_VERTRIEBSWUNSCH
        defaultTeilShouldNotBeFound("vertriebswunsch.greaterOrEqualThan=" + UPDATED_VERTRIEBSWUNSCH);
    }

    @Test
    @Transactional
    public void getAllTeilsByVertriebswunschIsLessThanSomething() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where vertriebswunsch less than or equals to DEFAULT_VERTRIEBSWUNSCH
        defaultTeilShouldNotBeFound("vertriebswunsch.lessThan=" + DEFAULT_VERTRIEBSWUNSCH);

        // Get all the teilList where vertriebswunsch less than or equals to UPDATED_VERTRIEBSWUNSCH
        defaultTeilShouldBeFound("vertriebswunsch.lessThan=" + UPDATED_VERTRIEBSWUNSCH);
    }


    @Test
    @Transactional
    public void getAllTeilsByGesamtproduktionsmengeIsEqualToSomething() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where gesamtproduktionsmenge equals to DEFAULT_GESAMTPRODUKTIONSMENGE
        defaultTeilShouldBeFound("gesamtproduktionsmenge.equals=" + DEFAULT_GESAMTPRODUKTIONSMENGE);

        // Get all the teilList where gesamtproduktionsmenge equals to UPDATED_GESAMTPRODUKTIONSMENGE
        defaultTeilShouldNotBeFound("gesamtproduktionsmenge.equals=" + UPDATED_GESAMTPRODUKTIONSMENGE);
    }

    @Test
    @Transactional
    public void getAllTeilsByGesamtproduktionsmengeIsInShouldWork() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where gesamtproduktionsmenge in DEFAULT_GESAMTPRODUKTIONSMENGE or UPDATED_GESAMTPRODUKTIONSMENGE
        defaultTeilShouldBeFound("gesamtproduktionsmenge.in=" + DEFAULT_GESAMTPRODUKTIONSMENGE + "," + UPDATED_GESAMTPRODUKTIONSMENGE);

        // Get all the teilList where gesamtproduktionsmenge equals to UPDATED_GESAMTPRODUKTIONSMENGE
        defaultTeilShouldNotBeFound("gesamtproduktionsmenge.in=" + UPDATED_GESAMTPRODUKTIONSMENGE);
    }

    @Test
    @Transactional
    public void getAllTeilsByGesamtproduktionsmengeIsNullOrNotNull() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where gesamtproduktionsmenge is not null
        defaultTeilShouldBeFound("gesamtproduktionsmenge.specified=true");

        // Get all the teilList where gesamtproduktionsmenge is null
        defaultTeilShouldNotBeFound("gesamtproduktionsmenge.specified=false");
    }

    @Test
    @Transactional
    public void getAllTeilsByGesamtproduktionsmengeIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where gesamtproduktionsmenge greater than or equals to DEFAULT_GESAMTPRODUKTIONSMENGE
        defaultTeilShouldBeFound("gesamtproduktionsmenge.greaterOrEqualThan=" + DEFAULT_GESAMTPRODUKTIONSMENGE);

        // Get all the teilList where gesamtproduktionsmenge greater than or equals to UPDATED_GESAMTPRODUKTIONSMENGE
        defaultTeilShouldNotBeFound("gesamtproduktionsmenge.greaterOrEqualThan=" + UPDATED_GESAMTPRODUKTIONSMENGE);
    }

    @Test
    @Transactional
    public void getAllTeilsByGesamtproduktionsmengeIsLessThanSomething() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where gesamtproduktionsmenge less than or equals to DEFAULT_GESAMTPRODUKTIONSMENGE
        defaultTeilShouldNotBeFound("gesamtproduktionsmenge.lessThan=" + DEFAULT_GESAMTPRODUKTIONSMENGE);

        // Get all the teilList where gesamtproduktionsmenge less than or equals to UPDATED_GESAMTPRODUKTIONSMENGE
        defaultTeilShouldBeFound("gesamtproduktionsmenge.lessThan=" + UPDATED_GESAMTPRODUKTIONSMENGE);
    }


    @Test
    @Transactional
    public void getAllTeilsByDirektverkaufmengeIsEqualToSomething() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where direktverkaufmenge equals to DEFAULT_DIREKTVERKAUFMENGE
        defaultTeilShouldBeFound("direktverkaufmenge.equals=" + DEFAULT_DIREKTVERKAUFMENGE);

        // Get all the teilList where direktverkaufmenge equals to UPDATED_DIREKTVERKAUFMENGE
        defaultTeilShouldNotBeFound("direktverkaufmenge.equals=" + UPDATED_DIREKTVERKAUFMENGE);
    }

    @Test
    @Transactional
    public void getAllTeilsByDirektverkaufmengeIsInShouldWork() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where direktverkaufmenge in DEFAULT_DIREKTVERKAUFMENGE or UPDATED_DIREKTVERKAUFMENGE
        defaultTeilShouldBeFound("direktverkaufmenge.in=" + DEFAULT_DIREKTVERKAUFMENGE + "," + UPDATED_DIREKTVERKAUFMENGE);

        // Get all the teilList where direktverkaufmenge equals to UPDATED_DIREKTVERKAUFMENGE
        defaultTeilShouldNotBeFound("direktverkaufmenge.in=" + UPDATED_DIREKTVERKAUFMENGE);
    }

    @Test
    @Transactional
    public void getAllTeilsByDirektverkaufmengeIsNullOrNotNull() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where direktverkaufmenge is not null
        defaultTeilShouldBeFound("direktverkaufmenge.specified=true");

        // Get all the teilList where direktverkaufmenge is null
        defaultTeilShouldNotBeFound("direktverkaufmenge.specified=false");
    }

    @Test
    @Transactional
    public void getAllTeilsByDirektverkaufmengeIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where direktverkaufmenge greater than or equals to DEFAULT_DIREKTVERKAUFMENGE
        defaultTeilShouldBeFound("direktverkaufmenge.greaterOrEqualThan=" + DEFAULT_DIREKTVERKAUFMENGE);

        // Get all the teilList where direktverkaufmenge greater than or equals to UPDATED_DIREKTVERKAUFMENGE
        defaultTeilShouldNotBeFound("direktverkaufmenge.greaterOrEqualThan=" + UPDATED_DIREKTVERKAUFMENGE);
    }

    @Test
    @Transactional
    public void getAllTeilsByDirektverkaufmengeIsLessThanSomething() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where direktverkaufmenge less than or equals to DEFAULT_DIREKTVERKAUFMENGE
        defaultTeilShouldNotBeFound("direktverkaufmenge.lessThan=" + DEFAULT_DIREKTVERKAUFMENGE);

        // Get all the teilList where direktverkaufmenge less than or equals to UPDATED_DIREKTVERKAUFMENGE
        defaultTeilShouldBeFound("direktverkaufmenge.lessThan=" + UPDATED_DIREKTVERKAUFMENGE);
    }


    @Test
    @Transactional
    public void getAllTeilsByDirektverkaufspreisIsEqualToSomething() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where direktverkaufspreis equals to DEFAULT_DIREKTVERKAUFSPREIS
        defaultTeilShouldBeFound("direktverkaufspreis.equals=" + DEFAULT_DIREKTVERKAUFSPREIS);

        // Get all the teilList where direktverkaufspreis equals to UPDATED_DIREKTVERKAUFSPREIS
        defaultTeilShouldNotBeFound("direktverkaufspreis.equals=" + UPDATED_DIREKTVERKAUFSPREIS);
    }

    @Test
    @Transactional
    public void getAllTeilsByDirektverkaufspreisIsInShouldWork() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where direktverkaufspreis in DEFAULT_DIREKTVERKAUFSPREIS or UPDATED_DIREKTVERKAUFSPREIS
        defaultTeilShouldBeFound("direktverkaufspreis.in=" + DEFAULT_DIREKTVERKAUFSPREIS + "," + UPDATED_DIREKTVERKAUFSPREIS);

        // Get all the teilList where direktverkaufspreis equals to UPDATED_DIREKTVERKAUFSPREIS
        defaultTeilShouldNotBeFound("direktverkaufspreis.in=" + UPDATED_DIREKTVERKAUFSPREIS);
    }

    @Test
    @Transactional
    public void getAllTeilsByDirektverkaufspreisIsNullOrNotNull() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where direktverkaufspreis is not null
        defaultTeilShouldBeFound("direktverkaufspreis.specified=true");

        // Get all the teilList where direktverkaufspreis is null
        defaultTeilShouldNotBeFound("direktverkaufspreis.specified=false");
    }

    @Test
    @Transactional
    public void getAllTeilsByStrafeIsEqualToSomething() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where strafe equals to DEFAULT_STRAFE
        defaultTeilShouldBeFound("strafe.equals=" + DEFAULT_STRAFE);

        // Get all the teilList where strafe equals to UPDATED_STRAFE
        defaultTeilShouldNotBeFound("strafe.equals=" + UPDATED_STRAFE);
    }

    @Test
    @Transactional
    public void getAllTeilsByStrafeIsInShouldWork() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where strafe in DEFAULT_STRAFE or UPDATED_STRAFE
        defaultTeilShouldBeFound("strafe.in=" + DEFAULT_STRAFE + "," + UPDATED_STRAFE);

        // Get all the teilList where strafe equals to UPDATED_STRAFE
        defaultTeilShouldNotBeFound("strafe.in=" + UPDATED_STRAFE);
    }

    @Test
    @Transactional
    public void getAllTeilsByStrafeIsNullOrNotNull() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList where strafe is not null
        defaultTeilShouldBeFound("strafe.specified=true");

        // Get all the teilList where strafe is null
        defaultTeilShouldNotBeFound("strafe.specified=false");
    }

    @Test
    @Transactional
    public void getAllTeilsBySubkomponenteIsEqualToSomething() throws Exception {
        // Initialize the database
        Teil subkomponente = TeilResourceIntTest.createEntity(em);
        em.persist(subkomponente);
        em.flush();
        teil.addSubkomponente(subkomponente);
        teilRepository.saveAndFlush(teil);
        Long subkomponenteId = subkomponente.getId();

        // Get all the teilList where subkomponente equals to subkomponenteId
        defaultTeilShouldBeFound("subkomponenteId.equals=" + subkomponenteId);

        // Get all the teilList where subkomponente equals to subkomponenteId + 1
        defaultTeilShouldNotBeFound("subkomponenteId.equals=" + (subkomponenteId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultTeilShouldBeFound(String filter) throws Exception {
        restTeilMockMvc.perform(get("/api/teils?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(teil.getId().intValue())))
            .andExpect(jsonPath("$.[*].teiltyp").value(hasItem(DEFAULT_TEILTYP.toString())))
            .andExpect(jsonPath("$.[*].periode").value(hasItem(DEFAULT_PERIODE)))
            .andExpect(jsonPath("$.[*].nummer").value(hasItem(DEFAULT_NUMMER)))
            .andExpect(jsonPath("$.[*].istmenge").value(hasItem(DEFAULT_ISTMENGE)))
            .andExpect(jsonPath("$.[*].startmenge").value(hasItem(DEFAULT_STARTMENGE)))
            .andExpect(jsonPath("$.[*].prozentsatz").value(hasItem(DEFAULT_PROZENTSATZ.doubleValue())))
            .andExpect(jsonPath("$.[*].lagerpreis").value(hasItem(DEFAULT_LAGERPREIS.doubleValue())))
            .andExpect(jsonPath("$.[*].lagerwert").value(hasItem(DEFAULT_LAGERWERT.doubleValue())))
            .andExpect(jsonPath("$.[*].sicherheitsbestand").value(hasItem(DEFAULT_SICHERHEITSBESTAND)))
            .andExpect(jsonPath("$.[*].vertriebswunsch").value(hasItem(DEFAULT_VERTRIEBSWUNSCH)))
            .andExpect(jsonPath("$.[*].gesamtproduktionsmenge").value(hasItem(DEFAULT_GESAMTPRODUKTIONSMENGE)))
            .andExpect(jsonPath("$.[*].direktverkaufmenge").value(hasItem(DEFAULT_DIREKTVERKAUFMENGE)))
            .andExpect(jsonPath("$.[*].direktverkaufspreis").value(hasItem(DEFAULT_DIREKTVERKAUFSPREIS.doubleValue())))
            .andExpect(jsonPath("$.[*].strafe").value(hasItem(DEFAULT_STRAFE.doubleValue())));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultTeilShouldNotBeFound(String filter) throws Exception {
        restTeilMockMvc.perform(get("/api/teils?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());
    }


    @Test
    @Transactional
    public void getNonExistingTeil() throws Exception {
        // Get the teil
        restTeilMockMvc.perform(get("/api/teils/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTeil() throws Exception {
        // Initialize the database
        teilService.save(teil);

        int databaseSizeBeforeUpdate = teilRepository.findAll().size();

        // Update the teil
        Teil updatedTeil = teilRepository.findOne(teil.getId());
        updatedTeil
            .teiltyp(UPDATED_TEILTYP)
            .periode(UPDATED_PERIODE)
            .nummer(UPDATED_NUMMER)
            .istmenge(UPDATED_ISTMENGE)
            .startmenge(UPDATED_STARTMENGE)
            .prozentsatz(UPDATED_PROZENTSATZ)
            .lagerpreis(UPDATED_LAGERPREIS)
            .lagerwert(UPDATED_LAGERWERT)
            .sicherheitsbestand(UPDATED_SICHERHEITSBESTAND)
            .vertriebswunsch(UPDATED_VERTRIEBSWUNSCH)
            .gesamtproduktionsmenge(UPDATED_GESAMTPRODUKTIONSMENGE)
            .direktverkaufmenge(UPDATED_DIREKTVERKAUFMENGE)
            .direktverkaufspreis(UPDATED_DIREKTVERKAUFSPREIS)
            .strafe(UPDATED_STRAFE);

        restTeilMockMvc.perform(put("/api/teils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTeil)))
            .andExpect(status().isOk());

        // Validate the Teil in the database
        List<Teil> teilList = teilRepository.findAll();
        assertThat(teilList).hasSize(databaseSizeBeforeUpdate);
        Teil testTeil = teilList.get(teilList.size() - 1);
        assertThat(testTeil.getTeiltyp()).isEqualTo(UPDATED_TEILTYP);
        assertThat(testTeil.getPeriode()).isEqualTo(UPDATED_PERIODE);
        assertThat(testTeil.getNummer()).isEqualTo(UPDATED_NUMMER);
        assertThat(testTeil.getIstmenge()).isEqualTo(UPDATED_ISTMENGE);
        assertThat(testTeil.getStartmenge()).isEqualTo(UPDATED_STARTMENGE);
        assertThat(testTeil.getProzentsatz()).isEqualTo(UPDATED_PROZENTSATZ);
        assertThat(testTeil.getLagerpreis()).isEqualTo(UPDATED_LAGERPREIS);
        assertThat(testTeil.getLagerwert()).isEqualTo(UPDATED_LAGERWERT);
        assertThat(testTeil.getSicherheitsbestand()).isEqualTo(UPDATED_SICHERHEITSBESTAND);
        assertThat(testTeil.getVertriebswunsch()).isEqualTo(UPDATED_VERTRIEBSWUNSCH);
        assertThat(testTeil.getGesamtproduktionsmenge()).isEqualTo(UPDATED_GESAMTPRODUKTIONSMENGE);
        assertThat(testTeil.getDirektverkaufmenge()).isEqualTo(UPDATED_DIREKTVERKAUFMENGE);
        assertThat(testTeil.getDirektverkaufspreis()).isEqualTo(UPDATED_DIREKTVERKAUFSPREIS);
        assertThat(testTeil.getStrafe()).isEqualTo(UPDATED_STRAFE);
    }

    @Test
    @Transactional
    public void updateNonExistingTeil() throws Exception {
        int databaseSizeBeforeUpdate = teilRepository.findAll().size();

        // Create the Teil

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTeilMockMvc.perform(put("/api/teils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teil)))
            .andExpect(status().isCreated());

        // Validate the Teil in the database
        List<Teil> teilList = teilRepository.findAll();
        assertThat(teilList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTeil() throws Exception {
        // Initialize the database
        teilService.save(teil);

        int databaseSizeBeforeDelete = teilRepository.findAll().size();

        // Get the teil
        restTeilMockMvc.perform(delete("/api/teils/{id}", teil.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Teil> teilList = teilRepository.findAll();
        assertThat(teilList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Teil.class);
        Teil teil1 = new Teil();
        teil1.setId(1L);
        Teil teil2 = new Teil();
        teil2.setId(teil1.getId());
        assertThat(teil1).isEqualTo(teil2);
        teil2.setId(2L);
        assertThat(teil1).isNotEqualTo(teil2);
        teil1.setId(null);
        assertThat(teil1).isNotEqualTo(teil2);
    }
}
