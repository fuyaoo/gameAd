package com.gameAd.maker.util;

import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;

/**
 * Created by Administrator on 2017/7/25.
 */
public class HanYuPinYinUtil {
    private static final HanyuPinyinOutputFormat format = new HanyuPinyinOutputFormat();

    //转换单个字符
    public static String getCharacterPinYin(char c)
    {
        String[] pinyin = null;
        try
        {
            format.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
            pinyin = PinyinHelper.toHanyuPinyinStringArray(c, format);
        }
        catch(BadHanyuPinyinOutputFormatCombination e)
        {
            e.printStackTrace();
        }

        // 如果c不是汉字，toHanyuPinyinStringArray会返回null
        if(pinyin == null) return null;

        // 只取一个发音，如果是多音字，仅取第一个发音
        return pinyin[0];
    }

    //转换一个字符串
    public static String getStringPinYin(String str)
    {
        format.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
        StringBuilder sb = new StringBuilder();
        String tempPinyin = null;
        for(int i = 0; i < str.length(); ++i)
        {
            tempPinyin =getCharacterPinYin(str.charAt(i));
            if(tempPinyin == null)
            {
                // 如果str.charAt(i)非汉字，则保持原样
                sb.append(str.charAt(i));
            }
            else
            {
                sb.append(tempPinyin);
            }
        }
        return sb.toString();
    }
}
