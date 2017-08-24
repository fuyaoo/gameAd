package com.gameAd.maker.util;

import com.alibaba.fastjson.JSON;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpMethod;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.URIException;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.RequestEntity;
import org.apache.commons.httpclient.methods.StringRequestEntity;
import org.apache.commons.httpclient.util.URIUtil;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Map;

/**
 * Created by beyond on 2017/5/15.
 */

public final class HttpUtils {

    private static final Logger LOGGER = LoggerFactory.getLogger(HttpUtils.class);

    public static String sendGet(String url, String queryString) {
        HttpClient client = new HttpClient();
        HttpMethod method = new GetMethod(url);
        try {
            //设置连接超时
            client.getHttpConnectionManager().getParams().setConnectionTimeout(3000);
            //设置读取超时
            client.getHttpConnectionManager().getParams().setSoTimeout(3000);
            if (StringUtils.isNotBlank(queryString))
                //对get请求参数做了http请求默认编码，好像没有任何问题，汉字编码后，就成为%式样的字符串
                method.setQueryString(URIUtil.encodeQuery(queryString));
            client.executeMethod(method);
            if (method.getStatusCode() == HttpStatus.SC_OK) {
                return method.getResponseBodyAsString();
            }
        } catch (URIException e) {
            LOGGER.error("执行HTTP Get请求时，编码查询字符串“" + queryString + "”发生异常！", e);
        } catch (IOException e) {
            LOGGER.error("执行HTTP Get请求" + url + "时，发生异常！", e);
        } finally {
            method.releaseConnection();
        }
        return null;
    }


    public static String sendPost(String url, int port, String path, String params){
        HttpMethod method = null;    // 使用 POST 方式提交数据
        try {
            HttpClient client = new HttpClient();
            client.getHostConfiguration().setHost(url , port, "http" );
            //设置连接超时
            client.getHttpConnectionManager().getParams().setConnectionTimeout(3000);
            //设置读取超时
            client.getHttpConnectionManager().getParams().setSoTimeout(3000);
            method = getPostMethod(params, path);
            client.executeMethod(method);   //打印服务器返回的状态
            LOGGER.debug(method.getStatusLine().toString());   //打印结果页面
            String response = method.getResponseBodyAsString();
            //打印返回的信息
            LOGGER.debug(response);
            return response;
        } catch (UnsupportedEncodingException e) {
            LOGGER.error(e.getMessage(), e);
        } catch (IOException e) {
            LOGGER.error(e.getMessage(), e);
        } finally {
            if (method != null)
                method.releaseConnection();
        }
        LOGGER.debug("推送失败");
        return null;
    }

    public static String sendPost(String url, int port, String path, Map<String, Object> params){
        return sendPost(url, port, path,JSON.toJSONString(params));
    }

    private static HttpMethod getPostMethod(String params, String path) throws UnsupportedEncodingException {
        PostMethod post = new PostMethod(path);
        RequestEntity requestEntity = new StringRequestEntity(params,"text/xml","UTF-8");
        post.setRequestEntity(requestEntity);
        return post;
    }

}