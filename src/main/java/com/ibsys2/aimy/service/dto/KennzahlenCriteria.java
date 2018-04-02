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
 * Criteria class for the Kennzahlen entity. This class is used in KennzahlenResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /kennzahlens?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class KennzahlenCriteria implements Serializable {
    private static final long serialVersionUID = 1L;


    private LongFilter id;

    private IntegerFilter periode;

    private StringFilter name;

    private DoubleFilter aktuell;

    private DoubleFilter durchschnitt;

    private DoubleFilter gesamt;

    public KennzahlenCriteria() {
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

    public StringFilter getName() {
        return name;
    }

    public void setName(StringFilter name) {
        this.name = name;
    }

    public DoubleFilter getAktuell() {
        return aktuell;
    }

    public void setAktuell(DoubleFilter aktuell) {
        this.aktuell = aktuell;
    }

    public DoubleFilter getDurchschnitt() {
        return durchschnitt;
    }

    public void setDurchschnitt(DoubleFilter durchschnitt) {
        this.durchschnitt = durchschnitt;
    }

    public DoubleFilter getGesamt() {
        return gesamt;
    }

    public void setGesamt(DoubleFilter gesamt) {
        this.gesamt = gesamt;
    }

    @Override
    public String toString() {
        return "KennzahlenCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (periode != null ? "periode=" + periode + ", " : "") +
                (name != null ? "name=" + name + ", " : "") +
                (aktuell != null ? "aktuell=" + aktuell + ", " : "") +
                (durchschnitt != null ? "durchschnitt=" + durchschnitt + ", " : "") +
                (gesamt != null ? "gesamt=" + gesamt + ", " : "") +
            "}";
    }

}
