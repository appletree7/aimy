package com.ibsys2.aimy.web.rest;

import com.ibsys2.aimy.AimyApp;

import com.ibsys2.aimy.domain.Fertigungsauftrag;
import com.ibsys2.aimy.repository.FertigungsauftragRepository;
import com.ibsys2.aimy.service.FertigungsauftragService;
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

import com.ibsys2.aimy.domain.enumeration.Auftragstatus;
/**
 * Test class for the FertigungsauftragResource REST controller.
 *
 * @see FertigungsauftragResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AimyApp.class)
public class FertigungsauftragResourceIntTest {

    private static final Integer DEFAULT_PERIODE = 1;
    private static final Integer UPDATED_PERIODE = 2;

    private static final Integer DEFAULT_AUFTRAGSMENGE = 1;
    private static final Integer UPDATED_AUFTRAGSMENGE = 2;

    private static final Double DEFAULT_KOSTENPROLOS = 1D;
    private static final Double UPDATED_KOSTENPROLOS = 2D;

    private static final Double DEFAULT_DURCHSCHNITTLICHESTUECKKOSTEN = 1D;
    private static final Double UPDATED_DURCHSCHNITTLICHESTUECKKOSTEN = 2D;

    private static final Auftragstatus DEFAULT_AUFTRAGSSTATUS = Auftragstatus.ANGEFANGEN;
    private static final Auftragstatus UPDATED_AUFTRAGSSTATUS = Auftragstatus.WARTEND;

    private static final String DEFAULT_BEGONNEN = "AAAAAAAAAA";
    private static final String UPDATED_BEGONNEN = "BBBBBBBBBB";

    private static final String DEFAULT_BEENDET = "AAAAAAAAAA";
    private static final String UPDATED_BEENDET = "BBBBBBBBBB";

    private static final Integer DEFAULT_DLZMINIMAL = 1;
    private static final Integer UPDATED_DLZMINIMAL = 2;

    private static final Double DEFAULT_DLZ_FAKTOR = 1D;
    private static final Double UPDATED_DLZ_FAKTOR = 2D;

    private static final Integer DEFAULT_NUMMER = 1;
    private static final Integer UPDATED_NUMMER = 2;

    @Autowired
    private FertigungsauftragRepository fertigungsauftragRepository;

    @Autowired
    private FertigungsauftragService fertigungsauftragService;

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
        final FertigungsauftragResource fertigungsauftragResource = new FertigungsauftragResource(fertigungsauftragService);
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
            .auftragsmenge(DEFAULT_AUFTRAGSMENGE)
            .kostenprolos(DEFAULT_KOSTENPROLOS)
            .durchschnittlichestueckkosten(DEFAULT_DURCHSCHNITTLICHESTUECKKOSTEN)
            .auftragsstatus(DEFAULT_AUFTRAGSSTATUS)
            .begonnen(DEFAULT_BEGONNEN)
            .beendet(DEFAULT_BEENDET)
            .dlzminimal(DEFAULT_DLZMINIMAL)
            .dlzFaktor(DEFAULT_DLZ_FAKTOR)
            .nummer(DEFAULT_NUMMER);
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
        assertThat(testFertigungsauftrag.getAuftragsmenge()).isEqualTo(DEFAULT_AUFTRAGSMENGE);
        assertThat(testFertigungsauftrag.getKostenprolos()).isEqualTo(DEFAULT_KOSTENPROLOS);
        assertThat(testFertigungsauftrag.getDurchschnittlichestueckkosten()).isEqualTo(DEFAULT_DURCHSCHNITTLICHESTUECKKOSTEN);
        assertThat(testFertigungsauftrag.getAuftragsstatus()).isEqualTo(DEFAULT_AUFTRAGSSTATUS);
        assertThat(testFertigungsauftrag.getBegonnen()).isEqualTo(DEFAULT_BEGONNEN);
        assertThat(testFertigungsauftrag.getBeendet()).isEqualTo(DEFAULT_BEENDET);
        assertThat(testFertigungsauftrag.getDlzminimal()).isEqualTo(DEFAULT_DLZMINIMAL);
        assertThat(testFertigungsauftrag.getDlzFaktor()).isEqualTo(DEFAULT_DLZ_FAKTOR);
        assertThat(testFertigungsauftrag.getNummer()).isEqualTo(DEFAULT_NUMMER);
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
            .andExpect(jsonPath("$.[*].auftragsmenge").value(hasItem(DEFAULT_AUFTRAGSMENGE)))
            .andExpect(jsonPath("$.[*].kostenprolos").value(hasItem(DEFAULT_KOSTENPROLOS.doubleValue())))
            .andExpect(jsonPath("$.[*].durchschnittlichestueckkosten").value(hasItem(DEFAULT_DURCHSCHNITTLICHESTUECKKOSTEN.doubleValue())))
            .andExpect(jsonPath("$.[*].auftragsstatus").value(hasItem(DEFAULT_AUFTRAGSSTATUS.toString())))
            .andExpect(jsonPath("$.[*].begonnen").value(hasItem(DEFAULT_BEGONNEN.toString())))
            .andExpect(jsonPath("$.[*].beendet").value(hasItem(DEFAULT_BEENDET.toString())))
            .andExpect(jsonPath("$.[*].dlzminimal").value(hasItem(DEFAULT_DLZMINIMAL)))
            .andExpect(jsonPath("$.[*].dlzFaktor").value(hasItem(DEFAULT_DLZ_FAKTOR.doubleValue())))
            .andExpect(jsonPath("$.[*].nummer").value(hasItem(DEFAULT_NUMMER)));
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
            .andExpect(jsonPath("$.auftragsmenge").value(DEFAULT_AUFTRAGSMENGE))
            .andExpect(jsonPath("$.kostenprolos").value(DEFAULT_KOSTENPROLOS.doubleValue()))
            .andExpect(jsonPath("$.durchschnittlichestueckkosten").value(DEFAULT_DURCHSCHNITTLICHESTUECKKOSTEN.doubleValue()))
            .andExpect(jsonPath("$.auftragsstatus").value(DEFAULT_AUFTRAGSSTATUS.toString()))
            .andExpect(jsonPath("$.begonnen").value(DEFAULT_BEGONNEN.toString()))
            .andExpect(jsonPath("$.beendet").value(DEFAULT_BEENDET.toString()))
            .andExpect(jsonPath("$.dlzminimal").value(DEFAULT_DLZMINIMAL))
            .andExpect(jsonPath("$.dlzFaktor").value(DEFAULT_DLZ_FAKTOR.doubleValue()))
            .andExpect(jsonPath("$.nummer").value(DEFAULT_NUMMER));
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
            .auftragsmenge(UPDATED_AUFTRAGSMENGE)
            .kostenprolos(UPDATED_KOSTENPROLOS)
            .durchschnittlichestueckkosten(UPDATED_DURCHSCHNITTLICHESTUECKKOSTEN)
            .auftragsstatus(UPDATED_AUFTRAGSSTATUS)
            .begonnen(UPDATED_BEGONNEN)
            .beendet(UPDATED_BEENDET)
            .dlzminimal(UPDATED_DLZMINIMAL)
            .dlzFaktor(UPDATED_DLZ_FAKTOR)
            .nummer(UPDATED_NUMMER);

        restFertigungsauftragMockMvc.perform(put("/api/fertigungsauftrags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFertigungsauftrag)))
            .andExpect(status().isOk());

        // Validate the Fertigungsauftrag in the database
        List<Fertigungsauftrag> fertigungsauftragList = fertigungsauftragRepository.findAll();
        assertThat(fertigungsauftragList).hasSize(databaseSizeBeforeUpdate);
        Fertigungsauftrag testFertigungsauftrag = fertigungsauftragList.get(fertigungsauftragList.size() - 1);
        assertThat(testFertigungsauftrag.getPeriode()).isEqualTo(UPDATED_PERIODE);
        assertThat(testFertigungsauftrag.getAuftragsmenge()).isEqualTo(UPDATED_AUFTRAGSMENGE);
        assertThat(testFertigungsauftrag.getKostenprolos()).isEqualTo(UPDATED_KOSTENPROLOS);
        assertThat(testFertigungsauftrag.getDurchschnittlichestueckkosten()).isEqualTo(UPDATED_DURCHSCHNITTLICHESTUECKKOSTEN);
        assertThat(testFertigungsauftrag.getAuftragsstatus()).isEqualTo(UPDATED_AUFTRAGSSTATUS);
        assertThat(testFertigungsauftrag.getBegonnen()).isEqualTo(UPDATED_BEGONNEN);
        assertThat(testFertigungsauftrag.getBeendet()).isEqualTo(UPDATED_BEENDET);
        assertThat(testFertigungsauftrag.getDlzminimal()).isEqualTo(UPDATED_DLZMINIMAL);
        assertThat(testFertigungsauftrag.getDlzFaktor()).isEqualTo(UPDATED_DLZ_FAKTOR);
        assertThat(testFertigungsauftrag.getNummer()).isEqualTo(UPDATED_NUMMER);
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
