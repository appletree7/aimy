package com.ibsys2.aimy.web.rest;

import com.ibsys2.aimy.AimyApp;

import com.ibsys2.aimy.domain.Modus;
import com.ibsys2.aimy.repository.ModusRepository;
import com.ibsys2.aimy.service.ModusService;
import com.ibsys2.aimy.web.rest.errors.ExceptionTranslator;
import com.ibsys2.aimy.service.dto.ModusCriteria;
import com.ibsys2.aimy.service.ModusQueryService;

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
 * Test class for the ModusResource REST controller.
 *
 * @see ModusResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AimyApp.class)
public class ModusResourceIntTest {

    private static final Integer DEFAULT_NUMMER = 1;
    private static final Integer UPDATED_NUMMER = 2;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Double DEFAULT_BEARBEITUNGSFAKTOR = 0D;
    private static final Double UPDATED_BEARBEITUNGSFAKTOR = 1D;

    private static final Double DEFAULT_BEARBEITUNGSABWEICHUNG = 0D;
    private static final Double UPDATED_BEARBEITUNGSABWEICHUNG = 1D;

    private static final Double DEFAULT_LIEFERFAKTOR = 0D;
    private static final Double UPDATED_LIEFERFAKTOR = 1D;

    private static final Double DEFAULT_LIEFERABWEICHUNG = 0D;
    private static final Double UPDATED_LIEFERABWEICHUNG = 1D;

    private static final Double DEFAULT_MENGENFAKOR = 0D;
    private static final Double UPDATED_MENGENFAKOR = 1D;

    private static final Double DEFAULT_MENGENABWEICHUNG = 0D;
    private static final Double UPDATED_MENGENABWEICHUNG = 1D;

    private static final Double DEFAULT_PREISFAKTOR = 0D;
    private static final Double UPDATED_PREISFAKTOR = 1D;

    private static final Double DEFAULT_DISKONTFAKTOR = 0D;
    private static final Double UPDATED_DISKONTFAKTOR = 1D;

    private static final Double DEFAULT_BESTELLKOSTENFAKTOR = 0D;
    private static final Double UPDATED_BESTELLKOSTENFAKTOR = 1D;

    @Autowired
    private ModusRepository modusRepository;

    @Autowired
    private ModusService modusService;

    @Autowired
    private ModusQueryService modusQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restModusMockMvc;

    private Modus modus;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ModusResource modusResource = new ModusResource(modusService, modusQueryService);
        this.restModusMockMvc = MockMvcBuilders.standaloneSetup(modusResource)
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
    public static Modus createEntity(EntityManager em) {
        Modus modus = new Modus()
            .nummer(DEFAULT_NUMMER)
            .name(DEFAULT_NAME)
            .bearbeitungsfaktor(DEFAULT_BEARBEITUNGSFAKTOR)
            .bearbeitungsabweichung(DEFAULT_BEARBEITUNGSABWEICHUNG)
            .lieferfaktor(DEFAULT_LIEFERFAKTOR)
            .lieferabweichung(DEFAULT_LIEFERABWEICHUNG)
            .mengenfakor(DEFAULT_MENGENFAKOR)
            .mengenabweichung(DEFAULT_MENGENABWEICHUNG)
            .preisfaktor(DEFAULT_PREISFAKTOR)
            .diskontfaktor(DEFAULT_DISKONTFAKTOR)
            .bestellkostenfaktor(DEFAULT_BESTELLKOSTENFAKTOR);
        return modus;
    }

    @Before
    public void initTest() {
        modus = createEntity(em);
    }

