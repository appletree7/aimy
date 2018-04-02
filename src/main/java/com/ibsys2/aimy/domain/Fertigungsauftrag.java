package com.ibsys2.aimy.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

import com.ibsys2.aimy.domain.enumeration.Auftragstatus;

/**
 * The Fertigungsuftrag entity.
 */
@ApiModel(description = "The Fertigungsuftrag entity.")
@Entity
@Table(name = "fertigungsauftrag")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Fertigungsauftrag implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Min(value = 0)
    @Column(name = "periode", nullable = false)
    private Integer periode;

    @NotNull
    @Min(value = 0)
    @Column(name = "nummer", nullable = false)
    private Integer nummer;

    @Min(value = 0)
    @Column(name = "auftragsmenge")
    private Integer auftragsmenge;

    @DecimalMin(value = "0")
    @Column(name = "kosten")
    private Double kosten;

    @DecimalMin(value = "0")
    @Column(name = "durchschnittlichestueckkosten")
    private Double durchschnittlichestueckkosten;

    @Enumerated(EnumType.STRING)
    @Column(name = "auftragsstatus")
    private Auftragstatus auftragsstatus;

    @Column(name = "begonnen")
    private String begonnen;

    @Column(name = "beendet")
    private String beendet;

    @Min(value = 0)
    @Column(name = "dlzminimal")
    private Integer dlzminimal;

    @DecimalMin(value = "0")
    @Column(name = "dlz_faktor")
    private Double dlzFaktor;

    @Min(value = 0)
    @Column(name = "bearbeitungszeitmin")
    private Integer bearbeitungszeitmin;

    @ManyToOne
    private Teil herstellteil;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPeriode() {
        return periode;
    }

    public Fertigungsauftrag periode(Integer periode) {
        this.periode = periode;
        return this;
    }

    public void setPeriode(Integer periode) {
        this.periode = periode;
    }

    public Integer getNummer() {
        return nummer;
    }

    public Fertigungsauftrag nummer(Integer nummer) {
        this.nummer = nummer;
        return this;
    }

    public void setNummer(Integer nummer) {
        this.nummer = nummer;
    }

    public Integer getAuftragsmenge() {
        return auftragsmenge;
    }

    public Fertigungsauftrag auftragsmenge(Integer auftragsmenge) {
        this.auftragsmenge = auftragsmenge;
        return this;
    }

    public void setAuftragsmenge(Integer auftragsmenge) {
        this.auftragsmenge = auftragsmenge;
    }

    public Double getKosten() {
        return kosten;
    }

    public Fertigungsauftrag kosten(Double kosten) {
        this.kosten = kosten;
        return this;
    }

    public void setKosten(Double kosten) {
        this.kosten = kosten;
    }

    public Double getDurchschnittlichestueckkosten() {
        return durchschnittlichestueckkosten;
    }

    public Fertigungsauftrag durchschnittlichestueckkosten(Double durchschnittlichestueckkosten) {
        this.durchschnittlichestueckkosten = durchschnittlichestueckkosten;
        return this;
    }

    public void setDurchschnittlichestueckkosten(Double durchschnittlichestueckkosten) {
        this.durchschnittlichestueckkosten = durchschnittlichestueckkosten;
    }

    public Auftragstatus getAuftragsstatus() {
        return auftragsstatus;
    }

    public Fertigungsauftrag auftragsstatus(Auftragstatus auftragsstatus) {
        this.auftragsstatus = auftragsstatus;
        return this;
    }

    public void setAuftragsstatus(Auftragstatus auftragsstatus) {
        this.auftragsstatus = auftragsstatus;
    }

    public String getBegonnen() {
        return begonnen;
    }

    public Fertigungsauftrag begonnen(String begonnen) {
        this.begonnen = begonnen;
        return this;
    }

    public void setBegonnen(String begonnen) {
        this.begonnen = begonnen;
    }

    public String getBeendet() {
        return beendet;
    }

    public Fertigungsauftrag beendet(String beendet) {
        this.beendet = beendet;
        return this;
    }

    public void setBeendet(String beendet) {
        this.beendet = beendet;
    }

    public Integer getDlzminimal() {
        return dlzminimal;
    }

    public Fertigungsauftrag dlzminimal(Integer dlzminimal) {
        this.dlzminimal = dlzminimal;
        return this;
    }

    public void setDlzminimal(Integer dlzminimal) {
        this.dlzminimal = dlzminimal;
    }

    public Double getDlzFaktor() {
        return dlzFaktor;
    }

    public Fertigungsauftrag dlzFaktor(Double dlzFaktor) {
        this.dlzFaktor = dlzFaktor;
        return this;
    }

    public void setDlzFaktor(Double dlzFaktor) {
        this.dlzFaktor = dlzFaktor;
    }

    public Integer getBearbeitungszeitmin() {
        return bearbeitungszeitmin;
    }

    public Fertigungsauftrag bearbeitungszeitmin(Integer bearbeitungszeitmin) {
        this.bearbeitungszeitmin = bearbeitungszeitmin;
        return this;
    }

    public void setBearbeitungszeitmin(Integer bearbeitungszeitmin) {
        this.bearbeitungszeitmin = bearbeitungszeitmin;
    }

    public Teil getHerstellteil() {
        return herstellteil;
    }

    public Fertigungsauftrag herstellteil(Teil teil) {
        this.herstellteil = teil;
        return this;
    }

    public void setHerstellteil(Teil teil) {
        this.herstellteil = teil;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Fertigungsauftrag fertigungsauftrag = (Fertigungsauftrag) o;
        if (fertigungsauftrag.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fertigungsauftrag.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Fertigungsauftrag{" +
            "id=" + getId() +
            ", periode='" + getPeriode() + "'" +
            ", nummer='" + getNummer() + "'" +
            ", auftragsmenge='" + getAuftragsmenge() + "'" +
            ", kosten='" + getKosten() + "'" +
            ", durchschnittlichestueckkosten='" + getDurchschnittlichestueckkosten() + "'" +
            ", auftragsstatus='" + getAuftragsstatus() + "'" +
            ", begonnen='" + getBegonnen() + "'" +
            ", beendet='" + getBeendet() + "'" +
            ", dlzminimal='" + getDlzminimal() + "'" +
            ", dlzFaktor='" + getDlzFaktor() + "'" +
            ", bearbeitungszeitmin='" + getBearbeitungszeitmin() + "'" +
            "}";
    }
}
