/**
 * kuailework.com Inc.
 * Copyright (c) 2015-2016 All Rights Reserved.
 */
package com.gameAd.maker.filter;

import org.apache.commons.logging.LogFactory;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Enumeration;

/**
 * @author chenlianchang
 * @fileName CharsetEncodeFilter.java, v 0.1 2016年4月29日 下午8:54:24 chenlianchang
 */
public class CharsetEncodeFilter implements Filter {

    private static final String DEFAULT_CHARSET = "UTF-8";
    private String request;
    private String response;


    @Override
    public void destroy() {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        LogFactory.getLog(getClass()).info(String.format("url:%s ,uri:%s", httpServletRequest.getRequestURL
                (), httpServletRequest.getRequestURI()));


        Enumeration paramNames = request.getParameterNames();
        while (paramNames.hasMoreElements()) {
            String paramName = (String) paramNames.nextElement();
            String[] paramValues = request.getParameterValues(paramName);
            if (paramValues.length == 1) {
                String paramValue = paramValues[0];
                if (paramValue.length() != 0) {
                    LogFactory.getLog(getClass()).debug(paramName + ":" + paramValue + "\n");
                }
            }
        }
//      response.setContentType("application/json");

        request.setCharacterEncoding(this.request);
        response.setCharacterEncoding(this.response);
        chain.doFilter(request, response);


    }

    @Override
    public void init(FilterConfig config) throws ServletException {
        request = config.getInitParameter("requestCharset");
        response = config.getInitParameter("responseCharset");
        if (request == null) {
            request = DEFAULT_CHARSET;
        }
        if (response == null) {
            response = DEFAULT_CHARSET;
        }
    }


}
