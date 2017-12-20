package com.ibsys2.aimy.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * The Arbeitsplatz entity.
 */
@ApiModel(description = "The Arbeitsplatz entity.")
@Entity
@Table(name = "arbeitsplatz")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Arbeitsplatz implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "periode")
    private Integer periode;

    @Column(name = "nummer")
    private Integer nummer;

    @Column(name = "restzeitbedarf")
    private Double restzeitbedarf;

    @Column(name = "ruestvorgaenge")
    private Integer ruestvorgaenge;

    @Column(name = "leerzeit")
    private Double leerzeit;

    @Column(name = "lohnleerkosten")
    private Double lohnleerkosten;

    @Column(name = "lohnkosten")
    private Double lohnkosten;

    @Column(name = "maschinenstillstandkosten")
    private Double maschinenstillstandkosten;

    @OneToMany(mappedBy = "arbeitsplatz")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Teil> teils = new HashSet<>();

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

    public Arbeitsplatz periode(Integer periode) {
        this.periode = periode;
        return this;
    }

    public void setPeriode(Integer periode) {
        this.periode = periode;
    }

    public Integer getNummer() {
        return nummer;
    }

    public Arbeitsplatz nummer(Integer nummer) {
        this.nummer = nummer;
        return this;
    }

    public void setNummer(Integer nummer) {
        this.nummer = nummer;
    }

    public Double getRestzeitbedarf() {
        return restzeitbedarf;
    }

    public Arbeitsplatz restzeitbedarf(Double restzeitbedarf) {
        this.restzeitbedarf = restzeitbedarf;
        return this;
    }

    public void setRestzeitbedarf(Double restzeitbedarf) {
        this.restzeitbedarf = restzeitbedarf;
    }

    public Integer getRuestvorgaenge() {
        return ruestvorgaenge;
    }

    public Arbeitsplatz ruestvorgaenge(Integer ruestvorgaenge) {
        this.ruestvorgaenge = ruestvorgaenge;
        return this;
    }

    public void setRuestvorgaenge(Integer ruestvorgaenge) {
        this.ruestvorgaenge = ruestvorgaenge;
    }

    public Double getLeerzeit() {
        return leerzeit;
    }

    public Arbeitsplatz leerzeit(Double leerzeit) {
        this.leerzeit = leerzeit;
        return this;
    }

    public void setLeerzeit(Double leerzeit) {
        this.leerzeit = leerzeit;
    }

    public Double getLohnleerkosten() {
        return lohnleerkosten;
    }

    public Arbeitsplatz lohnleerkosten(Double lohnleerkosten) {
        this.lohnleerkosten = lohnleerkosten;
        return this;
    }

    public void setLohnleerkosten(Double lohnleerkosten) {
        this.lohnleerkosten = lohnleerkosten;
    }

    public Double getLohnkosten() {
        return lohnkosten;
    }

    public Arbeitsplatz lohnkosten(Double lohnkosten) {
        this.lohnkosten = lohnkosten;
        return this;
    }

    public void setLohnkosten(Double lohnkosten) {
        this.lohnkosten = lohnkosten;
    }

    public Double getMaschinenstillstandkosten() {
        return maschinenstillstandkosten;
    }

    public Arbeitsplatz maschinenstillstandkosten(Double maschinenstillstandkosten) {
        this.maschinenstillstandkosten = maschinenstillstandkosten;
        return this;
    }

    public void setMaschinenstillstandkosten(Double maschinenstillstandkosten) {
        this.maschinenstillstandkosten = maschinenstillstandkosten;
    }

    public Set<Teil> getTeils() {
        return teils;
    }

    public Arbeitsplatz teils(Set<Teil> teils) {
        this.teils = teils;
        return this;
    }

    public Arbeitsplatz addTeil(Teil teil) {
        this.teils.add(teil);
        teil.setArbeitsplatz(this);
        return this;
    }

    public Arbeitsplatz removeTeil(Teil teil) {
        this.teils.remove(teil);
        teil.setArbeitsplatz(null);
        return this;
    }

    public void setTeils(Set<Teil> teils) {
        this.teils = teils;
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
        Arbeitsplatz arbeitsplatz = (Arbeitsplatz) o;
        if (arbeitsplatz.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), arbeitsplatz.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Arbeitsplatz{" +
            "id=" + getId() +
            ", periode='" + getPeriode() + "'" +
            ", nummer='" + getNummer() + "'" +
            ", restzeitbedarf='" + getRestzeitbedarf() + "'" +
            ", ruestvorgaenge='" + getRuestvorgaenge() + "'" +
            ", leerzeit='" + getLeerzeit() + "'" +
            ", lohnleerkosten='" + getLohnleerkosten() + "'" +
            ", lohnkosten='" + getLohnkosten() + "'" +
            ", maschinenstillstandkosten='" + getMaschinenstillstandkosten() + "'" +
            "}";
    }
}
