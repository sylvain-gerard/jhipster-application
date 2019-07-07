package io.github.jhipster.application.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "disabled")
    private Boolean disabled;

    @Column(name = "model")
    private String model;

    @NotNull
    @Column(name = "productcode", nullable = false)
    private String productcode;

    @NotNull
    @Column(name = "productname", nullable = false)
    private String productname;

    @NotNull
    @Column(name = "product_price", nullable = false)
    private Double productPrice;

    @Column(name = "size")
    private String size;

    @Column(name = "size_description")
    private String sizeDescription;

    @Column(name = "in_stock")
    private Integer inStock;

    @ManyToOne
    @JsonIgnoreProperties("products")
    private Category category;

    @ManyToOne
    @JsonIgnoreProperties("products")
    private Supplier supplier;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public Product description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean isDisabled() {
        return disabled;
    }

    public Product disabled(Boolean disabled) {
        this.disabled = disabled;
        return this;
    }

    public void setDisabled(Boolean disabled) {
        this.disabled = disabled;
    }

    public String getModel() {
        return model;
    }

    public Product model(String model) {
        this.model = model;
        return this;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getProductcode() {
        return productcode;
    }

    public Product productcode(String productcode) {
        this.productcode = productcode;
        return this;
    }

    public void setProductcode(String productcode) {
        this.productcode = productcode;
    }

    public String getProductname() {
        return productname;
    }

    public Product productname(String productname) {
        this.productname = productname;
        return this;
    }

    public void setProductname(String productname) {
        this.productname = productname;
    }

    public Double getProductPrice() {
        return productPrice;
    }

    public Product productPrice(Double productPrice) {
        this.productPrice = productPrice;
        return this;
    }

    public void setProductPrice(Double productPrice) {
        this.productPrice = productPrice;
    }

    public String getSize() {
        return size;
    }

    public Product size(String size) {
        this.size = size;
        return this;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getSizeDescription() {
        return sizeDescription;
    }

    public Product sizeDescription(String sizeDescription) {
        this.sizeDescription = sizeDescription;
        return this;
    }

    public void setSizeDescription(String sizeDescription) {
        this.sizeDescription = sizeDescription;
    }

    public Integer getInStock() {
        return inStock;
    }

    public Product inStock(Integer inStock) {
        this.inStock = inStock;
        return this;
    }

    public void setInStock(Integer inStock) {
        this.inStock = inStock;
    }

    public Category getCategory() {
        return category;
    }

    public Product category(Category category) {
        this.category = category;
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public Product supplier(Supplier supplier) {
        this.supplier = supplier;
        return this;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", disabled='" + isDisabled() + "'" +
            ", model='" + getModel() + "'" +
            ", productcode='" + getProductcode() + "'" +
            ", productname='" + getProductname() + "'" +
            ", productPrice=" + getProductPrice() +
            ", size='" + getSize() + "'" +
            ", sizeDescription='" + getSizeDescription() + "'" +
            ", inStock=" + getInStock() +
            "}";
    }
}
