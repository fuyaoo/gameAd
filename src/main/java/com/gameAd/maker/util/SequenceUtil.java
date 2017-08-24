package com.gameAd.maker.util;

import org.apache.commons.lang.StringUtils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

/**
 * 序列号生成工具
 * Created by beyond on 2017/4/5.
 */
public final class SequenceUtil {

    private final static String nick_prefix = "黄金先生";
    private final static String NICK_SUFFIX = "号";

    public static String generateNickName() {
        Random random = new Random();
        StringBuffer sb = new StringBuffer(nick_prefix);
        sb.append(StringUtils.leftPad(String.valueOf(random.nextInt(99999)), 5, "0"));
        sb.append(NICK_SUFFIX);
        return sb.toString();
    }

    /**
     * 获取一个格式化的文件名称
     * @return
     */
    public static String generateFileName() {
        Random random = new Random();
        StringBuffer sb = new StringBuffer(DateUtils.convertToStringDate4(new Date()));
        sb.append(StringUtils.leftPad(String.valueOf(random.nextInt(99999)), 5, "0"));
        return sb.toString();
    }

    /**
     * 获取时间工具方法
     * @return
     */
    public static String serialNo(){
        Date date = new Date();
        String serialNo = dateToString(date);

        return serialNo;
    }

    public static String dateToString(Date time){
        SimpleDateFormat formatter;
        formatter = new SimpleDateFormat ("yyyyMMddHHmmss");
        String ctime = formatter.format(time);

        return ctime;
    }

    public static void main(String args[]) {
        System.out.println(generateFileName());
    }


}
