package com.gameAd.maker.controller;

import com.alibaba.fastjson.JSONObject;
import com.gameAd.maker.bean.TAgency;
import com.gameAd.maker.bean.TRate;
import com.gameAd.maker.bean.TUsers;
import com.gameAd.maker.bean.TWithdrawals;
import com.gameAd.maker.service.*;
import com.gameAd.maker.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.net.URLEncoder;
import java.util.*;

/**
 * 微信接口
 */
@Controller
@RequestMapping("/weixin")
public class WeiXinController {

    private Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    TUsersService tUsersService;
    @Autowired
    TAgencyService tAgencyService;
    @Autowired
    TWithdrawalsService tWithdrawalsService;
    @Autowired
    Web_VChangeRecordService webVChangeRecordService;
    @Autowired
    AgentConfig agentConfig;
    @Autowired
    TRateService tRateService;

    /**
     * 获取code
     * @param request
     * @return
     */
    @RequestMapping(value = "/getcode", method = RequestMethod.GET, produces="application/json;charset=UTF-8")
    public void getList(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Map<String,Object> map = new HashMap<String ,Object>();
        String code = request.getParameter("code");
        int type = Integer.valueOf(request.getParameter("type"));
        String url = "https://api.weixin.qq.com/sns/oauth2/access_token";
        String queryString = "appid="+ URLEncoder.encode(agentConfig.getAPPID())+"&secret="+URLEncoder.encode(agentConfig.getSECRET())+"&code="+code+"&grant_type=authorization_code";
        String result = HttpUtils.sendGet(url,queryString);
        JSONObject jsonObject = JSONObject.parseObject(result);
        //String access_token = jsonObject.getString("access_token"); //网页授权接口调用凭证,注意：此access_token与基础支持的access_token不同
        //String expires_in = jsonObject.getString("expires_in"); //access_token接口调用凭证超时时间，单位（秒）
        //String refresh_token = jsonObject.getString("refresh_token"); //用户刷新access_token
        //String scope = jsonObject.getString("scope"); //用户授权的作用域，使用逗号（,）分隔
        String openid = jsonObject.getString("openid"); //用户唯一标识，请注意，在未关注公众号时，用户访问公众号的网页，也会产生一个用户和公众号唯一的OpenID
        if(! TextUtils.isBlank(openid)){
//        if(TextUtils.isBlank(openid)){
            map.put("openid","WX_"+openid);
            map.put("username","WX_"+openid);
            TUsers tUsers = tUsersService.selectByMap(map);
            TAgency tAgency = tAgencyService.selectOneByMap(map);
            if(tUsers != null && tAgency != null){
                if(type == 1){
                    response.sendRedirect("/views/index.html?username"+"WX_"+openid+"&agencyID="+tAgency.getAgencyid());
                }else if(type == 2){
                    response.sendRedirect("/views/query.html?username="+"WX_"+openid+"&agencyID="+tAgency.getAgencyid());
                }
            }else {
                tAgency = new TAgency();
                tAgency.setNickname(tUsers.getNickname());
                tAgency.setUsername("WX_"+openid);
                tAgency.setParentagencyid(0);
                tAgencyService.insert(tAgency);
                if(type == 1){
                    response.sendRedirect("/views/index.html?msg=1&username"+"WX_"+openid);//您还不是代理!
                }else if(type == 2){
                    response.sendRedirect("/views/query.html?msg=1&username"+"WX_"+openid);
                }
            }
        }else {
            if(type == 1){
                response.sendRedirect("/views/index.html?msg=2"); //授权失败!
            }else if(type == 2){
                response.sendRedirect("/views/query.html?msg=2");
            }
        }
        return;
    }

