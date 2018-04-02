package com.ibsys2.aimy.service.dto;

import java.io.Serializable;
import com.ibsys2.aimy.domain.enumeration.Teiltyp;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;






/**
 * Criteria class for the Teil entity. This class is used in TeilResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /teils?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class TeilCriteria implements Serializable {
    /**
     * Class for filtering Teiltyp
     */
    public static class TeiltypFilter extends Filter<Teiltyp> {
    }

    private static final long serialVersionUID = 1L;


    private LongFilter id;

    private TeiltypFilter teiltyp;

    private IntegerFilter periode;

    private IntegerFilter nummer;

    private IntegerFilter istmenge;

    private IntegerFilter startmenge;

    private DoubleFilter prozentsatz;

    private DoubleFilter lagerpreis;

    private DoubleFilter lagerwert;

    private IntegerFilter sicherheitsbestand;

    private IntegerFilter vertriebswunsch;

    private IntegerFilter gesamtproduktionsmenge;

    private IntegerFilter direktverkaufmenge;

    private DoubleFilter direktverkaufspreis;

    private DoubleFilter strafe;

    private LongFilter subkomponenteId;

    public TeilCriteria() {
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public TeiltypFilter getTeiltyp() {
        return teiltyp;
    }

    public void setTeiltyp(TeiltypFilter teiltyp) {
        this.teiltyp = teiltyp;
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

    public IntegerFilter getIstmenge() {
        return istmenge;
    }

    public void setIstmenge(IntegerFilter istmenge) {
        this.istmenge = istmenge;
    }

    public IntegerFilter getStartmenge() {
        return startmenge;
    }

    public void setStartmenge(IntegerFilter startmenge) {
        this.startmenge = startmenge;
    }

    public DoubleFilter getProzentsatz() {
        return prozentsatz;
    }

    public void setProzentsatz(DoubleFilter prozentsatz) {
        this.prozentsatz = prozentsatz;
    }

    public DoubleFilter getLagerpreis() {
        return lagerpreis;
    }

    public void setLagerpreis(DoubleFilter lagerpreis) {
        this.lagerpreis = lagerpreis;
    }

    public DoubleFilter getLagerwert() {
        return lagerwert;
    }

    public void setLagerwert(DoubleFilter lagerwert) {
        this.lagerwert = lagerwert;
    }

    public IntegerFilter getSicherheitsbestand() {
        return sicherheitsbestand;
    }

    public void setSicherheitsbestand(IntegerFilter sicherheitsbestand) {
        this.sicherheitsbestand = sicherheitsbestand;
    }

    public IntegerFilter getVertriebswunsch() {
        return vertriebswunsch;
    }

    public void setVertriebswunsch(IntegerFilter vertriebswunsch) {
        this.vertriebswunsch = vertriebswunsch;
    }

    public IntegerFilter getGesamtproduktionsmenge() {
        return gesamtproduktionsmenge;
    }

    public void setGesamtproduktionsmenge(IntegerFilter gesamtproduktionsmenge) {
        this.gesamtproduktionsmenge = gesamtproduktionsmenge;
    }

    public IntegerFilter getDirektverkaufmenge() {
        return direktverkaufmenge;
    }

    public void setDirektverkaufmenge(IntegerFilter direktverkaufmenge) {
        this.direktverkaufmenge = direktverkaufmenge;
    }

    public DoubleFilter getDirektverkaufspreis() {
        return direktverkaufspreis;
    }

    public void setDirektverkaufspreis(DoubleFilter direktverkaufspreis) {
        this.direktverkaufspreis = direktverkaufspreis;
    }

    public DoubleFilter getStrafe() {
        return strafe;
    }

    public void setStrafe(DoubleFilter strafe) {
        this.strafe = strafe;
    }

    public LongFilter getSubkomponenteId() {
        return subkomponenteId;
    }

    public void setSubkomponenteId(LongFilter subkomponenteId) {
        this.subkomponenteId = subkomponenteId;
    }

    @Override
    public String toString() {
        return "TeilCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (teiltyp != null ? "teiltyp=" + teiltyp + ", " : "") +
                (periode != null ? "periode=" + periode + ", " : "") +
                (nummer != null ? "nummer=" + nummer + ", " : "") +
                (istmenge != null ? "istmenge=" + istmenge + ", " : "") +
                (startmenge != null ? "startmenge=" + startmenge + ", " : "") +
                (prozentsatz != null ? "prozentsatz=" + prozentsatz + ", " : "") +
                (lagerpreis != null ? "lagerpreis=" + lagerpreis + ", " : "") +
                (lagerwert != null ? "lagerwert=" + lagerwert + ", " : "") +
                (sicherheitsbestand != null ? "sicherheitsbestand=" + sicherheitsbestand + ", " : "") +
                (vertriebswunsch != null ? "vertriebswunsch=" + vertriebswunsch + ", " : "") +
                (gesamtproduktionsmenge != null ? "gesamtproduktionsmenge=" + gesamtproduktionsmenge + ", " : "") +
                (direktverkaufmenge != null ? "direktverkaufmenge=" + direktverkaufmenge + ", " : "") +
                (direktverkaufspreis != null ? "direktverkaufspreis=" + direktverkaufspreis + ", " : "") +
                (strafe != null ? "strafe=" + strafe + ", " : "") +
                (subkomponenteId != null ? "subkomponenteId=" + subkomponenteId + ", " : "") +
            "}";
    }

}