    @Test
    @Transactional
    public void createModus() throws Exception {
        int databaseSizeBeforeCreate = modusRepository.findAll().size();

        // Create the Modus
        restModusMockMvc.perform(post("/api/moduses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modus)))
            .andExpect(status().isCreated());

        // Validate the Modus in the database
        List<Modus> modusList = modusRepository.findAll();
        assertThat(modusList).hasSize(databaseSizeBeforeCreate + 1);
        Modus testModus = modusList.get(modusList.size() - 1);
        assertThat(testModus.getNummer()).isEqualTo(DEFAULT_NUMMER);
        assertThat(testModus.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testModus.getBearbeitungsfaktor()).isEqualTo(DEFAULT_BEARBEITUNGSFAKTOR);
        assertThat(testModus.getBearbeitungsabweichung()).isEqualTo(DEFAULT_BEARBEITUNGSABWEICHUNG);
        assertThat(testModus.getLieferfaktor()).isEqualTo(DEFAULT_LIEFERFAKTOR);
        assertThat(testModus.getLieferabweichung()).isEqualTo(DEFAULT_LIEFERABWEICHUNG);
        assertThat(testModus.getMengenfakor()).isEqualTo(DEFAULT_MENGENFAKOR);
        assertThat(testModus.getMengenabweichung()).isEqualTo(DEFAULT_MENGENABWEICHUNG);
        assertThat(testModus.getPreisfaktor()).isEqualTo(DEFAULT_PREISFAKTOR);
        assertThat(testModus.getDiskontfaktor()).isEqualTo(DEFAULT_DISKONTFAKTOR);
        assertThat(testModus.getBestellkostenfaktor()).isEqualTo(DEFAULT_BESTELLKOSTENFAKTOR);
    }

    @Test
    @Transactional
    public void createModusWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = modusRepository.findAll().size();

        // Create the Modus with an existing ID
        modus.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restModusMockMvc.perform(post("/api/moduses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modus)))
            .andExpect(status().isBadRequest());

        // Validate the Modus in the database
        List<Modus> modusList = modusRepository.findAll();
        assertThat(modusList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNummerIsRequired() throws Exception {
        int databaseSizeBeforeTest = modusRepository.findAll().size();
        // set the field null
        modus.setNummer(null);

        // Create the Modus, which fails.

        restModusMockMvc.perform(post("/api/moduses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modus)))
            .andExpect(status().isBadRequest());

        List<Modus> modusList = modusRepository.findAll();
        assertThat(modusList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllModuses() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList
        restModusMockMvc.perform(get("/api/moduses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(modus.getId().intValue())))
            .andExpect(jsonPath("$.[*].nummer").value(hasItem(DEFAULT_NUMMER)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].bearbeitungsfaktor").value(hasItem(DEFAULT_BEARBEITUNGSFAKTOR.doubleValue())))
            .andExpect(jsonPath("$.[*].bearbeitungsabweichung").value(hasItem(DEFAULT_BEARBEITUNGSABWEICHUNG.doubleValue())))
            .andExpect(jsonPath("$.[*].lieferfaktor").value(hasItem(DEFAULT_LIEFERFAKTOR.doubleValue())))
            .andExpect(jsonPath("$.[*].lieferabweichung").value(hasItem(DEFAULT_LIEFERABWEICHUNG.doubleValue())))
            .andExpect(jsonPath("$.[*].mengenfakor").value(hasItem(DEFAULT_MENGENFAKOR.doubleValue())))
            .andExpect(jsonPath("$.[*].mengenabweichung").value(hasItem(DEFAULT_MENGENABWEICHUNG.doubleValue())))
            .andExpect(jsonPath("$.[*].preisfaktor").value(hasItem(DEFAULT_PREISFAKTOR.doubleValue())))
            .andExpect(jsonPath("$.[*].diskontfaktor").value(hasItem(DEFAULT_DISKONTFAKTOR.doubleValue())))
            .andExpect(jsonPath("$.[*].bestellkostenfaktor").value(hasItem(DEFAULT_BESTELLKOSTENFAKTOR.doubleValue())));
    }

    @Test
    @Transactional
    public void getModus() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get the modus
        restModusMockMvc.perform(get("/api/moduses/{id}", modus.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(modus.getId().intValue()))
            .andExpect(jsonPath("$.nummer").value(DEFAULT_NUMMER))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.bearbeitungsfaktor").value(DEFAULT_BEARBEITUNGSFAKTOR.doubleValue()))
            .andExpect(jsonPath("$.bearbeitungsabweichung").value(DEFAULT_BEARBEITUNGSABWEICHUNG.doubleValue()))
            .andExpect(jsonPath("$.lieferfaktor").value(DEFAULT_LIEFERFAKTOR.doubleValue()))
            .andExpect(jsonPath("$.lieferabweichung").value(DEFAULT_LIEFERABWEICHUNG.doubleValue()))
            .andExpect(jsonPath("$.mengenfakor").value(DEFAULT_MENGENFAKOR.doubleValue()))
            .andExpect(jsonPath("$.mengenabweichung").value(DEFAULT_MENGENABWEICHUNG.doubleValue()))
            .andExpect(jsonPath("$.preisfaktor").value(DEFAULT_PREISFAKTOR.doubleValue()))
            .andExpect(jsonPath("$.diskontfaktor").value(DEFAULT_DISKONTFAKTOR.doubleValue()))
            .andExpect(jsonPath("$.bestellkostenfaktor").value(DEFAULT_BESTELLKOSTENFAKTOR.doubleValue()));
    }

    @Test
    @Transactional
    public void getAllModusesByNummerIsEqualToSomething() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where nummer equals to DEFAULT_NUMMER
        defaultModusShouldBeFound("nummer.equals=" + DEFAULT_NUMMER);

        // Get all the modusList where nummer equals to UPDATED_NUMMER
        defaultModusShouldNotBeFound("nummer.equals=" + UPDATED_NUMMER);
    }

    @Test
    @Transactional
    public void getAllModusesByNummerIsInShouldWork() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where nummer in DEFAULT_NUMMER or UPDATED_NUMMER
        defaultModusShouldBeFound("nummer.in=" + DEFAULT_NUMMER + "," + UPDATED_NUMMER);

        // Get all the modusList where nummer equals to UPDATED_NUMMER
        defaultModusShouldNotBeFound("nummer.in=" + UPDATED_NUMMER);
    }

    @Test
    @Transactional
    public void getAllModusesByNummerIsNullOrNotNull() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where nummer is not null
        defaultModusShouldBeFound("nummer.specified=true");

        // Get all the modusList where nummer is null
        defaultModusShouldNotBeFound("nummer.specified=false");
    }

    @Test
    @Transactional
    public void getAllModusesByNummerIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where nummer greater than or equals to DEFAULT_NUMMER
        defaultModusShouldBeFound("nummer.greaterOrEqualThan=" + DEFAULT_NUMMER);

        // Get all the modusList where nummer greater than or equals to UPDATED_NUMMER
        defaultModusShouldNotBeFound("nummer.greaterOrEqualThan=" + UPDATED_NUMMER);
    }

    @Test
    @Transactional
    public void getAllModusesByNummerIsLessThanSomething() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where nummer less than or equals to DEFAULT_NUMMER
        defaultModusShouldNotBeFound("nummer.lessThan=" + DEFAULT_NUMMER);

        // Get all the modusList where nummer less than or equals to UPDATED_NUMMER
        defaultModusShouldBeFound("nummer.lessThan=" + UPDATED_NUMMER);
    }


    @Test
    @Transactional
    public void getAllModusesByNameIsEqualToSomething() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where name equals to DEFAULT_NAME
        defaultModusShouldBeFound("name.equals=" + DEFAULT_NAME);

        // Get all the modusList where name equals to UPDATED_NAME
        defaultModusShouldNotBeFound("name.equals=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    public void getAllModusesByNameIsInShouldWork() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where name in DEFAULT_NAME or UPDATED_NAME
        defaultModusShouldBeFound("name.in=" + DEFAULT_NAME + "," + UPDATED_NAME);

        // Get all the modusList where name equals to UPDATED_NAME
        defaultModusShouldNotBeFound("name.in=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    public void getAllModusesByNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where name is not null
        defaultModusShouldBeFound("name.specified=true");

        // Get all the modusList where name is null
        defaultModusShouldNotBeFound("name.specified=false");
    }

    @Test
    @Transactional
    public void getAllModusesByBearbeitungsfaktorIsEqualToSomething() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where bearbeitungsfaktor equals to DEFAULT_BEARBEITUNGSFAKTOR
        defaultModusShouldBeFound("bearbeitungsfaktor.equals=" + DEFAULT_BEARBEITUNGSFAKTOR);

        // Get all the modusList where bearbeitungsfaktor equals to UPDATED_BEARBEITUNGSFAKTOR
        defaultModusShouldNotBeFound("bearbeitungsfaktor.equals=" + UPDATED_BEARBEITUNGSFAKTOR);
    }

    @Test
    @Transactional
    public void getAllModusesByBearbeitungsfaktorIsInShouldWork() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where bearbeitungsfaktor in DEFAULT_BEARBEITUNGSFAKTOR or UPDATED_BEARBEITUNGSFAKTOR
        defaultModusShouldBeFound("bearbeitungsfaktor.in=" + DEFAULT_BEARBEITUNGSFAKTOR + "," + UPDATED_BEARBEITUNGSFAKTOR);

        // Get all the modusList where bearbeitungsfaktor equals to UPDATED_BEARBEITUNGSFAKTOR
        defaultModusShouldNotBeFound("bearbeitungsfaktor.in=" + UPDATED_BEARBEITUNGSFAKTOR);
    }

    @Test
    @Transactional
    public void getAllModusesByBearbeitungsfaktorIsNullOrNotNull() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where bearbeitungsfaktor is not null
        defaultModusShouldBeFound("bearbeitungsfaktor.specified=true");

        // Get all the modusList where bearbeitungsfaktor is null
        defaultModusShouldNotBeFound("bearbeitungsfaktor.specified=false");
    }

    @Test
    @Transactional
    public void getAllModusesByBearbeitungsabweichungIsEqualToSomething() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where bearbeitungsabweichung equals to DEFAULT_BEARBEITUNGSABWEICHUNG
        defaultModusShouldBeFound("bearbeitungsabweichung.equals=" + DEFAULT_BEARBEITUNGSABWEICHUNG);

        // Get all the modusList where bearbeitungsabweichung equals to UPDATED_BEARBEITUNGSABWEICHUNG
        defaultModusShouldNotBeFound("bearbeitungsabweichung.equals=" + UPDATED_BEARBEITUNGSABWEICHUNG);
    }

    @Test
    @Transactional
    public void getAllModusesByBearbeitungsabweichungIsInShouldWork() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where bearbeitungsabweichung in DEFAULT_BEARBEITUNGSABWEICHUNG or UPDATED_BEARBEITUNGSABWEICHUNG
        defaultModusShouldBeFound("bearbeitungsabweichung.in=" + DEFAULT_BEARBEITUNGSABWEICHUNG + "," + UPDATED_BEARBEITUNGSABWEICHUNG);

        // Get all the modusList where bearbeitungsabweichung equals to UPDATED_BEARBEITUNGSABWEICHUNG
        defaultModusShouldNotBeFound("bearbeitungsabweichung.in=" + UPDATED_BEARBEITUNGSABWEICHUNG);
    }

    @Test
    @Transactional
    public void getAllModusesByBearbeitungsabweichungIsNullOrNotNull() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where bearbeitungsabweichung is not null
        defaultModusShouldBeFound("bearbeitungsabweichung.specified=true");

        // Get all the modusList where bearbeitungsabweichung is null
        defaultModusShouldNotBeFound("bearbeitungsabweichung.specified=false");
    }

    @Test
    @Transactional
    public void getAllModusesByLieferfaktorIsEqualToSomething() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where lieferfaktor equals to DEFAULT_LIEFERFAKTOR
        defaultModusShouldBeFound("lieferfaktor.equals=" + DEFAULT_LIEFERFAKTOR);

        // Get all the modusList where lieferfaktor equals to UPDATED_LIEFERFAKTOR
        defaultModusShouldNotBeFound("lieferfaktor.equals=" + UPDATED_LIEFERFAKTOR);
    }

