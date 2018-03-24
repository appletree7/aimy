package com.ibsys2.aimy.web.rest;

import com.ibsys2.aimy.AimyApp;

import com.ibsys2.aimy.domain.Arbeitsplatz;
import com.ibsys2.aimy.repository.ArbeitsplatzRepository;
import com.ibsys2.aimy.service.ArbeitsplatzService;
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
 * Test class for the ArbeitsplatzResource REST controller.
 *
 * @see ArbeitsplatzResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AimyApp.class)
public class ArbeitsplatzResourceIntTest {

    private static final Integer DEFAULT_PERIODE = 1;
    private static final Integer UPDATED_PERIODE = 2;

    private static final Integer DEFAULT_NUMMER = 1;
    private static final Integer UPDATED_NUMMER = 2;

    private static final Double DEFAULT_RESTZEITBEDARF = 1D;
    private static final Double UPDATED_RESTZEITBEDARF = 2D;

    private static final Integer DEFAULT_RUESTVORGAENGE = 1;
    private static final Integer UPDATED_RUESTVORGAENGE = 2;

    private static final Double DEFAULT_LEERZEIT = 1D;
    private static final Double UPDATED_LEERZEIT = 2D;

    private static final Double DEFAULT_LOHNLEERKOSTEN = 1D;
    private static final Double UPDATED_LOHNLEERKOSTEN = 2D;

    private static final Double DEFAULT_LOHNKOSTEN = 1D;
    private static final Double UPDATED_LOHNKOSTEN = 2D;

    private static final Double DEFAULT_MASCHINENSTILLSTANDKOSTEN = 1D;
    private static final Double UPDATED_MASCHINENSTILLSTANDKOSTEN = 2D;

    private static final Double DEFAULT_RESTZEITBEDARF_IN_BEARBEITUNG = 0D;
    private static final Double UPDATED_RESTZEITBEDARF_IN_BEARBEITUNG = 1D;

    private static final Integer DEFAULT_SCHICHT = 1;
    private static final Integer UPDATED_SCHICHT = 2;

    private static final Double DEFAULT_UEBERSTUNDEN = 1D;
    private static final Double UPDATED_UEBERSTUNDEN = 2D;

    @Autowired
    private ArbeitsplatzRepository arbeitsplatzRepository;

    @Autowired
    private ArbeitsplatzService arbeitsplatzService;

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
        final ArbeitsplatzResource arbeitsplatzResource = new ArbeitsplatzResource(arbeitsplatzService);
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
