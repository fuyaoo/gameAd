package com.gameAd.maker.intercepter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * HTNL拦截器
 */
public class HtmlIntercepter implements HandlerInterceptor {

    private static Logger LOGGER = LoggerFactory.getLogger(HtmlIntercepter.class);
    private final  static  String LOGIN_URL = "/admin/index";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object o) throws Exception {
        //如果是ajax请求静态页面不拦截
        if (isHtmlAndAjax(request)) {
            LOGGER.debug("ajax请求静态页面不拦截, url:\t" + request.getRequestURI());
            return true;
        }
        return false;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {
    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {
    }


    protected boolean isHtmlAndAjax(HttpServletRequest request) {
        if (request.getRequestURI().contains(".html")) {
            return true;
        }
        return false;
    }

    /**
     * 想客户端写内容
     * @param response
     * @param str
     * @throws IOException
     */
    protected void writeToClient(HttpServletResponse response, String str) throws IOException {
        response.setContentType("text/json;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(str);
        response.getWriter().flush();
    }
}
