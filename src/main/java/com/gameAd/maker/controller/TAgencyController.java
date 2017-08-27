package com.gameAd.maker.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.gameAd.maker.bean.TAgency;
import com.gameAd.maker.bean.TUsers;
import com.gameAd.maker.bean.WebManageAdmin;
import com.gameAd.maker.service.TAgencyService;
import com.gameAd.maker.service.TUsersService;
import com.gameAd.maker.service.WebManageAdminService;
import com.gameAd.maker.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 代理 接口
 */
@Controller
@RequestMapping("/gameAd/tAgency")
public class TAgencyController {

    private Logger LOGGER = LoggerFactory.getLogger(getClass());
    private final SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
    @Autowired
    TAgencyService tAgencyService;
    @Autowired
    TUsersService tUsersService;

    /**
     * 代理关系查询
     * @param request
     * @return
     */
    @RequestMapping(value = "/selRelation", method = RequestMethod.POST, produces="application/json;charset=UTF-8")
    @ResponseBody
    public ResultObj selRelation(HttpServletRequest request) {
        ResultObj resultObj;
        JSONObject result = new JSONObject();
        Map<String,Object> map = new HashMap<String ,Object>();
        String username = request.getParameter("username");
        String agencyID = request.getParameter("agencyID");
        String openid = request.getParameter("openid");
        if(! TextUtils.isBlank(username)){
            map.put("username",username);
        }
        if(! TextUtils.isBlank(agencyID)){
            map.put("agencyID",agencyID);
        }
        List<TAgency> list = tAgencyService.selectByMap(map);
        result.put("agentArray",new JSONArray());
        if(list !=null){
            for(TAgency tAgency : list){
                JSONObject object = new JSONObject();
                object.put(String.valueOf(tAgency.getAgencyid()),new JSONObject());
                JSONObject jobject = object.getJSONObject(String.valueOf(tAgency.getAgencyid()));
                jobject.put("tAgency",tAgency); //原始代理对象
                jobject.put("oneAgency",new JSONArray()); //一级代理对象 初始化

                JSONObject oneobject = new JSONObject(); //一级
                map.put("parentagencyid", tAgency.getAgencyid()); //一级代理
                List<TAgency> firstLevelList = tAgencyService.selectListByMap(map);
                for(TAgency oneAgency : firstLevelList){
                    oneobject.put(String.valueOf(oneAgency.getAgencyid()),new JSONObject());
                    JSONObject onejobject = oneobject.getJSONObject(String.valueOf(oneAgency.getAgencyid()));
                    onejobject.put("oneAgency",oneAgency); //一级代理对象
                    onejobject.put("twoAgency",new JSONArray()); //一级代理对象 初始化

                    JSONObject twoobject = new JSONObject(); //二级
                    map.put("parentagencyid", oneAgency.getAgencyid()); //二级代理
                    List<TAgency> secondLevelList = tAgencyService.selectListByMap(map);
                    for(TAgency twoAgency : secondLevelList){
                        twoobject.put(String.valueOf(twoAgency.getAgencyid()),new JSONObject());
                        JSONObject twojobject = twoobject.getJSONObject(String.valueOf(twoAgency.getAgencyid()));
                        twojobject.put("twoAgency",twoAgency); //二级代理对象
                        twojobject.put("threeAgency",new JSONArray()); //二级代理对象 初始化

                        JSONObject threeobject = new JSONObject(); //三级
                        map.put("parentagencyid", twoAgency.getAgencyid()); //三级代理
                        List<TAgency> thirdLevelList = tAgencyService.selectListByMap(map);
                        for(TAgency threeAgency : thirdLevelList){
                            threeobject.put(String.valueOf(threeAgency.getAgencyid()),new JSONObject());
                            JSONObject threejobject = threeobject.getJSONObject(String.valueOf(threeAgency.getAgencyid()));
                            threejobject.put("threeAgency",threeAgency); //三级代理对象

                            twojobject.getJSONArray("threeAgency").add(threeobject);//三级代理对象 赋值
                        }
                        onejobject.getJSONArray("twoAgency").add(twoobject);//二级代理对象 赋值
                    }
                    jobject.getJSONArray("oneAgency").add(oneobject);//一级代理对象 赋值
                }
                result.getJSONArray("agentArray").add(object);
            }
            resultObj = new ResultObj(ResultStatus.SUCCESS);
            resultObj.setData(result);
        }else {
            resultObj = new ResultObj(ResultStatus.FAILED);
        }
        return resultObj;
    }

    /**
     * 新增代理关系
     * @param request
     * @return
     */
    @RequestMapping(value = "/insert", method = RequestMethod.POST, produces="application/json;charset=UTF-8")
    @ResponseBody
    public ResultObj insert(HttpServletRequest request) {
        ResultObj resultObj;
        JSONObject result = new JSONObject();
        Map<String,Object> map = new HashMap<String ,Object>();
        String openid = request.getParameter("openid");
        String parentagencyid = request.getParameter("parentagencyid");
        if(TextUtils.isBlank(openid) || TextUtils.isBlank(parentagencyid)){
            LOGGER.debug(ResultStatus.PARAMETERS_EXCEPTION.getMessage());
            resultObj = new ResultObj(ResultStatus.PARAMETERS_EXCEPTION);
            return resultObj;
        }
        if(! TextUtils.isBlank(openid)){
            map.put("openid","WX_"+openid);
        }
        if(! TextUtils.isBlank(parentagencyid)){
            map.put("parentagencyid",parentagencyid);
        }
        TUsers tUsers = tUsersService.selectByMap(map);
        if(tUsers != null){
            map.put("userid",tUsers.getUserid());
            map.put("username",tUsers.getUsername());
            map.put("nickname",tUsers.getNickname());
            List<TAgency> list = tAgencyService.selectByMap(map);
            if(list.size() > 0){
                resultObj = new ResultObj(ResultStatus.UID_EXIST);
                return resultObj;
            }
            TAgency tAgency = new TAgency();
            tAgency.setNickname(tUsers.getNickname());
            tAgency.setUserid(tUsers.getUserid());
            tAgency.setUsername(tUsers.getUsername());
            tAgency.setParentagencyid(Integer.valueOf(parentagencyid));
            tAgencyService.insert(tAgency);
            resultObj = new ResultObj(ResultStatus.SUCCESS);
            resultObj.setData(result);
        }else {
            TAgency tAgency = new TAgency();
            tAgency.setNickname(tUsers.getNickname());
            tAgency.setUserid(tUsers.getUserid());
            tAgency.setUsername(tUsers.getUsername());
            tAgency.setParentagencyid(Integer.valueOf(parentagencyid));
            try{
                tAgencyService.insert(tAgency);
            }catch (Exception e){
                resultObj = new ResultObj(ResultStatus.UID_EXIST);
                return resultObj;
            }
            resultObj = new ResultObj(ResultStatus.FAILED);
        }
        return resultObj;
    }
}
