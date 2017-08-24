package com.gameAd.maker.bean;

import java.util.Date;

public class WebManageAdmin {
    private Integer id;

    private String username;

    private String password;

    private String purview;

    private Byte usergroup;

    private String lastloginip;

    private Date lastlogintime;

    private Date lastlogouttime;

    private Integer logintimes;

    private Integer adminpurviewArticleT;

    private Integer adminpurviewSoftT;

    private Integer adminpurviewPhotoT;

    private String adminpurviewGuestT;

    private String adminpurviewOthersT;

    private String rndpasswordT;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public String getPurview() {
        return purview;
    }

    public void setPurview(String purview) {
        this.purview = purview == null ? null : purview.trim();
    }

    public Byte getUsergroup() {
        return usergroup;
    }

    public void setUsergroup(Byte usergroup) {
        this.usergroup = usergroup;
    }

    public String getLastloginip() {
        return lastloginip;
    }

    public void setLastloginip(String lastloginip) {
        this.lastloginip = lastloginip == null ? null : lastloginip.trim();
    }

    public Date getLastlogintime() {
        return lastlogintime;
    }

    public void setLastlogintime(Date lastlogintime) {
        this.lastlogintime = lastlogintime;
    }

    public Date getLastlogouttime() {
        return lastlogouttime;
    }

    public void setLastlogouttime(Date lastlogouttime) {
        this.lastlogouttime = lastlogouttime;
    }

    public Integer getLogintimes() {
        return logintimes;
    }

    public void setLogintimes(Integer logintimes) {
        this.logintimes = logintimes;
    }

    public Integer getAdminpurviewArticleT() {
        return adminpurviewArticleT;
    }

    public void setAdminpurviewArticleT(Integer adminpurviewArticleT) {
        this.adminpurviewArticleT = adminpurviewArticleT;
    }

    public Integer getAdminpurviewSoftT() {
        return adminpurviewSoftT;
    }

    public void setAdminpurviewSoftT(Integer adminpurviewSoftT) {
        this.adminpurviewSoftT = adminpurviewSoftT;
    }

    public Integer getAdminpurviewPhotoT() {
        return adminpurviewPhotoT;
    }

    public void setAdminpurviewPhotoT(Integer adminpurviewPhotoT) {
        this.adminpurviewPhotoT = adminpurviewPhotoT;
    }

    public String getAdminpurviewGuestT() {
        return adminpurviewGuestT;
    }

    public void setAdminpurviewGuestT(String adminpurviewGuestT) {
        this.adminpurviewGuestT = adminpurviewGuestT == null ? null : adminpurviewGuestT.trim();
    }

    public String getAdminpurviewOthersT() {
        return adminpurviewOthersT;
    }

    public void setAdminpurviewOthersT(String adminpurviewOthersT) {
        this.adminpurviewOthersT = adminpurviewOthersT == null ? null : adminpurviewOthersT.trim();
    }

    public String getRndpasswordT() {
        return rndpasswordT;
    }

    public void setRndpasswordT(String rndpasswordT) {
        this.rndpasswordT = rndpasswordT == null ? null : rndpasswordT.trim();
    }
}