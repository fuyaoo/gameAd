package com.gameAd.maker.bean;

public class TAgency {
    private Integer agencyid;

    private Integer userid;

    private String username;

    private Integer parentagencyid;

    private String nickname;

    public Integer getAgencyid() {
        return agencyid;
    }

    public void setAgencyid(Integer agencyid) {
        this.agencyid = agencyid;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public Integer getParentagencyid() {
        return parentagencyid;
    }

    public void setParentagencyid(Integer parentagencyid) {
        this.parentagencyid = parentagencyid;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname == null ? null : nickname.trim();
    }
}