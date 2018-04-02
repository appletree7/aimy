import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Bestellung e2e test', () => {

    let navBarPage: NavBarPage;
    let bestellungDialogPage: BestellungDialogPage;
    let bestellungComponentsPage: BestellungComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Bestellungs', () => {
        navBarPage.goToEntity('bestellung');
        bestellungComponentsPage = new BestellungComponentsPage();
        expect(bestellungComponentsPage.getTitle()).toMatch(/aimyApp.bestellung.home.title/);

    });

    it('should load create Bestellung dialog', () => {
        bestellungComponentsPage.clickOnCreateButton();
        bestellungDialogPage = new BestellungDialogPage();
        expect(bestellungDialogPage.getModalTitle()).toMatch(/aimyApp.bestellung.home.createOrEditLabel/);
        bestellungDialogPage.close();
    });

   /* it('should create and save Bestellungs', () => {
        bestellungComponentsPage.clickOnCreateButton();
        bestellungDialogPage.setPeriodeInput('5');
        expect(bestellungDialogPage.getPeriodeInput()).toMatch('5');
        bestellungDialogPage.setNummerInput('5');
        expect(bestellungDialogPage.getNummerInput()).toMatch('5');
        bestellungDialogPage.setLieferzeitInput('5');
        expect(bestellungDialogPage.getLieferzeitInput()).toMatch('5');
        bestellungDialogPage.setKaufmengeInput('5');
        expect(bestellungDialogPage.getKaufmengeInput()).toMatch('5');
        bestellungDialogPage.setMaterialkostenInput('5');
        expect(bestellungDialogPage.getMaterialkostenInput()).toMatch('5');
        bestellungDialogPage.setBestellkostenInput('5');
        expect(bestellungDialogPage.getBestellkostenInput()).toMatch('5');
        bestellungDialogPage.setGesamtkostenInput('5');
        expect(bestellungDialogPage.getGesamtkostenInput()).toMatch('5');
        bestellungDialogPage.setStueckkostenInput('5');
        expect(bestellungDialogPage.getStueckkostenInput()).toMatch('5');
        bestellungDialogPage.bestellstatusSelectLastOption();
        bestellungDialogPage.modusSelectLastOption();
        bestellungDialogPage.kaufteilSelectLastOption();
        bestellungDialogPage.save();
        expect(bestellungDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); */

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BestellungComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-bestellung div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BestellungDialogPage {
    modalTitle = element(by.css('h4#myBestellungLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    periodeInput = element(by.css('input#field_periode'));
    nummerInput = element(by.css('input#field_nummer'));
    lieferzeitInput = element(by.css('input#field_lieferzeit'));
    kaufmengeInput = element(by.css('input#field_kaufmenge'));
    materialkostenInput = element(by.css('input#field_materialkosten'));
    bestellkostenInput = element(by.css('input#field_bestellkosten'));
    gesamtkostenInput = element(by.css('input#field_gesamtkosten'));
    stueckkostenInput = element(by.css('input#field_stueckkosten'));
    bestellstatusSelect = element(by.css('select#field_bestellstatus'));
    modusSelect = element(by.css('select#field_modus'));
    kaufteilSelect = element(by.css('select#field_kaufteil'));

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

    setLieferzeitInput = function (lieferzeit) {
        this.lieferzeitInput.sendKeys(lieferzeit);
    }

    getLieferzeitInput = function () {
        return this.lieferzeitInput.getAttribute('value');
    }

    setKaufmengeInput = function (kaufmenge) {
        this.kaufmengeInput.sendKeys(kaufmenge);
    }

    getKaufmengeInput = function () {
        return this.kaufmengeInput.getAttribute('value');
    }

    setMaterialkostenInput = function (materialkosten) {
        this.materialkostenInput.sendKeys(materialkosten);
    }

    getMaterialkostenInput = function () {
        return this.materialkostenInput.getAttribute('value');
    }

    setBestellkostenInput = function (bestellkosten) {
        this.bestellkostenInput.sendKeys(bestellkosten);
    }

    getBestellkostenInput = function () {
        return this.bestellkostenInput.getAttribute('value');
    }

    setGesamtkostenInput = function (gesamtkosten) {
        this.gesamtkostenInput.sendKeys(gesamtkosten);
    }

    getGesamtkostenInput = function () {
        return this.gesamtkostenInput.getAttribute('value');
    }

    setStueckkostenInput = function (stueckkosten) {
        this.stueckkostenInput.sendKeys(stueckkosten);
    }

    getStueckkostenInput = function () {
        return this.stueckkostenInput.getAttribute('value');
    }

    setBestellstatusSelect = function (bestellstatus) {
        this.bestellstatusSelect.sendKeys(bestellstatus);
    }

    getBestellstatusSelect = function () {
        return this.bestellstatusSelect.element(by.css('option:checked')).getText();
    }

    bestellstatusSelectLastOption = function () {
        this.bestellstatusSelect.all(by.tagName('option')).last().click();
    }
    modusSelectLastOption = function () {
        this.modusSelect.all(by.tagName('option')).last().click();
    }

    modusSelectOption = function (option) {
        this.modusSelect.sendKeys(option);
    }

    getModusSelect = function () {
        return this.modusSelect;
    }

    getModusSelectedOption = function () {
        return this.modusSelect.element(by.css('option:checked')).getText();
    }

    kaufteilSelectLastOption = function () {
        this.kaufteilSelect.all(by.tagName('option')).last().click();
    }

    kaufteilSelectOption = function (option) {
        this.kaufteilSelect.sendKeys(option);
    }

    getKaufteilSelect = function () {
        return this.kaufteilSelect;
    }

    getKaufteilSelectedOption = function () {
        return this.kaufteilSelect.element(by.css('option:checked')).getText();
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
