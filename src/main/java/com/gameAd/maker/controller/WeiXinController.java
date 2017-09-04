package com.gameAd.maker.controller;

import com.alibaba.fastjson.JSONObject;
import com.gameAd.maker.bean.TAgency;
import com.gameAd.maker.bean.TUsers;
import com.gameAd.maker.bean.TWithdrawals;
import com.gameAd.maker.bean.WebManageAdmin;
import com.gameAd.maker.service.TAgencyService;
import com.gameAd.maker.service.TUsersService;
import com.gameAd.maker.service.TWithdrawalsService;
import com.gameAd.maker.service.Web_VChangeRecordService;
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
import java.util.*;

/**
 * 微信接口
 */
@Controller
@RequestMapping("/weixin")
public class WeiXinController {

    private Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    TUsersService tUsersService;@Autowired
    TAgencyService tAgencyService;
    @Autowired
    TWithdrawalsService tWithdrawalsService;
    @Autowired
    Web_VChangeRecordService webVChangeRecordService;

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

    /**
     * 获取code
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
        String agencyID = request.getParameter("agencyID");
        String money = request.getParameter("money");
        if (TextUtils.isBlank(username) || TextUtils.isBlank(agencyID) || TextUtils.isBlank(money)) {
            LOGGER.debug(ResultStatus.PARAMETERS_EXCEPTION.getMessage());
            resultObj = new ResultObj(ResultStatus.PARAMETERS_EXCEPTION);
            return resultObj;
        }
        /***************提现周期  半个月(15天)*******************/
        /*********获取当前代理最近一次提现*********/
        map.put("username",username);
        map.put("status",1);
        TWithdrawals withdrawals = tWithdrawalsService.selectLastByMap(map);
        Date auditingtime = withdrawals.getAuditingtime();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(auditingtime);
        calendar.add(Calendar.DAY_OF_MONTH,15);
        if(calendar.getTime().getTime() > new Date().getTime()){  //最近一次提现是否距今已有半个月
            resultObj = new ResultObj(ResultStatus.FAILED);
            return resultObj;
        }
        TWithdrawals tWithdrawals = new TWithdrawals();
        tWithdrawals.setAgencyid(Integer.valueOf(agencyID));
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
        Date auditingtime = tWithdrawals.getAuditingtime();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(auditingtime);
        rmap.put("startTime",calendar.getTime()); //EndTime  > startTime
        List<TAgency> list = tAgencyService.selectByMap(map);
        if (list != null) {
            for (TAgency tAgency : list) {
                map.put("parentagencyid", tAgency.getAgencyid());
                List<TAgency> firstLevelList = tAgencyService.selectListByMap(map);
                for (TAgency oneAgency : firstLevelList) {
                    /**
                     * 根据用户名查看 该游戏玩家充值了多少钱 计算分润(充值金额 * 分润利率)情况
                     */
                    username = oneAgency.getUsername();
                    rmap.put("username", username);
                    map.put("parentagencyid", oneAgency.getAgencyid()); //一级代理
                    changeTax += webVChangeRecordService.selectByDateMap(rmap);
                    List<TAgency> secondLevelList = tAgencyService.selectListByMap(map);
                    for (TAgency twoAgency : secondLevelList) {
                        username = twoAgency.getUsername();
                        rmap.put("username", username);
                        map.put("parentagencyid", twoAgency.getAgencyid());
                        changeTax += webVChangeRecordService.selectByDateMap(rmap);
                        List<TAgency> thirdLevelList = tAgencyService.selectListByMap(map);
                        for (TAgency threeAgency : thirdLevelList) {
                            username = threeAgency.getUsername();
                            rmap.put("username", username);
                            changeTax += webVChangeRecordService.selectByDateMap(rmap);
                        }
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
}
