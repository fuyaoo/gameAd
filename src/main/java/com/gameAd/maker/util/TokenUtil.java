package com.gameAd.maker.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * token生成工具
 * 使用RES加密/解密
 * Created by beyond on 2017/4/6.
 */
public final class TokenUtil {

    private static final Logger LOGGER = LoggerFactory.getLogger(TokenUtil.class);
    private final static String SPLIT_STR = "-";

    /**
     * 将token解析成mapping
     *
     * @param token
     * @return
     */
    public static Map<String, String> parseToken(String token) {
        if (TextUtils.isEmpty(token)) {
            return null;
        }
        try {
            token = URLDecoder.decode(token, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            LOGGER.error("token使用 URLDecoder解码异常");
            LOGGER.error(e.getMessage(), e);
            return new HashMap<String, String>();
        }
        //先解密
        token = AESUtil.decryption(token);
        if (TextUtils.isEmpty(token)) {
            return null;
        }
        Map<String, String> map = new HashMap<String, String>();
        String str[] = token.split(SPLIT_STR);
        if (str.length != 3) {
            return null;
        }
        map.put("username", str[0]);
        map.put("password", str[1]);
        map.put("time", str[2]);
        return map;
    }

    /**
     * 解析交易信息token
     * @param token
     * @return
     */
    public static Map<String, String> tradingToken(String token){

        String decry = AESUtil.decryption(token);
        if (TextUtils.isEmpty(decry)) {
            return null;
        }
        HashMap<String, String> map = new HashMap<>();
        String[] split = decry.split("-");
        if (split.length != 3) {
            return null;
        }
        map.put("username", split[0]);
        map.put("password", split[1]);
        map.put("time", split[2]);
        return map;
    }

    /**
     * 判断是否超过24小时
     *
     * @param date1
     * @param date2
     * @return boolean
     * @throws Exception
     */

    public static boolean judgmentDate(String date1, String date2) throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        Date start = sdf.parse(date1);
        Date end = sdf.parse(date2);
        long cha = end.getTime() - start.getTime();
        if (cha < 0) {
            return false;
        }
        double result = cha * 1.0 / (1000 * 60 * 60);
        if (result <= 24) {
            return true;
        } else {
            return false;
        }
    }

}