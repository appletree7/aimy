package com.ibsys2.aimy.web.rest;

import com.ibsys2.aimy.AimyApp;

import com.ibsys2.aimy.domain.Teil;
import com.ibsys2.aimy.repository.TeilRepository;
import com.ibsys2.aimy.service.TeilService;
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

    private static final String DEFAULT_NUMMER = "AAAAAAAAAA";
    private static final String UPDATED_NUMMER = "BBBBBBBBBB";

    private static final Integer DEFAULT_ISTMENGE = 1;
    private static final Integer UPDATED_ISTMENGE = 2;

    private static final Integer DEFAULT_STARTMENGE = 1;
    private static final Integer UPDATED_STARTMENGE = 2;

    private static final Double DEFAULT_PROZENTSATZ = 1D;
    private static final Double UPDATED_PROZENTSATZ = 2D;

    private static final Double DEFAULT_LAGERPREIS = 1D;
    private static final Double UPDATED_LAGERPREIS = 2D;

    private static final Double DEFAULT_LAGERWERT = 1D;
    private static final Double UPDATED_LAGERWERT = 2D;

    private static final Integer DEFAULT_SICHERHEITSBESTAND = 1;
    private static final Integer UPDATED_SICHERHEITSBESTAND = 2;

    private static final Integer DEFAULT_VERTRIEBSWUNSCH = 1;
    private static final Integer UPDATED_VERTRIEBSWUNSCH = 2;

    @Autowired
    private TeilRepository teilRepository;

    @Autowired
    private TeilService teilService;

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
        final TeilResource teilResource = new TeilResource(teilService);
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
            .nummer(DEFAULT_NUMMER)
            .istmenge(DEFAULT_ISTMENGE)
            .startmenge(DEFAULT_STARTMENGE)
            .prozentsatz(DEFAULT_PROZENTSATZ)
            .lagerpreis(DEFAULT_LAGERPREIS)
            .lagerwert(DEFAULT_LAGERWERT)
            .sicherheitsbestand(DEFAULT_SICHERHEITSBESTAND)
            .vertriebswunsch(DEFAULT_VERTRIEBSWUNSCH);
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
        assertThat(testTeil.getNummer()).isEqualTo(DEFAULT_NUMMER);
        assertThat(testTeil.getIstmenge()).isEqualTo(DEFAULT_ISTMENGE);
        assertThat(testTeil.getStartmenge()).isEqualTo(DEFAULT_STARTMENGE);
        assertThat(testTeil.getProzentsatz()).isEqualTo(DEFAULT_PROZENTSATZ);
        assertThat(testTeil.getLagerpreis()).isEqualTo(DEFAULT_LAGERPREIS);
        assertThat(testTeil.getLagerwert()).isEqualTo(DEFAULT_LAGERWERT);
        assertThat(testTeil.getSicherheitsbestand()).isEqualTo(DEFAULT_SICHERHEITSBESTAND);
        assertThat(testTeil.getVertriebswunsch()).isEqualTo(DEFAULT_VERTRIEBSWUNSCH);
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
    public void getAllTeils() throws Exception {
        // Initialize the database
        teilRepository.saveAndFlush(teil);

        // Get all the teilList
        restTeilMockMvc.perform(get("/api/teils?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(teil.getId().intValue())))
            .andExpect(jsonPath("$.[*].teiltyp").value(hasItem(DEFAULT_TEILTYP.toString())))
            .andExpect(jsonPath("$.[*].nummer").value(hasItem(DEFAULT_NUMMER.toString())))
            .andExpect(jsonPath("$.[*].istmenge").value(hasItem(DEFAULT_ISTMENGE)))
            .andExpect(jsonPath("$.[*].startmenge").value(hasItem(DEFAULT_STARTMENGE)))
            .andExpect(jsonPath("$.[*].prozentsatz").value(hasItem(DEFAULT_PROZENTSATZ.doubleValue())))
            .andExpect(jsonPath("$.[*].lagerpreis").value(hasItem(DEFAULT_LAGERPREIS.doubleValue())))
            .andExpect(jsonPath("$.[*].lagerwert").value(hasItem(DEFAULT_LAGERWERT.doubleValue())))
            .andExpect(jsonPath("$.[*].sicherheitsbestand").value(hasItem(DEFAULT_SICHERHEITSBESTAND)))
            .andExpect(jsonPath("$.[*].vertriebswunsch").value(hasItem(DEFAULT_VERTRIEBSWUNSCH)));
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
            .andExpect(jsonPath("$.nummer").value(DEFAULT_NUMMER.toString()))
            .andExpect(jsonPath("$.istmenge").value(DEFAULT_ISTMENGE))
            .andExpect(jsonPath("$.startmenge").value(DEFAULT_STARTMENGE))
            .andExpect(jsonPath("$.prozentsatz").value(DEFAULT_PROZENTSATZ.doubleValue()))
            .andExpect(jsonPath("$.lagerpreis").value(DEFAULT_LAGERPREIS.doubleValue()))
            .andExpect(jsonPath("$.lagerwert").value(DEFAULT_LAGERWERT.doubleValue()))
            .andExpect(jsonPath("$.sicherheitsbestand").value(DEFAULT_SICHERHEITSBESTAND))
            .andExpect(jsonPath("$.vertriebswunsch").value(DEFAULT_VERTRIEBSWUNSCH));
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
            .nummer(UPDATED_NUMMER)
            .istmenge(UPDATED_ISTMENGE)
            .startmenge(UPDATED_STARTMENGE)
            .prozentsatz(UPDATED_PROZENTSATZ)
            .lagerpreis(UPDATED_LAGERPREIS)
            .lagerwert(UPDATED_LAGERWERT)
            .sicherheitsbestand(UPDATED_SICHERHEITSBESTAND)
            .vertriebswunsch(UPDATED_VERTRIEBSWUNSCH);

        restTeilMockMvc.perform(put("/api/teils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTeil)))
            .andExpect(status().isOk());

        // Validate the Teil in the database
        List<Teil> teilList = teilRepository.findAll();
        assertThat(teilList).hasSize(databaseSizeBeforeUpdate);
        Teil testTeil = teilList.get(teilList.size() - 1);
        assertThat(testTeil.getTeiltyp()).isEqualTo(UPDATED_TEILTYP);
        assertThat(testTeil.getNummer()).isEqualTo(UPDATED_NUMMER);
        assertThat(testTeil.getIstmenge()).isEqualTo(UPDATED_ISTMENGE);
        assertThat(testTeil.getStartmenge()).isEqualTo(UPDATED_STARTMENGE);
        assertThat(testTeil.getProzentsatz()).isEqualTo(UPDATED_PROZENTSATZ);
        assertThat(testTeil.getLagerpreis()).isEqualTo(UPDATED_LAGERPREIS);
        assertThat(testTeil.getLagerwert()).isEqualTo(UPDATED_LAGERWERT);
        assertThat(testTeil.getSicherheitsbestand()).isEqualTo(UPDATED_SICHERHEITSBESTAND);
        assertThat(testTeil.getVertriebswunsch()).isEqualTo(UPDATED_VERTRIEBSWUNSCH);
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
