import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Fertigungsauftrag e2e test', () => {

    let navBarPage: NavBarPage;
    let fertigungsauftragDialogPage: FertigungsauftragDialogPage;
    let fertigungsauftragComponentsPage: FertigungsauftragComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Fertigungsauftrags', () => {
        navBarPage.goToEntity('fertigungsauftrag');
        fertigungsauftragComponentsPage = new FertigungsauftragComponentsPage();
        expect(fertigungsauftragComponentsPage.getTitle()).toMatch(/aimyApp.fertigungsauftrag.home.title/);

    });

    it('should load create Fertigungsauftrag dialog', () => {
        fertigungsauftragComponentsPage.clickOnCreateButton();
        fertigungsauftragDialogPage = new FertigungsauftragDialogPage();
        expect(fertigungsauftragDialogPage.getModalTitle()).toMatch(/aimyApp.fertigungsauftrag.home.createOrEditLabel/);
        fertigungsauftragDialogPage.close();
    });

    it('should create and save Fertigungsauftrags', () => {
        fertigungsauftragComponentsPage.clickOnCreateButton();
        fertigungsauftragDialogPage.setPeriodeInput('5');
        expect(fertigungsauftragDialogPage.getPeriodeInput()).toMatch('5');
        fertigungsauftragDialogPage.setNummerInput('5');
        expect(fertigungsauftragDialogPage.getNummerInput()).toMatch('5');
        fertigungsauftragDialogPage.setAuftragsmengeInput('5');
        expect(fertigungsauftragDialogPage.getAuftragsmengeInput()).toMatch('5');
        fertigungsauftragDialogPage.setKostenInput('5');
        expect(fertigungsauftragDialogPage.getKostenInput()).toMatch('5');
        fertigungsauftragDialogPage.setDurchschnittlichestueckkostenInput('5');
        expect(fertigungsauftragDialogPage.getDurchschnittlichestueckkostenInput()).toMatch('5');
        fertigungsauftragDialogPage.auftragsstatusSelectLastOption();
        fertigungsauftragDialogPage.setBegonnenInput('begonnen');
        expect(fertigungsauftragDialogPage.getBegonnenInput()).toMatch('begonnen');
        fertigungsauftragDialogPage.setBeendetInput('beendet');
        expect(fertigungsauftragDialogPage.getBeendetInput()).toMatch('beendet');
        fertigungsauftragDialogPage.setDlzminimalInput('5');
        expect(fertigungsauftragDialogPage.getDlzminimalInput()).toMatch('5');
        fertigungsauftragDialogPage.setDlzFaktorInput('5');
        expect(fertigungsauftragDialogPage.getDlzFaktorInput()).toMatch('5');
        fertigungsauftragDialogPage.setBearbeitungszeitminInput('5');
        expect(fertigungsauftragDialogPage.getBearbeitungszeitminInput()).toMatch('5');
        fertigungsauftragDialogPage.herstellteilSelectLastOption();
        fertigungsauftragDialogPage.save();
        expect(fertigungsauftragDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class FertigungsauftragComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-fertigungsauftrag div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class FertigungsauftragDialogPage {
    modalTitle = element(by.css('h4#myFertigungsauftragLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    periodeInput = element(by.css('input#field_periode'));
    nummerInput = element(by.css('input#field_nummer'));
    auftragsmengeInput = element(by.css('input#field_auftragsmenge'));
    kostenInput = element(by.css('input#field_kosten'));
    durchschnittlichestueckkostenInput = element(by.css('input#field_durchschnittlichestueckkosten'));
    auftragsstatusSelect = element(by.css('select#field_auftragsstatus'));
    begonnenInput = element(by.css('input#field_begonnen'));
    beendetInput = element(by.css('input#field_beendet'));
    dlzminimalInput = element(by.css('input#field_dlzminimal'));
    dlzFaktorInput = element(by.css('input#field_dlzFaktor'));
    bearbeitungszeitminInput = element(by.css('input#field_bearbeitungszeitmin'));
    herstellteilSelect = element(by.css('select#field_herstellteil'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
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

    setAuftragsmengeInput = function (auftragsmenge) {
        this.auftragsmengeInput.sendKeys(auftragsmenge);
    }

    getAuftragsmengeInput = function () {
        return this.auftragsmengeInput.getAttribute('value');
    }

    setKostenInput = function (kosten) {
        this.kostenInput.sendKeys(kosten);
    }

    getKostenInput = function () {
        return this.kostenInput.getAttribute('value');
    }

    setDurchschnittlichestueckkostenInput = function (durchschnittlichestueckkosten) {
        this.durchschnittlichestueckkostenInput.sendKeys(durchschnittlichestueckkosten);
    }

    getDurchschnittlichestueckkostenInput = function () {
        return this.durchschnittlichestueckkostenInput.getAttribute('value');
    }

    setAuftragsstatusSelect = function (auftragsstatus) {
        this.auftragsstatusSelect.sendKeys(auftragsstatus);
    }

    getAuftragsstatusSelect = function () {
        return this.auftragsstatusSelect.element(by.css('option:checked')).getText();
    }

    auftragsstatusSelectLastOption = function () {
        this.auftragsstatusSelect.all(by.tagName('option')).last().click();
    }
    setBegonnenInput = function (begonnen) {
        this.begonnenInput.sendKeys(begonnen);
    }

    getBegonnenInput = function () {
        return this.begonnenInput.getAttribute('value');
    }

    setBeendetInput = function (beendet) {
        this.beendetInput.sendKeys(beendet);
    }

    getBeendetInput = function () {
        return this.beendetInput.getAttribute('value');
    }

    setDlzminimalInput = function (dlzminimal) {
        this.dlzminimalInput.sendKeys(dlzminimal);
    }

    getDlzminimalInput = function () {
        return this.dlzminimalInput.getAttribute('value');
    }

    setDlzFaktorInput = function (dlzFaktor) {
        this.dlzFaktorInput.sendKeys(dlzFaktor);
    }

    getDlzFaktorInput = function () {
        return this.dlzFaktorInput.getAttribute('value');
    }

    setBearbeitungszeitminInput = function (bearbeitungszeitmin) {
        this.bearbeitungszeitminInput.sendKeys(bearbeitungszeitmin);
    }

    getBearbeitungszeitminInput = function () {
        return this.bearbeitungszeitminInput.getAttribute('value');
    }

    herstellteilSelectLastOption = function () {
        this.herstellteilSelect.all(by.tagName('option')).last().click();
    }

    herstellteilSelectOption = function (option) {
        this.herstellteilSelect.sendKeys(option);
    }

    getHerstellteilSelect = function () {
        return this.herstellteilSelect;
    }

    getHerstellteilSelectedOption = function () {
        return this.herstellteilSelect.element(by.css('option:checked')).getText();
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
