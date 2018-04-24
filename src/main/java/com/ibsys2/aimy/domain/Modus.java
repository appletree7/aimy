package com.ibsys2.aimy.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * The Modus entity.
 */
@ApiModel(description = "The Modus entity.")
@Entity
@Table(name = "modus")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Modus implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Min(value = 1)
    @Column(name = "nummer", nullable = false)
    private Integer nummer;

    @Column(name = "name")
    private String name;

    @DecimalMin(value = "0")
    @Column(name = "bearbeitungsfaktor")
    private Double bearbeitungsfaktor;

    @DecimalMin(value = "0")
    @Column(name = "bearbeitungsabweichung")
    private Double bearbeitungsabweichung;

    @DecimalMin(value = "0")
    @Column(name = "lieferfaktor")
    private Double lieferfaktor;

    @DecimalMin(value = "0")
    @Column(name = "lieferabweichung")
    private Double lieferabweichung;

    @DecimalMin(value = "0")
    @Column(name = "mengenfakor")
    private Double mengenfakor;

    @DecimalMin(value = "0")
    @Column(name = "mengenabweichung")
    private Double mengenabweichung;

    @DecimalMin(value = "0")
    @Column(name = "preisfaktor")
    private Double preisfaktor;

    @DecimalMin(value = "0")
    @Column(name = "diskontfaktor")
    private Double diskontfaktor;

    @DecimalMin(value = "0")
    @Column(name = "bestellkostenfaktor")
    private Double bestellkostenfaktor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNummer() {
        return nummer;
    }

    public Modus nummer(Integer nummer) {
        this.nummer = nummer;
        return this;
    }

    public void setNummer(Integer nummer) {
        this.nummer = nummer;
    }

    public String getName() {
        return name;
    }

    public Modus name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getBearbeitungsfaktor() {
        return bearbeitungsfaktor;
    }

    public Modus bearbeitungsfaktor(Double bearbeitungsfaktor) {
        this.bearbeitungsfaktor = bearbeitungsfaktor;
        return this;
    }

    public void setBearbeitungsfaktor(Double bearbeitungsfaktor) {
        this.bearbeitungsfaktor = bearbeitungsfaktor;
    }

    public Double getBearbeitungsabweichung() {
        return bearbeitungsabweichung;
    }

    public Modus bearbeitungsabweichung(Double bearbeitungsabweichung) {
        this.bearbeitungsabweichung = bearbeitungsabweichung;
        return this;
    }

    public void setBearbeitungsabweichung(Double bearbeitungsabweichung) {
        this.bearbeitungsabweichung = bearbeitungsabweichung;
    }

    public Double getLieferfaktor() {
        return lieferfaktor;
    }

    public Modus lieferfaktor(Double lieferfaktor) {
        this.lieferfaktor = lieferfaktor;
        return this;
    }

    public void setLieferfaktor(Double lieferfaktor) {
        this.lieferfaktor = lieferfaktor;
    }

    public Double getLieferabweichung() {
        return lieferabweichung;
    }

    public Modus lieferabweichung(Double lieferabweichung) {
        this.lieferabweichung = lieferabweichung;
        return this;
    }

    public void setLieferabweichung(Double lieferabweichung) {
        this.lieferabweichung = lieferabweichung;
    }

    public Double getMengenfakor() {
        return mengenfakor;
    }

    public Modus mengenfakor(Double mengenfakor) {
        this.mengenfakor = mengenfakor;
        return this;
    }

    public void setMengenfakor(Double mengenfakor) {
        this.mengenfakor = mengenfakor;
    }

    public Double getMengenabweichung() {
        return mengenabweichung;
    }

    public Modus mengenabweichung(Double mengenabweichung) {
        this.mengenabweichung = mengenabweichung;
        return this;
    }

    public void setMengenabweichung(Double mengenabweichung) {
        this.mengenabweichung = mengenabweichung;
    }

    public Double getPreisfaktor() {
        return preisfaktor;
    }

    public Modus preisfaktor(Double preisfaktor) {
        this.preisfaktor = preisfaktor;
        return this;
    }

    public void setPreisfaktor(Double preisfaktor) {
        this.preisfaktor = preisfaktor;
    }

    public Double getDiskontfaktor() {
        return diskontfaktor;
    }

    public Modus diskontfaktor(Double diskontfaktor) {
        this.diskontfaktor = diskontfaktor;
        return this;
    }

    public void setDiskontfaktor(Double diskontfaktor) {
        this.diskontfaktor = diskontfaktor;
    }

    public Double getBestellkostenfaktor() {
        return bestellkostenfaktor;
    }

    public Modus bestellkostenfaktor(Double bestellkostenfaktor) {
        this.bestellkostenfaktor = bestellkostenfaktor;
        return this;
    }

    public void setBestellkostenfaktor(Double bestellkostenfaktor) {
        this.bestellkostenfaktor = bestellkostenfaktor;
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
        Modus modus = (Modus) o;
        if (modus.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), modus.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Modus{" +
            "id=" + getId() +
            ", nummer='" + getNummer() + "'" +
            ", name='" + getName() + "'" +
            ", bearbeitungsfaktor='" + getBearbeitungsfaktor() + "'" +
            ", bearbeitungsabweichung='" + getBearbeitungsabweichung() + "'" +
            ", lieferfaktor='" + getLieferfaktor() + "'" +
            ", lieferabweichung='" + getLieferabweichung() + "'" +
            ", mengenfakor='" + getMengenfakor() + "'" +
            ", mengenabweichung='" + getMengenabweichung() + "'" +
            ", preisfaktor='" + getPreisfaktor() + "'" +
            ", diskontfaktor='" + getDiskontfaktor() + "'" +
            ", bestellkostenfaktor='" + getBestellkostenfaktor() + "'" +
            "}";
    }
}
