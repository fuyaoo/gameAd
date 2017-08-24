package com.gameAd.maker.bean;

public class TUsers {
    private Integer userid;

    private String username;

    private String pass;

    private String twopassword;

    private String nickname;

    private Integer logoid;

    private String logofilemd5;

    private String token;

    private Integer onlineflag;

    private Integer disabled;

    private Short sex;

    private Short isrobot;

    private Integer agencyid;

    private String salt;

    private String headimgurl;

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

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass == null ? null : pass.trim();
    }

    public String getTwopassword() {
        return twopassword;
    }

    public void setTwopassword(String twopassword) {
        this.twopassword = twopassword == null ? null : twopassword.trim();
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname == null ? null : nickname.trim();
    }

    public Integer getLogoid() {
        return logoid;
    }

    public void setLogoid(Integer logoid) {
        this.logoid = logoid;
    }

    public String getLogofilemd5() {
        return logofilemd5;
    }

    public void setLogofilemd5(String logofilemd5) {
        this.logofilemd5 = logofilemd5 == null ? null : logofilemd5.trim();
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token == null ? null : token.trim();
    }

    public Integer getOnlineflag() {
        return onlineflag;
    }

    public void setOnlineflag(Integer onlineflag) {
        this.onlineflag = onlineflag;
    }

    public Integer getDisabled() {
        return disabled;
    }

    public void setDisabled(Integer disabled) {
        this.disabled = disabled;
    }

    public Short getSex() {
        return sex;
    }

    public void setSex(Short sex) {
        this.sex = sex;
    }

    public Short getIsrobot() {
        return isrobot;
    }

    public void setIsrobot(Short isrobot) {
        this.isrobot = isrobot;
    }

    public Integer getAgencyid() {
        return agencyid;
    }

    public void setAgencyid(Integer agencyid) {
        this.agencyid = agencyid;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt == null ? null : salt.trim();
    }

    public String getHeadimgurl() {
        return headimgurl;
    }

    public void setHeadimgurl(String headimgurl) {
        this.headimgurl = headimgurl == null ? null : headimgurl.trim();
    }
}