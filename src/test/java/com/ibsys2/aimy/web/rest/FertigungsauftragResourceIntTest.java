package com.ibsys2.aimy.web.rest;

import com.ibsys2.aimy.AimyApp;

import com.ibsys2.aimy.domain.Fertigungsauftrag;
import com.ibsys2.aimy.domain.Teil;
import com.ibsys2.aimy.repository.FertigungsauftragRepository;
import com.ibsys2.aimy.service.FertigungsauftragService;
import com.ibsys2.aimy.web.rest.errors.ExceptionTranslator;
import com.ibsys2.aimy.service.dto.FertigungsauftragCriteria;
import com.ibsys2.aimy.service.FertigungsauftragQueryService;

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

import com.ibsys2.aimy.domain.enumeration.Auftragstatus;
/**
 * Test class for the FertigungsauftragResource REST controller.
 *
 * @see FertigungsauftragResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AimyApp.class)
public class FertigungsauftragResourceIntTest {

    private static final Integer DEFAULT_PERIODE = 0;
    private static final Integer UPDATED_PERIODE = 1;

    private static final Integer DEFAULT_NUMMER = 0;
    private static final Integer UPDATED_NUMMER = 1;

    private static final Integer DEFAULT_AUFTRAGSMENGE = 0;
    private static final Integer UPDATED_AUFTRAGSMENGE = 1;

    private static final Double DEFAULT_KOSTEN = 0D;
    private static final Double UPDATED_KOSTEN = 1D;

    private static final Double DEFAULT_DURCHSCHNITTLICHESTUECKKOSTEN = 0D;
    private static final Double UPDATED_DURCHSCHNITTLICHESTUECKKOSTEN = 1D;

    private static final Auftragstatus DEFAULT_AUFTRAGSSTATUS = Auftragstatus.ANGEFANGEN;
    private static final Auftragstatus UPDATED_AUFTRAGSSTATUS = Auftragstatus.WARTEND;

    private static final String DEFAULT_BEGONNEN = "AAAAAAAAAA";
    private static final String UPDATED_BEGONNEN = "BBBBBBBBBB";

    private static final String DEFAULT_BEENDET = "AAAAAAAAAA";
    private static final String UPDATED_BEENDET = "BBBBBBBBBB";

    private static final Integer DEFAULT_DLZMINIMAL = 0;
    private static final Integer UPDATED_DLZMINIMAL = 1;

    private static final Double DEFAULT_DLZ_FAKTOR = 0D;
    private static final Double UPDATED_DLZ_FAKTOR = 1D;

    private static final Integer DEFAULT_BEARBEITUNGSZEITMIN = 0;
    private static final Integer UPDATED_BEARBEITUNGSZEITMIN = 1;

    private static final Integer DEFAULT_WARTELISTE_MENGE = 0;
    private static final Integer UPDATED_WARTELISTE_MENGE = 1;

    private static final Integer DEFAULT_IN_BEARBEITUNG_MENGE = 0;
    private static final Integer UPDATED_IN_BEARBEITUNG_MENGE = 1;

    @Autowired
    private FertigungsauftragRepository fertigungsauftragRepository;

    @Autowired
    private FertigungsauftragService fertigungsauftragService;

    @Autowired
    private FertigungsauftragQueryService fertigungsauftragQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFertigungsauftragMockMvc;

    private Fertigungsauftrag fertigungsauftrag;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FertigungsauftragResource fertigungsauftragResource = new FertigungsauftragResource(fertigungsauftragService, fertigungsauftragQueryService);
        this.restFertigungsauftragMockMvc = MockMvcBuilders.standaloneSetup(fertigungsauftragResource)
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
    public static Fertigungsauftrag createEntity(EntityManager em) {
        Fertigungsauftrag fertigungsauftrag = new Fertigungsauftrag()
            .periode(DEFAULT_PERIODE)
            .nummer(DEFAULT_NUMMER)
            .auftragsmenge(DEFAULT_AUFTRAGSMENGE)
            .kosten(DEFAULT_KOSTEN)
            .durchschnittlichestueckkosten(DEFAULT_DURCHSCHNITTLICHESTUECKKOSTEN)
            .auftragsstatus(DEFAULT_AUFTRAGSSTATUS)
            .begonnen(DEFAULT_BEGONNEN)
            .beendet(DEFAULT_BEENDET)
            .dlzminimal(DEFAULT_DLZMINIMAL)
            .dlzFaktor(DEFAULT_DLZ_FAKTOR)
            .bearbeitungszeitmin(DEFAULT_BEARBEITUNGSZEITMIN)
            .warteliste_menge(DEFAULT_WARTELISTE_MENGE)
            .inBearbeitung_menge(DEFAULT_IN_BEARBEITUNG_MENGE);
        return fertigungsauftrag;
    }

    @Before
    public void initTest() {
        fertigungsauftrag = createEntity(em);
    }

    @Test
    @Transactional
    public void createFertigungsauftrag() throws Exception {
        int databaseSizeBeforeCreate = fertigungsauftragRepository.findAll().size();

        // Create the Fertigungsauftrag
        restFertigungsauftragMockMvc.perform(post("/api/fertigungsauftrags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fertigungsauftrag)))
            .andExpect(status().isCreated());

        // Validate the Fertigungsauftrag in the database
        List<Fertigungsauftrag> fertigungsauftragList = fertigungsauftragRepository.findAll();
        assertThat(fertigungsauftragList).hasSize(databaseSizeBeforeCreate + 1);
        Fertigungsauftrag testFertigungsauftrag = fertigungsauftragList.get(fertigungsauftragList.size() - 1);
        assertThat(testFertigungsauftrag.getPeriode()).isEqualTo(DEFAULT_PERIODE);
        assertThat(testFertigungsauftrag.getNummer()).isEqualTo(DEFAULT_NUMMER);
        assertThat(testFertigungsauftrag.getAuftragsmenge()).isEqualTo(DEFAULT_AUFTRAGSMENGE);
        assertThat(testFertigungsauftrag.getKosten()).isEqualTo(DEFAULT_KOSTEN);
        assertThat(testFertigungsauftrag.getDurchschnittlichestueckkosten()).isEqualTo(DEFAULT_DURCHSCHNITTLICHESTUECKKOSTEN);
        assertThat(testFertigungsauftrag.getAuftragsstatus()).isEqualTo(DEFAULT_AUFTRAGSSTATUS);
        assertThat(testFertigungsauftrag.getBegonnen()).isEqualTo(DEFAULT_BEGONNEN);
        assertThat(testFertigungsauftrag.getBeendet()).isEqualTo(DEFAULT_BEENDET);
        assertThat(testFertigungsauftrag.getDlzminimal()).isEqualTo(DEFAULT_DLZMINIMAL);
        assertThat(testFertigungsauftrag.getDlzFaktor()).isEqualTo(DEFAULT_DLZ_FAKTOR);
        assertThat(testFertigungsauftrag.getBearbeitungszeitmin()).isEqualTo(DEFAULT_BEARBEITUNGSZEITMIN);
        assertThat(testFertigungsauftrag.getWarteliste_menge()).isEqualTo(DEFAULT_WARTELISTE_MENGE);
        assertThat(testFertigungsauftrag.getInBearbeitung_menge()).isEqualTo(DEFAULT_IN_BEARBEITUNG_MENGE);
    }

    @Test
    @Transactional
    public void createFertigungsauftragWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fertigungsauftragRepository.findAll().size();

        // Create the Fertigungsauftrag with an existing ID
        fertigungsauftrag.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFertigungsauftragMockMvc.perform(post("/api/fertigungsauftrags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fertigungsauftrag)))
            .andExpect(status().isBadRequest());

        // Validate the Fertigungsauftrag in the database
        List<Fertigungsauftrag> fertigungsauftragList = fertigungsauftragRepository.findAll();
        assertThat(fertigungsauftragList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkPeriodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = fertigungsauftragRepository.findAll().size();
        // set the field null
        fertigungsauftrag.setPeriode(null);

        // Create the Fertigungsauftrag, which fails.

        restFertigungsauftragMockMvc.perform(post("/api/fertigungsauftrags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fertigungsauftrag)))
            .andExpect(status().isBadRequest());

        List<Fertigungsauftrag> fertigungsauftragList = fertigungsauftragRepository.findAll();
        assertThat(fertigungsauftragList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNummerIsRequired() throws Exception {
        int databaseSizeBeforeTest = fertigungsauftragRepository.findAll().size();
        // set the field null
        fertigungsauftrag.setNummer(null);

        // Create the Fertigungsauftrag, which fails.

        restFertigungsauftragMockMvc.perform(post("/api/fertigungsauftrags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fertigungsauftrag)))
            .andExpect(status().isBadRequest());

        List<Fertigungsauftrag> fertigungsauftragList = fertigungsauftragRepository.findAll();
        assertThat(fertigungsauftragList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftrags() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList
        restFertigungsauftragMockMvc.perform(get("/api/fertigungsauftrags?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fertigungsauftrag.getId().intValue())))
            .andExpect(jsonPath("$.[*].periode").value(hasItem(DEFAULT_PERIODE)))
            .andExpect(jsonPath("$.[*].nummer").value(hasItem(DEFAULT_NUMMER)))
            .andExpect(jsonPath("$.[*].auftragsmenge").value(hasItem(DEFAULT_AUFTRAGSMENGE)))
            .andExpect(jsonPath("$.[*].kosten").value(hasItem(DEFAULT_KOSTEN.doubleValue())))
            .andExpect(jsonPath("$.[*].durchschnittlichestueckkosten").value(hasItem(DEFAULT_DURCHSCHNITTLICHESTUECKKOSTEN.doubleValue())))
            .andExpect(jsonPath("$.[*].auftragsstatus").value(hasItem(DEFAULT_AUFTRAGSSTATUS.toString())))
            .andExpect(jsonPath("$.[*].begonnen").value(hasItem(DEFAULT_BEGONNEN.toString())))
            .andExpect(jsonPath("$.[*].beendet").value(hasItem(DEFAULT_BEENDET.toString())))
            .andExpect(jsonPath("$.[*].dlzminimal").value(hasItem(DEFAULT_DLZMINIMAL)))
            .andExpect(jsonPath("$.[*].dlzFaktor").value(hasItem(DEFAULT_DLZ_FAKTOR.doubleValue())))
            .andExpect(jsonPath("$.[*].bearbeitungszeitmin").value(hasItem(DEFAULT_BEARBEITUNGSZEITMIN)))
            .andExpect(jsonPath("$.[*].warteliste_menge").value(hasItem(DEFAULT_WARTELISTE_MENGE)))
            .andExpect(jsonPath("$.[*].inBearbeitung_menge").value(hasItem(DEFAULT_IN_BEARBEITUNG_MENGE)));
    }

    @Test
    @Transactional
    public void getFertigungsauftrag() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get the fertigungsauftrag
        restFertigungsauftragMockMvc.perform(get("/api/fertigungsauftrags/{id}", fertigungsauftrag.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fertigungsauftrag.getId().intValue()))
            .andExpect(jsonPath("$.periode").value(DEFAULT_PERIODE))
            .andExpect(jsonPath("$.nummer").value(DEFAULT_NUMMER))
            .andExpect(jsonPath("$.auftragsmenge").value(DEFAULT_AUFTRAGSMENGE))
            .andExpect(jsonPath("$.kosten").value(DEFAULT_KOSTEN.doubleValue()))
            .andExpect(jsonPath("$.durchschnittlichestueckkosten").value(DEFAULT_DURCHSCHNITTLICHESTUECKKOSTEN.doubleValue()))
            .andExpect(jsonPath("$.auftragsstatus").value(DEFAULT_AUFTRAGSSTATUS.toString()))
            .andExpect(jsonPath("$.begonnen").value(DEFAULT_BEGONNEN.toString()))
            .andExpect(jsonPath("$.beendet").value(DEFAULT_BEENDET.toString()))
            .andExpect(jsonPath("$.dlzminimal").value(DEFAULT_DLZMINIMAL))
            .andExpect(jsonPath("$.dlzFaktor").value(DEFAULT_DLZ_FAKTOR.doubleValue()))
            .andExpect(jsonPath("$.bearbeitungszeitmin").value(DEFAULT_BEARBEITUNGSZEITMIN))
            .andExpect(jsonPath("$.warteliste_menge").value(DEFAULT_WARTELISTE_MENGE))
            .andExpect(jsonPath("$.inBearbeitung_menge").value(DEFAULT_IN_BEARBEITUNG_MENGE));
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByPeriodeIsEqualToSomething() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where periode equals to DEFAULT_PERIODE
        defaultFertigungsauftragShouldBeFound("periode.equals=" + DEFAULT_PERIODE);

        // Get all the fertigungsauftragList where periode equals to UPDATED_PERIODE
        defaultFertigungsauftragShouldNotBeFound("periode.equals=" + UPDATED_PERIODE);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByPeriodeIsInShouldWork() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where periode in DEFAULT_PERIODE or UPDATED_PERIODE
        defaultFertigungsauftragShouldBeFound("periode.in=" + DEFAULT_PERIODE + "," + UPDATED_PERIODE);

        // Get all the fertigungsauftragList where periode equals to UPDATED_PERIODE
        defaultFertigungsauftragShouldNotBeFound("periode.in=" + UPDATED_PERIODE);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByPeriodeIsNullOrNotNull() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where periode is not null
        defaultFertigungsauftragShouldBeFound("periode.specified=true");

        // Get all the fertigungsauftragList where periode is null
        defaultFertigungsauftragShouldNotBeFound("periode.specified=false");
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByPeriodeIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where periode greater than or equals to DEFAULT_PERIODE
        defaultFertigungsauftragShouldBeFound("periode.greaterOrEqualThan=" + DEFAULT_PERIODE);

        // Get all the fertigungsauftragList where periode greater than or equals to UPDATED_PERIODE
        defaultFertigungsauftragShouldNotBeFound("periode.greaterOrEqualThan=" + UPDATED_PERIODE);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByPeriodeIsLessThanSomething() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where periode less than or equals to DEFAULT_PERIODE
        defaultFertigungsauftragShouldNotBeFound("periode.lessThan=" + DEFAULT_PERIODE);

        // Get all the fertigungsauftragList where periode less than or equals to UPDATED_PERIODE
        defaultFertigungsauftragShouldBeFound("periode.lessThan=" + UPDATED_PERIODE);
    }


    @Test
    @Transactional
    public void getAllFertigungsauftragsByNummerIsEqualToSomething() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where nummer equals to DEFAULT_NUMMER
        defaultFertigungsauftragShouldBeFound("nummer.equals=" + DEFAULT_NUMMER);

        // Get all the fertigungsauftragList where nummer equals to UPDATED_NUMMER
        defaultFertigungsauftragShouldNotBeFound("nummer.equals=" + UPDATED_NUMMER);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByNummerIsInShouldWork() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where nummer in DEFAULT_NUMMER or UPDATED_NUMMER
        defaultFertigungsauftragShouldBeFound("nummer.in=" + DEFAULT_NUMMER + "," + UPDATED_NUMMER);

        // Get all the fertigungsauftragList where nummer equals to UPDATED_NUMMER
        defaultFertigungsauftragShouldNotBeFound("nummer.in=" + UPDATED_NUMMER);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByNummerIsNullOrNotNull() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where nummer is not null
        defaultFertigungsauftragShouldBeFound("nummer.specified=true");

        // Get all the fertigungsauftragList where nummer is null
        defaultFertigungsauftragShouldNotBeFound("nummer.specified=false");
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByNummerIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where nummer greater than or equals to DEFAULT_NUMMER
        defaultFertigungsauftragShouldBeFound("nummer.greaterOrEqualThan=" + DEFAULT_NUMMER);

        // Get all the fertigungsauftragList where nummer greater than or equals to UPDATED_NUMMER
        defaultFertigungsauftragShouldNotBeFound("nummer.greaterOrEqualThan=" + UPDATED_NUMMER);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByNummerIsLessThanSomething() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where nummer less than or equals to DEFAULT_NUMMER
        defaultFertigungsauftragShouldNotBeFound("nummer.lessThan=" + DEFAULT_NUMMER);

        // Get all the fertigungsauftragList where nummer less than or equals to UPDATED_NUMMER
        defaultFertigungsauftragShouldBeFound("nummer.lessThan=" + UPDATED_NUMMER);
    }


    @Test
    @Transactional
    public void getAllFertigungsauftragsByAuftragsmengeIsEqualToSomething() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where auftragsmenge equals to DEFAULT_AUFTRAGSMENGE
        defaultFertigungsauftragShouldBeFound("auftragsmenge.equals=" + DEFAULT_AUFTRAGSMENGE);

        // Get all the fertigungsauftragList where auftragsmenge equals to UPDATED_AUFTRAGSMENGE
        defaultFertigungsauftragShouldNotBeFound("auftragsmenge.equals=" + UPDATED_AUFTRAGSMENGE);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByAuftragsmengeIsInShouldWork() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where auftragsmenge in DEFAULT_AUFTRAGSMENGE or UPDATED_AUFTRAGSMENGE
        defaultFertigungsauftragShouldBeFound("auftragsmenge.in=" + DEFAULT_AUFTRAGSMENGE + "," + UPDATED_AUFTRAGSMENGE);

        // Get all the fertigungsauftragList where auftragsmenge equals to UPDATED_AUFTRAGSMENGE
        defaultFertigungsauftragShouldNotBeFound("auftragsmenge.in=" + UPDATED_AUFTRAGSMENGE);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByAuftragsmengeIsNullOrNotNull() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where auftragsmenge is not null
        defaultFertigungsauftragShouldBeFound("auftragsmenge.specified=true");

        // Get all the fertigungsauftragList where auftragsmenge is null
        defaultFertigungsauftragShouldNotBeFound("auftragsmenge.specified=false");
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByAuftragsmengeIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where auftragsmenge greater than or equals to DEFAULT_AUFTRAGSMENGE
        defaultFertigungsauftragShouldBeFound("auftragsmenge.greaterOrEqualThan=" + DEFAULT_AUFTRAGSMENGE);

        // Get all the fertigungsauftragList where auftragsmenge greater than or equals to UPDATED_AUFTRAGSMENGE
        defaultFertigungsauftragShouldNotBeFound("auftragsmenge.greaterOrEqualThan=" + UPDATED_AUFTRAGSMENGE);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByAuftragsmengeIsLessThanSomething() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where auftragsmenge less than or equals to DEFAULT_AUFTRAGSMENGE
        defaultFertigungsauftragShouldNotBeFound("auftragsmenge.lessThan=" + DEFAULT_AUFTRAGSMENGE);

        // Get all the fertigungsauftragList where auftragsmenge less than or equals to UPDATED_AUFTRAGSMENGE
        defaultFertigungsauftragShouldBeFound("auftragsmenge.lessThan=" + UPDATED_AUFTRAGSMENGE);
    }


    @Test
    @Transactional
    public void getAllFertigungsauftragsByKostenIsEqualToSomething() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where kosten equals to DEFAULT_KOSTEN
        defaultFertigungsauftragShouldBeFound("kosten.equals=" + DEFAULT_KOSTEN);

        // Get all the fertigungsauftragList where kosten equals to UPDATED_KOSTEN
        defaultFertigungsauftragShouldNotBeFound("kosten.equals=" + UPDATED_KOSTEN);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByKostenIsInShouldWork() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where kosten in DEFAULT_KOSTEN or UPDATED_KOSTEN
        defaultFertigungsauftragShouldBeFound("kosten.in=" + DEFAULT_KOSTEN + "," + UPDATED_KOSTEN);

        // Get all the fertigungsauftragList where kosten equals to UPDATED_KOSTEN
        defaultFertigungsauftragShouldNotBeFound("kosten.in=" + UPDATED_KOSTEN);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByKostenIsNullOrNotNull() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where kosten is not null
        defaultFertigungsauftragShouldBeFound("kosten.specified=true");

        // Get all the fertigungsauftragList where kosten is null
        defaultFertigungsauftragShouldNotBeFound("kosten.specified=false");
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByDurchschnittlichestueckkostenIsEqualToSomething() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where durchschnittlichestueckkosten equals to DEFAULT_DURCHSCHNITTLICHESTUECKKOSTEN
        defaultFertigungsauftragShouldBeFound("durchschnittlichestueckkosten.equals=" + DEFAULT_DURCHSCHNITTLICHESTUECKKOSTEN);

        // Get all the fertigungsauftragList where durchschnittlichestueckkosten equals to UPDATED_DURCHSCHNITTLICHESTUECKKOSTEN
        defaultFertigungsauftragShouldNotBeFound("durchschnittlichestueckkosten.equals=" + UPDATED_DURCHSCHNITTLICHESTUECKKOSTEN);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByDurchschnittlichestueckkostenIsInShouldWork() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where durchschnittlichestueckkosten in DEFAULT_DURCHSCHNITTLICHESTUECKKOSTEN or UPDATED_DURCHSCHNITTLICHESTUECKKOSTEN
        defaultFertigungsauftragShouldBeFound("durchschnittlichestueckkosten.in=" + DEFAULT_DURCHSCHNITTLICHESTUECKKOSTEN + "," + UPDATED_DURCHSCHNITTLICHESTUECKKOSTEN);

        // Get all the fertigungsauftragList where durchschnittlichestueckkosten equals to UPDATED_DURCHSCHNITTLICHESTUECKKOSTEN
        defaultFertigungsauftragShouldNotBeFound("durchschnittlichestueckkosten.in=" + UPDATED_DURCHSCHNITTLICHESTUECKKOSTEN);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByDurchschnittlichestueckkostenIsNullOrNotNull() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where durchschnittlichestueckkosten is not null
        defaultFertigungsauftragShouldBeFound("durchschnittlichestueckkosten.specified=true");

        // Get all the fertigungsauftragList where durchschnittlichestueckkosten is null
        defaultFertigungsauftragShouldNotBeFound("durchschnittlichestueckkosten.specified=false");
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByAuftragsstatusIsEqualToSomething() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where auftragsstatus equals to DEFAULT_AUFTRAGSSTATUS
        defaultFertigungsauftragShouldBeFound("auftragsstatus.equals=" + DEFAULT_AUFTRAGSSTATUS);

        // Get all the fertigungsauftragList where auftragsstatus equals to UPDATED_AUFTRAGSSTATUS
        defaultFertigungsauftragShouldNotBeFound("auftragsstatus.equals=" + UPDATED_AUFTRAGSSTATUS);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByAuftragsstatusIsInShouldWork() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where auftragsstatus in DEFAULT_AUFTRAGSSTATUS or UPDATED_AUFTRAGSSTATUS
        defaultFertigungsauftragShouldBeFound("auftragsstatus.in=" + DEFAULT_AUFTRAGSSTATUS + "," + UPDATED_AUFTRAGSSTATUS);

        // Get all the fertigungsauftragList where auftragsstatus equals to UPDATED_AUFTRAGSSTATUS
        defaultFertigungsauftragShouldNotBeFound("auftragsstatus.in=" + UPDATED_AUFTRAGSSTATUS);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByAuftragsstatusIsNullOrNotNull() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where auftragsstatus is not null
        defaultFertigungsauftragShouldBeFound("auftragsstatus.specified=true");

        // Get all the fertigungsauftragList where auftragsstatus is null
        defaultFertigungsauftragShouldNotBeFound("auftragsstatus.specified=false");
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByBegonnenIsEqualToSomething() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where begonnen equals to DEFAULT_BEGONNEN
        defaultFertigungsauftragShouldBeFound("begonnen.equals=" + DEFAULT_BEGONNEN);

        // Get all the fertigungsauftragList where begonnen equals to UPDATED_BEGONNEN
        defaultFertigungsauftragShouldNotBeFound("begonnen.equals=" + UPDATED_BEGONNEN);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByBegonnenIsInShouldWork() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where begonnen in DEFAULT_BEGONNEN or UPDATED_BEGONNEN
        defaultFertigungsauftragShouldBeFound("begonnen.in=" + DEFAULT_BEGONNEN + "," + UPDATED_BEGONNEN);

        // Get all the fertigungsauftragList where begonnen equals to UPDATED_BEGONNEN
        defaultFertigungsauftragShouldNotBeFound("begonnen.in=" + UPDATED_BEGONNEN);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByBegonnenIsNullOrNotNull() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where begonnen is not null
        defaultFertigungsauftragShouldBeFound("begonnen.specified=true");

        // Get all the fertigungsauftragList where begonnen is null
        defaultFertigungsauftragShouldNotBeFound("begonnen.specified=false");
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByBeendetIsEqualToSomething() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where beendet equals to DEFAULT_BEENDET
        defaultFertigungsauftragShouldBeFound("beendet.equals=" + DEFAULT_BEENDET);

        // Get all the fertigungsauftragList where beendet equals to UPDATED_BEENDET
        defaultFertigungsauftragShouldNotBeFound("beendet.equals=" + UPDATED_BEENDET);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByBeendetIsInShouldWork() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where beendet in DEFAULT_BEENDET or UPDATED_BEENDET
        defaultFertigungsauftragShouldBeFound("beendet.in=" + DEFAULT_BEENDET + "," + UPDATED_BEENDET);

        // Get all the fertigungsauftragList where beendet equals to UPDATED_BEENDET
        defaultFertigungsauftragShouldNotBeFound("beendet.in=" + UPDATED_BEENDET);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByBeendetIsNullOrNotNull() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where beendet is not null
        defaultFertigungsauftragShouldBeFound("beendet.specified=true");

        // Get all the fertigungsauftragList where beendet is null
        defaultFertigungsauftragShouldNotBeFound("beendet.specified=false");
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByDlzminimalIsEqualToSomething() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where dlzminimal equals to DEFAULT_DLZMINIMAL
        defaultFertigungsauftragShouldBeFound("dlzminimal.equals=" + DEFAULT_DLZMINIMAL);

        // Get all the fertigungsauftragList where dlzminimal equals to UPDATED_DLZMINIMAL
        defaultFertigungsauftragShouldNotBeFound("dlzminimal.equals=" + UPDATED_DLZMINIMAL);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByDlzminimalIsInShouldWork() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where dlzminimal in DEFAULT_DLZMINIMAL or UPDATED_DLZMINIMAL
        defaultFertigungsauftragShouldBeFound("dlzminimal.in=" + DEFAULT_DLZMINIMAL + "," + UPDATED_DLZMINIMAL);

        // Get all the fertigungsauftragList where dlzminimal equals to UPDATED_DLZMINIMAL
        defaultFertigungsauftragShouldNotBeFound("dlzminimal.in=" + UPDATED_DLZMINIMAL);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByDlzminimalIsNullOrNotNull() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where dlzminimal is not null
        defaultFertigungsauftragShouldBeFound("dlzminimal.specified=true");

        // Get all the fertigungsauftragList where dlzminimal is null
        defaultFertigungsauftragShouldNotBeFound("dlzminimal.specified=false");
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByDlzminimalIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where dlzminimal greater than or equals to DEFAULT_DLZMINIMAL
        defaultFertigungsauftragShouldBeFound("dlzminimal.greaterOrEqualThan=" + DEFAULT_DLZMINIMAL);

        // Get all the fertigungsauftragList where dlzminimal greater than or equals to UPDATED_DLZMINIMAL
        defaultFertigungsauftragShouldNotBeFound("dlzminimal.greaterOrEqualThan=" + UPDATED_DLZMINIMAL);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByDlzminimalIsLessThanSomething() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where dlzminimal less than or equals to DEFAULT_DLZMINIMAL
        defaultFertigungsauftragShouldNotBeFound("dlzminimal.lessThan=" + DEFAULT_DLZMINIMAL);

        // Get all the fertigungsauftragList where dlzminimal less than or equals to UPDATED_DLZMINIMAL
        defaultFertigungsauftragShouldBeFound("dlzminimal.lessThan=" + UPDATED_DLZMINIMAL);
    }


    @Test
    @Transactional
    public void getAllFertigungsauftragsByDlzFaktorIsEqualToSomething() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where dlzFaktor equals to DEFAULT_DLZ_FAKTOR
        defaultFertigungsauftragShouldBeFound("dlzFaktor.equals=" + DEFAULT_DLZ_FAKTOR);

        // Get all the fertigungsauftragList where dlzFaktor equals to UPDATED_DLZ_FAKTOR
        defaultFertigungsauftragShouldNotBeFound("dlzFaktor.equals=" + UPDATED_DLZ_FAKTOR);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByDlzFaktorIsInShouldWork() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where dlzFaktor in DEFAULT_DLZ_FAKTOR or UPDATED_DLZ_FAKTOR
        defaultFertigungsauftragShouldBeFound("dlzFaktor.in=" + DEFAULT_DLZ_FAKTOR + "," + UPDATED_DLZ_FAKTOR);

        // Get all the fertigungsauftragList where dlzFaktor equals to UPDATED_DLZ_FAKTOR
        defaultFertigungsauftragShouldNotBeFound("dlzFaktor.in=" + UPDATED_DLZ_FAKTOR);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByDlzFaktorIsNullOrNotNull() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where dlzFaktor is not null
        defaultFertigungsauftragShouldBeFound("dlzFaktor.specified=true");

        // Get all the fertigungsauftragList where dlzFaktor is null
        defaultFertigungsauftragShouldNotBeFound("dlzFaktor.specified=false");
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByBearbeitungszeitminIsEqualToSomething() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where bearbeitungszeitmin equals to DEFAULT_BEARBEITUNGSZEITMIN
        defaultFertigungsauftragShouldBeFound("bearbeitungszeitmin.equals=" + DEFAULT_BEARBEITUNGSZEITMIN);

        // Get all the fertigungsauftragList where bearbeitungszeitmin equals to UPDATED_BEARBEITUNGSZEITMIN
        defaultFertigungsauftragShouldNotBeFound("bearbeitungszeitmin.equals=" + UPDATED_BEARBEITUNGSZEITMIN);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByBearbeitungszeitminIsInShouldWork() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where bearbeitungszeitmin in DEFAULT_BEARBEITUNGSZEITMIN or UPDATED_BEARBEITUNGSZEITMIN
        defaultFertigungsauftragShouldBeFound("bearbeitungszeitmin.in=" + DEFAULT_BEARBEITUNGSZEITMIN + "," + UPDATED_BEARBEITUNGSZEITMIN);

        // Get all the fertigungsauftragList where bearbeitungszeitmin equals to UPDATED_BEARBEITUNGSZEITMIN
        defaultFertigungsauftragShouldNotBeFound("bearbeitungszeitmin.in=" + UPDATED_BEARBEITUNGSZEITMIN);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByBearbeitungszeitminIsNullOrNotNull() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where bearbeitungszeitmin is not null
        defaultFertigungsauftragShouldBeFound("bearbeitungszeitmin.specified=true");

        // Get all the fertigungsauftragList where bearbeitungszeitmin is null
        defaultFertigungsauftragShouldNotBeFound("bearbeitungszeitmin.specified=false");
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByBearbeitungszeitminIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where bearbeitungszeitmin greater than or equals to DEFAULT_BEARBEITUNGSZEITMIN
        defaultFertigungsauftragShouldBeFound("bearbeitungszeitmin.greaterOrEqualThan=" + DEFAULT_BEARBEITUNGSZEITMIN);

        // Get all the fertigungsauftragList where bearbeitungszeitmin greater than or equals to UPDATED_BEARBEITUNGSZEITMIN
        defaultFertigungsauftragShouldNotBeFound("bearbeitungszeitmin.greaterOrEqualThan=" + UPDATED_BEARBEITUNGSZEITMIN);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByBearbeitungszeitminIsLessThanSomething() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where bearbeitungszeitmin less than or equals to DEFAULT_BEARBEITUNGSZEITMIN
        defaultFertigungsauftragShouldNotBeFound("bearbeitungszeitmin.lessThan=" + DEFAULT_BEARBEITUNGSZEITMIN);

        // Get all the fertigungsauftragList where bearbeitungszeitmin less than or equals to UPDATED_BEARBEITUNGSZEITMIN
        defaultFertigungsauftragShouldBeFound("bearbeitungszeitmin.lessThan=" + UPDATED_BEARBEITUNGSZEITMIN);
    }


    @Test
    @Transactional
    public void getAllFertigungsauftragsByWarteliste_mengeIsEqualToSomething() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where warteliste_menge equals to DEFAULT_WARTELISTE_MENGE
        defaultFertigungsauftragShouldBeFound("warteliste_menge.equals=" + DEFAULT_WARTELISTE_MENGE);

        // Get all the fertigungsauftragList where warteliste_menge equals to UPDATED_WARTELISTE_MENGE
        defaultFertigungsauftragShouldNotBeFound("warteliste_menge.equals=" + UPDATED_WARTELISTE_MENGE);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByWarteliste_mengeIsInShouldWork() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where warteliste_menge in DEFAULT_WARTELISTE_MENGE or UPDATED_WARTELISTE_MENGE
        defaultFertigungsauftragShouldBeFound("warteliste_menge.in=" + DEFAULT_WARTELISTE_MENGE + "," + UPDATED_WARTELISTE_MENGE);

        // Get all the fertigungsauftragList where warteliste_menge equals to UPDATED_WARTELISTE_MENGE
        defaultFertigungsauftragShouldNotBeFound("warteliste_menge.in=" + UPDATED_WARTELISTE_MENGE);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByWarteliste_mengeIsNullOrNotNull() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where warteliste_menge is not null
        defaultFertigungsauftragShouldBeFound("warteliste_menge.specified=true");

        // Get all the fertigungsauftragList where warteliste_menge is null
        defaultFertigungsauftragShouldNotBeFound("warteliste_menge.specified=false");
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByWarteliste_mengeIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where warteliste_menge greater than or equals to DEFAULT_WARTELISTE_MENGE
        defaultFertigungsauftragShouldBeFound("warteliste_menge.greaterOrEqualThan=" + DEFAULT_WARTELISTE_MENGE);

        // Get all the fertigungsauftragList where warteliste_menge greater than or equals to UPDATED_WARTELISTE_MENGE
        defaultFertigungsauftragShouldNotBeFound("warteliste_menge.greaterOrEqualThan=" + UPDATED_WARTELISTE_MENGE);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByWarteliste_mengeIsLessThanSomething() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where warteliste_menge less than or equals to DEFAULT_WARTELISTE_MENGE
        defaultFertigungsauftragShouldNotBeFound("warteliste_menge.lessThan=" + DEFAULT_WARTELISTE_MENGE);

        // Get all the fertigungsauftragList where warteliste_menge less than or equals to UPDATED_WARTELISTE_MENGE
        defaultFertigungsauftragShouldBeFound("warteliste_menge.lessThan=" + UPDATED_WARTELISTE_MENGE);
    }


    @Test
    @Transactional
    public void getAllFertigungsauftragsByInBearbeitung_mengeIsEqualToSomething() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where inBearbeitung_menge equals to DEFAULT_IN_BEARBEITUNG_MENGE
        defaultFertigungsauftragShouldBeFound("inBearbeitung_menge.equals=" + DEFAULT_IN_BEARBEITUNG_MENGE);

        // Get all the fertigungsauftragList where inBearbeitung_menge equals to UPDATED_IN_BEARBEITUNG_MENGE
        defaultFertigungsauftragShouldNotBeFound("inBearbeitung_menge.equals=" + UPDATED_IN_BEARBEITUNG_MENGE);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByInBearbeitung_mengeIsInShouldWork() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where inBearbeitung_menge in DEFAULT_IN_BEARBEITUNG_MENGE or UPDATED_IN_BEARBEITUNG_MENGE
        defaultFertigungsauftragShouldBeFound("inBearbeitung_menge.in=" + DEFAULT_IN_BEARBEITUNG_MENGE + "," + UPDATED_IN_BEARBEITUNG_MENGE);

        // Get all the fertigungsauftragList where inBearbeitung_menge equals to UPDATED_IN_BEARBEITUNG_MENGE
        defaultFertigungsauftragShouldNotBeFound("inBearbeitung_menge.in=" + UPDATED_IN_BEARBEITUNG_MENGE);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByInBearbeitung_mengeIsNullOrNotNull() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where inBearbeitung_menge is not null
        defaultFertigungsauftragShouldBeFound("inBearbeitung_menge.specified=true");

        // Get all the fertigungsauftragList where inBearbeitung_menge is null
        defaultFertigungsauftragShouldNotBeFound("inBearbeitung_menge.specified=false");
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByInBearbeitung_mengeIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where inBearbeitung_menge greater than or equals to DEFAULT_IN_BEARBEITUNG_MENGE
        defaultFertigungsauftragShouldBeFound("inBearbeitung_menge.greaterOrEqualThan=" + DEFAULT_IN_BEARBEITUNG_MENGE);

        // Get all the fertigungsauftragList where inBearbeitung_menge greater than or equals to UPDATED_IN_BEARBEITUNG_MENGE
        defaultFertigungsauftragShouldNotBeFound("inBearbeitung_menge.greaterOrEqualThan=" + UPDATED_IN_BEARBEITUNG_MENGE);
    }

    @Test
    @Transactional
    public void getAllFertigungsauftragsByInBearbeitung_mengeIsLessThanSomething() throws Exception {
        // Initialize the database
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);

        // Get all the fertigungsauftragList where inBearbeitung_menge less than or equals to DEFAULT_IN_BEARBEITUNG_MENGE
        defaultFertigungsauftragShouldNotBeFound("inBearbeitung_menge.lessThan=" + DEFAULT_IN_BEARBEITUNG_MENGE);

        // Get all the fertigungsauftragList where inBearbeitung_menge less than or equals to UPDATED_IN_BEARBEITUNG_MENGE
        defaultFertigungsauftragShouldBeFound("inBearbeitung_menge.lessThan=" + UPDATED_IN_BEARBEITUNG_MENGE);
    }


    @Test
    @Transactional
    public void getAllFertigungsauftragsByHerstellteilIsEqualToSomething() throws Exception {
        // Initialize the database
        Teil herstellteil = TeilResourceIntTest.createEntity(em);
        em.persist(herstellteil);
        em.flush();
        fertigungsauftrag.setHerstellteil(herstellteil);
        fertigungsauftragRepository.saveAndFlush(fertigungsauftrag);
        Long herstellteilId = herstellteil.getId();

        // Get all the fertigungsauftragList where herstellteil equals to herstellteilId
        defaultFertigungsauftragShouldBeFound("herstellteilId.equals=" + herstellteilId);

        // Get all the fertigungsauftragList where herstellteil equals to herstellteilId + 1
        defaultFertigungsauftragShouldNotBeFound("herstellteilId.equals=" + (herstellteilId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultFertigungsauftragShouldBeFound(String filter) throws Exception {
        restFertigungsauftragMockMvc.perform(get("/api/fertigungsauftrags?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fertigungsauftrag.getId().intValue())))
            .andExpect(jsonPath("$.[*].periode").value(hasItem(DEFAULT_PERIODE)))
            .andExpect(jsonPath("$.[*].nummer").value(hasItem(DEFAULT_NUMMER)))
            .andExpect(jsonPath("$.[*].auftragsmenge").value(hasItem(DEFAULT_AUFTRAGSMENGE)))
            .andExpect(jsonPath("$.[*].kosten").value(hasItem(DEFAULT_KOSTEN.doubleValue())))
            .andExpect(jsonPath("$.[*].durchschnittlichestueckkosten").value(hasItem(DEFAULT_DURCHSCHNITTLICHESTUECKKOSTEN.doubleValue())))
            .andExpect(jsonPath("$.[*].auftragsstatus").value(hasItem(DEFAULT_AUFTRAGSSTATUS.toString())))
            .andExpect(jsonPath("$.[*].begonnen").value(hasItem(DEFAULT_BEGONNEN.toString())))
            .andExpect(jsonPath("$.[*].beendet").value(hasItem(DEFAULT_BEENDET.toString())))
            .andExpect(jsonPath("$.[*].dlzminimal").value(hasItem(DEFAULT_DLZMINIMAL)))
            .andExpect(jsonPath("$.[*].dlzFaktor").value(hasItem(DEFAULT_DLZ_FAKTOR.doubleValue())))
            .andExpect(jsonPath("$.[*].bearbeitungszeitmin").value(hasItem(DEFAULT_BEARBEITUNGSZEITMIN)))
            .andExpect(jsonPath("$.[*].warteliste_menge").value(hasItem(DEFAULT_WARTELISTE_MENGE)))
            .andExpect(jsonPath("$.[*].inBearbeitung_menge").value(hasItem(DEFAULT_IN_BEARBEITUNG_MENGE)));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultFertigungsauftragShouldNotBeFound(String filter) throws Exception {
        restFertigungsauftragMockMvc.perform(get("/api/fertigungsauftrags?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());
    }


    @Test
    @Transactional
    public void getNonExistingFertigungsauftrag() throws Exception {
        // Get the fertigungsauftrag
        restFertigungsauftragMockMvc.perform(get("/api/fertigungsauftrags/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFertigungsauftrag() throws Exception {
        // Initialize the database
        fertigungsauftragService.save(fertigungsauftrag);

        int databaseSizeBeforeUpdate = fertigungsauftragRepository.findAll().size();

        // Update the fertigungsauftrag
        Fertigungsauftrag updatedFertigungsauftrag = fertigungsauftragRepository.findOne(fertigungsauftrag.getId());
        updatedFertigungsauftrag
            .periode(UPDATED_PERIODE)
            .nummer(UPDATED_NUMMER)
            .auftragsmenge(UPDATED_AUFTRAGSMENGE)
            .kosten(UPDATED_KOSTEN)
            .durchschnittlichestueckkosten(UPDATED_DURCHSCHNITTLICHESTUECKKOSTEN)
            .auftragsstatus(UPDATED_AUFTRAGSSTATUS)
            .begonnen(UPDATED_BEGONNEN)
            .beendet(UPDATED_BEENDET)
            .dlzminimal(UPDATED_DLZMINIMAL)
            .dlzFaktor(UPDATED_DLZ_FAKTOR)
            .bearbeitungszeitmin(UPDATED_BEARBEITUNGSZEITMIN)
            .warteliste_menge(UPDATED_WARTELISTE_MENGE)
            .inBearbeitung_menge(UPDATED_IN_BEARBEITUNG_MENGE);

        restFertigungsauftragMockMvc.perform(put("/api/fertigungsauftrags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFertigungsauftrag)))
            .andExpect(status().isOk());

        // Validate the Fertigungsauftrag in the database
        List<Fertigungsauftrag> fertigungsauftragList = fertigungsauftragRepository.findAll();
        assertThat(fertigungsauftragList).hasSize(databaseSizeBeforeUpdate);
        Fertigungsauftrag testFertigungsauftrag = fertigungsauftragList.get(fertigungsauftragList.size() - 1);
        assertThat(testFertigungsauftrag.getPeriode()).isEqualTo(UPDATED_PERIODE);
        assertThat(testFertigungsauftrag.getNummer()).isEqualTo(UPDATED_NUMMER);
        assertThat(testFertigungsauftrag.getAuftragsmenge()).isEqualTo(UPDATED_AUFTRAGSMENGE);
        assertThat(testFertigungsauftrag.getKosten()).isEqualTo(UPDATED_KOSTEN);
        assertThat(testFertigungsauftrag.getDurchschnittlichestueckkosten()).isEqualTo(UPDATED_DURCHSCHNITTLICHESTUECKKOSTEN);
        assertThat(testFertigungsauftrag.getAuftragsstatus()).isEqualTo(UPDATED_AUFTRAGSSTATUS);
        assertThat(testFertigungsauftrag.getBegonnen()).isEqualTo(UPDATED_BEGONNEN);
        assertThat(testFertigungsauftrag.getBeendet()).isEqualTo(UPDATED_BEENDET);
        assertThat(testFertigungsauftrag.getDlzminimal()).isEqualTo(UPDATED_DLZMINIMAL);
        assertThat(testFertigungsauftrag.getDlzFaktor()).isEqualTo(UPDATED_DLZ_FAKTOR);
        assertThat(testFertigungsauftrag.getBearbeitungszeitmin()).isEqualTo(UPDATED_BEARBEITUNGSZEITMIN);
        assertThat(testFertigungsauftrag.getWarteliste_menge()).isEqualTo(UPDATED_WARTELISTE_MENGE);
        assertThat(testFertigungsauftrag.getInBearbeitung_menge()).isEqualTo(UPDATED_IN_BEARBEITUNG_MENGE);
    }

    @Test
    @Transactional
    public void updateNonExistingFertigungsauftrag() throws Exception {
        int databaseSizeBeforeUpdate = fertigungsauftragRepository.findAll().size();

        // Create the Fertigungsauftrag

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFertigungsauftragMockMvc.perform(put("/api/fertigungsauftrags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fertigungsauftrag)))
            .andExpect(status().isCreated());

        // Validate the Fertigungsauftrag in the database
        List<Fertigungsauftrag> fertigungsauftragList = fertigungsauftragRepository.findAll();
        assertThat(fertigungsauftragList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFertigungsauftrag() throws Exception {
        // Initialize the database
        fertigungsauftragService.save(fertigungsauftrag);

        int databaseSizeBeforeDelete = fertigungsauftragRepository.findAll().size();

        // Get the fertigungsauftrag
        restFertigungsauftragMockMvc.perform(delete("/api/fertigungsauftrags/{id}", fertigungsauftrag.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Fertigungsauftrag> fertigungsauftragList = fertigungsauftragRepository.findAll();
        assertThat(fertigungsauftragList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Fertigungsauftrag.class);
        Fertigungsauftrag fertigungsauftrag1 = new Fertigungsauftrag();
        fertigungsauftrag1.setId(1L);
        Fertigungsauftrag fertigungsauftrag2 = new Fertigungsauftrag();
        fertigungsauftrag2.setId(fertigungsauftrag1.getId());
        assertThat(fertigungsauftrag1).isEqualTo(fertigungsauftrag2);
        fertigungsauftrag2.setId(2L);
        assertThat(fertigungsauftrag1).isNotEqualTo(fertigungsauftrag2);
        fertigungsauftrag1.setId(null);
        assertThat(fertigungsauftrag1).isNotEqualTo(fertigungsauftrag2);
    }
}
