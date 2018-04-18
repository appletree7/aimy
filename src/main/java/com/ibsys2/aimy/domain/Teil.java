package com.ibsys2.aimy.domain;

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

    @NotNull
    @Min(value = 0)
    @Column(name = "periode", nullable = false)
    private Integer periode;

    @NotNull
    @Min(value = 1)
    @Column(name = "nummer", nullable = false)
    private Integer nummer;

    @Min(value = 0)
    @Column(name = "istmenge")
    private Integer istmenge;

    @Min(value = 0)
    @Column(name = "startmenge")
    private Integer startmenge;

    @DecimalMin(value = "0")
    @Column(name = "prozentsatz")
    private Double prozentsatz;

    @DecimalMin(value = "0")
    @Column(name = "lagerpreis")
    private Double lagerpreis;

    @DecimalMin(value = "0")
    @Column(name = "lagerwert")
    private Double lagerwert;

    @Min(value = 0)
    @Column(name = "sicherheitsbestand")
    private Integer sicherheitsbestand;

    @Min(value = 0)
    @Column(name = "vertriebswunsch")
    private Integer vertriebswunsch;

    @Min(value = 0)
    @Column(name = "vertriebswunsch_naechste")
    private Integer vertriebswunsch_naechste;

    @Min(value = 0)
    @Column(name = "vertriebswunsch_uebernaechste")
    private Integer vertriebswunsch_uebernaechste;

    @Min(value = 0)
    @Column(name = "vertriebswunsch_ueberuebernaechste")
    private Integer vertriebswunsch_ueberuebernaechste;

    @Min(value = 0)
    @Column(name = "gesamtproduktionsmenge")
    private Integer gesamtproduktionsmenge;

    @Min(value = 0)
    @Column(name = "direktverkaufmenge")
    private Integer direktverkaufmenge;

    @DecimalMin(value = "0")
    @Column(name = "direktverkaufspreis")
    private Double direktverkaufspreis;

    @DecimalMin(value = "0")
    @Column(name = "strafe")
    private Double strafe;

    @Min(value = 0)
    @Column(name = "warteliste_menge")
    private Integer warteliste_menge;

    @Min(value = 0)
    @Column(name = "in_bearbeitung_menge")
    private Integer inBearbeitung_menge;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "teil_subkomponente",
               joinColumns = @JoinColumn(name="teils_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="subkomponentes_id", referencedColumnName="id"))
    private Set<Teil> subkomponentes = new HashSet<>();

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

    public Integer getNummer() {
        return nummer;
    }

    public Teil nummer(Integer nummer) {
        this.nummer = nummer;
        return this;
    }

    public void setNummer(Integer nummer) {
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

    public Integer getVertriebswunsch_naechste() {
        return vertriebswunsch_naechste;
    }

    public Teil vertriebswunsch_naechste(Integer vertriebswunsch_naechste) {
        this.vertriebswunsch_naechste = vertriebswunsch_naechste;
        return this;
    }

    public void setVertriebswunsch_naechste(Integer vertriebswunsch_naechste) {
        this.vertriebswunsch_naechste = vertriebswunsch_naechste;
    }

    public Integer getVertriebswunsch_uebernaechste() {
        return vertriebswunsch_uebernaechste;
    }

    public Teil vertriebswunsch_uebernaechste(Integer vertriebswunsch_uebernaechste) {
        this.vertriebswunsch_uebernaechste = vertriebswunsch_uebernaechste;
        return this;
    }

    public void setVertriebswunsch_uebernaechste(Integer vertriebswunsch_uebernaechste) {
        this.vertriebswunsch_uebernaechste = vertriebswunsch_uebernaechste;
    }

    public Integer getVertriebswunsch_ueberuebernaechste() {
        return vertriebswunsch_ueberuebernaechste;
    }

    public Teil vertriebswunsch_ueberuebernaechste(Integer vertriebswunsch_ueberuebernaechste) {
        this.vertriebswunsch_ueberuebernaechste = vertriebswunsch_ueberuebernaechste;
        return this;
    }

    public void setVertriebswunsch_ueberuebernaechste(Integer vertriebswunsch_ueberuebernaechste) {
        this.vertriebswunsch_ueberuebernaechste = vertriebswunsch_ueberuebernaechste;
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

    public Integer getWarteliste_menge() {
        return warteliste_menge;
    }

    public Teil warteliste_menge(Integer warteliste_menge) {
        this.warteliste_menge = warteliste_menge;
        return this;
    }

    public void setWarteliste_menge(Integer warteliste_menge) {
        this.warteliste_menge = warteliste_menge;
    }

    public Integer getInBearbeitung_menge() {
        return inBearbeitung_menge;
    }

    public Teil inBearbeitung_menge(Integer inBearbeitung_menge) {
        this.inBearbeitung_menge = inBearbeitung_menge;
        return this;
    }

    public void setInBearbeitung_menge(Integer inBearbeitung_menge) {
        this.inBearbeitung_menge = inBearbeitung_menge;
    }

    public Set<Teil> getSubkomponentes() {
        return subkomponentes;
    }

    public Teil subkomponentes(Set<Teil> teils) {
        this.subkomponentes = teils;
        return this;
    }

    public Teil addSubkomponente(Teil teil) {
        this.subkomponentes.add(teil);
        return this;
    }

    public Teil removeSubkomponente(Teil teil) {
        this.subkomponentes.remove(teil);
        return this;
    }

    public void setSubkomponentes(Set<Teil> teils) {
        this.subkomponentes = teils;
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
            ", periode='" + getPeriode() + "'" +
            ", nummer='" + getNummer() + "'" +
            ", istmenge='" + getIstmenge() + "'" +
            ", startmenge='" + getStartmenge() + "'" +
            ", prozentsatz='" + getProzentsatz() + "'" +
            ", lagerpreis='" + getLagerpreis() + "'" +
            ", lagerwert='" + getLagerwert() + "'" +
            ", sicherheitsbestand='" + getSicherheitsbestand() + "'" +
            ", vertriebswunsch='" + getVertriebswunsch() + "'" +
            ", vertriebswunsch_naechste='" + getVertriebswunsch_naechste() + "'" +
            ", vertriebswunsch_uebernaechste='" + getVertriebswunsch_uebernaechste() + "'" +
            ", vertriebswunsch_ueberuebernaechste='" + getVertriebswunsch_ueberuebernaechste() + "'" +
            ", gesamtproduktionsmenge='" + getGesamtproduktionsmenge() + "'" +
            ", direktverkaufmenge='" + getDirektverkaufmenge() + "'" +
            ", direktverkaufspreis='" + getDirektverkaufspreis() + "'" +
            ", strafe='" + getStrafe() + "'" +
            ", warteliste_menge='" + getWarteliste_menge() + "'" +
            ", inBearbeitung_menge='" + getInBearbeitung_menge() + "'" +
            "}";
    }
}
