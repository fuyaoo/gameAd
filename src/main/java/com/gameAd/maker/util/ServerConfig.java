package com.gameAd.maker.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Created by lufei on 2017/3/27.
 */
@Component
public class ServerConfig {

    @Value("#{propertiesReader[inetHost]}")
    private String inetHost;

    @Value("#{propertiesReader[inetPort]}")
    private int inetPort;

    @Value("#{propertiesReader[certNo]}")
    private String certNo;

    public String getInetHost() {
        return inetHost;
    }

    public int getInetPort() { return inetPort; }

    public String getCertNo() {
        return certNo;
    }
}
