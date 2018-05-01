package com.ibsys2.aimy.service.dto;

import java.io.Serializable;
import com.ibsys2.aimy.domain.enumeration.Auftragstatus;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;






/**
 * Criteria class for the Fertigungsauftrag entity. This class is used in FertigungsauftragResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /fertigungsauftrags?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class FertigungsauftragCriteria implements Serializable {
    /**
     * Class for filtering Auftragstatus
     */
    public static class AuftragstatusFilter extends Filter<Auftragstatus> {
    }

    private static final long serialVersionUID = 1L;


    private LongFilter id;

    private IntegerFilter periode;

    private IntegerFilter nummer;

    private IntegerFilter auftragsmenge;

    private DoubleFilter kosten;

    private DoubleFilter durchschnittlichestueckkosten;

    private AuftragstatusFilter auftragsstatus;

    private StringFilter begonnen;

    private StringFilter beendet;

    private IntegerFilter dlzminimal;

    private DoubleFilter dlzFaktor;

    private IntegerFilter bearbeitungszeitmin;

    private IntegerFilter warteliste_menge;

    private IntegerFilter inBearbeitung_menge;

    private LongFilter herstellteilId;

    public FertigungsauftragCriteria() {
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

    public IntegerFilter getAuftragsmenge() {
        return auftragsmenge;
    }

    public void setAuftragsmenge(IntegerFilter auftragsmenge) {
        this.auftragsmenge = auftragsmenge;
    }

    public DoubleFilter getKosten() {
        return kosten;
    }

    public void setKosten(DoubleFilter kosten) {
        this.kosten = kosten;
    }

    public DoubleFilter getDurchschnittlichestueckkosten() {
        return durchschnittlichestueckkosten;
    }

    public void setDurchschnittlichestueckkosten(DoubleFilter durchschnittlichestueckkosten) {
        this.durchschnittlichestueckkosten = durchschnittlichestueckkosten;
    }

    public AuftragstatusFilter getAuftragsstatus() {
        return auftragsstatus;
    }

    public void setAuftragsstatus(AuftragstatusFilter auftragsstatus) {
        this.auftragsstatus = auftragsstatus;
    }

    public StringFilter getBegonnen() {
        return begonnen;
    }

    public void setBegonnen(StringFilter begonnen) {
        this.begonnen = begonnen;
    }

    public StringFilter getBeendet() {
        return beendet;
    }

    public void setBeendet(StringFilter beendet) {
        this.beendet = beendet;
    }

    public IntegerFilter getDlzminimal() {
        return dlzminimal;
    }

    public void setDlzminimal(IntegerFilter dlzminimal) {
        this.dlzminimal = dlzminimal;
    }

    public DoubleFilter getDlzFaktor() {
        return dlzFaktor;
    }

    public void setDlzFaktor(DoubleFilter dlzFaktor) {
        this.dlzFaktor = dlzFaktor;
    }

    public IntegerFilter getBearbeitungszeitmin() {
        return bearbeitungszeitmin;
    }

    public void setBearbeitungszeitmin(IntegerFilter bearbeitungszeitmin) {
        this.bearbeitungszeitmin = bearbeitungszeitmin;
    }

    public IntegerFilter getWarteliste_menge() {
        return warteliste_menge;
    }

    public void setWarteliste_menge(IntegerFilter warteliste_menge) {
        this.warteliste_menge = warteliste_menge;
    }

    public IntegerFilter getInBearbeitung_menge() {
        return inBearbeitung_menge;
    }

    public void setInBearbeitung_menge(IntegerFilter inBearbeitung_menge) {
        this.inBearbeitung_menge = inBearbeitung_menge;
    }

    public LongFilter getHerstellteilId() {
        return herstellteilId;
    }

    public void setHerstellteilId(LongFilter herstellteilId) {
        this.herstellteilId = herstellteilId;
    }

    @Override
    public String toString() {
        return "FertigungsauftragCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (periode != null ? "periode=" + periode + ", " : "") +
                (nummer != null ? "nummer=" + nummer + ", " : "") +
                (auftragsmenge != null ? "auftragsmenge=" + auftragsmenge + ", " : "") +
                (kosten != null ? "kosten=" + kosten + ", " : "") +
                (durchschnittlichestueckkosten != null ? "durchschnittlichestueckkosten=" + durchschnittlichestueckkosten + ", " : "") +
                (auftragsstatus != null ? "auftragsstatus=" + auftragsstatus + ", " : "") +
                (begonnen != null ? "begonnen=" + begonnen + ", " : "") +
                (beendet != null ? "beendet=" + beendet + ", " : "") +
                (dlzminimal != null ? "dlzminimal=" + dlzminimal + ", " : "") +
                (dlzFaktor != null ? "dlzFaktor=" + dlzFaktor + ", " : "") +
                (bearbeitungszeitmin != null ? "bearbeitungszeitmin=" + bearbeitungszeitmin + ", " : "") +
                (warteliste_menge != null ? "warteliste_menge=" + warteliste_menge + ", " : "") +
                (inBearbeitung_menge != null ? "inBearbeitung_menge=" + inBearbeitung_menge + ", " : "") +
                (herstellteilId != null ? "herstellteilId=" + herstellteilId + ", " : "") +
            "}";
    }

}
