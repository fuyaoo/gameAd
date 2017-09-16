package com.gameAd.maker.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.gameAd.maker.bean.*;
import com.gameAd.maker.service.*;
import com.gameAd.maker.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 代理 接口
 */
@Controller
@RequestMapping("/gameAd/tAgency")
public class TAgencyController {

    private Logger LOGGER = LoggerFactory.getLogger(getClass());
    private final SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
    private final SimpleDateFormat M_FORMAT = new SimpleDateFormat("yyy-MM-dd");
    @Autowired
    TAgencyService tAgencyService;
    @Autowired
    TUsersService tUsersService;
    @Autowired
    TWithdrawalsService tWithdrawalsService;
    @Autowired
    Web_VChangeRecordService webVChangeRecordService;
    @Autowired
    TRateService tRateService;

    /**
     * 代理查询
     * @param request
     * @return
     */
    @RequestMapping(value = "/seloneRelation", method = RequestMethod.POST, produces="application/json;charset=UTF-8")
    @ResponseBody
    public ResultObj selRelation(HttpServletRequest request) {
        ResultObj resultObj;
        JSONObject result = new JSONObject();
        Map<String,Object> map = new HashMap<String ,Object>();
        String username = request.getParameter("username");
        String agencyID = request.getParameter("agencyID");
        String openid = request.getParameter("openid");
        String pageNum = request.getParameter(ParamConstants.PAGE_NUM);
        String pageSize = request.getParameter(ParamConstants.PAGE_SIZE);
        if(! TextUtils.isBlank(username)){
            map.put("username",username);
        }
        if(! TextUtils.isBlank(agencyID)){
            map.put("agencyID",agencyID);
        }
        if (TextUtils.isEmpty(pageNum) || !TextUtils.isPositiveNum(pageNum)) {
            LOGGER.debug(ResultStatus.PAGE_NUM_INVALID.getMessage());
            resultObj = new ResultObj(ResultStatus.PAGE_NUM_INVALID);
            return resultObj;
        }
        Integer size;
        if (TextUtils.isEmpty(pageSize) || !TextUtils.isPositiveNum(pageSize)) {
            size = Constants.DEFAULT_PAGE_SIZE;
        } else {
            size = Integer.valueOf(pageSize);
            size = size > Constants.MAX_PAGE_SIZE ? Constants.MAX_PAGE_SIZE : size;
        }
        map.put("hStartNum",(Integer.valueOf(pageNum)-1)*20 + 1);
        map.put("hQueryNum",Integer.valueOf(pageNum) * size);
        int count = tAgencyService.selectCountByMap(map);
        List<TAgency> list = tAgencyService.selectByMap(map);
        JSONObject object = new JSONObject();
        object.put("list", list);
        object.put("count", count);
        resultObj = new ResultObj(ResultStatus.SUCCESS);
        resultObj.setData(object);
        return resultObj;
    }

