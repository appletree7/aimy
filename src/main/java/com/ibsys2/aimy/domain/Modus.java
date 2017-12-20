package com.ibsys2.aimy.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
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

    @Column(name = "name")
    private String name;

    @Column(name = "bearbeitungsfaktor")
    private Double bearbeitungsfaktor;

    @Column(name = "bearbeitungsabweichung")
    private Double bearbeitungsabweichung;

    @Column(name = "lieferfaktor")
    private Double lieferfaktor;

    @Column(name = "lieferabweichung")
    private Double lieferabweichung;

    @Column(name = "mengenfakor")
    private Double mengenfakor;

    @Column(name = "mengenabweichung")
    private Double mengenabweichung;

    @Column(name = "preisfaktor")
    private Double preisfaktor;

    @Column(name = "diskontfaktor")
    private Double diskontfaktor;

    @Column(name = "bestellkostenfaktor")
    private Double bestellkostenfaktor;

    @OneToOne(mappedBy = "modus")
    @JsonIgnore
    private Bestellung bestellung;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Bestellung getBestellung() {
        return bestellung;
    }

    public Modus bestellung(Bestellung bestellung) {
        this.bestellung = bestellung;
        return this;
    }

    public void setBestellung(Bestellung bestellung) {
        this.bestellung = bestellung;
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
