package com.gameAd.maker.util;

/**
 * Created by dell on 2017/3/20.
 * 常量
 */
public final class Constants {


    /**token中对应的字段名*/
    public static final String TOKEN_UID = "tokenUid";
    public static final String TOKEN_STATUS = "tokenStatus";
    public static final String TOKEN_USER_TYPE = "tokenUserType";
    public static final String TOKEN_START_TIME = "tokenStartTime";
    public static final String TOKEN_EFFECTIVE_TIME = "tokenEffectiveTime";

    public static final long ONE_HOUR_TIMS = 1000 * 60 * 60;   //一小时的毫秒数
    public static final String ONE_HOUR_FORMAT_STR = "%d小时前";
    public static final long ONE_MINUTES_TIMS = 1000 * 60;   //一分钟的毫秒数
    public static final String ONE_MINUTES_FORMAT_STR = "%d分钟前";
    public static final String JUST_NOW_STR = "刚刚";   //刚刚

    /**客服app常用问题h5链接*/
    public static final String CUSTOMER_QUESTIONS = "customer.questions";

    public static final int TOKEN_ACTIVE_MINUTES = 60;
    public static final Integer DEFAULT_PAGE_SIZE = 20;
    public static final Integer MAX_PAGE_SIZE = 50;

    /**
     * 微信
     */
    public static final String APPID = "APPID";
    public static final String REDIRECT_URI = "REDIRECT_URI";
    public static final String SCOPE = "SCOPE";
    public static final String SECRET = "SECRET";
}