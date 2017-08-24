package com.gameAd.maker.service.impl;

import com.gameAd.maker.bean.TUsers;
import com.gameAd.maker.dao.TUsersMapper;
import com.gameAd.maker.service.TUsersService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Map;

/**
 * 游戏用户表
 */
@Service("tUsersService")
public class TUsersServiceImpl implements TUsersService{

    @Resource
    TUsersMapper tUsersMapper;

    @Override
    public int deleteByPrimaryKey(Integer userid) {
        return tUsersMapper.deleteByPrimaryKey(userid);
    }

    @Override
    public int insert(TUsers record) {
        return tUsersMapper.insert(record);
    }

    @Override
    public int insertSelective(TUsers record) {
        return tUsersMapper.insertSelective(record);
    }

    @Override
    public TUsers selectByPrimaryKey(Integer userid) {
        return tUsersMapper.selectByPrimaryKey(userid);
    }

    @Override
    public int updateByPrimaryKeySelective(TUsers record) {
        return tUsersMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(TUsers record) {
        return tUsersMapper.updateByPrimaryKey(record);
    }

    @Override
    public TUsers selectByMap(Map<String, Object> map) {
        return tUsersMapper.selectByMap(map);
    }
}
