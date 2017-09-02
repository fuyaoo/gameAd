package com.gameAd.maker.bean;

import java.math.BigDecimal;
import java.util.Date;

public class TWithdrawals {
    private Integer id;

    private Integer agencyid;

    private String username;

    private long money;

    private Integer status;

    private Date createtime;

    private Date auditingtime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getAgencyid() {
        return agencyid;
    }

    public void setAgencyid(Integer agencyid) {
        this.agencyid = agencyid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public long getMoney() {
        return money;
    }

    public void setMoney(long money) {
        this.money = money;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public Date getAuditingtime() {
        return auditingtime;
    }

    public void setAuditingtime(Date auditingtime) {
        this.auditingtime = auditingtime;
    }
}