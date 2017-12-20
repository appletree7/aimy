import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Kennzahlen e2e test', () => {

    let navBarPage: NavBarPage;
    let kennzahlenDialogPage: KennzahlenDialogPage;
    let kennzahlenComponentsPage: KennzahlenComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Kennzahlens', () => {
        navBarPage.goToEntity('kennzahlen');
        kennzahlenComponentsPage = new KennzahlenComponentsPage();
        expect(kennzahlenComponentsPage.getTitle()).toMatch(/aimyApp.kennzahlen.home.title/);

    });

    it('should load create Kennzahlen dialog', () => {
        kennzahlenComponentsPage.clickOnCreateButton();
        kennzahlenDialogPage = new KennzahlenDialogPage();
        expect(kennzahlenDialogPage.getModalTitle()).toMatch(/aimyApp.kennzahlen.home.createOrEditLabel/);
        kennzahlenDialogPage.close();
    });

    it('should create and save Kennzahlens', () => {
        kennzahlenComponentsPage.clickOnCreateButton();
        kennzahlenDialogPage.setPeriodeInput('5');
        expect(kennzahlenDialogPage.getPeriodeInput()).toMatch('5');
        kennzahlenDialogPage.setNameInput('name');
        expect(kennzahlenDialogPage.getNameInput()).toMatch('name');
        kennzahlenDialogPage.setAktuellInput('5');
        expect(kennzahlenDialogPage.getAktuellInput()).toMatch('5');
        kennzahlenDialogPage.setDurchschnittInput('5');
        expect(kennzahlenDialogPage.getDurchschnittInput()).toMatch('5');
        kennzahlenDialogPage.setGesamtInput('5');
        expect(kennzahlenDialogPage.getGesamtInput()).toMatch('5');
        kennzahlenDialogPage.save();
        expect(kennzahlenDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class KennzahlenComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-kennzahlen div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class KennzahlenDialogPage {
    modalTitle = element(by.css('h4#myKennzahlenLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    periodeInput = element(by.css('input#field_periode'));
    nameInput = element(by.css('input#field_name'));
    aktuellInput = element(by.css('input#field_aktuell'));
    durchschnittInput = element(by.css('input#field_durchschnitt'));
    gesamtInput = element(by.css('input#field_gesamt'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setPeriodeInput = function (periode) {
        this.periodeInput.sendKeys(periode);
    }

    getPeriodeInput = function () {
        return this.periodeInput.getAttribute('value');
    }

    setNameInput = function (name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function () {
        return this.nameInput.getAttribute('value');
    }

    setAktuellInput = function (aktuell) {
        this.aktuellInput.sendKeys(aktuell);
    }

    getAktuellInput = function () {
        return this.aktuellInput.getAttribute('value');
    }

    setDurchschnittInput = function (durchschnitt) {
        this.durchschnittInput.sendKeys(durchschnitt);
    }

    getDurchschnittInput = function () {
        return this.durchschnittInput.getAttribute('value');
    }

    setGesamtInput = function (gesamt) {
        this.gesamtInput.sendKeys(gesamt);
    }

    getGesamtInput = function () {
        return this.gesamtInput.getAttribute('value');
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
