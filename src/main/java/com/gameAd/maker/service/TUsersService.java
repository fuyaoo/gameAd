package com.gameAd.maker.service;

import com.gameAd.maker.bean.TUsers;

import java.util.Map;

public interface TUsersService {
    int deleteByPrimaryKey(Integer userid);

    int insert(TUsers record);

    int insertSelective(TUsers record);

    TUsers selectByPrimaryKey(Integer userid);

    int updateByPrimaryKeySelective(TUsers record);

    int updateByPrimaryKey(TUsers record);

    TUsers selectByMap(Map<String, Object> map);
}