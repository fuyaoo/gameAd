package com.gameAd.maker.service.impl;

import com.gameAd.maker.bean.TAgency;
import com.gameAd.maker.dao.TAgencyMapper;
import com.gameAd.maker.service.TAgencyService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * 代理
 */
@Service("tAgencyService")
public class TAgencyServiceImpl implements TAgencyService{

    @Resource
    TAgencyMapper tAgencyMapper;

    @Override
    public int deleteByPrimaryKey(Integer agencyid) {
        return tAgencyMapper.deleteByPrimaryKey(agencyid);
    }

    @Override
    public int insert(TAgency record) {
        return tAgencyMapper.insert(record);
    }

    @Override
    public int insertSelective(TAgency record) {
        return tAgencyMapper.insertSelective(record);
    }

    @Override
    public TAgency selectByPrimaryKey(Integer agencyid) {
        return tAgencyMapper.selectByPrimaryKey(agencyid);
    }

    @Override
    public int updateByPrimaryKeySelective(TAgency record) {
        return tAgencyMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(TAgency record) {
        return tAgencyMapper.updateByPrimaryKey(record);
    }

    @Override
    public List<TAgency> selectByMap(Map<String, Object> map) {
        return tAgencyMapper.selectByMap(map);
    }

    @Override
    public List<TAgency> selectListByMap(Map<String, Object> map) {
        return tAgencyMapper.selectListByMap(map);
    }

    @Override
    public int selectCountByMap(Map<String, Object> map) {
        return tAgencyMapper.selectCountByMap(map);
    }

    @Override
    public TAgency selectOneByMap(Map<String, Object> map) {
        return tAgencyMapper.selectOneByMap(map);
    }
}
