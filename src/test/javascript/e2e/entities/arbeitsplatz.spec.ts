import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Arbeitsplatz e2e test', () => {

    let navBarPage: NavBarPage;
    let arbeitsplatzDialogPage: ArbeitsplatzDialogPage;
    let arbeitsplatzComponentsPage: ArbeitsplatzComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Arbeitsplatzs', () => {
        navBarPage.goToEntity('arbeitsplatz');
        arbeitsplatzComponentsPage = new ArbeitsplatzComponentsPage();
        expect(arbeitsplatzComponentsPage.getTitle()).toMatch(/aimyApp.arbeitsplatz.home.title/);

    });

    it('should load create Arbeitsplatz dialog', () => {
        arbeitsplatzComponentsPage.clickOnCreateButton();
        arbeitsplatzDialogPage = new ArbeitsplatzDialogPage();
        expect(arbeitsplatzDialogPage.getModalTitle()).toMatch(/aimyApp.arbeitsplatz.home.createOrEditLabel/);
        arbeitsplatzDialogPage.close();
    });

    it('should create and save Arbeitsplatzs', () => {
        arbeitsplatzComponentsPage.clickOnCreateButton();
        arbeitsplatzDialogPage.setPeriodeInput('5');
        expect(arbeitsplatzDialogPage.getPeriodeInput()).toMatch('5');
        arbeitsplatzDialogPage.setNummerInput('5');
        expect(arbeitsplatzDialogPage.getNummerInput()).toMatch('5');
        arbeitsplatzDialogPage.setRestzeitbedarfInput('5');
        expect(arbeitsplatzDialogPage.getRestzeitbedarfInput()).toMatch('5');
        arbeitsplatzDialogPage.setRuestvorgaengeInput('5');
        expect(arbeitsplatzDialogPage.getRuestvorgaengeInput()).toMatch('5');
        arbeitsplatzDialogPage.setLeerzeitInput('5');
        expect(arbeitsplatzDialogPage.getLeerzeitInput()).toMatch('5');
        arbeitsplatzDialogPage.setLohnleerkostenInput('5');
        expect(arbeitsplatzDialogPage.getLohnleerkostenInput()).toMatch('5');
        arbeitsplatzDialogPage.setLohnkostenInput('5');
        expect(arbeitsplatzDialogPage.getLohnkostenInput()).toMatch('5');
        arbeitsplatzDialogPage.setMaschinenstillstandkostenInput('5');
        expect(arbeitsplatzDialogPage.getMaschinenstillstandkostenInput()).toMatch('5');
        arbeitsplatzDialogPage.save();
        expect(arbeitsplatzDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ArbeitsplatzComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-arbeitsplatz div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ArbeitsplatzDialogPage {
    modalTitle = element(by.css('h4#myArbeitsplatzLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    periodeInput = element(by.css('input#field_periode'));
    nummerInput = element(by.css('input#field_nummer'));
    restzeitbedarfInput = element(by.css('input#field_restzeitbedarf'));
    ruestvorgaengeInput = element(by.css('input#field_ruestvorgaenge'));
    leerzeitInput = element(by.css('input#field_leerzeit'));
    lohnleerkostenInput = element(by.css('input#field_lohnleerkosten'));
    lohnkostenInput = element(by.css('input#field_lohnkosten'));
    maschinenstillstandkostenInput = element(by.css('input#field_maschinenstillstandkosten'));

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

    setRestzeitbedarfInput = function (restzeitbedarf) {
        this.restzeitbedarfInput.sendKeys(restzeitbedarf);
    }

    getRestzeitbedarfInput = function () {
        return this.restzeitbedarfInput.getAttribute('value');
    }

    setRuestvorgaengeInput = function (ruestvorgaenge) {
        this.ruestvorgaengeInput.sendKeys(ruestvorgaenge);
    }

    getRuestvorgaengeInput = function () {
        return this.ruestvorgaengeInput.getAttribute('value');
    }

    setLeerzeitInput = function (leerzeit) {
        this.leerzeitInput.sendKeys(leerzeit);
    }

    getLeerzeitInput = function () {
        return this.leerzeitInput.getAttribute('value');
    }

    setLohnleerkostenInput = function (lohnleerkosten) {
        this.lohnleerkostenInput.sendKeys(lohnleerkosten);
    }

    getLohnleerkostenInput = function () {
        return this.lohnleerkostenInput.getAttribute('value');
    }

    setLohnkostenInput = function (lohnkosten) {
        this.lohnkostenInput.sendKeys(lohnkosten);
    }

    getLohnkostenInput = function () {
        return this.lohnkostenInput.getAttribute('value');
    }

    setMaschinenstillstandkostenInput = function (maschinenstillstandkosten) {
        this.maschinenstillstandkostenInput.sendKeys(maschinenstillstandkosten);
    }

    getMaschinenstillstandkostenInput = function () {
        return this.maschinenstillstandkostenInput.getAttribute('value');
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
