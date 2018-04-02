package com.ibsys2.aimy.web.rest;

import com.ibsys2.aimy.AimyApp;

import com.ibsys2.aimy.domain.Arbeitsplatz;
import com.ibsys2.aimy.repository.ArbeitsplatzRepository;
import com.ibsys2.aimy.service.ArbeitsplatzService;
import com.ibsys2.aimy.web.rest.errors.ExceptionTranslator;
import com.ibsys2.aimy.service.dto.ArbeitsplatzCriteria;
import com.ibsys2.aimy.service.ArbeitsplatzQueryService;

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
 * Test class for the ArbeitsplatzResource REST controller.
 *
 * @see ArbeitsplatzResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AimyApp.class)
public class ArbeitsplatzResourceIntTest {

    private static final Integer DEFAULT_PERIODE = 0;
    private static final Integer UPDATED_PERIODE = 1;

    private static final Integer DEFAULT_NUMMER = 0;
    private static final Integer UPDATED_NUMMER = 1;

    private static final Double DEFAULT_RESTZEITBEDARF = 0D;
    private static final Double UPDATED_RESTZEITBEDARF = 1D;

    private static final Integer DEFAULT_RUESTVORGAENGE = 0;
    private static final Integer UPDATED_RUESTVORGAENGE = 1;

    private static final Double DEFAULT_LEERZEIT = 0D;
    private static final Double UPDATED_LEERZEIT = 1D;

    private static final Double DEFAULT_LOHNLEERKOSTEN = 0D;
    private static final Double UPDATED_LOHNLEERKOSTEN = 1D;

    private static final Double DEFAULT_LOHNKOSTEN = 0D;
    private static final Double UPDATED_LOHNKOSTEN = 1D;

    private static final Double DEFAULT_MASCHINENSTILLSTANDKOSTEN = 0D;
    private static final Double UPDATED_MASCHINENSTILLSTANDKOSTEN = 1D;

    private static final Double DEFAULT_RESTZEITBEDARF_IN_BEARBEITUNG = 0D;
    private static final Double UPDATED_RESTZEITBEDARF_IN_BEARBEITUNG = 1D;

    private static final Integer DEFAULT_SCHICHT = 1;
    private static final Integer UPDATED_SCHICHT = 2;

    private static final Double DEFAULT_UEBERSTUNDEN = 0D;
    private static final Double UPDATED_UEBERSTUNDEN = 1D;

    @Autowired
    private ArbeitsplatzRepository arbeitsplatzRepository;

    @Autowired
    private ArbeitsplatzService arbeitsplatzService;

    @Autowired
    private ArbeitsplatzQueryService arbeitsplatzQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restArbeitsplatzMockMvc;

    private Arbeitsplatz arbeitsplatz;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ArbeitsplatzResource arbeitsplatzResource = new ArbeitsplatzResource(arbeitsplatzService, arbeitsplatzQueryService);
        this.restArbeitsplatzMockMvc = MockMvcBuilders.standaloneSetup(arbeitsplatzResource)
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
    public static Arbeitsplatz createEntity(EntityManager em) {
        Arbeitsplatz arbeitsplatz = new Arbeitsplatz()
            .periode(DEFAULT_PERIODE)
            .nummer(DEFAULT_NUMMER)
            .restzeitbedarf(DEFAULT_RESTZEITBEDARF)
            .ruestvorgaenge(DEFAULT_RUESTVORGAENGE)
            .leerzeit(DEFAULT_LEERZEIT)
            .lohnleerkosten(DEFAULT_LOHNLEERKOSTEN)
            .lohnkosten(DEFAULT_LOHNKOSTEN)
            .maschinenstillstandkosten(DEFAULT_MASCHINENSTILLSTANDKOSTEN)
            .restzeitbedarf_in_bearbeitung(DEFAULT_RESTZEITBEDARF_IN_BEARBEITUNG)
            .schicht(DEFAULT_SCHICHT)
            .ueberstunden(DEFAULT_UEBERSTUNDEN);
        return arbeitsplatz;
    }

    @Before
    public void initTest() {
        arbeitsplatz = createEntity(em);
    }

