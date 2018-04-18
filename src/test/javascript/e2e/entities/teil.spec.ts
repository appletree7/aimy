import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Teil e2e test', () => {

    let navBarPage: NavBarPage;
    let teilDialogPage: TeilDialogPage;
    let teilComponentsPage: TeilComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Teils', () => {
        navBarPage.goToEntity('teil');
        teilComponentsPage = new TeilComponentsPage();
        expect(teilComponentsPage.getTitle()).toMatch(/aimyApp.teil.home.title/);

    });

    it('should load create Teil dialog', () => {
        teilComponentsPage.clickOnCreateButton();
        teilDialogPage = new TeilDialogPage();
        expect(teilDialogPage.getModalTitle()).toMatch(/aimyApp.teil.home.createOrEditLabel/);
        teilDialogPage.close();
    });

    it('should create and save Teils', () => {
        teilComponentsPage.clickOnCreateButton();
        teilDialogPage.teiltypSelectLastOption();
        teilDialogPage.setPeriodeInput('5');
        expect(teilDialogPage.getPeriodeInput()).toMatch('5');
        teilDialogPage.setNummerInput('5');
        expect(teilDialogPage.getNummerInput()).toMatch('5');
        teilDialogPage.setIstmengeInput('5');
        expect(teilDialogPage.getIstmengeInput()).toMatch('5');
        teilDialogPage.setStartmengeInput('5');
        expect(teilDialogPage.getStartmengeInput()).toMatch('5');
        teilDialogPage.setProzentsatzInput('5');
        expect(teilDialogPage.getProzentsatzInput()).toMatch('5');
        teilDialogPage.setLagerpreisInput('5');
        expect(teilDialogPage.getLagerpreisInput()).toMatch('5');
        teilDialogPage.setLagerwertInput('5');
        expect(teilDialogPage.getLagerwertInput()).toMatch('5');
        teilDialogPage.setSicherheitsbestandInput('5');
        expect(teilDialogPage.getSicherheitsbestandInput()).toMatch('5');
        teilDialogPage.setVertriebswunschInput('5');
        expect(teilDialogPage.getVertriebswunschInput()).toMatch('5');
        teilDialogPage.setVertriebswunsch_naechsteInput('5');
        expect(teilDialogPage.getVertriebswunsch_naechsteInput()).toMatch('5');
        teilDialogPage.setVertriebswunsch_uebernaechsteInput('5');
        expect(teilDialogPage.getVertriebswunsch_uebernaechsteInput()).toMatch('5');
        teilDialogPage.setVertriebswunsch_ueberuebernaechsteInput('5');
        expect(teilDialogPage.getVertriebswunsch_ueberuebernaechsteInput()).toMatch('5');
        teilDialogPage.setGesamtproduktionsmengeInput('5');
        expect(teilDialogPage.getGesamtproduktionsmengeInput()).toMatch('5');
        teilDialogPage.setDirektverkaufmengeInput('5');
        expect(teilDialogPage.getDirektverkaufmengeInput()).toMatch('5');
        teilDialogPage.setDirektverkaufspreisInput('5');
        expect(teilDialogPage.getDirektverkaufspreisInput()).toMatch('5');
        teilDialogPage.setStrafeInput('5');
        expect(teilDialogPage.getStrafeInput()).toMatch('5');
        teilDialogPage.setWarteliste_mengeInput('5');
        expect(teilDialogPage.getWarteliste_mengeInput()).toMatch('5');
        teilDialogPage.setInBearbeitung_mengeInput('5');
        expect(teilDialogPage.getInBearbeitung_mengeInput()).toMatch('5');
        // teilDialogPage.subkomponenteSelectLastOption();
        teilDialogPage.save();
        expect(teilDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TeilComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-teil div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TeilDialogPage {
    modalTitle = element(by.css('h4#myTeilLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    teiltypSelect = element(by.css('select#field_teiltyp'));
    periodeInput = element(by.css('input#field_periode'));
    nummerInput = element(by.css('input#field_nummer'));
    istmengeInput = element(by.css('input#field_istmenge'));
    startmengeInput = element(by.css('input#field_startmenge'));
    prozentsatzInput = element(by.css('input#field_prozentsatz'));
    lagerpreisInput = element(by.css('input#field_lagerpreis'));
    lagerwertInput = element(by.css('input#field_lagerwert'));
    sicherheitsbestandInput = element(by.css('input#field_sicherheitsbestand'));
    vertriebswunschInput = element(by.css('input#field_vertriebswunsch'));
    vertriebswunsch_naechsteInput = element(by.css('input#field_vertriebswunsch_naechste'));
    vertriebswunsch_uebernaechsteInput = element(by.css('input#field_vertriebswunsch_uebernaechste'));
    vertriebswunsch_ueberuebernaechsteInput = element(by.css('input#field_vertriebswunsch_ueberuebernaechste'));
    gesamtproduktionsmengeInput = element(by.css('input#field_gesamtproduktionsmenge'));
    direktverkaufmengeInput = element(by.css('input#field_direktverkaufmenge'));
    direktverkaufspreisInput = element(by.css('input#field_direktverkaufspreis'));
    strafeInput = element(by.css('input#field_strafe'));
    warteliste_mengeInput = element(by.css('input#field_warteliste_menge'));
    inBearbeitung_mengeInput = element(by.css('input#field_inBearbeitung_menge'));
    subkomponenteSelect = element(by.css('select#field_subkomponente'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTeiltypSelect = function (teiltyp) {
        this.teiltypSelect.sendKeys(teiltyp);
    }

    getTeiltypSelect = function () {
        return this.teiltypSelect.element(by.css('option:checked')).getText();
    }

    teiltypSelectLastOption = function () {
        this.teiltypSelect.all(by.tagName('option')).last().click();
    }
    setPeriodeInput = function (periode) {
        this.periodeInput.sendKeys(periode);
    }

    getPeriodeInput = function () {
        return this.periodeInput.getAttribute('value');
    }

    setNummerInput = function (nummer) {
        this.nummerInput.sendKeys(nummer);
    }

    getNummerInput = function () {
        return this.nummerInput.getAttribute('value');
    }

    setIstmengeInput = function (istmenge) {
        this.istmengeInput.sendKeys(istmenge);
    }

    getIstmengeInput = function () {
        return this.istmengeInput.getAttribute('value');
    }

    setStartmengeInput = function (startmenge) {
        this.startmengeInput.sendKeys(startmenge);
    }

    getStartmengeInput = function () {
        return this.startmengeInput.getAttribute('value');
    }

    setProzentsatzInput = function (prozentsatz) {
        this.prozentsatzInput.sendKeys(prozentsatz);
    }

    getProzentsatzInput = function () {
        return this.prozentsatzInput.getAttribute('value');
    }

    setLagerpreisInput = function (lagerpreis) {
        this.lagerpreisInput.sendKeys(lagerpreis);
    }

    getLagerpreisInput = function () {
        return this.lagerpreisInput.getAttribute('value');
    }

    setLagerwertInput = function (lagerwert) {
        this.lagerwertInput.sendKeys(lagerwert);
    }

    getLagerwertInput = function () {
        return this.lagerwertInput.getAttribute('value');
    }

    setSicherheitsbestandInput = function (sicherheitsbestand) {
        this.sicherheitsbestandInput.sendKeys(sicherheitsbestand);
    }

    getSicherheitsbestandInput = function () {
        return this.sicherheitsbestandInput.getAttribute('value');
    }

    setVertriebswunschInput = function (vertriebswunsch) {
        this.vertriebswunschInput.sendKeys(vertriebswunsch);
    }

    getVertriebswunschInput = function () {
        return this.vertriebswunschInput.getAttribute('value');
    }

    setVertriebswunsch_naechsteInput = function (vertriebswunsch_naechste) {
        this.vertriebswunsch_naechsteInput.sendKeys(vertriebswunsch_naechste);
    }

    getVertriebswunsch_naechsteInput = function () {
        return this.vertriebswunsch_naechsteInput.getAttribute('value');
    }

    setVertriebswunsch_uebernaechsteInput = function (vertriebswunsch_uebernaechste) {
        this.vertriebswunsch_uebernaechsteInput.sendKeys(vertriebswunsch_uebernaechste);
    }

    getVertriebswunsch_uebernaechsteInput = function () {
        return this.vertriebswunsch_uebernaechsteInput.getAttribute('value');
    }

    setVertriebswunsch_ueberuebernaechsteInput = function (vertriebswunsch_ueberuebernaechste) {
        this.vertriebswunsch_ueberuebernaechsteInput.sendKeys(vertriebswunsch_ueberuebernaechste);
    }

    getVertriebswunsch_ueberuebernaechsteInput = function () {
        return this.vertriebswunsch_ueberuebernaechsteInput.getAttribute('value');
    }

    setGesamtproduktionsmengeInput = function (gesamtproduktionsmenge) {
        this.gesamtproduktionsmengeInput.sendKeys(gesamtproduktionsmenge);
    }

    getGesamtproduktionsmengeInput = function () {
        return this.gesamtproduktionsmengeInput.getAttribute('value');
    }

    setDirektverkaufmengeInput = function (direktverkaufmenge) {
        this.direktverkaufmengeInput.sendKeys(direktverkaufmenge);
    }

    getDirektverkaufmengeInput = function () {
        return this.direktverkaufmengeInput.getAttribute('value');
    }

    setDirektverkaufspreisInput = function (direktverkaufspreis) {
        this.direktverkaufspreisInput.sendKeys(direktverkaufspreis);
    }

    getDirektverkaufspreisInput = function () {
        return this.direktverkaufspreisInput.getAttribute('value');
    }

    setStrafeInput = function (strafe) {
        this.strafeInput.sendKeys(strafe);
    }

    getStrafeInput = function () {
        return this.strafeInput.getAttribute('value');
    }

    setWarteliste_mengeInput = function (warteliste_menge) {
        this.warteliste_mengeInput.sendKeys(warteliste_menge);
    }

    getWarteliste_mengeInput = function () {
        return this.warteliste_mengeInput.getAttribute('value');
    }

    setInBearbeitung_mengeInput = function (inBearbeitung_menge) {
        this.inBearbeitung_mengeInput.sendKeys(inBearbeitung_menge);
    }

    getInBearbeitung_mengeInput = function () {
        return this.inBearbeitung_mengeInput.getAttribute('value');
    }

    subkomponenteSelectLastOption = function () {
        this.subkomponenteSelect.all(by.tagName('option')).last().click();
    }

    subkomponenteSelectOption = function (option) {
        this.subkomponenteSelect.sendKeys(option);
    }

    getSubkomponenteSelect = function () {
        return this.subkomponenteSelect;
    }

    getSubkomponenteSelectedOption = function () {
        return this.subkomponenteSelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
