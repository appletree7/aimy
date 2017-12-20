package com.ibsys2.aimy.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Los.
 */
@Entity
@Table(name = "los")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Los implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "periode")
    private Integer periode;

    @Column(name = "menge")
    private Integer menge;

    @Column(name = "durchlaufzeit")
    private Double durchlaufzeit;

    @Column(name = "kosten")
    private Double kosten;

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

    public Los periode(Integer periode) {
        this.periode = periode;
        return this;
    }

    public void setPeriode(Integer periode) {
        this.periode = periode;
    }

    public Integer getMenge() {
        return menge;
    }

    public Los menge(Integer menge) {
        this.menge = menge;
        return this;
    }

    public void setMenge(Integer menge) {
        this.menge = menge;
    }

    public Double getDurchlaufzeit() {
        return durchlaufzeit;
    }

    public Los durchlaufzeit(Double durchlaufzeit) {
        this.durchlaufzeit = durchlaufzeit;
        return this;
    }

    public void setDurchlaufzeit(Double durchlaufzeit) {
        this.durchlaufzeit = durchlaufzeit;
    }

    public Double getKosten() {
        return kosten;
    }

    public Los kosten(Double kosten) {
        this.kosten = kosten;
        return this;
    }

    public void setKosten(Double kosten) {
        this.kosten = kosten;
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
        Los los = (Los) o;
        if (los.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), los.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Los{" +
            "id=" + getId() +
            ", periode='" + getPeriode() + "'" +
            ", menge='" + getMenge() + "'" +
            ", durchlaufzeit='" + getDurchlaufzeit() + "'" +
            ", kosten='" + getKosten() + "'" +
            "}";
    }
}
