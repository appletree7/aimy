package com.ibsys2.aimy.service.dto;

import java.io.Serializable;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;






/**
 * Criteria class for the Modus entity. This class is used in ModusResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /moduses?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class ModusCriteria implements Serializable {
    private static final long serialVersionUID = 1L;


    private LongFilter id;

    private StringFilter name;

    private DoubleFilter bearbeitungsfaktor;

    private DoubleFilter bearbeitungsabweichung;

    private DoubleFilter lieferfaktor;

    private DoubleFilter lieferabweichung;

    private DoubleFilter mengenfakor;

    private DoubleFilter mengenabweichung;

    private DoubleFilter preisfaktor;

    private DoubleFilter diskontfaktor;

    private DoubleFilter bestellkostenfaktor;

    public ModusCriteria() {
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getName() {
        return name;
    }

    public void setName(StringFilter name) {
        this.name = name;
    }

    public DoubleFilter getBearbeitungsfaktor() {
        return bearbeitungsfaktor;
    }

    public void setBearbeitungsfaktor(DoubleFilter bearbeitungsfaktor) {
        this.bearbeitungsfaktor = bearbeitungsfaktor;
    }

    public DoubleFilter getBearbeitungsabweichung() {
        return bearbeitungsabweichung;
    }

    public void setBearbeitungsabweichung(DoubleFilter bearbeitungsabweichung) {
        this.bearbeitungsabweichung = bearbeitungsabweichung;
    }

    public DoubleFilter getLieferfaktor() {
        return lieferfaktor;
    }

    public void setLieferfaktor(DoubleFilter lieferfaktor) {
        this.lieferfaktor = lieferfaktor;
    }

    public DoubleFilter getLieferabweichung() {
        return lieferabweichung;
    }

    public void setLieferabweichung(DoubleFilter lieferabweichung) {
        this.lieferabweichung = lieferabweichung;
    }

    public DoubleFilter getMengenfakor() {
        return mengenfakor;
    }

    public void setMengenfakor(DoubleFilter mengenfakor) {
        this.mengenfakor = mengenfakor;
    }

    public DoubleFilter getMengenabweichung() {
        return mengenabweichung;
    }

    public void setMengenabweichung(DoubleFilter mengenabweichung) {
        this.mengenabweichung = mengenabweichung;
    }

    public DoubleFilter getPreisfaktor() {
        return preisfaktor;
    }

    public void setPreisfaktor(DoubleFilter preisfaktor) {
        this.preisfaktor = preisfaktor;
    }

    public DoubleFilter getDiskontfaktor() {
        return diskontfaktor;
    }

    public void setDiskontfaktor(DoubleFilter diskontfaktor) {
        this.diskontfaktor = diskontfaktor;
    }

    public DoubleFilter getBestellkostenfaktor() {
        return bestellkostenfaktor;
    }

    public void setBestellkostenfaktor(DoubleFilter bestellkostenfaktor) {
        this.bestellkostenfaktor = bestellkostenfaktor;
    }

    @Override
    public String toString() {
        return "ModusCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (name != null ? "name=" + name + ", " : "") +
                (bearbeitungsfaktor != null ? "bearbeitungsfaktor=" + bearbeitungsfaktor + ", " : "") +
                (bearbeitungsabweichung != null ? "bearbeitungsabweichung=" + bearbeitungsabweichung + ", " : "") +
                (lieferfaktor != null ? "lieferfaktor=" + lieferfaktor + ", " : "") +
                (lieferabweichung != null ? "lieferabweichung=" + lieferabweichung + ", " : "") +
                (mengenfakor != null ? "mengenfakor=" + mengenfakor + ", " : "") +
                (mengenabweichung != null ? "mengenabweichung=" + mengenabweichung + ", " : "") +
                (preisfaktor != null ? "preisfaktor=" + preisfaktor + ", " : "") +
                (diskontfaktor != null ? "diskontfaktor=" + diskontfaktor + ", " : "") +
                (bestellkostenfaktor != null ? "bestellkostenfaktor=" + bestellkostenfaktor + ", " : "") +
            "}";
    }

}
