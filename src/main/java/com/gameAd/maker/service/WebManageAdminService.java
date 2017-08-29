package com.gameAd.maker.service;

import com.gameAd.maker.bean.WebManageAdmin;

import java.util.Map;

public interface WebManageAdminService {
    int deleteByPrimaryKey(Integer id);

    int insert(WebManageAdmin record);

    int insertSelective(WebManageAdmin record);

    WebManageAdmin selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(WebManageAdmin record);

    int updateByPrimaryKey(WebManageAdmin record);

    WebManageAdmin selectByMap(Map<String, Object> map);

    int resetPass(Map<String, Object> map);
}