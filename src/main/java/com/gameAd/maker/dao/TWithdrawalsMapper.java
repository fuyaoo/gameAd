package com.gameAd.maker.dao;

import com.gameAd.maker.bean.TWithdrawals;

import java.util.List;
import java.util.Map;

public interface TWithdrawalsMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(TWithdrawals record);

    int insertSelective(TWithdrawals record);

    TWithdrawals selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TWithdrawals record);

    int updateByPrimaryKey(TWithdrawals record);

    List<TWithdrawals> selectByMap(Map<String, Object> map);

    int updateByMap(Map<String, Object> map);

    TWithdrawals selectLastByMap(Map<String, Object> map);

    int selectCountByMap(Map<String, Object> map);

    Double selectAllPrice(String username);
}