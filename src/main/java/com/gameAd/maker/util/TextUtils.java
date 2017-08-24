package com.gameAd.maker.util;

import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

/**
 * 字符串工具类
 * Created by dell on 2017/3/17.
 */
public final class TextUtils {

    public static boolean isEmpty(String str){
        boolean flag = false;
        if(null==str || 0==str.length())
            flag = true;

        return flag;
    }

    public static boolean isNotEmpty(String str){
        return !isEmpty(str);
    }

    public static boolean isBlank(String str){
        boolean flag = false;
        if(null==str || 0 == str.trim().length())
            flag = true;
        return flag;
    }

    public static boolean isNotBlank(String str){
        return !isBlank(str);
    }

    /**
     * 判断是否是“Y”或者“N”
     * @param str
     * @return
     */
    public static boolean isYOrN(String str){
        if (isBlank(str))
            return false;
        return "Y".equals(str) || "N".equals(str);
    }

    /**
     * 判断是否是“Y”或者“N”或者null
     * @param str
     * @return
     */
    public static boolean isYOrNOrNull(String str){
        return isBlank(str) || isYOrN(str);
    }


    /**
     * 国内手机号码11位数，匹配格式：前三位固定格式+后8位任意数
     * 此方法中前三位格式有：
     * 13+任意数
     * 15+除4的任意数
     * 18+除1和4的任意数
     * 17+除9的任意数
     * 147
     */
    public static boolean isPhone(String str) throws PatternSyntaxException {
        if (isBlank(str)) return false;
        String regExp = "^((13[0-9])|(15[^4])|(18[0,2,3,5-9])|(17[0-8])|(147))\\d{8}$";
        Pattern p = Pattern.compile(regExp);
        Matcher m = p.matcher(str);
        return m.matches();
    }

    /**
     * 邮箱
     * @param str
     * @return
     * @throws PatternSyntaxException
     */
    public static boolean isEmail(String str) throws PatternSyntaxException {
        if (isBlank(str)) return false;
        String regExp = "^[a-z0-9]+([._\\\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$";
        Pattern p = Pattern.compile(regExp);
        Matcher m = p.matcher(str);
        return m.matches();
    }

    /**
     * 生成6位短信验证码
     * @return
     */
    public static String createSmsCode(){
        StringBuilder code = new StringBuilder();
        Random random = new Random();
        // 生成6位验证码
        for (int i = 0; i < 4; i++) {
            code.append(String.valueOf(random.nextInt(10)));
        }
        return code.toString();
    }

    /**
     * 由8-15位大小写字母和数字组成
     */
    public static boolean isValidPwd(String str) throws PatternSyntaxException {
        String regExp = "^(?!([a-zA-Z]+|\\d+)$)[a-zA-Z\\d]{8,15}$";
        Pattern p = Pattern.compile(regExp);
        Matcher m = p.matcher(str);
        return m.matches();
    }

    /**
     *  判断数字类型
     * @param str
     * @return
     * @throws PatternSyntaxException
     */
    public static boolean isNumber(String str) throws PatternSyntaxException {
        if (str == null)
            return false;
        String regExp = "^-?\\d+$";
        Pattern p = Pattern.compile(regExp);
        Matcher m = p.matcher(str);
        return m.matches();
    }

    /**
     * 判断正整数
     * @param str
     * @return
     * @throws PatternSyntaxException
     */
    public static boolean isPositiveNum(String str) throws PatternSyntaxException {
        if (isBlank(str)) return false;
        String regExp = "^\\d+$";
        Pattern p = Pattern.compile(regExp);
        Matcher m = p.matcher(str);
        return m.matches();
    }

    /**
     * 判断时间格式是否匹配<code>yyyy-MM-dd HH:CC:SS</code>
     * @param str
     * @return
     * @throws PatternSyntaxException
     */
    public static boolean isDateTime(String str) throws PatternSyntaxException {
        if (isBlank(str)) return false;
        String regExp = "^(\\d{4}-\\d{2}-\\d{2}) (\\d{2}:\\d{2}:\\d{2})$";
        Pattern p = Pattern.compile(regExp);
        Matcher m = p.matcher(str);
        return m.matches();
    }

    /**
     * 判断时间格式是否匹配<code>yyyyMMdd</code>
     * @param str
     * @return
     * @throws PatternSyntaxException
     */
    public static boolean isDate(String str) throws PatternSyntaxException {
        if (isBlank(str)) return false;
        String regExp = "^([1-9]\\d{3})(([0][1-9])|([1][0-2]))(([0][1-9])|([1-3][0-9]))$";
        Pattern p = Pattern.compile(regExp);
        Matcher m = p.matcher(str);
        return m.matches();
    }

    /**
     * 判断时间格式是否匹配<code>yyyy-MM-dd</code>
     * @param str
     * @return
     * @throws PatternSyntaxException
     */
    public static boolean isDate2(String str) throws PatternSyntaxException {
        if (isBlank(str)) return false;
        String regExp = "^(\\d{4}-\\d{2}-\\d{2})$";
        Pattern p = Pattern.compile(regExp);
        Matcher m = p.matcher(str);
        return m.matches();
    }

    /**
     * 是否是约定的文件名称格式：
     * GoldMister-v1.0.1-2-dev-20170525.apk
     * @param str
     * @return
     * @throws PatternSyntaxException
     */
    public static boolean isApkFileName(String str) throws PatternSyntaxException {
        if (isBlank(str)) return false;
        String regExp = "^([a-zA-Z]+-v\\d{1,2}.\\d{1,2}.\\d{1,2}-\\d{1,3}-[a-z]+-\\d{8}.apk)$";
        Pattern p = Pattern.compile(regExp);
        Matcher m = p.matcher(str);
        return m.matches();
    }


    /**
     * Description:是否是2003的excel，返回true是2003
     * @param filePath
     * @return
     */
    public static boolean isExcel2003(String filePath)  {
        return filePath.matches("^.+\\.(?i)(xls)$");
    }


    /**
     * Description:描述：是否是2007的excel，返回true是2007
     * @param filePath
     * @return
     */
    public static boolean isExcel2007(String filePath)  {
        return filePath.matches("^.+\\.(?i)(xlsx)$");
    }

    public static void main(String[] args){
        System.out.print("GoldMister-v1.0.1-2-release-20170525.apk".matches("^([a-zA-Z]+-v\\d{1,2}.\\d{1,2}.\\d{1,2}-\\d{1,3}-[a-z]+-\\d{8}.apk)$"));
    }
}
