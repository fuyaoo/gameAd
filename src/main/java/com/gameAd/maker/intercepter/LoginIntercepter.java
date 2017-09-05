package com.gameAd.maker.intercepter;

import com.alibaba.fastjson.JSON;
import com.gameAd.maker.service.WebManageAdminService;
import com.gameAd.maker.util.ParamConstants;
import com.gameAd.maker.util.TextUtils;
import com.gameAd.maker.util.TokenUtil;
import org.apache.commons.collections.MapUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

/**
 * 登录拦截器
 * 1,需要校验token是否失效
 * Created by beyond on 2017/4/6.
 */
public class LoginIntercepter implements HandlerInterceptor {

    private static Logger LOGGER = LoggerFactory.getLogger(LoginIntercepter.class);
    private final SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object o) throws Exception {
        String token = request.getHeader(ParamConstants.TOKEN);
        if (TextUtils.isEmpty(token)) {
            token = request.getParameter(ParamConstants.TOKEN);
        }
        //如果没有传token，则拒绝请求
        if (TextUtils.isEmpty(token)) {
            LOGGER.debug("需要传入token参数");
            response.sendRedirect("/gameAd/index");
            return false;
        }

        Map<String, String> map = TokenUtil.tradingToken(token);
        if (MapUtils.isEmpty(map)) {
            LOGGER.debug("token参数解析错误");
            response.sendRedirect("/gameAd/index");
            return false;
        }
        //校验时间是否超过24小时
        String endTime = formatter.format(new Date());
        boolean flag = false;
        try {
            flag = TokenUtil.judgmentDate(map.get("time"), endTime);
        } catch (Exception e) {
            LOGGER.error("日期比对失败");
            response.sendRedirect("/gameAd/index");
            return false;
        }
        if(! flag){
            LOGGER.debug("登录session超时");
            response.sendRedirect("/gameAd/index");
            return false;
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {
    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {
    }

    /**
     * 想客户端写内容
     * @param response
     * @param str
     * @throws IOException
     */
    private void writeToResponse(HttpServletResponse response, String str) throws IOException {
        response.setContentType("text/json;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(str);
        response.getWriter().flush();
    }

    protected boolean isAjax(HttpServletRequest request) {
        if ((request.getHeader("accept") != null && request.getHeader("accept").contains("application/json"))  ||
                (request.getHeader("X-Requested-With") != null && request.getHeader("X-Requested-With").contains("XMLHttpRequest") )) {
            return true;
        }
        return false;
    }

    protected String getRemoteIp(HttpServletRequest request) {
        String remoteIp = null;
        remoteIp = request.getHeader("x-forwarded-for");
        if (remoteIp == null || remoteIp.isEmpty() || "unknown".equalsIgnoreCase(remoteIp)) {
            remoteIp = request.getHeader("X-Real-IP");
        }
        if (remoteIp == null || remoteIp.isEmpty() || "unknown".equalsIgnoreCase(remoteIp)) {
            remoteIp = request.getHeader("Proxy-Client-IP");
        }
        if (remoteIp == null || remoteIp.isEmpty() || "unknown".equalsIgnoreCase(remoteIp)) {
            remoteIp = request.getHeader("WL-Proxy-Client-IP");
        }
        if (remoteIp == null || remoteIp.isEmpty() || "unknown".equalsIgnoreCase(remoteIp)) {
            remoteIp = request.getHeader("HTTP_CLIENT_IP");
        }
        if (remoteIp == null || remoteIp.isEmpty() || "unknown".equalsIgnoreCase(remoteIp)) {
            remoteIp = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (remoteIp == null || remoteIp.isEmpty() || "unknown".equalsIgnoreCase(remoteIp)) {
            remoteIp = request.getRemoteAddr();
        }
        if (remoteIp == null || remoteIp.isEmpty() || "unknown".equalsIgnoreCase(remoteIp)) {
            remoteIp = request.getRemoteHost();
        }
        return remoteIp;
    }


}
