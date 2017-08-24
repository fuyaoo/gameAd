package com.gameAd.maker.dao;

import com.gameAd.maker.bean.WebManageAdmin;

import java.util.Map;

public interface WebManageAdminMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(WebManageAdmin record);

    int insertSelective(WebManageAdmin record);

    WebManageAdmin selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(WebManageAdmin record);

    int updateByPrimaryKey(WebManageAdmin record);

    WebManageAdmin selectByMap(Map<String, Object> map);
}