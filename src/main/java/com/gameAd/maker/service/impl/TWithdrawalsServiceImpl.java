package com.gameAd.maker.service.impl;

import com.gameAd.maker.bean.TWithdrawals;
import com.gameAd.maker.dao.TWithdrawalsMapper;
import com.gameAd.maker.service.TWithdrawalsService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * 提现
 */
@Service("tWithdrawalsService")
public class TWithdrawalsServiceImpl implements TWithdrawalsService{

    @Resource
    TWithdrawalsMapper tWithdrawalsMapper;

    @Override
    public int deleteByPrimaryKey(Integer id) {
        return tWithdrawalsMapper.deleteByPrimaryKey(id);
    }

    @Override
    public int insert(TWithdrawals record) {
        return tWithdrawalsMapper.insert(record);
    }

    @Override
    public int insertSelective(TWithdrawals record) {
        return tWithdrawalsMapper.insertSelective(record);
    }

    @Override
    public TWithdrawals selectByPrimaryKey(Integer id) {
        return tWithdrawalsMapper.selectByPrimaryKey(id);
    }

    @Override
    public int updateByPrimaryKeySelective(TWithdrawals record) {
        return tWithdrawalsMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(TWithdrawals record) {
        return tWithdrawalsMapper.updateByPrimaryKey(record);
    }

    @Override
    public List<TWithdrawals> selectByMap(Map<String, Object> map) {
        return tWithdrawalsMapper.selectByMap(map);
    }

    @Override
    public int updateByMap(Map<String, Object> map) {
        return tWithdrawalsMapper.updateByMap(map);
    }

    @Override
    public TWithdrawals selectLastByMap(Map<String, Object> map) {
        return tWithdrawalsMapper.selectLastByMap(map);
    }

    @Override
    public int selectCountByMap(Map<String, Object> map) {
        return tWithdrawalsMapper.selectCountByMap(map);
    }
}
