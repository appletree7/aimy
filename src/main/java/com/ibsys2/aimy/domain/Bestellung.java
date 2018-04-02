package com.ibsys2.aimy.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

import com.ibsys2.aimy.domain.enumeration.Bestellstatus;

/**
 * The Bestellung entity.
 */
@ApiModel(description = "The Bestellung entity.")
@Entity
@Table(name = "bestellung")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Bestellung implements Serializable {

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

    @DecimalMin(value = "0")
    @Column(name = "lieferzeit")
    private Double lieferzeit;

    @Min(value = 0)
    @Column(name = "kaufmenge")
    private Integer kaufmenge;

    @DecimalMin(value = "0")
    @Column(name = "materialkosten")
    private Double materialkosten;

    @DecimalMin(value = "0")
    @Column(name = "bestellkosten")
    private Double bestellkosten;

    @DecimalMin(value = "0")
    @Column(name = "gesamtkosten")
    private Double gesamtkosten;

    @DecimalMin(value = "0")
    @Column(name = "stueckkosten")
    private Double stueckkosten;

    @Enumerated(EnumType.STRING)
    @Column(name = "bestellstatus")
    private Bestellstatus bestellstatus;

    @ManyToOne(optional = false)
    @NotNull
    private Modus modus;

    @ManyToOne
    private Teil kaufteil;

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

    public Bestellung periode(Integer periode) {
        this.periode = periode;
        return this;
    }

    public void setPeriode(Integer periode) {
        this.periode = periode;
    }

    public Integer getNummer() {
        return nummer;
    }

    public Bestellung nummer(Integer nummer) {
        this.nummer = nummer;
        return this;
    }

    public void setNummer(Integer nummer) {
        this.nummer = nummer;
    }

    public Double getLieferzeit() {
        return lieferzeit;
    }

    public Bestellung lieferzeit(Double lieferzeit) {
        this.lieferzeit = lieferzeit;
        return this;
    }

    public void setLieferzeit(Double lieferzeit) {
        this.lieferzeit = lieferzeit;
    }

    public Integer getKaufmenge() {
        return kaufmenge;
    }

    public Bestellung kaufmenge(Integer kaufmenge) {
        this.kaufmenge = kaufmenge;
        return this;
    }

    public void setKaufmenge(Integer kaufmenge) {
        this.kaufmenge = kaufmenge;
    }

    public Double getMaterialkosten() {
        return materialkosten;
    }

    public Bestellung materialkosten(Double materialkosten) {
        this.materialkosten = materialkosten;
        return this;
    }

    public void setMaterialkosten(Double materialkosten) {
        this.materialkosten = materialkosten;
    }

    public Double getBestellkosten() {
        return bestellkosten;
    }

    public Bestellung bestellkosten(Double bestellkosten) {
        this.bestellkosten = bestellkosten;
        return this;
    }

    public void setBestellkosten(Double bestellkosten) {
        this.bestellkosten = bestellkosten;
    }

    public Double getGesamtkosten() {
        return gesamtkosten;
    }

    public Bestellung gesamtkosten(Double gesamtkosten) {
        this.gesamtkosten = gesamtkosten;
        return this;
    }

    public void setGesamtkosten(Double gesamtkosten) {
        this.gesamtkosten = gesamtkosten;
    }

    public Double getStueckkosten() {
        return stueckkosten;
    }

    public Bestellung stueckkosten(Double stueckkosten) {
        this.stueckkosten = stueckkosten;
        return this;
    }

    public void setStueckkosten(Double stueckkosten) {
        this.stueckkosten = stueckkosten;
    }

    public Bestellstatus getBestellstatus() {
        return bestellstatus;
    }

    public Bestellung bestellstatus(Bestellstatus bestellstatus) {
        this.bestellstatus = bestellstatus;
        return this;
    }

    public void setBestellstatus(Bestellstatus bestellstatus) {
        this.bestellstatus = bestellstatus;
    }

    public Modus getModus() {
        return modus;
    }

    public Bestellung modus(Modus modus) {
        this.modus = modus;
        return this;
    }

    public void setModus(Modus modus) {
        this.modus = modus;
    }

    public Teil getKaufteil() {
        return kaufteil;
    }

    public Bestellung kaufteil(Teil teil) {
        this.kaufteil = teil;
        return this;
    }

    public void setKaufteil(Teil teil) {
        this.kaufteil = teil;
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
        Bestellung bestellung = (Bestellung) o;
        if (bestellung.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bestellung.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Bestellung{" +
            "id=" + getId() +
            ", periode='" + getPeriode() + "'" +
            ", nummer='" + getNummer() + "'" +
            ", lieferzeit='" + getLieferzeit() + "'" +
            ", kaufmenge='" + getKaufmenge() + "'" +
            ", materialkosten='" + getMaterialkosten() + "'" +
            ", bestellkosten='" + getBestellkosten() + "'" +
            ", gesamtkosten='" + getGesamtkosten() + "'" +
            ", stueckkosten='" + getStueckkosten() + "'" +
            ", bestellstatus='" + getBestellstatus() + "'" +
            "}";
    }
}