    @Test
    @Transactional
    public void createArbeitsplatz() throws Exception {
        int databaseSizeBeforeCreate = arbeitsplatzRepository.findAll().size();

        // Create the Arbeitsplatz
        restArbeitsplatzMockMvc.perform(post("/api/arbeitsplatzs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(arbeitsplatz)))
            .andExpect(status().isCreated());

        // Validate the Arbeitsplatz in the database
        List<Arbeitsplatz> arbeitsplatzList = arbeitsplatzRepository.findAll();
        assertThat(arbeitsplatzList).hasSize(databaseSizeBeforeCreate + 1);
        Arbeitsplatz testArbeitsplatz = arbeitsplatzList.get(arbeitsplatzList.size() - 1);
        assertThat(testArbeitsplatz.getPeriode()).isEqualTo(DEFAULT_PERIODE);
        assertThat(testArbeitsplatz.getNummer()).isEqualTo(DEFAULT_NUMMER);
        assertThat(testArbeitsplatz.getRestzeitbedarf()).isEqualTo(DEFAULT_RESTZEITBEDARF);
        assertThat(testArbeitsplatz.getRuestvorgaenge()).isEqualTo(DEFAULT_RUESTVORGAENGE);
        assertThat(testArbeitsplatz.getLeerzeit()).isEqualTo(DEFAULT_LEERZEIT);
        assertThat(testArbeitsplatz.getLohnleerkosten()).isEqualTo(DEFAULT_LOHNLEERKOSTEN);
        assertThat(testArbeitsplatz.getLohnkosten()).isEqualTo(DEFAULT_LOHNKOSTEN);
        assertThat(testArbeitsplatz.getMaschinenstillstandkosten()).isEqualTo(DEFAULT_MASCHINENSTILLSTANDKOSTEN);
        assertThat(testArbeitsplatz.getRestzeitbedarf_in_bearbeitung()).isEqualTo(DEFAULT_RESTZEITBEDARF_IN_BEARBEITUNG);
        assertThat(testArbeitsplatz.getSchicht()).isEqualTo(DEFAULT_SCHICHT);
        assertThat(testArbeitsplatz.getUeberstunden()).isEqualTo(DEFAULT_UEBERSTUNDEN);
    }

    @Test
    @Transactional
    public void createArbeitsplatzWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = arbeitsplatzRepository.findAll().size();

        // Create the Arbeitsplatz with an existing ID
        arbeitsplatz.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restArbeitsplatzMockMvc.perform(post("/api/arbeitsplatzs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(arbeitsplatz)))
            .andExpect(status().isBadRequest());

        // Validate the Arbeitsplatz in the database
        List<Arbeitsplatz> arbeitsplatzList = arbeitsplatzRepository.findAll();
        assertThat(arbeitsplatzList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkPeriodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = arbeitsplatzRepository.findAll().size();
        // set the field null
        arbeitsplatz.setPeriode(null);

        // Create the Arbeitsplatz, which fails.

        restArbeitsplatzMockMvc.perform(post("/api/arbeitsplatzs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(arbeitsplatz)))
            .andExpect(status().isBadRequest());

        List<Arbeitsplatz> arbeitsplatzList = arbeitsplatzRepository.findAll();
        assertThat(arbeitsplatzList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNummerIsRequired() throws Exception {
        int databaseSizeBeforeTest = arbeitsplatzRepository.findAll().size();
        // set the field null
        arbeitsplatz.setNummer(null);

        // Create the Arbeitsplatz, which fails.

        restArbeitsplatzMockMvc.perform(post("/api/arbeitsplatzs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(arbeitsplatz)))
            .andExpect(status().isBadRequest());

        List<Arbeitsplatz> arbeitsplatzList = arbeitsplatzRepository.findAll();
        assertThat(arbeitsplatzList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzs() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList
        restArbeitsplatzMockMvc.perform(get("/api/arbeitsplatzs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(arbeitsplatz.getId().intValue())))
            .andExpect(jsonPath("$.[*].periode").value(hasItem(DEFAULT_PERIODE)))
            .andExpect(jsonPath("$.[*].nummer").value(hasItem(DEFAULT_NUMMER)))
            .andExpect(jsonPath("$.[*].restzeitbedarf").value(hasItem(DEFAULT_RESTZEITBEDARF.doubleValue())))
            .andExpect(jsonPath("$.[*].ruestvorgaenge").value(hasItem(DEFAULT_RUESTVORGAENGE)))
            .andExpect(jsonPath("$.[*].leerzeit").value(hasItem(DEFAULT_LEERZEIT.doubleValue())))
            .andExpect(jsonPath("$.[*].lohnleerkosten").value(hasItem(DEFAULT_LOHNLEERKOSTEN.doubleValue())))
            .andExpect(jsonPath("$.[*].lohnkosten").value(hasItem(DEFAULT_LOHNKOSTEN.doubleValue())))
            .andExpect(jsonPath("$.[*].maschinenstillstandkosten").value(hasItem(DEFAULT_MASCHINENSTILLSTANDKOSTEN.doubleValue())))
            .andExpect(jsonPath("$.[*].restzeitbedarf_in_bearbeitung").value(hasItem(DEFAULT_RESTZEITBEDARF_IN_BEARBEITUNG.doubleValue())))
            .andExpect(jsonPath("$.[*].schicht").value(hasItem(DEFAULT_SCHICHT)))
            .andExpect(jsonPath("$.[*].ueberstunden").value(hasItem(DEFAULT_UEBERSTUNDEN.doubleValue())));
    }

    @Test
    @Transactional
    public void getArbeitsplatz() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get the arbeitsplatz
        restArbeitsplatzMockMvc.perform(get("/api/arbeitsplatzs/{id}", arbeitsplatz.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(arbeitsplatz.getId().intValue()))
            .andExpect(jsonPath("$.periode").value(DEFAULT_PERIODE))
            .andExpect(jsonPath("$.nummer").value(DEFAULT_NUMMER))
            .andExpect(jsonPath("$.restzeitbedarf").value(DEFAULT_RESTZEITBEDARF.doubleValue()))
            .andExpect(jsonPath("$.ruestvorgaenge").value(DEFAULT_RUESTVORGAENGE))
            .andExpect(jsonPath("$.leerzeit").value(DEFAULT_LEERZEIT.doubleValue()))
            .andExpect(jsonPath("$.lohnleerkosten").value(DEFAULT_LOHNLEERKOSTEN.doubleValue()))
            .andExpect(jsonPath("$.lohnkosten").value(DEFAULT_LOHNKOSTEN.doubleValue()))
            .andExpect(jsonPath("$.maschinenstillstandkosten").value(DEFAULT_MASCHINENSTILLSTANDKOSTEN.doubleValue()))
            .andExpect(jsonPath("$.restzeitbedarf_in_bearbeitung").value(DEFAULT_RESTZEITBEDARF_IN_BEARBEITUNG.doubleValue()))
            .andExpect(jsonPath("$.schicht").value(DEFAULT_SCHICHT))
            .andExpect(jsonPath("$.ueberstunden").value(DEFAULT_UEBERSTUNDEN.doubleValue()));
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByPeriodeIsEqualToSomething() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where periode equals to DEFAULT_PERIODE
        defaultArbeitsplatzShouldBeFound("periode.equals=" + DEFAULT_PERIODE);

        // Get all the arbeitsplatzList where periode equals to UPDATED_PERIODE
        defaultArbeitsplatzShouldNotBeFound("periode.equals=" + UPDATED_PERIODE);
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByPeriodeIsInShouldWork() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where periode in DEFAULT_PERIODE or UPDATED_PERIODE
        defaultArbeitsplatzShouldBeFound("periode.in=" + DEFAULT_PERIODE + "," + UPDATED_PERIODE);

        // Get all the arbeitsplatzList where periode equals to UPDATED_PERIODE
        defaultArbeitsplatzShouldNotBeFound("periode.in=" + UPDATED_PERIODE);
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByPeriodeIsNullOrNotNull() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where periode is not null
        defaultArbeitsplatzShouldBeFound("periode.specified=true");

        // Get all the arbeitsplatzList where periode is null
        defaultArbeitsplatzShouldNotBeFound("periode.specified=false");
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByPeriodeIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where periode greater than or equals to DEFAULT_PERIODE
        defaultArbeitsplatzShouldBeFound("periode.greaterOrEqualThan=" + DEFAULT_PERIODE);

        // Get all the arbeitsplatzList where periode greater than or equals to UPDATED_PERIODE
        defaultArbeitsplatzShouldNotBeFound("periode.greaterOrEqualThan=" + UPDATED_PERIODE);
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByPeriodeIsLessThanSomething() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where periode less than or equals to DEFAULT_PERIODE
        defaultArbeitsplatzShouldNotBeFound("periode.lessThan=" + DEFAULT_PERIODE);

        // Get all the arbeitsplatzList where periode less than or equals to UPDATED_PERIODE
        defaultArbeitsplatzShouldBeFound("periode.lessThan=" + UPDATED_PERIODE);
    }


    @Test
    @Transactional
    public void getAllArbeitsplatzsByNummerIsEqualToSomething() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where nummer equals to DEFAULT_NUMMER
        defaultArbeitsplatzShouldBeFound("nummer.equals=" + DEFAULT_NUMMER);

        // Get all the arbeitsplatzList where nummer equals to UPDATED_NUMMER
        defaultArbeitsplatzShouldNotBeFound("nummer.equals=" + UPDATED_NUMMER);
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByNummerIsInShouldWork() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where nummer in DEFAULT_NUMMER or UPDATED_NUMMER
        defaultArbeitsplatzShouldBeFound("nummer.in=" + DEFAULT_NUMMER + "," + UPDATED_NUMMER);

        // Get all the arbeitsplatzList where nummer equals to UPDATED_NUMMER
        defaultArbeitsplatzShouldNotBeFound("nummer.in=" + UPDATED_NUMMER);
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByNummerIsNullOrNotNull() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where nummer is not null
        defaultArbeitsplatzShouldBeFound("nummer.specified=true");

        // Get all the arbeitsplatzList where nummer is null
        defaultArbeitsplatzShouldNotBeFound("nummer.specified=false");
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByNummerIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where nummer greater than or equals to DEFAULT_NUMMER
        defaultArbeitsplatzShouldBeFound("nummer.greaterOrEqualThan=" + DEFAULT_NUMMER);

        // Get all the arbeitsplatzList where nummer greater than or equals to UPDATED_NUMMER
        defaultArbeitsplatzShouldNotBeFound("nummer.greaterOrEqualThan=" + UPDATED_NUMMER);
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByNummerIsLessThanSomething() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where nummer less than or equals to DEFAULT_NUMMER
        defaultArbeitsplatzShouldNotBeFound("nummer.lessThan=" + DEFAULT_NUMMER);

        // Get all the arbeitsplatzList where nummer less than or equals to UPDATED_NUMMER
        defaultArbeitsplatzShouldBeFound("nummer.lessThan=" + UPDATED_NUMMER);
    }


    @Test
    @Transactional
    public void getAllArbeitsplatzsByRestzeitbedarfIsEqualToSomething() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where restzeitbedarf equals to DEFAULT_RESTZEITBEDARF
        defaultArbeitsplatzShouldBeFound("restzeitbedarf.equals=" + DEFAULT_RESTZEITBEDARF);

        // Get all the arbeitsplatzList where restzeitbedarf equals to UPDATED_RESTZEITBEDARF
        defaultArbeitsplatzShouldNotBeFound("restzeitbedarf.equals=" + UPDATED_RESTZEITBEDARF);
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByRestzeitbedarfIsInShouldWork() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where restzeitbedarf in DEFAULT_RESTZEITBEDARF or UPDATED_RESTZEITBEDARF
        defaultArbeitsplatzShouldBeFound("restzeitbedarf.in=" + DEFAULT_RESTZEITBEDARF + "," + UPDATED_RESTZEITBEDARF);

        // Get all the arbeitsplatzList where restzeitbedarf equals to UPDATED_RESTZEITBEDARF
        defaultArbeitsplatzShouldNotBeFound("restzeitbedarf.in=" + UPDATED_RESTZEITBEDARF);
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByRestzeitbedarfIsNullOrNotNull() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where restzeitbedarf is not null
        defaultArbeitsplatzShouldBeFound("restzeitbedarf.specified=true");

        // Get all the arbeitsplatzList where restzeitbedarf is null
        defaultArbeitsplatzShouldNotBeFound("restzeitbedarf.specified=false");
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByRuestvorgaengeIsEqualToSomething() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where ruestvorgaenge equals to DEFAULT_RUESTVORGAENGE
        defaultArbeitsplatzShouldBeFound("ruestvorgaenge.equals=" + DEFAULT_RUESTVORGAENGE);

        // Get all the arbeitsplatzList where ruestvorgaenge equals to UPDATED_RUESTVORGAENGE
        defaultArbeitsplatzShouldNotBeFound("ruestvorgaenge.equals=" + UPDATED_RUESTVORGAENGE);
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByRuestvorgaengeIsInShouldWork() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where ruestvorgaenge in DEFAULT_RUESTVORGAENGE or UPDATED_RUESTVORGAENGE
        defaultArbeitsplatzShouldBeFound("ruestvorgaenge.in=" + DEFAULT_RUESTVORGAENGE + "," + UPDATED_RUESTVORGAENGE);

        // Get all the arbeitsplatzList where ruestvorgaenge equals to UPDATED_RUESTVORGAENGE
        defaultArbeitsplatzShouldNotBeFound("ruestvorgaenge.in=" + UPDATED_RUESTVORGAENGE);
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByRuestvorgaengeIsNullOrNotNull() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where ruestvorgaenge is not null
        defaultArbeitsplatzShouldBeFound("ruestvorgaenge.specified=true");

        // Get all the arbeitsplatzList where ruestvorgaenge is null
        defaultArbeitsplatzShouldNotBeFound("ruestvorgaenge.specified=false");
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByRuestvorgaengeIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where ruestvorgaenge greater than or equals to DEFAULT_RUESTVORGAENGE
        defaultArbeitsplatzShouldBeFound("ruestvorgaenge.greaterOrEqualThan=" + DEFAULT_RUESTVORGAENGE);

        // Get all the arbeitsplatzList where ruestvorgaenge greater than or equals to UPDATED_RUESTVORGAENGE
        defaultArbeitsplatzShouldNotBeFound("ruestvorgaenge.greaterOrEqualThan=" + UPDATED_RUESTVORGAENGE);
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByRuestvorgaengeIsLessThanSomething() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where ruestvorgaenge less than or equals to DEFAULT_RUESTVORGAENGE
        defaultArbeitsplatzShouldNotBeFound("ruestvorgaenge.lessThan=" + DEFAULT_RUESTVORGAENGE);

        // Get all the arbeitsplatzList where ruestvorgaenge less than or equals to UPDATED_RUESTVORGAENGE
        defaultArbeitsplatzShouldBeFound("ruestvorgaenge.lessThan=" + UPDATED_RUESTVORGAENGE);
    }


    @Test
    @Transactional
    public void getAllArbeitsplatzsByLeerzeitIsEqualToSomething() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where leerzeit equals to DEFAULT_LEERZEIT
        defaultArbeitsplatzShouldBeFound("leerzeit.equals=" + DEFAULT_LEERZEIT);

        // Get all the arbeitsplatzList where leerzeit equals to UPDATED_LEERZEIT
        defaultArbeitsplatzShouldNotBeFound("leerzeit.equals=" + UPDATED_LEERZEIT);
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByLeerzeitIsInShouldWork() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where leerzeit in DEFAULT_LEERZEIT or UPDATED_LEERZEIT
        defaultArbeitsplatzShouldBeFound("leerzeit.in=" + DEFAULT_LEERZEIT + "," + UPDATED_LEERZEIT);

        // Get all the arbeitsplatzList where leerzeit equals to UPDATED_LEERZEIT
        defaultArbeitsplatzShouldNotBeFound("leerzeit.in=" + UPDATED_LEERZEIT);
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByLeerzeitIsNullOrNotNull() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where leerzeit is not null
        defaultArbeitsplatzShouldBeFound("leerzeit.specified=true");

        // Get all the arbeitsplatzList where leerzeit is null
        defaultArbeitsplatzShouldNotBeFound("leerzeit.specified=false");
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByLohnleerkostenIsEqualToSomething() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where lohnleerkosten equals to DEFAULT_LOHNLEERKOSTEN
        defaultArbeitsplatzShouldBeFound("lohnleerkosten.equals=" + DEFAULT_LOHNLEERKOSTEN);

        // Get all the arbeitsplatzList where lohnleerkosten equals to UPDATED_LOHNLEERKOSTEN
        defaultArbeitsplatzShouldNotBeFound("lohnleerkosten.equals=" + UPDATED_LOHNLEERKOSTEN);
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByLohnleerkostenIsInShouldWork() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where lohnleerkosten in DEFAULT_LOHNLEERKOSTEN or UPDATED_LOHNLEERKOSTEN
        defaultArbeitsplatzShouldBeFound("lohnleerkosten.in=" + DEFAULT_LOHNLEERKOSTEN + "," + UPDATED_LOHNLEERKOSTEN);

        // Get all the arbeitsplatzList where lohnleerkosten equals to UPDATED_LOHNLEERKOSTEN
        defaultArbeitsplatzShouldNotBeFound("lohnleerkosten.in=" + UPDATED_LOHNLEERKOSTEN);
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByLohnleerkostenIsNullOrNotNull() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where lohnleerkosten is not null
        defaultArbeitsplatzShouldBeFound("lohnleerkosten.specified=true");

        // Get all the arbeitsplatzList where lohnleerkosten is null
        defaultArbeitsplatzShouldNotBeFound("lohnleerkosten.specified=false");
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByLohnkostenIsEqualToSomething() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where lohnkosten equals to DEFAULT_LOHNKOSTEN
        defaultArbeitsplatzShouldBeFound("lohnkosten.equals=" + DEFAULT_LOHNKOSTEN);

        // Get all the arbeitsplatzList where lohnkosten equals to UPDATED_LOHNKOSTEN
        defaultArbeitsplatzShouldNotBeFound("lohnkosten.equals=" + UPDATED_LOHNKOSTEN);
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByLohnkostenIsInShouldWork() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where lohnkosten in DEFAULT_LOHNKOSTEN or UPDATED_LOHNKOSTEN
        defaultArbeitsplatzShouldBeFound("lohnkosten.in=" + DEFAULT_LOHNKOSTEN + "," + UPDATED_LOHNKOSTEN);

        // Get all the arbeitsplatzList where lohnkosten equals to UPDATED_LOHNKOSTEN
        defaultArbeitsplatzShouldNotBeFound("lohnkosten.in=" + UPDATED_LOHNKOSTEN);
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByLohnkostenIsNullOrNotNull() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where lohnkosten is not null
        defaultArbeitsplatzShouldBeFound("lohnkosten.specified=true");

        // Get all the arbeitsplatzList where lohnkosten is null
        defaultArbeitsplatzShouldNotBeFound("lohnkosten.specified=false");
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByMaschinenstillstandkostenIsEqualToSomething() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where maschinenstillstandkosten equals to DEFAULT_MASCHINENSTILLSTANDKOSTEN
        defaultArbeitsplatzShouldBeFound("maschinenstillstandkosten.equals=" + DEFAULT_MASCHINENSTILLSTANDKOSTEN);

        // Get all the arbeitsplatzList where maschinenstillstandkosten equals to UPDATED_MASCHINENSTILLSTANDKOSTEN
        defaultArbeitsplatzShouldNotBeFound("maschinenstillstandkosten.equals=" + UPDATED_MASCHINENSTILLSTANDKOSTEN);
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByMaschinenstillstandkostenIsInShouldWork() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where maschinenstillstandkosten in DEFAULT_MASCHINENSTILLSTANDKOSTEN or UPDATED_MASCHINENSTILLSTANDKOSTEN
        defaultArbeitsplatzShouldBeFound("maschinenstillstandkosten.in=" + DEFAULT_MASCHINENSTILLSTANDKOSTEN + "," + UPDATED_MASCHINENSTILLSTANDKOSTEN);

        // Get all the arbeitsplatzList where maschinenstillstandkosten equals to UPDATED_MASCHINENSTILLSTANDKOSTEN
        defaultArbeitsplatzShouldNotBeFound("maschinenstillstandkosten.in=" + UPDATED_MASCHINENSTILLSTANDKOSTEN);
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByMaschinenstillstandkostenIsNullOrNotNull() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where maschinenstillstandkosten is not null
        defaultArbeitsplatzShouldBeFound("maschinenstillstandkosten.specified=true");

        // Get all the arbeitsplatzList where maschinenstillstandkosten is null
        defaultArbeitsplatzShouldNotBeFound("maschinenstillstandkosten.specified=false");
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByRestzeitbedarf_in_bearbeitungIsEqualToSomething() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where restzeitbedarf_in_bearbeitung equals to DEFAULT_RESTZEITBEDARF_IN_BEARBEITUNG
        defaultArbeitsplatzShouldBeFound("restzeitbedarf_in_bearbeitung.equals=" + DEFAULT_RESTZEITBEDARF_IN_BEARBEITUNG);

        // Get all the arbeitsplatzList where restzeitbedarf_in_bearbeitung equals to UPDATED_RESTZEITBEDARF_IN_BEARBEITUNG
        defaultArbeitsplatzShouldNotBeFound("restzeitbedarf_in_bearbeitung.equals=" + UPDATED_RESTZEITBEDARF_IN_BEARBEITUNG);
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByRestzeitbedarf_in_bearbeitungIsInShouldWork() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where restzeitbedarf_in_bearbeitung in DEFAULT_RESTZEITBEDARF_IN_BEARBEITUNG or UPDATED_RESTZEITBEDARF_IN_BEARBEITUNG
        defaultArbeitsplatzShouldBeFound("restzeitbedarf_in_bearbeitung.in=" + DEFAULT_RESTZEITBEDARF_IN_BEARBEITUNG + "," + UPDATED_RESTZEITBEDARF_IN_BEARBEITUNG);

        // Get all the arbeitsplatzList where restzeitbedarf_in_bearbeitung equals to UPDATED_RESTZEITBEDARF_IN_BEARBEITUNG
        defaultArbeitsplatzShouldNotBeFound("restzeitbedarf_in_bearbeitung.in=" + UPDATED_RESTZEITBEDARF_IN_BEARBEITUNG);
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByRestzeitbedarf_in_bearbeitungIsNullOrNotNull() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where restzeitbedarf_in_bearbeitung is not null
        defaultArbeitsplatzShouldBeFound("restzeitbedarf_in_bearbeitung.specified=true");

        // Get all the arbeitsplatzList where restzeitbedarf_in_bearbeitung is null
        defaultArbeitsplatzShouldNotBeFound("restzeitbedarf_in_bearbeitung.specified=false");
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsBySchichtIsEqualToSomething() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where schicht equals to DEFAULT_SCHICHT
        defaultArbeitsplatzShouldBeFound("schicht.equals=" + DEFAULT_SCHICHT);

        // Get all the arbeitsplatzList where schicht equals to UPDATED_SCHICHT
        defaultArbeitsplatzShouldNotBeFound("schicht.equals=" + UPDATED_SCHICHT);
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsBySchichtIsInShouldWork() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where schicht in DEFAULT_SCHICHT or UPDATED_SCHICHT
        defaultArbeitsplatzShouldBeFound("schicht.in=" + DEFAULT_SCHICHT + "," + UPDATED_SCHICHT);

        // Get all the arbeitsplatzList where schicht equals to UPDATED_SCHICHT
        defaultArbeitsplatzShouldNotBeFound("schicht.in=" + UPDATED_SCHICHT);
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsBySchichtIsNullOrNotNull() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where schicht is not null
        defaultArbeitsplatzShouldBeFound("schicht.specified=true");

        // Get all the arbeitsplatzList where schicht is null
        defaultArbeitsplatzShouldNotBeFound("schicht.specified=false");
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsBySchichtIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where schicht greater than or equals to DEFAULT_SCHICHT
        defaultArbeitsplatzShouldBeFound("schicht.greaterOrEqualThan=" + DEFAULT_SCHICHT);

        // Get all the arbeitsplatzList where schicht greater than or equals to (DEFAULT_SCHICHT + 1)
        defaultArbeitsplatzShouldNotBeFound("schicht.greaterOrEqualThan=" + (DEFAULT_SCHICHT + 1));
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsBySchichtIsLessThanSomething() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where schicht less than or equals to DEFAULT_SCHICHT
        defaultArbeitsplatzShouldNotBeFound("schicht.lessThan=" + DEFAULT_SCHICHT);

        // Get all the arbeitsplatzList where schicht less than or equals to (DEFAULT_SCHICHT + 1)
        defaultArbeitsplatzShouldBeFound("schicht.lessThan=" + (DEFAULT_SCHICHT + 1));
    }


    @Test
    @Transactional
    public void getAllArbeitsplatzsByUeberstundenIsEqualToSomething() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where ueberstunden equals to DEFAULT_UEBERSTUNDEN
        defaultArbeitsplatzShouldBeFound("ueberstunden.equals=" + DEFAULT_UEBERSTUNDEN);

        // Get all the arbeitsplatzList where ueberstunden equals to UPDATED_UEBERSTUNDEN
        defaultArbeitsplatzShouldNotBeFound("ueberstunden.equals=" + UPDATED_UEBERSTUNDEN);
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByUeberstundenIsInShouldWork() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where ueberstunden in DEFAULT_UEBERSTUNDEN or UPDATED_UEBERSTUNDEN
        defaultArbeitsplatzShouldBeFound("ueberstunden.in=" + DEFAULT_UEBERSTUNDEN + "," + UPDATED_UEBERSTUNDEN);

        // Get all the arbeitsplatzList where ueberstunden equals to UPDATED_UEBERSTUNDEN
        defaultArbeitsplatzShouldNotBeFound("ueberstunden.in=" + UPDATED_UEBERSTUNDEN);
    }

    @Test
    @Transactional
    public void getAllArbeitsplatzsByUeberstundenIsNullOrNotNull() throws Exception {
        // Initialize the database
        arbeitsplatzRepository.saveAndFlush(arbeitsplatz);

        // Get all the arbeitsplatzList where ueberstunden is not null
        defaultArbeitsplatzShouldBeFound("ueberstunden.specified=true");

        // Get all the arbeitsplatzList where ueberstunden is null
        defaultArbeitsplatzShouldNotBeFound("ueberstunden.specified=false");
    }
    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultArbeitsplatzShouldBeFound(String filter) throws Exception {
        restArbeitsplatzMockMvc.perform(get("/api/arbeitsplatzs?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(arbeitsplatz.getId().intValue())))
            .andExpect(jsonPath("$.[*].periode").value(hasItem(DEFAULT_PERIODE)))
            .andExpect(jsonPath("$.[*].nummer").value(hasItem(DEFAULT_NUMMER)))
            .andExpect(jsonPath("$.[*].restzeitbedarf").value(hasItem(DEFAULT_RESTZEITBEDARF.doubleValue())))
            .andExpect(jsonPath("$.[*].ruestvorgaenge").value(hasItem(DEFAULT_RUESTVORGAENGE)))
            .andExpect(jsonPath("$.[*].leerzeit").value(hasItem(DEFAULT_LEERZEIT.doubleValue())))
            .andExpect(jsonPath("$.[*].lohnleerkosten").value(hasItem(DEFAULT_LOHNLEERKOSTEN.doubleValue())))
            .andExpect(jsonPath("$.[*].lohnkosten").value(hasItem(DEFAULT_LOHNKOSTEN.doubleValue())))
            .andExpect(jsonPath("$.[*].maschinenstillstandkosten").value(hasItem(DEFAULT_MASCHINENSTILLSTANDKOSTEN.doubleValue())))
            .andExpect(jsonPath("$.[*].restzeitbedarf_in_bearbeitung").value(hasItem(DEFAULT_RESTZEITBEDARF_IN_BEARBEITUNG.doubleValue())))
            .andExpect(jsonPath("$.[*].schicht").value(hasItem(DEFAULT_SCHICHT)))
            .andExpect(jsonPath("$.[*].ueberstunden").value(hasItem(DEFAULT_UEBERSTUNDEN.doubleValue())));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultArbeitsplatzShouldNotBeFound(String filter) throws Exception {
        restArbeitsplatzMockMvc.perform(get("/api/arbeitsplatzs?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());
    }


    @Test
    @Transactional
    public void getNonExistingArbeitsplatz() throws Exception {
        // Get the arbeitsplatz
        restArbeitsplatzMockMvc.perform(get("/api/arbeitsplatzs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateArbeitsplatz() throws Exception {
        // Initialize the database
        arbeitsplatzService.save(arbeitsplatz);

        int databaseSizeBeforeUpdate = arbeitsplatzRepository.findAll().size();

        // Update the arbeitsplatz
        Arbeitsplatz updatedArbeitsplatz = arbeitsplatzRepository.findOne(arbeitsplatz.getId());
        updatedArbeitsplatz
            .periode(UPDATED_PERIODE)
            .nummer(UPDATED_NUMMER)
            .restzeitbedarf(UPDATED_RESTZEITBEDARF)
            .ruestvorgaenge(UPDATED_RUESTVORGAENGE)
            .leerzeit(UPDATED_LEERZEIT)
            .lohnleerkosten(UPDATED_LOHNLEERKOSTEN)
            .lohnkosten(UPDATED_LOHNKOSTEN)
            .maschinenstillstandkosten(UPDATED_MASCHINENSTILLSTANDKOSTEN)
            .restzeitbedarf_in_bearbeitung(UPDATED_RESTZEITBEDARF_IN_BEARBEITUNG)
            .schicht(UPDATED_SCHICHT)
            .ueberstunden(UPDATED_UEBERSTUNDEN);

        restArbeitsplatzMockMvc.perform(put("/api/arbeitsplatzs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedArbeitsplatz)))
            .andExpect(status().isOk());

        // Validate the Arbeitsplatz in the database
        List<Arbeitsplatz> arbeitsplatzList = arbeitsplatzRepository.findAll();
        assertThat(arbeitsplatzList).hasSize(databaseSizeBeforeUpdate);
        Arbeitsplatz testArbeitsplatz = arbeitsplatzList.get(arbeitsplatzList.size() - 1);
        assertThat(testArbeitsplatz.getPeriode()).isEqualTo(UPDATED_PERIODE);
        assertThat(testArbeitsplatz.getNummer()).isEqualTo(UPDATED_NUMMER);
        assertThat(testArbeitsplatz.getRestzeitbedarf()).isEqualTo(UPDATED_RESTZEITBEDARF);
        assertThat(testArbeitsplatz.getRuestvorgaenge()).isEqualTo(UPDATED_RUESTVORGAENGE);
        assertThat(testArbeitsplatz.getLeerzeit()).isEqualTo(UPDATED_LEERZEIT);
        assertThat(testArbeitsplatz.getLohnleerkosten()).isEqualTo(UPDATED_LOHNLEERKOSTEN);
        assertThat(testArbeitsplatz.getLohnkosten()).isEqualTo(UPDATED_LOHNKOSTEN);
        assertThat(testArbeitsplatz.getMaschinenstillstandkosten()).isEqualTo(UPDATED_MASCHINENSTILLSTANDKOSTEN);
        assertThat(testArbeitsplatz.getRestzeitbedarf_in_bearbeitung()).isEqualTo(UPDATED_RESTZEITBEDARF_IN_BEARBEITUNG);
        assertThat(testArbeitsplatz.getSchicht()).isEqualTo(UPDATED_SCHICHT);
        assertThat(testArbeitsplatz.getUeberstunden()).isEqualTo(UPDATED_UEBERSTUNDEN);
    }

    @Test
    @Transactional
    public void updateNonExistingArbeitsplatz() throws Exception {
        int databaseSizeBeforeUpdate = arbeitsplatzRepository.findAll().size();

        // Create the Arbeitsplatz

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restArbeitsplatzMockMvc.perform(put("/api/arbeitsplatzs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(arbeitsplatz)))
            .andExpect(status().isCreated());

        // Validate the Arbeitsplatz in the database
        List<Arbeitsplatz> arbeitsplatzList = arbeitsplatzRepository.findAll();
        assertThat(arbeitsplatzList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteArbeitsplatz() throws Exception {
        // Initialize the database
        arbeitsplatzService.save(arbeitsplatz);

        int databaseSizeBeforeDelete = arbeitsplatzRepository.findAll().size();

        // Get the arbeitsplatz
        restArbeitsplatzMockMvc.perform(delete("/api/arbeitsplatzs/{id}", arbeitsplatz.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Arbeitsplatz> arbeitsplatzList = arbeitsplatzRepository.findAll();
        assertThat(arbeitsplatzList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Arbeitsplatz.class);
        Arbeitsplatz arbeitsplatz1 = new Arbeitsplatz();
        arbeitsplatz1.setId(1L);
        Arbeitsplatz arbeitsplatz2 = new Arbeitsplatz();
        arbeitsplatz2.setId(arbeitsplatz1.getId());
        assertThat(arbeitsplatz1).isEqualTo(arbeitsplatz2);
        arbeitsplatz2.setId(2L);
        assertThat(arbeitsplatz1).isNotEqualTo(arbeitsplatz2);
        arbeitsplatz1.setId(null);
        assertThat(arbeitsplatz1).isNotEqualTo(arbeitsplatz2);
    }
}
