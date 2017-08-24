package com.gameAd.maker.filter;

/**
 * Created by lufei on 2017/3/31.
 */

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

/**
 * @author wwhhf
 * @comment 跨域过滤器
 * @since 2016年5月30日
 */
public class CrossOriginFilter implements Filter {

    private FilterConfig config = null;

    @Override
    public void init(FilterConfig config) throws ServletException {
        this.config = config;
    }

    @Override
    public void destroy() {
        this.config = null;
    }

    /**
     * @author wwhhf
     * @comment 跨域的设置
     * @since 2016/5/30
     */
    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        // 表明它允许"http://xxx"发起跨域请求
        httpResponse.setHeader("Access-Control-Allow-Origin",
                config.getInitParameter("AccessControlAllowOrigin"));
        // 表明在xxx秒内，不需要再发送预检验请求，可以缓存该结果
        httpResponse.setHeader("Access-Control-Allow-Methods",
                config.getInitParameter("AccessControlAllowMethods"));
        // 表明它允许xxx的外域请求
        httpResponse.setHeader("Access-Control-Max-Age",
                config.getInitParameter("AccessControlMaxAge"));
        // 表明它允许跨域请求包含xxx头
        httpResponse.setHeader("Access-Control-Allow-Headers",
                config.getInitParameter("AccessControlAllowHeaders"));
        //默认情况下，Cookie不包括在CORS请求之中 设为true，即表示服务器明确许可
        httpResponse.setHeader("Access-Control-Allow-Credentials", "true");
        chain.doFilter(request, response);
    }

}