    @Test
    @Transactional
    public void getAllModusesByLieferfaktorIsInShouldWork() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where lieferfaktor in DEFAULT_LIEFERFAKTOR or UPDATED_LIEFERFAKTOR
        defaultModusShouldBeFound("lieferfaktor.in=" + DEFAULT_LIEFERFAKTOR + "," + UPDATED_LIEFERFAKTOR);

        // Get all the modusList where lieferfaktor equals to UPDATED_LIEFERFAKTOR
        defaultModusShouldNotBeFound("lieferfaktor.in=" + UPDATED_LIEFERFAKTOR);
    }

    @Test
    @Transactional
    public void getAllModusesByLieferfaktorIsNullOrNotNull() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where lieferfaktor is not null
        defaultModusShouldBeFound("lieferfaktor.specified=true");

        // Get all the modusList where lieferfaktor is null
        defaultModusShouldNotBeFound("lieferfaktor.specified=false");
    }

    @Test
    @Transactional
    public void getAllModusesByLieferabweichungIsEqualToSomething() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where lieferabweichung equals to DEFAULT_LIEFERABWEICHUNG
        defaultModusShouldBeFound("lieferabweichung.equals=" + DEFAULT_LIEFERABWEICHUNG);

        // Get all the modusList where lieferabweichung equals to UPDATED_LIEFERABWEICHUNG
        defaultModusShouldNotBeFound("lieferabweichung.equals=" + UPDATED_LIEFERABWEICHUNG);
    }

    @Test
    @Transactional
    public void getAllModusesByLieferabweichungIsInShouldWork() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where lieferabweichung in DEFAULT_LIEFERABWEICHUNG or UPDATED_LIEFERABWEICHUNG
        defaultModusShouldBeFound("lieferabweichung.in=" + DEFAULT_LIEFERABWEICHUNG + "," + UPDATED_LIEFERABWEICHUNG);

        // Get all the modusList where lieferabweichung equals to UPDATED_LIEFERABWEICHUNG
        defaultModusShouldNotBeFound("lieferabweichung.in=" + UPDATED_LIEFERABWEICHUNG);
    }

    @Test
    @Transactional
    public void getAllModusesByLieferabweichungIsNullOrNotNull() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where lieferabweichung is not null
        defaultModusShouldBeFound("lieferabweichung.specified=true");

        // Get all the modusList where lieferabweichung is null
        defaultModusShouldNotBeFound("lieferabweichung.specified=false");
    }

    @Test
    @Transactional
    public void getAllModusesByMengenfakorIsEqualToSomething() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where mengenfakor equals to DEFAULT_MENGENFAKOR
        defaultModusShouldBeFound("mengenfakor.equals=" + DEFAULT_MENGENFAKOR);

        // Get all the modusList where mengenfakor equals to UPDATED_MENGENFAKOR
        defaultModusShouldNotBeFound("mengenfakor.equals=" + UPDATED_MENGENFAKOR);
    }

    @Test
    @Transactional
    public void getAllModusesByMengenfakorIsInShouldWork() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where mengenfakor in DEFAULT_MENGENFAKOR or UPDATED_MENGENFAKOR
        defaultModusShouldBeFound("mengenfakor.in=" + DEFAULT_MENGENFAKOR + "," + UPDATED_MENGENFAKOR);

        // Get all the modusList where mengenfakor equals to UPDATED_MENGENFAKOR
        defaultModusShouldNotBeFound("mengenfakor.in=" + UPDATED_MENGENFAKOR);
    }

    @Test
    @Transactional
    public void getAllModusesByMengenfakorIsNullOrNotNull() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where mengenfakor is not null
        defaultModusShouldBeFound("mengenfakor.specified=true");

        // Get all the modusList where mengenfakor is null
        defaultModusShouldNotBeFound("mengenfakor.specified=false");
    }

    @Test
    @Transactional
    public void getAllModusesByMengenabweichungIsEqualToSomething() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where mengenabweichung equals to DEFAULT_MENGENABWEICHUNG
        defaultModusShouldBeFound("mengenabweichung.equals=" + DEFAULT_MENGENABWEICHUNG);

        // Get all the modusList where mengenabweichung equals to UPDATED_MENGENABWEICHUNG
        defaultModusShouldNotBeFound("mengenabweichung.equals=" + UPDATED_MENGENABWEICHUNG);
    }

    @Test
    @Transactional
    public void getAllModusesByMengenabweichungIsInShouldWork() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where mengenabweichung in DEFAULT_MENGENABWEICHUNG or UPDATED_MENGENABWEICHUNG
        defaultModusShouldBeFound("mengenabweichung.in=" + DEFAULT_MENGENABWEICHUNG + "," + UPDATED_MENGENABWEICHUNG);

        // Get all the modusList where mengenabweichung equals to UPDATED_MENGENABWEICHUNG
        defaultModusShouldNotBeFound("mengenabweichung.in=" + UPDATED_MENGENABWEICHUNG);
    }

    @Test
    @Transactional
    public void getAllModusesByMengenabweichungIsNullOrNotNull() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where mengenabweichung is not null
        defaultModusShouldBeFound("mengenabweichung.specified=true");

        // Get all the modusList where mengenabweichung is null
        defaultModusShouldNotBeFound("mengenabweichung.specified=false");
    }

    @Test
    @Transactional
    public void getAllModusesByPreisfaktorIsEqualToSomething() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where preisfaktor equals to DEFAULT_PREISFAKTOR
        defaultModusShouldBeFound("preisfaktor.equals=" + DEFAULT_PREISFAKTOR);

        // Get all the modusList where preisfaktor equals to UPDATED_PREISFAKTOR
        defaultModusShouldNotBeFound("preisfaktor.equals=" + UPDATED_PREISFAKTOR);
    }

    @Test
    @Transactional
    public void getAllModusesByPreisfaktorIsInShouldWork() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where preisfaktor in DEFAULT_PREISFAKTOR or UPDATED_PREISFAKTOR
        defaultModusShouldBeFound("preisfaktor.in=" + DEFAULT_PREISFAKTOR + "," + UPDATED_PREISFAKTOR);

        // Get all the modusList where preisfaktor equals to UPDATED_PREISFAKTOR
        defaultModusShouldNotBeFound("preisfaktor.in=" + UPDATED_PREISFAKTOR);
    }

    @Test
    @Transactional
    public void getAllModusesByPreisfaktorIsNullOrNotNull() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where preisfaktor is not null
        defaultModusShouldBeFound("preisfaktor.specified=true");

        // Get all the modusList where preisfaktor is null
        defaultModusShouldNotBeFound("preisfaktor.specified=false");
    }

    @Test
    @Transactional
    public void getAllModusesByDiskontfaktorIsEqualToSomething() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where diskontfaktor equals to DEFAULT_DISKONTFAKTOR
        defaultModusShouldBeFound("diskontfaktor.equals=" + DEFAULT_DISKONTFAKTOR);

        // Get all the modusList where diskontfaktor equals to UPDATED_DISKONTFAKTOR
        defaultModusShouldNotBeFound("diskontfaktor.equals=" + UPDATED_DISKONTFAKTOR);
    }

    @Test
    @Transactional
    public void getAllModusesByDiskontfaktorIsInShouldWork() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where diskontfaktor in DEFAULT_DISKONTFAKTOR or UPDATED_DISKONTFAKTOR
        defaultModusShouldBeFound("diskontfaktor.in=" + DEFAULT_DISKONTFAKTOR + "," + UPDATED_DISKONTFAKTOR);

        // Get all the modusList where diskontfaktor equals to UPDATED_DISKONTFAKTOR
        defaultModusShouldNotBeFound("diskontfaktor.in=" + UPDATED_DISKONTFAKTOR);
    }

    @Test
    @Transactional
    public void getAllModusesByDiskontfaktorIsNullOrNotNull() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where diskontfaktor is not null
        defaultModusShouldBeFound("diskontfaktor.specified=true");

        // Get all the modusList where diskontfaktor is null
        defaultModusShouldNotBeFound("diskontfaktor.specified=false");
    }

    @Test
    @Transactional
    public void getAllModusesByBestellkostenfaktorIsEqualToSomething() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where bestellkostenfaktor equals to DEFAULT_BESTELLKOSTENFAKTOR
        defaultModusShouldBeFound("bestellkostenfaktor.equals=" + DEFAULT_BESTELLKOSTENFAKTOR);

        // Get all the modusList where bestellkostenfaktor equals to UPDATED_BESTELLKOSTENFAKTOR
        defaultModusShouldNotBeFound("bestellkostenfaktor.equals=" + UPDATED_BESTELLKOSTENFAKTOR);
    }

    @Test
    @Transactional
    public void getAllModusesByBestellkostenfaktorIsInShouldWork() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where bestellkostenfaktor in DEFAULT_BESTELLKOSTENFAKTOR or UPDATED_BESTELLKOSTENFAKTOR
        defaultModusShouldBeFound("bestellkostenfaktor.in=" + DEFAULT_BESTELLKOSTENFAKTOR + "," + UPDATED_BESTELLKOSTENFAKTOR);

        // Get all the modusList where bestellkostenfaktor equals to UPDATED_BESTELLKOSTENFAKTOR
        defaultModusShouldNotBeFound("bestellkostenfaktor.in=" + UPDATED_BESTELLKOSTENFAKTOR);
    }

    @Test
    @Transactional
    public void getAllModusesByBestellkostenfaktorIsNullOrNotNull() throws Exception {
        // Initialize the database
        modusRepository.saveAndFlush(modus);

        // Get all the modusList where bestellkostenfaktor is not null
        defaultModusShouldBeFound("bestellkostenfaktor.specified=true");

        // Get all the modusList where bestellkostenfaktor is null
        defaultModusShouldNotBeFound("bestellkostenfaktor.specified=false");
    }
    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultModusShouldBeFound(String filter) throws Exception {
        restModusMockMvc.perform(get("/api/moduses?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(modus.getId().intValue())))
            .andExpect(jsonPath("$.[*].nummer").value(hasItem(DEFAULT_NUMMER)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].bearbeitungsfaktor").value(hasItem(DEFAULT_BEARBEITUNGSFAKTOR.doubleValue())))
            .andExpect(jsonPath("$.[*].bearbeitungsabweichung").value(hasItem(DEFAULT_BEARBEITUNGSABWEICHUNG.doubleValue())))
            .andExpect(jsonPath("$.[*].lieferfaktor").value(hasItem(DEFAULT_LIEFERFAKTOR.doubleValue())))
            .andExpect(jsonPath("$.[*].lieferabweichung").value(hasItem(DEFAULT_LIEFERABWEICHUNG.doubleValue())))
            .andExpect(jsonPath("$.[*].mengenfakor").value(hasItem(DEFAULT_MENGENFAKOR.doubleValue())))
            .andExpect(jsonPath("$.[*].mengenabweichung").value(hasItem(DEFAULT_MENGENABWEICHUNG.doubleValue())))
            .andExpect(jsonPath("$.[*].preisfaktor").value(hasItem(DEFAULT_PREISFAKTOR.doubleValue())))
            .andExpect(jsonPath("$.[*].diskontfaktor").value(hasItem(DEFAULT_DISKONTFAKTOR.doubleValue())))
            .andExpect(jsonPath("$.[*].bestellkostenfaktor").value(hasItem(DEFAULT_BESTELLKOSTENFAKTOR.doubleValue())));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultModusShouldNotBeFound(String filter) throws Exception {
        restModusMockMvc.perform(get("/api/moduses?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());
    }


    @Test
    @Transactional
    public void getNonExistingModus() throws Exception {
        // Get the modus
        restModusMockMvc.perform(get("/api/moduses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateModus() throws Exception {
        // Initialize the database
        modusService.save(modus);

        int databaseSizeBeforeUpdate = modusRepository.findAll().size();

        // Update the modus
        Modus updatedModus = modusRepository.findOne(modus.getId());
        updatedModus
            .nummer(UPDATED_NUMMER)
            .name(UPDATED_NAME)
            .bearbeitungsfaktor(UPDATED_BEARBEITUNGSFAKTOR)
            .bearbeitungsabweichung(UPDATED_BEARBEITUNGSABWEICHUNG)
            .lieferfaktor(UPDATED_LIEFERFAKTOR)
            .lieferabweichung(UPDATED_LIEFERABWEICHUNG)
            .mengenfakor(UPDATED_MENGENFAKOR)
            .mengenabweichung(UPDATED_MENGENABWEICHUNG)
            .preisfaktor(UPDATED_PREISFAKTOR)
            .diskontfaktor(UPDATED_DISKONTFAKTOR)
            .bestellkostenfaktor(UPDATED_BESTELLKOSTENFAKTOR);

        restModusMockMvc.perform(put("/api/moduses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedModus)))
            .andExpect(status().isOk());

        // Validate the Modus in the database
        List<Modus> modusList = modusRepository.findAll();
        assertThat(modusList).hasSize(databaseSizeBeforeUpdate);
        Modus testModus = modusList.get(modusList.size() - 1);
        assertThat(testModus.getNummer()).isEqualTo(UPDATED_NUMMER);
        assertThat(testModus.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testModus.getBearbeitungsfaktor()).isEqualTo(UPDATED_BEARBEITUNGSFAKTOR);
        assertThat(testModus.getBearbeitungsabweichung()).isEqualTo(UPDATED_BEARBEITUNGSABWEICHUNG);
        assertThat(testModus.getLieferfaktor()).isEqualTo(UPDATED_LIEFERFAKTOR);
        assertThat(testModus.getLieferabweichung()).isEqualTo(UPDATED_LIEFERABWEICHUNG);
        assertThat(testModus.getMengenfakor()).isEqualTo(UPDATED_MENGENFAKOR);
        assertThat(testModus.getMengenabweichung()).isEqualTo(UPDATED_MENGENABWEICHUNG);
        assertThat(testModus.getPreisfaktor()).isEqualTo(UPDATED_PREISFAKTOR);
        assertThat(testModus.getDiskontfaktor()).isEqualTo(UPDATED_DISKONTFAKTOR);
        assertThat(testModus.getBestellkostenfaktor()).isEqualTo(UPDATED_BESTELLKOSTENFAKTOR);
    }

    @Test
    @Transactional
    public void updateNonExistingModus() throws Exception {
        int databaseSizeBeforeUpdate = modusRepository.findAll().size();

        // Create the Modus

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restModusMockMvc.perform(put("/api/moduses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modus)))
            .andExpect(status().isCreated());

        // Validate the Modus in the database
        List<Modus> modusList = modusRepository.findAll();
        assertThat(modusList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteModus() throws Exception {
        // Initialize the database
        modusService.save(modus);

        int databaseSizeBeforeDelete = modusRepository.findAll().size();

        // Get the modus
        restModusMockMvc.perform(delete("/api/moduses/{id}", modus.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Modus> modusList = modusRepository.findAll();
        assertThat(modusList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Modus.class);
        Modus modus1 = new Modus();
        modus1.setId(1L);
        Modus modus2 = new Modus();
        modus2.setId(modus1.getId());
        assertThat(modus1).isEqualTo(modus2);
        modus2.setId(2L);
        assertThat(modus1).isNotEqualTo(modus2);
        modus1.setId(null);
        assertThat(modus1).isNotEqualTo(modus2);
    }
}
