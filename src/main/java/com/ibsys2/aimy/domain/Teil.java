package com.ibsys2.aimy.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.ibsys2.aimy.domain.enumeration.Teiltyp;

/**
 * The Herstellteil entity.
 */
@ApiModel(description = "The Herstellteil entity.")
@Entity
@Table(name = "teil")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Teil implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "teiltyp")
    private Teiltyp teiltyp;

    @Column(name = "nummer")
    private String nummer;

    @Column(name = "istmenge")
    private Integer istmenge;

    @Column(name = "startmenge")
    private Integer startmenge;

    @Column(name = "prozentsatz")
    private Double prozentsatz;

    @Column(name = "lagerpreis")
    private Double lagerpreis;

    @Column(name = "lagerwert")
    private Double lagerwert;

    @Column(name = "sicherheitsbestand")
    private Integer sicherheitsbestand;

    @Column(name = "vertriebswunsch")
    private Integer vertriebswunsch;

    @NotNull
    @Min(value = 0)
    @Column(name = "periode", nullable = false)
    private Integer periode;

    @Min(value = 0)
    @Column(name = "gesamtproduktionsmenge")
    private Integer gesamtproduktionsmenge;

    @Column(name = "direktverkaufmenge")
    private Integer direktverkaufmenge;

    @Column(name = "direktverkaufspreis")
    private Double direktverkaufspreis;

    @Column(name = "strafe")
    private Double strafe;

    @OneToMany(mappedBy = "herstellteil")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Fertigungsauftrag> fertigungsauftrags = new HashSet<>();

    @ManyToOne
    private Teil subkomponente;

    @ManyToOne
    private Arbeitsplatz arbeitsplatz;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Teiltyp getTeiltyp() {
        return teiltyp;
    }

    public Teil teiltyp(Teiltyp teiltyp) {
        this.teiltyp = teiltyp;
        return this;
    }

    public void setTeiltyp(Teiltyp teiltyp) {
        this.teiltyp = teiltyp;
    }

    public String getNummer() {
        return nummer;
    }

    public Teil nummer(String nummer) {
        this.nummer = nummer;
        return this;
    }

    public void setNummer(String nummer) {
        this.nummer = nummer;
    }

    public Integer getIstmenge() {
        return istmenge;
    }

    public Teil istmenge(Integer istmenge) {
        this.istmenge = istmenge;
        return this;
    }

    public void setIstmenge(Integer istmenge) {
        this.istmenge = istmenge;
    }

    public Integer getStartmenge() {
        return startmenge;
    }

    public Teil startmenge(Integer startmenge) {
        this.startmenge = startmenge;
        return this;
    }

    public void setStartmenge(Integer startmenge) {
        this.startmenge = startmenge;
    }

    public Double getProzentsatz() {
        return prozentsatz;
    }

    public Teil prozentsatz(Double prozentsatz) {
        this.prozentsatz = prozentsatz;
        return this;
    }

    public void setProzentsatz(Double prozentsatz) {
        this.prozentsatz = prozentsatz;
    }

    public Double getLagerpreis() {
        return lagerpreis;
    }

    public Teil lagerpreis(Double lagerpreis) {
        this.lagerpreis = lagerpreis;
        return this;
    }

    public void setLagerpreis(Double lagerpreis) {
        this.lagerpreis = lagerpreis;
    }

    public Double getLagerwert() {
        return lagerwert;
    }

    public Teil lagerwert(Double lagerwert) {
        this.lagerwert = lagerwert;
        return this;
    }

    public void setLagerwert(Double lagerwert) {
        this.lagerwert = lagerwert;
    }

    public Integer getSicherheitsbestand() {
        return sicherheitsbestand;
    }

    public Teil sicherheitsbestand(Integer sicherheitsbestand) {
        this.sicherheitsbestand = sicherheitsbestand;
        return this;
    }

    public void setSicherheitsbestand(Integer sicherheitsbestand) {
        this.sicherheitsbestand = sicherheitsbestand;
    }

    public Integer getVertriebswunsch() {
        return vertriebswunsch;
    }

    public Teil vertriebswunsch(Integer vertriebswunsch) {
        this.vertriebswunsch = vertriebswunsch;
        return this;
    }

    public void setVertriebswunsch(Integer vertriebswunsch) {
        this.vertriebswunsch = vertriebswunsch;
    }

    public Integer getPeriode() {
        return periode;
    }

    public Teil periode(Integer periode) {
        this.periode = periode;
        return this;
    }

    public void setPeriode(Integer periode) {
        this.periode = periode;
    }

    public Integer getGesamtproduktionsmenge() {
        return gesamtproduktionsmenge;
    }

    public Teil gesamtproduktionsmenge(Integer gesamtproduktionsmenge) {
        this.gesamtproduktionsmenge = gesamtproduktionsmenge;
        return this;
    }

    public void setGesamtproduktionsmenge(Integer gesamtproduktionsmenge) {
        this.gesamtproduktionsmenge = gesamtproduktionsmenge;
    }

    public Integer getDirektverkaufmenge() {
        return direktverkaufmenge;
    }

    public Teil direktverkaufmenge(Integer direktverkaufmenge) {
        this.direktverkaufmenge = direktverkaufmenge;
        return this;
    }

    public void setDirektverkaufmenge(Integer direktverkaufmenge) {
        this.direktverkaufmenge = direktverkaufmenge;
    }

    public Double getDirektverkaufspreis() {
        return direktverkaufspreis;
    }

    public Teil direktverkaufspreis(Double direktverkaufspreis) {
        this.direktverkaufspreis = direktverkaufspreis;
        return this;
    }

    public void setDirektverkaufspreis(Double direktverkaufspreis) {
        this.direktverkaufspreis = direktverkaufspreis;
    }

    public Double getStrafe() {
        return strafe;
    }

    public Teil strafe(Double strafe) {
        this.strafe = strafe;
        return this;
    }

    public void setStrafe(Double strafe) {
        this.strafe = strafe;
    }

    public Set<Fertigungsauftrag> getFertigungsauftrags() {
        return fertigungsauftrags;
    }

    public Teil fertigungsauftrags(Set<Fertigungsauftrag> fertigungsauftrags) {
        this.fertigungsauftrags = fertigungsauftrags;
        return this;
    }

    public Teil addFertigungsauftrag(Fertigungsauftrag fertigungsauftrag) {
        this.fertigungsauftrags.add(fertigungsauftrag);
        fertigungsauftrag.setHerstellteil(this);
        return this;
    }

    public Teil removeFertigungsauftrag(Fertigungsauftrag fertigungsauftrag) {
        this.fertigungsauftrags.remove(fertigungsauftrag);
        fertigungsauftrag.setHerstellteil(null);
        return this;
    }

    public void setFertigungsauftrags(Set<Fertigungsauftrag> fertigungsauftrags) {
        this.fertigungsauftrags = fertigungsauftrags;
    }

    public Teil getSubkomponente() {
        return subkomponente;
    }

    public Teil subkomponente(Teil teil) {
        this.subkomponente = teil;
        return this;
    }

    public void setSubkomponente(Teil teil) {
        this.subkomponente = teil;
    }

    public Arbeitsplatz getArbeitsplatz() {
        return arbeitsplatz;
    }

    public Teil arbeitsplatz(Arbeitsplatz arbeitsplatz) {
        this.arbeitsplatz = arbeitsplatz;
        return this;
    }

    public void setArbeitsplatz(Arbeitsplatz arbeitsplatz) {
        this.arbeitsplatz = arbeitsplatz;
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
        Teil teil = (Teil) o;
        if (teil.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), teil.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Teil{" +
            "id=" + getId() +
            ", teiltyp='" + getTeiltyp() + "'" +
            ", nummer='" + getNummer() + "'" +
            ", istmenge='" + getIstmenge() + "'" +
            ", startmenge='" + getStartmenge() + "'" +
            ", prozentsatz='" + getProzentsatz() + "'" +
            ", lagerpreis='" + getLagerpreis() + "'" +
            ", lagerwert='" + getLagerwert() + "'" +
            ", sicherheitsbestand='" + getSicherheitsbestand() + "'" +
            ", vertriebswunsch='" + getVertriebswunsch() + "'" +
            ", periode='" + getPeriode() + "'" +
            ", gesamtproduktionsmenge='" + getGesamtproduktionsmenge() + "'" +
            ", direktverkaufmenge='" + getDirektverkaufmenge() + "'" +
            ", direktverkaufspreis='" + getDirektverkaufspreis() + "'" +
            ", strafe='" + getStrafe() + "'" +
            "}";
    }
}