    /**
     * 代理下一级关系查询
     * @param request
     * @return
     */
    @RequestMapping(value = "/selNextRelation", method = RequestMethod.POST, produces="application/json;charset=UTF-8")
    @ResponseBody
    public ResultObj selNextRelation(HttpServletRequest request) {
        ResultObj resultObj;
        Map<String,Object> map = new HashMap<String ,Object>();
        String username = request.getParameter("username");
        String agencyID = request.getParameter("agencyID");
        String openid = request.getParameter("openid");
        if(! TextUtils.isBlank(username)){
            map.put("username",username);
        }
        if(TextUtils.isBlank(agencyID)){
            LOGGER.debug(ResultStatus.PARAMETERS_EXCEPTION.getMessage());
            resultObj = new ResultObj(ResultStatus.PARAMETERS_EXCEPTION);
            return resultObj;
        }

        map.put("parentagencyid", agencyID); //下级代理
        List<TAgency> firstLevelList = tAgencyService.selectListByMap(map);
        resultObj = new ResultObj(ResultStatus.SUCCESS);
        resultObj.setData(firstLevelList);
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
            resultObj = new ResultObj(ResultStatus.FAILED);
        }
        return resultObj;
    }

    /**
     * 运营代理统计 or 代理分润查询
     * @param request
     * @return
     */
    @RequestMapping(value = "/agentCount", method = RequestMethod.POST, produces="application/json;charset=UTF-8")
    @ResponseBody
    public ResultObj agentCount(HttpServletRequest request) {
        ResultObj resultObj;
        JSONObject result = new JSONObject();
        Map<String, Object> map = new HashMap<String, Object>();
        Map<String, Object> rmap = new HashMap<String, Object>();
        String username = request.getParameter("username");
        String agencyID = request.getParameter("agencyID");
        String pageNum = request.getParameter(ParamConstants.PAGE_NUM);
        String pageSize = request.getParameter(ParamConstants.PAGE_SIZE);
        if (!TextUtils.isBlank(username)) {
            map.put("username", username);
        }
        if (!TextUtils.isBlank(agencyID)) {
            map.put("agencyID", agencyID);
        }
        if (TextUtils.isEmpty(pageNum) || !TextUtils.isPositiveNum(pageNum)) {
            LOGGER.debug(ResultStatus.PAGE_NUM_INVALID.getMessage());
            resultObj = new ResultObj(ResultStatus.PAGE_NUM_INVALID);
            return resultObj;
        }
        Integer size;
        if (TextUtils.isEmpty(pageSize) || !TextUtils.isPositiveNum(pageSize)) {
            size = Constants.DEFAULT_PAGE_SIZE;
        } else {
            size = Integer.valueOf(pageSize);
            size = size > Constants.MAX_PAGE_SIZE ? Constants.MAX_PAGE_SIZE : size;
        }
        map.put("hStartNum",(Integer.valueOf(pageNum)-1)*20 + 1);
        map.put("hQueryNum",Integer.valueOf(pageNum) * size);
        TRate tRate = tRateService.select();
        if(tRate == null){
            tRate.setOnerate(new BigDecimal(0));
            tRate.setTworate(new BigDecimal(0));
            tRate.setThreerate(new BigDecimal(0));
        }
        int count = tAgencyService.selectCountByMap(map);
        List<TAgency> list = tAgencyService.selectByMap(map);
        result.put("agentArray", new JSONArray());
        if (list != null) {
            for (TAgency tAgency : list) {
                Double changeTax = 0d;
                /*********获取当前代理总共提款金额*********/
                Double allPrice = tWithdrawalsService.selectAllPrice(tAgency.getUsername());
                /*********获取当前代理最近一次提现*********/
                TWithdrawals tWithdrawals = tWithdrawalsService.selectLastByMap(map);
                if(tWithdrawals != null){
                    Date auditingtime = tWithdrawals.getAuditingtime();
                    Calendar calendar = Calendar.getInstance();
                    calendar.setTime(auditingtime);
                    rmap.put("startTime",calendar.getTime());
                } //
                map.put("parentagencyid", tAgency.getAgencyid());
                List<TAgency> firstLevelList = tAgencyService.selectListByMap(map);
                for (TAgency oneAgency : firstLevelList) {
                    /**
                     * 根据用户名查看 该游戏玩家充值了多少钱 计算分润(充值金额 * 分润利率)情况
                     */
                    username = oneAgency.getUsername();
                    rmap.put("username", username);
                    map.put("parentagencyid", oneAgency.getAgencyid()); //一级代理
                    changeTax += webVChangeRecordService.selectByDateMap(rmap)  * tRate.getOnerate().doubleValue() /100;
                    List<TAgency> secondLevelList = tAgencyService.selectListByMap(map);
                    for (TAgency twoAgency : secondLevelList) {
                        username = twoAgency.getUsername();
                        rmap.put("username", username);
                        map.put("parentagencyid", twoAgency.getAgencyid());
                        changeTax += webVChangeRecordService.selectByDateMap(rmap)  * tRate.getOnerate().doubleValue() /100;
                        List<TAgency> thirdLevelList = tAgencyService.selectListByMap(map);
                        for (TAgency threeAgency : thirdLevelList) {
                            username = threeAgency.getUsername();
                            rmap.put("username", username);
                            changeTax += webVChangeRecordService.selectByDateMap(rmap)  * tRate.getOnerate().doubleValue() /100;
                        }
                    }
                }
                tAgency.setChangeTax(Math.round(allPrice+changeTax));
            }
        }
        JSONObject object = new JSONObject();
        object.put("list", list);
        object.put("count", count);
        resultObj = new ResultObj(ResultStatus.SUCCESS);
        resultObj.setData(object);
        return resultObj;
    }

    /**
     * 提现管理
     * @param request
     * @return
     */
    @RequestMapping(value = "/withdrawalsManage", method = RequestMethod.POST, produces="application/json;charset=UTF-8")
    @ResponseBody
    public ResultObj withdrawalsManage(HttpServletRequest request) {
        ResultObj resultObj;
        JSONObject result = new JSONObject();
        Map<String, Object> map = new HashMap<String, Object>();
        String startTime = request.getParameter("startTime");
        String endTime = request.getParameter("endTime");
        String username = request.getParameter("username");
        String agencyID = request.getParameter("agencyID");
        String pageNum = request.getParameter(ParamConstants.PAGE_NUM);
        String pageSize = request.getParameter(ParamConstants.PAGE_SIZE);
        if (!TextUtils.isBlank(username)) {
            map.put("username", username);
        }
        if (!TextUtils.isBlank(agencyID)) {
            map.put("agencyID", agencyID);
        }
        if(TextUtils.isBlank(startTime) || TextUtils.isBlank(endTime)){
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(new Date());
            endTime = M_FORMAT.format(calendar.getTime());
            calendar.set(Calendar.MONTH,-3);
            startTime = M_FORMAT.format(calendar.getTime());
        }
        Integer size;
        if (TextUtils.isEmpty(pageSize) || !TextUtils.isPositiveNum(pageSize)) {
            size = Constants.DEFAULT_PAGE_SIZE;
        } else {
            size = Integer.valueOf(pageSize);
            size = size > Constants.MAX_PAGE_SIZE ? Constants.MAX_PAGE_SIZE : size;
        }
        map.put("hStartNum",(Integer.valueOf(pageNum)-1)*20 + 1);
        map.put("hQueryNum",Integer.valueOf(pageNum) * size);
        map.put("startTime",startTime);
        map.put("endTime",endTime);
        int count = tWithdrawalsService.selectCountByMap(map);
        List<TWithdrawals> list = tWithdrawalsService.selectByMap(map);
        JSONObject object = new JSONObject();
        object.put("list", list);
        object.put("count", count);
        resultObj = new ResultObj(ResultStatus.SUCCESS);
        resultObj.setData(object);
        return resultObj;
    }


    /**
     * 提现 审核
     * @param request
     * @return
     */
    @RequestMapping(value = "/withdrawalsUpdate", method = RequestMethod.POST, produces="application/json;charset=UTF-8")
    @ResponseBody
    public ResultObj withdrawalsUpdate(HttpServletRequest request) {
        ResultObj resultObj;
        Map<String, Object> map = new HashMap<String, Object>();
        String id = request.getParameter("id");
        String status = request.getParameter("status");
        if (TextUtils.isBlank(id) || TextUtils.isBlank(status)) {
            LOGGER.debug(ResultStatus.PARAMETERS_EXCEPTION.getMessage());
            resultObj = new ResultObj(ResultStatus.PARAMETERS_EXCEPTION);
            return resultObj;
        }
        map.put("id",id);
        map.put("status",status);
        map.put("auditingtime",new Date());
        int count = tWithdrawalsService.updateByMap(map);
        if(count > 0 ){
            resultObj = new ResultObj(ResultStatus.SUCCESS);
        } else {
            resultObj = new ResultObj(ResultStatus.FAILED);
        }
        return resultObj;
    }

    /**
     * 佣金率
     * @param request
     * @return
     */
    @RequestMapping(value = "/rate", method = RequestMethod.GET, produces="application/json;charset=UTF-8")
    @ResponseBody
    public ResultObj rate(HttpServletRequest request) {
        ResultObj resultObj;
        TRate tRate = tRateService.select();
        resultObj = new ResultObj(ResultStatus.SUCCESS);
        resultObj.setData(tRate);
        return resultObj;
    }

    /**
     * 新增佣金率
     * @param request
     * @return
     */
    @RequestMapping(value = "/rate/insert", method = RequestMethod.POST, produces="application/json;charset=UTF-8")
    @ResponseBody
    public ResultObj rateInsert(HttpServletRequest request) {
        ResultObj resultObj;
        String oneRate = request.getParameter("oneRate");
        String twoRate = request.getParameter("twoRate");
        String threeRate = request.getParameter("threeRate");
        if(TextUtils.isBlank(oneRate) || TextUtils.isBlank(twoRate) || TextUtils.isBlank(threeRate)){
            LOGGER.debug(ResultStatus.PARAMETERS_EXCEPTION.getMessage());
            resultObj = new ResultObj(ResultStatus.PARAMETERS_EXCEPTION);
            return resultObj;
        }
        TRate tRate = tRateService.select();
        if(tRate == null){
            tRate = new TRate();
            tRate.setOnerate(new BigDecimal(oneRate).setScale(2,BigDecimal.ROUND_HALF_UP));
            tRate.setTworate(new BigDecimal(twoRate).setScale(2,BigDecimal.ROUND_HALF_UP));
            tRate.setThreerate(new BigDecimal(threeRate).setScale(2,BigDecimal.ROUND_HALF_UP));
            tRateService.insert(tRate);
            resultObj = new ResultObj(ResultStatus.SUCCESS);
        }else{
            tRate.setOnerate(new BigDecimal(oneRate).setScale(2,BigDecimal.ROUND_HALF_UP));
            tRate.setTworate(new BigDecimal(twoRate).setScale(2,BigDecimal.ROUND_HALF_UP));
            tRate.setThreerate(new BigDecimal(threeRate).setScale(2,BigDecimal.ROUND_HALF_UP));
            tRateService.updateByPrimaryKey(tRate);
            resultObj = new ResultObj(ResultStatus.SUCCESS);
        }
        return resultObj;
    }
}
