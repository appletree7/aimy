package com.ibsys2.aimy.service.dto;

import java.io.Serializable;
import com.ibsys2.aimy.domain.enumeration.Bestellstatus;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;






/**
 * Criteria class for the Bestellung entity. This class is used in BestellungResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /bestellungs?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class BestellungCriteria implements Serializable {
    /**
     * Class for filtering Bestellstatus
     */
    public static class BestellstatusFilter extends Filter<Bestellstatus> {
    }

    private static final long serialVersionUID = 1L;


    private LongFilter id;

    private IntegerFilter periode;

    private IntegerFilter nummer;

    private DoubleFilter lieferzeit;

    private IntegerFilter kaufmenge;

    private DoubleFilter materialkosten;

    private DoubleFilter bestellkosten;

    private DoubleFilter gesamtkosten;

    private DoubleFilter stueckkosten;

    private BestellstatusFilter bestellstatus;

    private LongFilter modusId;

    private LongFilter kaufteilId;

    public BestellungCriteria() {
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

    public DoubleFilter getLieferzeit() {
        return lieferzeit;
    }

    public void setLieferzeit(DoubleFilter lieferzeit) {
        this.lieferzeit = lieferzeit;
    }

    public IntegerFilter getKaufmenge() {
        return kaufmenge;
    }

    public void setKaufmenge(IntegerFilter kaufmenge) {
        this.kaufmenge = kaufmenge;
    }

    public DoubleFilter getMaterialkosten() {
        return materialkosten;
    }

    public void setMaterialkosten(DoubleFilter materialkosten) {
        this.materialkosten = materialkosten;
    }

    public DoubleFilter getBestellkosten() {
        return bestellkosten;
    }

    public void setBestellkosten(DoubleFilter bestellkosten) {
        this.bestellkosten = bestellkosten;
    }

    public DoubleFilter getGesamtkosten() {
        return gesamtkosten;
    }

    public void setGesamtkosten(DoubleFilter gesamtkosten) {
        this.gesamtkosten = gesamtkosten;
    }

    public DoubleFilter getStueckkosten() {
        return stueckkosten;
    }

    public void setStueckkosten(DoubleFilter stueckkosten) {
        this.stueckkosten = stueckkosten;
    }

    public BestellstatusFilter getBestellstatus() {
        return bestellstatus;
    }

    public void setBestellstatus(BestellstatusFilter bestellstatus) {
        this.bestellstatus = bestellstatus;
    }

    public LongFilter getModusId() {
        return modusId;
    }

    public void setModusId(LongFilter modusId) {
        this.modusId = modusId;
    }

    public LongFilter getKaufteilId() {
        return kaufteilId;
    }

    public void setKaufteilId(LongFilter kaufteilId) {
        this.kaufteilId = kaufteilId;
    }

    @Override
    public String toString() {
        return "BestellungCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (periode != null ? "periode=" + periode + ", " : "") +
                (nummer != null ? "nummer=" + nummer + ", " : "") +
                (lieferzeit != null ? "lieferzeit=" + lieferzeit + ", " : "") +
                (kaufmenge != null ? "kaufmenge=" + kaufmenge + ", " : "") +
                (materialkosten != null ? "materialkosten=" + materialkosten + ", " : "") +
                (bestellkosten != null ? "bestellkosten=" + bestellkosten + ", " : "") +
                (gesamtkosten != null ? "gesamtkosten=" + gesamtkosten + ", " : "") +
                (stueckkosten != null ? "stueckkosten=" + stueckkosten + ", " : "") +
                (bestellstatus != null ? "bestellstatus=" + bestellstatus + ", " : "") +
                (modusId != null ? "modusId=" + modusId + ", " : "") +
                (kaufteilId != null ? "kaufteilId=" + kaufteilId + ", " : "") +
            "}";
    }

}
