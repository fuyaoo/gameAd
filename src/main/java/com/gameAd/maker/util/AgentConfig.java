package com.gameAd.maker.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AgentConfig {
    @Value("#{propertiesReader[APPID]}")
    private String APPID;

    @Value("#{propertiesReader[SCOPE]}")
    private String SCOPE;

    @Value("#{propertiesReader[SECRET]}")
    private String SECRET;

    @Value("#{propertiesReader[downloadPath]}")
    private String downloadPath;

    public String getAPPID() {
        return APPID;
    }

    public void setAPPID(String APPID) {
        this.APPID = APPID;
    }

    public String getSCOPE() {
        return SCOPE;
    }

    public void setSCOPE(String SCOPE) {
        this.SCOPE = SCOPE;
    }

    public String getSECRET() {
        return SECRET;
    }

    public void setSECRET(String SECRET) {
        this.SECRET = SECRET;
    }

    public String getDownloadPath() {
        return downloadPath;
    }

    public void setDownloadPath(String downloadPath) {
        this.downloadPath = downloadPath;
    }
}
