package com.gameAd.maker.controller;

import com.alibaba.fastjson.JSONObject;
import com.gameAd.maker.bean.TUsers;
import com.gameAd.maker.bean.WebManageAdmin;
import com.gameAd.maker.service.TUsersService;
import com.gameAd.maker.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

/**
 * 微信接口
 */
@Controller
@RequestMapping("/weixin")
public class WeiXinController {

    private Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    TUsersService tUsersService;

    /**
     * 获取code
     * @param request
     * @return
     */
    @RequestMapping(value = "/getcode", method = RequestMethod.POST, produces="application/json;charset=UTF-8")
    public String getList(HttpServletRequest request, HttpServletResponse response) throws IOException {
        ResultObj resultObj;//参数
        Map<String,Object> map = new HashMap<String ,Object>();
        String code = request.getParameter("code");
        if(TextUtils.isBlank(code)){
            LOGGER.debug(ResultStatus.PARAMETERS_EXCEPTION.getMessage());
            response.sendRedirect("www.baidu.com");
        }
        String url = "https://api.weixin.qq.com/sns/oauth2/access_token";
        String queryString = "appid="+ URLEncoder.encode(Constants.APPID)+"&secret="+URLEncoder.encode(Constants.SECRET)+"&code="+code+"&grant_type=authorization_code";
        String result = HttpUtils.sendGet(url,queryString);
        JSONObject jsonObject = JSONObject.parseObject(result);
        String access_token = jsonObject.getString("access_token"); //网页授权接口调用凭证,注意：此access_token与基础支持的access_token不同
        String expires_in = jsonObject.getString("expires_in"); //access_token接口调用凭证超时时间，单位（秒）
        String refresh_token = jsonObject.getString("refresh_token"); //用户刷新access_token
        String openid = jsonObject.getString("openid"); //用户唯一标识，请注意，在未关注公众号时，用户访问公众号的网页，也会产生一个用户和公众号唯一的OpenID
        String scope = jsonObject.getString("scope"); //用户授权的作用域，使用逗号（,）分隔
        map.put("openid","WX_"+openid);
        TUsers tUsers = tUsersService.selectByMap(map);
        if(tUsers != null){
            return "/weixin/index";
        }
        return "/weixin/error";
    }
}
