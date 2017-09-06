package com.gameAd.maker.dao;

import com.gameAd.maker.bean.TRate;

public interface TRateMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(TRate record);

    int insertSelective(TRate record);

    TRate selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TRate record);

    int updateByPrimaryKey(TRate record);

    TRate select();
}