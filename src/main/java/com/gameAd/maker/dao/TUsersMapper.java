package com.gameAd.maker.dao;

import com.gameAd.maker.bean.TUsers;

import java.util.Map;

public interface TUsersMapper {
    int deleteByPrimaryKey(Integer userid);

    int insert(TUsers record);

    int insertSelective(TUsers record);

    TUsers selectByPrimaryKey(Integer userid);

    int updateByPrimaryKeySelective(TUsers record);

    int updateByPrimaryKey(TUsers record);

    TUsers selectByMap(Map<String, Object> map);
}