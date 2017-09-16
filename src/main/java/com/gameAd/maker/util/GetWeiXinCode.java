package com.gameAd.maker.util;

import java.net.URLEncoder;

/**
 * 获取微信的code
 */
public class GetWeiXinCode {
    public static String  GetCodeRequest = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=123#wechat_redirect";
    public static String getCodeRequest(String url,String appid,String scope){
        String result = null;
        GetCodeRequest  = GetCodeRequest.replace("APPID", urlEnodeUTF8(appid));
//        GetCodeRequest  = GetCodeRequest.replace("REDIRECT_URI",urlEnodeUTF8("http://wx.gzmibo.com/weixin/getcode?type=2"));
        GetCodeRequest  = GetCodeRequest.replace("REDIRECT_URI",urlEnodeUTF8(url));
        GetCodeRequest = GetCodeRequest.replace("SCOPE", scope);
        result = GetCodeRequest;
        return result;
    }
    public static String urlEnodeUTF8(String str){
        String result = str;
        try {
            result = URLEncoder.encode(str,"UTF-8");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    public static void main(String[] a){
        System.out.println(getCodeRequest("http://wx.gzmibo.com/views/query.html","wx28d23d9d11cc97e2","snsapi_userinfo"));
    }
}
