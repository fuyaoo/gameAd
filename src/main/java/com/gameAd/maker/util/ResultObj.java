package com.gameAd.maker.util;


import com.alibaba.fastjson.JSONObject;

import java.io.Serializable;

/**
 * Created by dell on 2017/3/16.
 */
public class ResultObj implements Serializable{
    private int code;
    private String message = "";
    private Object data = null;

    public ResultObj() {}

    public ResultObj(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public ResultObj(JSONObject data) {

        int code = Integer.valueOf(data.getString("code").substring(2).trim());
        if (code == 0) code = 100;
        if (code == 9001) code = 101;
        this.code = code;
        this.message = data.getString("message");
        this.data = data.getJSONObject("data");
    }

    public ResultObj(int code, String message, Object data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public ResultObj(ResultStatus status) {
        this.code = status.getCode();
        this.message = status.getMessage();
    }

    public ResultObj(ResultStatus status, Object data) {
        this.code = status.getCode();
        this.message = status.getMessage();
        this.data = data;
    }
    public ResultObj(ResultStatus status, String data) {
        this.code = status.getCode();
        this.message = data;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

}
