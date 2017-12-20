package com.ibsys2.aimy.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
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

    @Column(name = "periode")
    private Integer periode;

    @Column(name = "auftragsmenge")
    private Integer auftragsmenge;

    @Column(name = "durchlaufzeit")
    private Double durchlaufzeit;

    @Column(name = "kostenprolos")
    private Double kostenprolos;

    @Column(name = "durchschnittlichestueckkosten")
    private Double durchschnittlichestueckkosten;

    @Enumerated(EnumType.STRING)
    @Column(name = "auftragsstatus")
    private Auftragstatus auftragsstatus;

    @Column(name = "begonnen")
    private String begonnen;

    @Column(name = "beendet")
    private String beendet;

    @Column(name = "dlzminimal")
    private Integer dlzminimal;

    @Column(name = "dlz_faktor")
    private Double dlzFaktor;

    @ManyToOne
    private Los los;

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

    public Double getDurchlaufzeit() {
        return durchlaufzeit;
    }

    public Fertigungsauftrag durchlaufzeit(Double durchlaufzeit) {
        this.durchlaufzeit = durchlaufzeit;
        return this;
    }

    public void setDurchlaufzeit(Double durchlaufzeit) {
        this.durchlaufzeit = durchlaufzeit;
    }

    public Double getKostenprolos() {
        return kostenprolos;
    }

    public Fertigungsauftrag kostenprolos(Double kostenprolos) {
        this.kostenprolos = kostenprolos;
        return this;
    }

    public void setKostenprolos(Double kostenprolos) {
        this.kostenprolos = kostenprolos;
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

    public Los getLos() {
        return los;
    }

    public Fertigungsauftrag los(Los los) {
        this.los = los;
        return this;
    }

    public void setLos(Los los) {
        this.los = los;
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
            ", auftragsmenge='" + getAuftragsmenge() + "'" +
            ", durchlaufzeit='" + getDurchlaufzeit() + "'" +
            ", kostenprolos='" + getKostenprolos() + "'" +
            ", durchschnittlichestueckkosten='" + getDurchschnittlichestueckkosten() + "'" +
            ", auftragsstatus='" + getAuftragsstatus() + "'" +
            ", begonnen='" + getBegonnen() + "'" +
            ", beendet='" + getBeendet() + "'" +
            ", dlzminimal='" + getDlzminimal() + "'" +
            ", dlzFaktor='" + getDlzFaktor() + "'" +
            "}";
    }
}
