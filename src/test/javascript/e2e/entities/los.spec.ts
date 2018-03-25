import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Los e2e test', () => {

    let navBarPage: NavBarPage;
    let losDialogPage: LosDialogPage;
    let losComponentsPage: LosComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Los', () => {
        navBarPage.goToEntity('los');
        losComponentsPage = new LosComponentsPage();
        expect(losComponentsPage.getTitle()).toMatch(/aimyApp.los.home.title/);

    });

    it('should load create Los dialog', () => {
        losComponentsPage.clickOnCreateButton();
        losDialogPage = new LosDialogPage();
        expect(losDialogPage.getModalTitle()).toMatch(/aimyApp.los.home.createOrEditLabel/);
        losDialogPage.close();
    });

    it('should create and save Los', () => {
        losComponentsPage.clickOnCreateButton();
        losDialogPage.setPeriodeInput('5');
        expect(losDialogPage.getPeriodeInput()).toMatch('5');
        losDialogPage.setMengeInput('5');
        expect(losDialogPage.getMengeInput()).toMatch('5');
        losDialogPage.setDurchlaufzeitInput('5');
        expect(losDialogPage.getDurchlaufzeitInput()).toMatch('5');
        losDialogPage.setKostenInput('5');
        expect(losDialogPage.getKostenInput()).toMatch('5');
        losDialogPage.setNummerInput('5');
        expect(losDialogPage.getNummerInput()).toMatch('5');
        losDialogPage.save();
        expect(losDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class LosComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-los div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class LosDialogPage {
    modalTitle = element(by.css('h4#myLosLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    periodeInput = element(by.css('input#field_periode'));
    mengeInput = element(by.css('input#field_menge'));
    durchlaufzeitInput = element(by.css('input#field_durchlaufzeit'));
    kostenInput = element(by.css('input#field_kosten'));
    nummerInput = element(by.css('input#field_nummer'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setPeriodeInput = function (periode) {
        this.periodeInput.sendKeys(periode);
    }

    getPeriodeInput = function () {
        return this.periodeInput.getAttribute('value');
    }

    setMengeInput = function (menge) {
        this.mengeInput.sendKeys(menge);
    }

    getMengeInput = function () {
        return this.mengeInput.getAttribute('value');
    }

    setDurchlaufzeitInput = function (durchlaufzeit) {
        this.durchlaufzeitInput.sendKeys(durchlaufzeit);
    }

    getDurchlaufzeitInput = function () {
        return this.durchlaufzeitInput.getAttribute('value');
    }

    setKostenInput = function (kosten) {
        this.kostenInput.sendKeys(kosten);
    }

    getKostenInput = function () {
        return this.kostenInput.getAttribute('value');
    }

    setNummerInput = function (nummer) {
        this.nummerInput.sendKeys(nummer);
    }

    getNummerInput = function () {
        return this.nummerInput.getAttribute('value');
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
