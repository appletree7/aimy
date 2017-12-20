import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Modus e2e test', () => {

    let navBarPage: NavBarPage;
    let modusDialogPage: ModusDialogPage;
    let modusComponentsPage: ModusComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Moduses', () => {
        navBarPage.goToEntity('modus');
        modusComponentsPage = new ModusComponentsPage();
        expect(modusComponentsPage.getTitle()).toMatch(/aimyApp.modus.home.title/);

    });

    it('should load create Modus dialog', () => {
        modusComponentsPage.clickOnCreateButton();
        modusDialogPage = new ModusDialogPage();
        expect(modusDialogPage.getModalTitle()).toMatch(/aimyApp.modus.home.createOrEditLabel/);
        modusDialogPage.close();
    });

    it('should create and save Moduses', () => {
        modusComponentsPage.clickOnCreateButton();
        modusDialogPage.setNameInput('name');
        expect(modusDialogPage.getNameInput()).toMatch('name');
        modusDialogPage.setBearbeitungsfaktorInput('5');
        expect(modusDialogPage.getBearbeitungsfaktorInput()).toMatch('5');
        modusDialogPage.setBearbeitungsabweichungInput('5');
        expect(modusDialogPage.getBearbeitungsabweichungInput()).toMatch('5');
        modusDialogPage.setLieferfaktorInput('5');
        expect(modusDialogPage.getLieferfaktorInput()).toMatch('5');
        modusDialogPage.setLieferabweichungInput('5');
        expect(modusDialogPage.getLieferabweichungInput()).toMatch('5');
        modusDialogPage.setMengenfakorInput('5');
        expect(modusDialogPage.getMengenfakorInput()).toMatch('5');
        modusDialogPage.setMengenabweichungInput('5');
        expect(modusDialogPage.getMengenabweichungInput()).toMatch('5');
        modusDialogPage.setPreisfaktorInput('5');
        expect(modusDialogPage.getPreisfaktorInput()).toMatch('5');
        modusDialogPage.setDiskontfaktorInput('5');
        expect(modusDialogPage.getDiskontfaktorInput()).toMatch('5');
        modusDialogPage.setBestellkostenfaktorInput('5');
        expect(modusDialogPage.getBestellkostenfaktorInput()).toMatch('5');
        modusDialogPage.save();
        expect(modusDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ModusComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-modus div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ModusDialogPage {
    modalTitle = element(by.css('h4#myModusLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    bearbeitungsfaktorInput = element(by.css('input#field_bearbeitungsfaktor'));
    bearbeitungsabweichungInput = element(by.css('input#field_bearbeitungsabweichung'));
    lieferfaktorInput = element(by.css('input#field_lieferfaktor'));
    lieferabweichungInput = element(by.css('input#field_lieferabweichung'));
    mengenfakorInput = element(by.css('input#field_mengenfakor'));
    mengenabweichungInput = element(by.css('input#field_mengenabweichung'));
    preisfaktorInput = element(by.css('input#field_preisfaktor'));
    diskontfaktorInput = element(by.css('input#field_diskontfaktor'));
    bestellkostenfaktorInput = element(by.css('input#field_bestellkostenfaktor'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function (name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function () {
        return this.nameInput.getAttribute('value');
    }

    setBearbeitungsfaktorInput = function (bearbeitungsfaktor) {
        this.bearbeitungsfaktorInput.sendKeys(bearbeitungsfaktor);
    }

    getBearbeitungsfaktorInput = function () {
        return this.bearbeitungsfaktorInput.getAttribute('value');
    }

    setBearbeitungsabweichungInput = function (bearbeitungsabweichung) {
        this.bearbeitungsabweichungInput.sendKeys(bearbeitungsabweichung);
    }

    getBearbeitungsabweichungInput = function () {
        return this.bearbeitungsabweichungInput.getAttribute('value');
    }

    setLieferfaktorInput = function (lieferfaktor) {
        this.lieferfaktorInput.sendKeys(lieferfaktor);
    }

    getLieferfaktorInput = function () {
        return this.lieferfaktorInput.getAttribute('value');
    }

    setLieferabweichungInput = function (lieferabweichung) {
        this.lieferabweichungInput.sendKeys(lieferabweichung);
    }

    getLieferabweichungInput = function () {
        return this.lieferabweichungInput.getAttribute('value');
    }

    setMengenfakorInput = function (mengenfakor) {
        this.mengenfakorInput.sendKeys(mengenfakor);
    }

    getMengenfakorInput = function () {
        return this.mengenfakorInput.getAttribute('value');
    }

    setMengenabweichungInput = function (mengenabweichung) {
        this.mengenabweichungInput.sendKeys(mengenabweichung);
    }

    getMengenabweichungInput = function () {
        return this.mengenabweichungInput.getAttribute('value');
    }

    setPreisfaktorInput = function (preisfaktor) {
        this.preisfaktorInput.sendKeys(preisfaktor);
    }

    getPreisfaktorInput = function () {
        return this.preisfaktorInput.getAttribute('value');
    }

    setDiskontfaktorInput = function (diskontfaktor) {
        this.diskontfaktorInput.sendKeys(diskontfaktor);
    }

    getDiskontfaktorInput = function () {
        return this.diskontfaktorInput.getAttribute('value');
    }

    setBestellkostenfaktorInput = function (bestellkostenfaktor) {
        this.bestellkostenfaktorInput.sendKeys(bestellkostenfaktor);
    }

    getBestellkostenfaktorInput = function () {
        return this.bestellkostenfaktorInput.getAttribute('value');
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
