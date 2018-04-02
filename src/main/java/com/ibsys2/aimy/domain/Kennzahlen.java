package com.ibsys2.aimy.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Kennzahlen.
 */
@Entity
@Table(name = "kennzahlen")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Kennzahlen implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Min(value = 0)
    @Column(name = "periode", nullable = false)
    private Integer periode;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @DecimalMin(value = "0")
    @Column(name = "aktuell")
    private Double aktuell;

    @DecimalMin(value = "0")
    @Column(name = "durchschnitt")
    private Double durchschnitt;

    @DecimalMin(value = "0")
    @Column(name = "gesamt")
    private Double gesamt;

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

    public Kennzahlen periode(Integer periode) {
        this.periode = periode;
        return this;
    }

    public void setPeriode(Integer periode) {
        this.periode = periode;
    }

    public String getName() {
        return name;
    }

    public Kennzahlen name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getAktuell() {
        return aktuell;
    }

    public Kennzahlen aktuell(Double aktuell) {
        this.aktuell = aktuell;
        return this;
    }

    public void setAktuell(Double aktuell) {
        this.aktuell = aktuell;
    }

    public Double getDurchschnitt() {
        return durchschnitt;
    }

    public Kennzahlen durchschnitt(Double durchschnitt) {
        this.durchschnitt = durchschnitt;
        return this;
    }

    public void setDurchschnitt(Double durchschnitt) {
        this.durchschnitt = durchschnitt;
    }

    public Double getGesamt() {
        return gesamt;
    }

    public Kennzahlen gesamt(Double gesamt) {
        this.gesamt = gesamt;
        return this;
    }

    public void setGesamt(Double gesamt) {
        this.gesamt = gesamt;
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
        Kennzahlen kennzahlen = (Kennzahlen) o;
        if (kennzahlen.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), kennzahlen.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Kennzahlen{" +
            "id=" + getId() +
            ", periode='" + getPeriode() + "'" +
            ", name='" + getName() + "'" +
            ", aktuell='" + getAktuell() + "'" +
            ", durchschnitt='" + getDurchschnitt() + "'" +
            ", gesamt='" + getGesamt() + "'" +
            "}";
    }
}
