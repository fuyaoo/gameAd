package com.gameAd.maker.service;

import com.gameAd.maker.bean.TWithdrawals;

import java.util.List;
import java.util.Map;

public interface TWithdrawalsService {
    int deleteByPrimaryKey(Integer id);

    int insert(TWithdrawals record);

    int insertSelective(TWithdrawals record);

    TWithdrawals selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TWithdrawals record);

    int updateByPrimaryKey(TWithdrawals record);

    List<TWithdrawals> selectByMap(Map<String, Object> map);
}