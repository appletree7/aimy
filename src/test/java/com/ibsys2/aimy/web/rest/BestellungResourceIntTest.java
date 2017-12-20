package com.ibsys2.aimy.web.rest;

import com.ibsys2.aimy.AimyApp;

import com.ibsys2.aimy.domain.Bestellung;
import com.ibsys2.aimy.repository.BestellungRepository;
import com.ibsys2.aimy.service.BestellungService;
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

import com.ibsys2.aimy.domain.enumeration.Bestellstatus;
/**
 * Test class for the BestellungResource REST controller.
 *
 * @see BestellungResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AimyApp.class)
public class BestellungResourceIntTest {

    private static final Integer DEFAULT_PERIODE = 1;
    private static final Integer UPDATED_PERIODE = 2;

    private static final Integer DEFAULT_NUMMER = 1;
    private static final Integer UPDATED_NUMMER = 2;

    private static final Double DEFAULT_LIEFERFRIST = 1D;
    private static final Double UPDATED_LIEFERFRIST = 2D;

    private static final Double DEFAULT_LIEFERZEIT = 1D;
    private static final Double UPDATED_LIEFERZEIT = 2D;

    private static final Integer DEFAULT_KAUFMENGE = 1;
    private static final Integer UPDATED_KAUFMENGE = 2;

    private static final Integer DEFAULT_DISKONTMENGE = 1;
    private static final Integer UPDATED_DISKONTMENGE = 2;

    private static final Double DEFAULT_MATERIALKOSTEN = 1D;
    private static final Double UPDATED_MATERIALKOSTEN = 2D;

    private static final Double DEFAULT_BESTELLKOSTEN = 1D;
    private static final Double UPDATED_BESTELLKOSTEN = 2D;

    private static final Double DEFAULT_GESAMTKOSTEN = 1D;
    private static final Double UPDATED_GESAMTKOSTEN = 2D;

    private static final Double DEFAULT_STUECKKOSTEN = 1D;
    private static final Double UPDATED_STUECKKOSTEN = 2D;

    private static final Bestellstatus DEFAULT_BESTELLSTATUS = Bestellstatus.GELIEFERT;
    private static final Bestellstatus UPDATED_BESTELLSTATUS = Bestellstatus.UNTERWEGS;

    @Autowired
    private BestellungRepository bestellungRepository;

    @Autowired
    private BestellungService bestellungService;

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
        final BestellungResource bestellungResource = new BestellungResource(bestellungService);
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
            .lieferfrist(DEFAULT_LIEFERFRIST)
            .lieferzeit(DEFAULT_LIEFERZEIT)
            .kaufmenge(DEFAULT_KAUFMENGE)
            .diskontmenge(DEFAULT_DISKONTMENGE)
            .materialkosten(DEFAULT_MATERIALKOSTEN)
            .bestellkosten(DEFAULT_BESTELLKOSTEN)
            .gesamtkosten(DEFAULT_GESAMTKOSTEN)
            .stueckkosten(DEFAULT_STUECKKOSTEN)
            .bestellstatus(DEFAULT_BESTELLSTATUS);
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
        assertThat(testBestellung.getLieferfrist()).isEqualTo(DEFAULT_LIEFERFRIST);
        assertThat(testBestellung.getLieferzeit()).isEqualTo(DEFAULT_LIEFERZEIT);
        assertThat(testBestellung.getKaufmenge()).isEqualTo(DEFAULT_KAUFMENGE);
        assertThat(testBestellung.getDiskontmenge()).isEqualTo(DEFAULT_DISKONTMENGE);
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
            .andExpect(jsonPath("$.[*].lieferfrist").value(hasItem(DEFAULT_LIEFERFRIST.doubleValue())))
            .andExpect(jsonPath("$.[*].lieferzeit").value(hasItem(DEFAULT_LIEFERZEIT.doubleValue())))
            .andExpect(jsonPath("$.[*].kaufmenge").value(hasItem(DEFAULT_KAUFMENGE)))
            .andExpect(jsonPath("$.[*].diskontmenge").value(hasItem(DEFAULT_DISKONTMENGE)))
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
            .andExpect(jsonPath("$.lieferfrist").value(DEFAULT_LIEFERFRIST.doubleValue()))
            .andExpect(jsonPath("$.lieferzeit").value(DEFAULT_LIEFERZEIT.doubleValue()))
            .andExpect(jsonPath("$.kaufmenge").value(DEFAULT_KAUFMENGE))
            .andExpect(jsonPath("$.diskontmenge").value(DEFAULT_DISKONTMENGE))
            .andExpect(jsonPath("$.materialkosten").value(DEFAULT_MATERIALKOSTEN.doubleValue()))
            .andExpect(jsonPath("$.bestellkosten").value(DEFAULT_BESTELLKOSTEN.doubleValue()))
            .andExpect(jsonPath("$.gesamtkosten").value(DEFAULT_GESAMTKOSTEN.doubleValue()))
            .andExpect(jsonPath("$.stueckkosten").value(DEFAULT_STUECKKOSTEN.doubleValue()))
            .andExpect(jsonPath("$.bestellstatus").value(DEFAULT_BESTELLSTATUS.toString()));
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
            .lieferfrist(UPDATED_LIEFERFRIST)
            .lieferzeit(UPDATED_LIEFERZEIT)
            .kaufmenge(UPDATED_KAUFMENGE)
            .diskontmenge(UPDATED_DISKONTMENGE)
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
        assertThat(testBestellung.getLieferfrist()).isEqualTo(UPDATED_LIEFERFRIST);
        assertThat(testBestellung.getLieferzeit()).isEqualTo(UPDATED_LIEFERZEIT);
        assertThat(testBestellung.getKaufmenge()).isEqualTo(UPDATED_KAUFMENGE);
        assertThat(testBestellung.getDiskontmenge()).isEqualTo(UPDATED_DISKONTMENGE);
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
