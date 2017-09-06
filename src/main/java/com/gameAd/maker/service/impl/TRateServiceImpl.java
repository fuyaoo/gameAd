package com.gameAd.maker.service.impl;

import com.gameAd.maker.bean.TRate;
import com.gameAd.maker.dao.TRateMapper;
import com.gameAd.maker.service.TRateService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 佣金率
 */
@Service("tRateService")
public class TRateServiceImpl implements TRateService{

    @Resource
    TRateMapper tRateMapper;

    @Override
    public int deleteByPrimaryKey(Integer id) {
        return tRateMapper.deleteByPrimaryKey(id);
    }

    @Override
    public int insert(TRate record) {
        return tRateMapper.insert(record);
    }

    @Override
    public int insertSelective(TRate record) {
        return tRateMapper.insertSelective(record);
    }

    @Override
    public TRate selectByPrimaryKey(Integer id) {
        return tRateMapper.selectByPrimaryKey(id);
    }

    @Override
    public int updateByPrimaryKeySelective(TRate record) {
        return tRateMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(TRate record) {
        return tRateMapper.updateByPrimaryKey(record);
    }

    @Override
    public TRate select() {
        return tRateMapper.select();
    }
}
