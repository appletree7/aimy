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
 * Criteria class for the Los entity. This class is used in LosResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /los?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class LosCriteria implements Serializable {
    private static final long serialVersionUID = 1L;


    private LongFilter id;

    private IntegerFilter periode;

    private IntegerFilter nummer;

    private IntegerFilter menge;

    private DoubleFilter durchlaufzeit;

    private DoubleFilter kosten;

    public LosCriteria() {
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

    public IntegerFilter getMenge() {
        return menge;
    }

    public void setMenge(IntegerFilter menge) {
        this.menge = menge;
    }

    public DoubleFilter getDurchlaufzeit() {
        return durchlaufzeit;
    }

    public void setDurchlaufzeit(DoubleFilter durchlaufzeit) {
        this.durchlaufzeit = durchlaufzeit;
    }

    public DoubleFilter getKosten() {
        return kosten;
    }

    public void setKosten(DoubleFilter kosten) {
        this.kosten = kosten;
    }

    @Override
    public String toString() {
        return "LosCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (periode != null ? "periode=" + periode + ", " : "") +
                (nummer != null ? "nummer=" + nummer + ", " : "") +
                (menge != null ? "menge=" + menge + ", " : "") +
                (durchlaufzeit != null ? "durchlaufzeit=" + durchlaufzeit + ", " : "") +
                (kosten != null ? "kosten=" + kosten + ", " : "") +
            "}";
    }

}
