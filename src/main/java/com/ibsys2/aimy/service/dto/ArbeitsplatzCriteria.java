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
 * Criteria class for the Arbeitsplatz entity. This class is used in ArbeitsplatzResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /arbeitsplatzs?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class ArbeitsplatzCriteria implements Serializable {
    private static final long serialVersionUID = 1L;


    private LongFilter id;

    private IntegerFilter periode;

    private IntegerFilter nummer;

    private DoubleFilter restzeitbedarf;

    private IntegerFilter ruestvorgaenge;

    private DoubleFilter leerzeit;

    private DoubleFilter lohnleerkosten;

    private DoubleFilter lohnkosten;

    private DoubleFilter maschinenstillstandkosten;

    private DoubleFilter restzeitbedarf_in_bearbeitung;

    private IntegerFilter schicht;

    private DoubleFilter ueberstunden;

    public ArbeitsplatzCriteria() {
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public IntegerFilter getPeriode() {
        return periode;
    }

    public void setPeriode(IntegerFilter periode) {
        this.periode = periode;
    }

    public IntegerFilter getNummer() {
        return nummer;
    }

    public void setNummer(IntegerFilter nummer) {
        this.nummer = nummer;
    }

    public DoubleFilter getRestzeitbedarf() {
        return restzeitbedarf;
    }

    public void setRestzeitbedarf(DoubleFilter restzeitbedarf) {
        this.restzeitbedarf = restzeitbedarf;
    }

    public IntegerFilter getRuestvorgaenge() {
        return ruestvorgaenge;
    }

    public void setRuestvorgaenge(IntegerFilter ruestvorgaenge) {
        this.ruestvorgaenge = ruestvorgaenge;
    }

    public DoubleFilter getLeerzeit() {
        return leerzeit;
    }

    public void setLeerzeit(DoubleFilter leerzeit) {
        this.leerzeit = leerzeit;
    }

    public DoubleFilter getLohnleerkosten() {
        return lohnleerkosten;
    }

    public void setLohnleerkosten(DoubleFilter lohnleerkosten) {
        this.lohnleerkosten = lohnleerkosten;
    }

    public DoubleFilter getLohnkosten() {
        return lohnkosten;
    }

    public void setLohnkosten(DoubleFilter lohnkosten) {
        this.lohnkosten = lohnkosten;
    }

    public DoubleFilter getMaschinenstillstandkosten() {
        return maschinenstillstandkosten;
    }

    public void setMaschinenstillstandkosten(DoubleFilter maschinenstillstandkosten) {
        this.maschinenstillstandkosten = maschinenstillstandkosten;
    }

    public DoubleFilter getRestzeitbedarf_in_bearbeitung() {
        return restzeitbedarf_in_bearbeitung;
    }

    public void setRestzeitbedarf_in_bearbeitung(DoubleFilter restzeitbedarf_in_bearbeitung) {
        this.restzeitbedarf_in_bearbeitung = restzeitbedarf_in_bearbeitung;
    }

    public IntegerFilter getSchicht() {
        return schicht;
    }

    public void setSchicht(IntegerFilter schicht) {
        this.schicht = schicht;
    }

    public DoubleFilter getUeberstunden() {
        return ueberstunden;
    }

    public void setUeberstunden(DoubleFilter ueberstunden) {
        this.ueberstunden = ueberstunden;
    }

    @Override
    public String toString() {
        return "ArbeitsplatzCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (periode != null ? "periode=" + periode + ", " : "") +
                (nummer != null ? "nummer=" + nummer + ", " : "") +
                (restzeitbedarf != null ? "restzeitbedarf=" + restzeitbedarf + ", " : "") +
                (ruestvorgaenge != null ? "ruestvorgaenge=" + ruestvorgaenge + ", " : "") +
                (leerzeit != null ? "leerzeit=" + leerzeit + ", " : "") +
                (lohnleerkosten != null ? "lohnleerkosten=" + lohnleerkosten + ", " : "") +
                (lohnkosten != null ? "lohnkosten=" + lohnkosten + ", " : "") +
                (maschinenstillstandkosten != null ? "maschinenstillstandkosten=" + maschinenstillstandkosten + ", " : "") +
                (restzeitbedarf_in_bearbeitung != null ? "restzeitbedarf_in_bearbeitung=" + restzeitbedarf_in_bearbeitung + ", " : "") +
                (schicht != null ? "schicht=" + schicht + ", " : "") +
                (ueberstunden != null ? "ueberstunden=" + ueberstunden + ", " : "") +
            "}";
    }

}
