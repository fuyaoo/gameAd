package com.gameAd.maker.bean;

import java.math.BigDecimal;

public class TRate {
    private Integer id;

    private BigDecimal onerate;

    private BigDecimal tworate;

    private BigDecimal threerate;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BigDecimal getOnerate() {
        return onerate;
    }

    public void setOnerate(BigDecimal onerate) {
        this.onerate = onerate;
    }

    public BigDecimal getTworate() {
        return tworate;
    }

    public void setTworate(BigDecimal tworate) {
        this.tworate = tworate;
    }

    public BigDecimal getThreerate() {
        return threerate;
    }

    public void setThreerate(BigDecimal threerate) {
        this.threerate = threerate;
    }
}