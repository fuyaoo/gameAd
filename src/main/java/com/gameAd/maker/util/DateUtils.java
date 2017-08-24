package com.gameAd.maker.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 日期工具类
 *
 * Created by beyond on 2017/4/12.
 */
public final class DateUtils {

	public final  static String TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
	public final  static String TIME_FORMAT_2 = "yyyy-MM-dd HH:mm";
	public final  static String DATE_FORMAT = "yyyy-MM-dd";
	public final  static String DATE_FORMAT_2 = "MM-dd HH:mm";
	public final  static String DATE_FORMAT_3 = "yyyyMMdd";
	public final  static String DATE_FORMAT_4 = "yyyyMMddHHmmssSSS";



	/**
	 * 按照格式格式化时间，默认按yyyy-MM-dd HH:mm:ss
	 * @param date
	 * @param formatString
     * @return
     */
	public static String convertToStringDate(Date date, String formatString) {
		try {
			if (TextUtils.isEmpty(formatString)) {
				SimpleDateFormat sdf_datetime_s = new SimpleDateFormat(TIME_FORMAT);
				return sdf_datetime_s.format(date);
			} else {
				SimpleDateFormat format = new SimpleDateFormat(formatString);
				return format.format(date);
			}
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * 将字符串转化为JAVA时间类型(精确到秒)。
	 * 格式 yyyy-MM-dd HH:mm:ss
	 *
	 * @return
	 *      date JAVA时间类型。
	 */
	public static Date convertToDateTime(String dateStr) {
		SimpleDateFormat sdf = new SimpleDateFormat(TIME_FORMAT);
		try {
			return sdf.parse(dateStr);
		} catch (Exception e) {
			return null;
		}
	}

	public static Date convertToDateTime(String dateStr, String format) {
		if (TextUtils.isEmpty(format)) {
			format = TIME_FORMAT;
		}
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		try {
			return sdf.parse(dateStr);
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * 将字符串转化为JAVA时间类型(精确到分)。
	 *	格式 yyyy-MM-dd HH:mm
	 * @return
	 * 			date。JAVA时间类型。
	 * @param
	 *            。字符串。
	 */
	public static String convertToStringMiniuteDate(Date date) {
		SimpleDateFormat sdf = new SimpleDateFormat(TIME_FORMAT_2);
		try {
			return sdf.format(date);
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * 得到传入日期n分钟后的日期,如果传入日期为null，则表示当前日期n分钟后的日期
	 * @param dt
	 * @param minute
     * @return
     */
	public static Date getAddMinuteTime(Date dt, int minute) {
        if (dt == null)
            dt = new Date(System.currentTimeMillis());
        Calendar cal = Calendar.getInstance();
        cal.setTime(dt);
        cal.set(Calendar.MINUTE, cal.get(Calendar.MINUTE) + minute);
        return cal.getTime();
    }

	/**
	 * 将日期转化为字符串(精确到秒)。
	 * 格式yyyy-MM-dd HH:mm:ss
	 * @return
	 * 	date JAVA时间类型。
	 * @param
	 *            。字符串。
	 */
	public static String convertToStringTime(Date date) {
		SimpleDateFormat format = new SimpleDateFormat(TIME_FORMAT);
		try {
			return format.format(date);
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * 转化得到时间
	 * 格式yyyy-MM-dd
	 * @param dateStr
	 * @return
     */
	public static Date convertToDate(String dateStr) {
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
		try {
			return sdf.parse(dateStr);
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * 格式化时间
	 * 格式：yyyy-MM-dd
	 * @param date
	 * @return
     */
	public static String convertToStringDate(Date date) {
		SimpleDateFormat format = new SimpleDateFormat(DATE_FORMAT);
		try {
			return format.format(date);
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * 格式化时间
	 * 格式：MM-dd HH:mm
	 * @param date
	 * @return
	 */
	public static String convertToStringDate2(Date date) {
		SimpleDateFormat format = new SimpleDateFormat(DATE_FORMAT_2);
		try {
			return format.format(date);
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * 格式化时间
	 * 格式：yyyyMMddHHmmssSSS
	 * @param date
	 * @return
	 */
	public static String convertToStringDate3(Date date) {
		SimpleDateFormat format = new SimpleDateFormat(DATE_FORMAT_3);
		try {
			return format.format(date);
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * 格式化时间
	 * 格式：yyyyMMdd
	 * @param date
	 * @return
     */
	public static String convertToStringDate4(Date date) {
		SimpleDateFormat format = new SimpleDateFormat(DATE_FORMAT_4);
		try {
			return format.format(date);
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * 得到当前日期
	 * 格式：yyyy-MM-dd
	 * @return
     */
	public static String getToday() {
		return DateUtils.convertToStringDate(new Date());
	}

	/**
	 * 将时间移动days天
	 * 
	 * @param date
	 *            当前日期
	 * @param days
	 *            移动的天数
	 * @return 移动后的时间
	 */
	public static Date addDay(Date date, Integer days) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.add(Calendar.DAY_OF_YEAR, days);
		return c.getTime();
	}

	/**
	 * 将时间移动days天
	 * 往前移动days天，并且会得到当前00:00:00
	 * 往后移动days天，并且会得到当前23:59:59
	 * @param date
	 * @param days
     * @return
     */
	public static Date addDay2(Date date, Integer days) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.DAY_OF_YEAR, days);
		if (days > 0) {
			calendar.set(Calendar.HOUR_OF_DAY, 23);
			calendar.set(Calendar.MINUTE, 59);
			calendar.set(Calendar.SECOND, 59);
			calendar.set(Calendar.MILLISECOND, 999);
		} else {
			calendar.set(Calendar.HOUR_OF_DAY, 0);
			calendar.set(Calendar.MINUTE, 0);
			calendar.set(Calendar.SECOND, 0);
		}
		return calendar.getTime();
	}

	/**
	 * 将时间移动minutes分钟
	 *
	 * @param date
	 *            当前日期
	 * @param minutes
	 *            移动的分钟
	 * @return 移动后的时间
	 */
	public static Date addMinute(Date date, Integer minutes) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.add(Calendar.MINUTE, minutes);
		return c.getTime();
	}

	/**
	 * 将时间移动months月
	 * 往前移动months月，并且会得到当前00:00:00
	 * 往后移动months月，并且会得到当前23:59:59
	 * @param date
	 *            当前日期
	 * @param months
	 *            移动的月数
	 * @return 移动后的时间
	 */
	public static Date addMonth(Date date, Integer months) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.add(Calendar.MONTH, months);
		return c.getTime();
	}

	/**
	 * 将时间移动months月
	 *
	 *
	 * @param date
	 *            当前日期
	 * @param months
	 *            移动的月数
	 * @return 移动后的时间
	 */
	public static Date addMonth2(Date date, Integer months) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.MONTH, months);
		if (months > 0) {
			calendar.set(Calendar.HOUR_OF_DAY, 23);
			calendar.set(Calendar.MINUTE, 59);
			calendar.set(Calendar.SECOND, 59);
			calendar.set(Calendar.MILLISECOND, 999);
		} else {
			calendar.set(Calendar.HOUR_OF_DAY, 0);
			calendar.set(Calendar.MINUTE, 0);
			calendar.set(Calendar.SECOND, 0);
		}
		return calendar.getTime();
	}


	/**
	 * 得到某天的开始时间
	 * @param date
	 * @return
     */
	public static Date dayBegin(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		return calendar.getTime();
	}

	/**
	 * 得到某天的最后时间
	 *
	 * @param date
	 * @return
     */
	public static Date dayEnd(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(Calendar.HOUR_OF_DAY, 23);
		calendar.set(Calendar.MINUTE, 59);
		calendar.set(Calendar.SECOND, 59);
		calendar.set(Calendar.MILLISECOND, 999);
		return calendar.getTime();
	}
	
	/**
     * 得到当月第一天的最早时间
     * 
     * @author:  beyond 
     * @return
     */
    public static String getFirstDayOfMonth() {
        //获取当前月第一天：
        Calendar c = Calendar.getInstance();    
        c.add(Calendar.MONTH, 0);
        c.set(Calendar.DAY_OF_MONTH,1);//设置为1号,当前日期既为本月第一天 
        c.set(Calendar.HOUR_OF_DAY, 0);
        c.set(Calendar.MINUTE, 0);
        c.set(Calendar.SECOND, 0);
		DateFormat	DATE_TIME_FORMAT	= new SimpleDateFormat(TIME_FORMAT);
        return DATE_TIME_FORMAT.format(c.getTime());
    }

    /**
     * 得到当月最后一天的最后时间
     * 
     * @author:  beyond 
     * @return
     */
    public static String getLastDayOfMonth() {
        //获取当前月最后一天
        Calendar ca = Calendar.getInstance();    
        ca.set(Calendar.DAY_OF_MONTH, ca.getActualMaximum(Calendar.DAY_OF_MONTH));
        ca.set(Calendar.HOUR_OF_DAY, 23);
        ca.set(Calendar.MINUTE, 59);
        ca.set(Calendar.SECOND, 59);
		DateFormat	DATE_TIME_FORMAT	= new SimpleDateFormat(TIME_FORMAT);
        return DATE_TIME_FORMAT.format(ca.getTime());
    }

	public static int compareTimeSize(String startTime, String endTime, String date){
		// 比较时间大小
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Calendar c1 = Calendar.getInstance();
		Calendar c2 = Calendar.getInstance();
		Calendar c3 = Calendar.getInstance();
		try{
			c1.setTime(df.parse(startTime));
			c2.setTime(df.parse(endTime));
			c3.setTime(df.parse(date));
		}catch(java.text.ParseException e){
			System.err.println("格式不正确");
		}
		if(startTime != null){
			int issue = c3.compareTo(c1);
			if(issue > 0){
				return 0;
			}

			int issues = c3.compareTo(c2);
			if(issues < 0){
				return 1;
			}

		}
		return 2;

	}

	/**
	 * 资讯时长
	 * @param publishTime
	 * @return
     */
	public static String getApartStr(Date publishTime) {
		String str = null;
		Date now = new Date();
		//处理时长，1，发布时间在当天之前的，不做处理，2，发布时间在当天之后且已经发布了的，显示几个小时前的字样
		if (publishTime != null && publishTime.before(now) && publishTime.after(DateUtils.dayBegin(now))) {
			long apart = now.getTime() - publishTime.getTime();
			long hours = apart / Constants.ONE_HOUR_TIMS;   //相差小时数
			long minutes = apart / Constants.ONE_MINUTES_TIMS;  //相差分钟数
			if (hours == 0) {   //表示不足一小时，显示分钟
				if (minutes == 0) {     //表示不足一分钟，显示刚刚
					str = Constants.JUST_NOW_STR;
				} else {
					//显示分钟
					str = String.format(Constants.ONE_MINUTES_FORMAT_STR, minutes);
				}
			} else {
				//显示小时
				str = String.format(Constants.ONE_HOUR_FORMAT_STR, hours);
			}
		} else if (publishTime != null && publishTime.before(now)) {
			str = DateUtils.convertToStringDate2(publishTime);
		}
		return str;
	}

	public static void main(String[] args) {
		String s1="2008-01-01 00:00:00";
		System.out.println(getApartStr(DateUtils.convertToDateTime(s1)));

		String time = DateUtils.convertToStringTime(DateUtils.addMonth(new Date(), -1));
		System.out.println(time);

		System.out.println(DateUtils.convertToDateTime(s1).getTime() / 1000);


	}
}