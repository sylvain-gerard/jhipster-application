package io.github.jhipster.application.service.dto;
import java.io.Serializable;
import java.util.Objects;
import io.github.jhipster.application.domain.enumeration.OrderStatus;

/**
 * A DTO for the {@link io.github.jhipster.application.domain.Orders} entity.
 */
public class OrdersDTO implements Serializable {

    private Long id;

    private OrderStatus status;

    private Double total;


    private Long employeeId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        OrdersDTO ordersDTO = (OrdersDTO) o;
        if (ordersDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ordersDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrdersDTO{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", total=" + getTotal() +
            ", employee=" + getEmployeeId() +
            "}";
    }
}
