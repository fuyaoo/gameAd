package com.gameAd.maker.service;

import com.gameAd.maker.bean.TAgency;

import java.util.List;
import java.util.Map;

public interface TAgencyService {
    int deleteByPrimaryKey(Integer agencyid);

    int insert(TAgency record);

    int insertSelective(TAgency record);

    TAgency selectByPrimaryKey(Integer agencyid);

    int updateByPrimaryKeySelective(TAgency record);

    int updateByPrimaryKey(TAgency record);

    List<TAgency> selectByMap(Map<String, Object> map);

    List<TAgency> selectListByMap(Map<String, Object> map);

    int selectCountByMap(Map<String, Object> map);

    TAgency selectOneByMap(Map<String, Object> map);
}