package com.gameAd.maker.dao;

import com.gameAd.maker.bean.TAgency;

import java.util.List;
import java.util.Map;

public interface TAgencyMapper {
    int deleteByPrimaryKey(Integer agencyid);

    int insert(TAgency record);

    int insertSelective(TAgency record);

    TAgency selectByPrimaryKey(Integer agencyid);

    int updateByPrimaryKeySelective(TAgency record);

    int updateByPrimaryKey(TAgency record);

    List<TAgency> selectByMap(Map<String, Object> map);

    List<TAgency> selectListByMap(Map<String, Object> map);
}