    /**
     * 提现 新增
     * @param request
     * @return
     */
    @RequestMapping(value = "/withdrawalsInsert", method = RequestMethod.POST, produces="application/json;charset=UTF-8")
    @ResponseBody
    public ResultObj withdrawalsInsert(HttpServletRequest request) {
        ResultObj resultObj;
        Map<String, Object> map = new HashMap<String, Object>();
        String username = request.getParameter("username");
        String money = request.getParameter("money");
        if (TextUtils.isBlank(username) || TextUtils.isBlank(money)) {
            LOGGER.debug(ResultStatus.PARAMETERS_EXCEPTION.getMessage());
            resultObj = new ResultObj(ResultStatus.PARAMETERS_EXCEPTION);
            return resultObj;
        }
        /***************提现周期  半个月(15天)*******************/
        /*********获取当前代理最近一次提现*********/
        map.put("username",username);
        map.put("status",1);
        TWithdrawals withdrawals = tWithdrawalsService.selectLastByMap(map);
        if(withdrawals != null){
            Date auditingtime = withdrawals.getAuditingtime();
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(auditingtime);
            calendar.add(Calendar.DAY_OF_MONTH,15);
            if(calendar.getTime().getTime() > new Date().getTime()){  //最近一次提现是否距今已有半个月
                resultObj = new ResultObj(ResultStatus.FAILED);
                return resultObj;
            }
        }
        TAgency tAgency = tAgencyService.selectOneByMap(map);
        if(tAgency != null){
            TWithdrawals tWithdrawals = new TWithdrawals();
            tWithdrawals.setAgencyid(tAgency.getAgencyid());
            tWithdrawals.setUsername(username);
            tWithdrawals.setMoney(Long.valueOf(money));  //只能为long
            tWithdrawals.setCreatetime(new Date());
            tWithdrawals.setStatus(0); //待审核  0:待审核  1：审核通过 2：拒绝提现
            int count = tWithdrawalsService.insert(tWithdrawals);
            if(count > 0 ){
                resultObj = new ResultObj(ResultStatus.SUCCESS);
            } else {
                resultObj = new ResultObj(ResultStatus.FAILED);
            }
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
        Map<String,Object> map = new HashMap<String ,Object>();
        String parentagencyid = request.getParameter("parentagencyid");
        String code = request.getParameter("code");
        String url = "https://api.weixin.qq.com/sns/oauth2/access_token";
        String queryString = "appid="+ URLEncoder.encode(agentConfig.getAPPID())+"&secret="+URLEncoder.encode(agentConfig.getSECRET())+"&code="+code+"&grant_type=authorization_code";
        String rt = HttpUtils.sendGet(url,queryString);
        JSONObject jsonObject = JSONObject.parseObject(rt);
        String openid = jsonObject.getString("openid"); //用户唯一标识，请注意，在未关注公众号时，用户访问公众号的网页，也会产生一个用户和公众号唯一的OpenID
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
        //TUsers tUsers = tUsersService.selectByMap(map);
        //if(tUsers != null){
            map.put("username","WX_"+openid);
            List<TAgency> list = tAgencyService.selectByMap(map);
            if(list.size() > 0){
                resultObj = new ResultObj(ResultStatus.UID_EXIST);
                return resultObj;
            }
            TAgency tAgency = new TAgency();
            tAgency.setNickname("");
            tAgency.setUsername("WX_"+openid);
            tAgency.setParentagencyid(Integer.valueOf(parentagencyid));
            tAgencyService.insert(tAgency);
            resultObj = new ResultObj(ResultStatus.SUCCESS);
        return resultObj;
    }

    /**
     * 生成二维码
     * @param request
     * @return
     */
    @RequestMapping(value = "/generateQRcode", method = RequestMethod.POST, produces="application/json;charset=UTF-8")
    @ResponseBody
    public ResultObj generateQRcode(HttpServletRequest request) throws MalformedURLException {
        ResultObj resultObj;
        Map<String, Object> map = new HashMap<String, Object>();
        String username = request.getParameter("username");
        if (TextUtils.isBlank(username)) {
            LOGGER.debug(ResultStatus.PARAMETERS_EXCEPTION.getMessage());
            resultObj = new ResultObj(ResultStatus.PARAMETERS_EXCEPTION);
            return resultObj;
        }
        map.put("openid",username);
        map.put("username",username);
        TUsers tUsers = tUsersService.selectByMap(map);
        if(tUsers != null){
            TAgency tAgency = tAgencyService.selectOneByMap(map);
            if(tAgency != null){
                String img = request.getSession().getServletContext().getRealPath("/WEB-INF/statics/img/");
                String downloadPath = agentConfig.getDownloadPath() + "?agencyID="+tAgency.getAgencyid();//下载地址
                downloadPath = GetWeiXinCode.getCodeRequest(downloadPath,agentConfig.getAPPID(),agentConfig.getSCOPE()); //封装成授权链接
                StringBuffer fileName = new StringBuffer().append(username).append(".png");
                //二维码存放地址
                String downAPP = null;
                StringBuffer app = new StringBuffer();
                app.append(img).append(fileName);
                downAPP = app.toString();

                //原图片地址
                String download = null;
                StringBuffer downPath = new StringBuffer();
                downPath.append(img).append("logo.png");
                download = downPath.toString();
                QRcodeUtil.encode(downloadPath, 448, 448, download, downAPP);//生成二维码
                resultObj = new ResultObj(ResultStatus.SUCCESS);
                resultObj.setData("http://39.108.6.26/img/"+fileName);
                return resultObj;
            }
        }
        resultObj = new ResultObj(ResultStatus.FAILED);
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
        String username = request.getParameter("username");
        if (!TextUtils.isBlank(username)) {
            map.put("username", username);
        }
        TRate tRate = tRateService.select();
        if(tRate == null){
            tRate.setOnerate(new BigDecimal(0));
            tRate.setTworate(new BigDecimal(0));
            tRate.setThreerate(new BigDecimal(0));
        }
        TAgency tAgency = tAgencyService.selectOneByMap(map);
        if (tAgency != null) {
            long changeTax = 0;
            map.put("parentagencyid", tAgency.getAgencyid());
            List<TAgency> firstLevelList = tAgencyService.selectListByMap(map);
            for (TAgency oneAgency : firstLevelList) {
                /**
                 * 根据用户名查看 该游戏玩家充值了多少钱 计算分润(充值金额 * 分润利率)情况
                 */
                username = oneAgency.getUsername();
                map.put("username", username);
                map.put("parentagencyid", oneAgency.getAgencyid()); //一级代理
                changeTax += webVChangeRecordService.selectByMap(map) * tRate.getOnerate().doubleValue() / 100;
                List<TAgency> secondLevelList = tAgencyService.selectListByMap(map);
                for (TAgency twoAgency : secondLevelList) {
                    username = twoAgency.getUsername();
                    map.put("username", username);
                    map.put("parentagencyid", twoAgency.getAgencyid());
                    changeTax += webVChangeRecordService.selectByMap(map) * tRate.getTworate().doubleValue() /100;
                    List<TAgency> thirdLevelList = tAgencyService.selectListByMap(map);
                    for (TAgency threeAgency : thirdLevelList) {
                        username = threeAgency.getUsername();
                        map.put("username", username);
                        changeTax += webVChangeRecordService.selectByMap(map) * tRate.getThreerate().doubleValue() /100;
                    }
                }
            }
            tAgency.setChangeTax(changeTax);
            resultObj = new ResultObj(ResultStatus.SUCCESS);
            resultObj.setData(tAgency);
            return resultObj;
        }
        resultObj = new ResultObj(ResultStatus.FAILED);
        return resultObj;
    }

    /**
     * 代理查看余额
     * @param request
     * @return
     */
    @RequestMapping(value = "/Web_VChangeRecord", method = RequestMethod.POST, produces="application/json;charset=UTF-8")
    @ResponseBody
    public ResultObj Web_VChangeRecord(HttpServletRequest request) {
        ResultObj resultObj;
        Map<String, Object> map = new HashMap<String, Object>();
        Map<String, Object> rmap = new HashMap<String, Object>();
        String username = request.getParameter("username");
        if (TextUtils.isBlank(username)) {
            LOGGER.debug(ResultStatus.PARAMETERS_EXCEPTION.getMessage());
            resultObj = new ResultObj(ResultStatus.PARAMETERS_EXCEPTION);
            return resultObj;
        }
        map.put("username",username);
        map.put("status",1);
        long changeTax = 0;
        /*********获取当前代理最近一次提现*********/
        TWithdrawals tWithdrawals = tWithdrawalsService.selectLastByMap(map);
        if(tWithdrawals != null){
            Date auditingtime = tWithdrawals.getAuditingtime();
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(auditingtime);
            rmap.put("startTime",calendar.getTime());
        } //EndTime  > startTime
        TRate tRate = tRateService.select();
        if(tRate == null){
            tRate.setOnerate(new BigDecimal(0));
            tRate.setTworate(new BigDecimal(0));
            tRate.setThreerate(new BigDecimal(0));
        }
        TAgency tAgency = tAgencyService.selectOneByMap(map);
        if (tAgency != null) {
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
            resultObj = new ResultObj(ResultStatus.SUCCESS);
            resultObj.setData(changeTax);
        } else {
            resultObj = new ResultObj(ResultStatus.FAILED);
        }
        return resultObj;
    }


    /**
     * 获取 token
     * @param request
     * @return
     */
    @RequestMapping(value = "/getToken", method = RequestMethod.GET, produces="application/json;charset=UTF-8")
    public void getToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Map<String,Object> map = new HashMap<String ,Object>();
        String signature = request.getParameter("signature");
        String timestamp = request.getParameter("timestamp");
        String nonce = request.getParameter("nonce");
        String echostr = request.getParameter("echostr");
        if(TextUtils.isBlank(signature) || TextUtils.isBlank(timestamp) || TextUtils.isBlank(nonce) || TextUtils.isBlank(echostr)){
            LOGGER.debug(ResultStatus.PARAMETERS_EXCEPTION.getMessage());
            response.getWriter().write("");
            return;
        }
        LOGGER.debug("-----------------------token-------start------------------");
        LOGGER.debug("----signature:"+signature);
        LOGGER.debug("----timestamp:"+timestamp);
        LOGGER.debug("----nonce:"+nonce);
        LOGGER.debug("----echostr:"+echostr);
        LOGGER.debug("-----------------------token--------end-------------------");
        String token = "asdasff111";
        String[] arr = new String[] { token, timestamp, nonce };
        //String[] arr = new String[] { token, "1504445538", "3831598116" };
        //按字典排序
        Arrays.sort(arr);
        StringBuilder content = new StringBuilder();
        for (int i = 0; i < arr.length; i++) {
            content.append(arr[i]);
        }
        if(signature.equals(Encrypt.encrypt(content.toString(), "SHA-1"))){
            LOGGER.debug("-----------------------token--------return-------true------------");
            response.getWriter().write(echostr);
            return;
        }else {
            response.getWriter().write("");
            return;
        }
    }

}
