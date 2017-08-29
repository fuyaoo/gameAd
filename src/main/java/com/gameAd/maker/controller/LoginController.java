package com.gameAd.maker.controller;

import com.gameAd.maker.bean.WebManageAdmin;
import com.gameAd.maker.service.WebManageAdminService;
import com.gameAd.maker.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * 登录
 */
@Controller
@RequestMapping("/gameAd")
public class LoginController {

    private Logger LOGGER = LoggerFactory.getLogger(getClass());
    private final SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
    @Autowired
    WebManageAdminService webManageAdminService;

    /**
     * index
     * @param request
     * @return
     */
    @RequestMapping(value = "/index", method = RequestMethod.GET, produces="application/json;charset=UTF-8")
    public String index(HttpServletRequest request) {
        return "/gameAd/login";
    }
    @RequestMapping("/admin/{index}")
    public String showPage(@PathVariable String index) {
        return "/gameAd/admin/" + index;
    }
    /**
     * 登录
     * @param request
     * @return
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST, produces="application/json;charset=UTF-8")
    @ResponseBody
    public ResultObj login(HttpServletRequest request) {
        ResultObj resultObj;
        Map<String,Object> map = new HashMap<String ,Object>();
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        if(TextUtils.isBlank(username) || TextUtils.isBlank(password)){
            LOGGER.debug(ResultStatus.PARAMETERS_EXCEPTION.getMessage());
            resultObj = new ResultObj(ResultStatus.PARAMETERS_EXCEPTION);
            return resultObj;
        }
        map.put("username",username);
        map.put("password", MD5Util.string2MD5(password));
        WebManageAdmin webManageAdmin = webManageAdminService.selectByMap(map);
        if(webManageAdmin !=null){
            String token = username+"-"+password+"-"+formatter.format(new Date());
            token = AESUtil.encrypt(token);
            resultObj = new ResultObj(ResultStatus.SUCCESS);
            resultObj.setData(token);
        }else {
            resultObj = new ResultObj(ResultStatus.FAILED);
        }
        return resultObj;
    }

    /**
     * 登录
     * @param request
     * @return
     */
    @RequestMapping(value = "/logout", method = RequestMethod.POST, produces="application/json;charset=UTF-8")
    @ResponseBody
    public ResultObj logout(HttpServletRequest request) {
        ResultObj resultObj;
        resultObj = new ResultObj(ResultStatus.SUCCESS);
        return resultObj;
    }

    /**
     * 修改密码
     * @param request
     * @return
     */
    @RequestMapping(value = "/resetPass", method = RequestMethod.POST, produces="application/json;charset=UTF-8")
    @ResponseBody
    public ResultObj resetPass(HttpServletRequest request) {
        ResultObj resultObj;
        Map<String,Object> map = new HashMap<String ,Object>();
        String username = request.getParameter("username");
        String new_password = request.getParameter("new_password");
        String old_password = request.getParameter("old_password");
        if(TextUtils.isBlank(username) || TextUtils.isBlank(old_password) || TextUtils.isBlank(new_password)){
            LOGGER.debug(ResultStatus.PARAMETERS_EXCEPTION.getMessage());
            resultObj = new ResultObj(ResultStatus.PARAMETERS_EXCEPTION);
            return resultObj;
        }
        map.put("username",old_password);
        map.put("password", MD5Util.string2MD5(old_password));
        WebManageAdmin webManageAdmin = webManageAdminService.selectByMap(map);
        if(webManageAdmin !=null){
            map.put("password", MD5Util.string2MD5(new_password));
            int count = webManageAdminService.resetPass(map);
            if(count > 0){
                String token = username+"-"+new_password+"-"+formatter.format(new Date());
                token = AESUtil.encrypt(token);
                resultObj = new ResultObj(ResultStatus.SUCCESS);
                resultObj.setData(token);
            }else {
                resultObj = new ResultObj(ResultStatus.FAILED);
            }
        }else {
            resultObj = new ResultObj(ResultStatus.UID_NOT_EXIST);
        }
        return resultObj;
    }
}
