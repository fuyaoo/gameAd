package com.gameAd.maker.service.impl;

import com.gameAd.maker.bean.WebManageAdmin;
import com.gameAd.maker.dao.WebManageAdminMapper;
import com.gameAd.maker.service.WebManageAdminService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Map;

@Service("webManageAdminService")
public class WebManageAdminServiceImpl implements WebManageAdminService{

    @Resource
    WebManageAdminMapper webManageAdminMapper;

    @Override
    public int deleteByPrimaryKey(Integer id) {
        return webManageAdminMapper.deleteByPrimaryKey(id);
    }

    @Override
    public int insert(WebManageAdmin record) {
        return webManageAdminMapper.insert(record);
    }

    @Override
    public int insertSelective(WebManageAdmin record) {
        return webManageAdminMapper.insertSelective(record);
    }

    @Override
    public WebManageAdmin selectByPrimaryKey(Integer id) {
        return webManageAdminMapper.selectByPrimaryKey(id);
    }

    @Override
    public int updateByPrimaryKeySelective(WebManageAdmin record) {
        return webManageAdminMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(WebManageAdmin record) {
        return webManageAdminMapper.updateByPrimaryKey(record);
    }

    @Override
    public WebManageAdmin selectByMap(Map<String, Object> map) {
        return webManageAdminMapper.selectByMap(map);
    }

    @Override
    public int resetPass(Map<String, Object> map) {
        return webManageAdminMapper.resetPass(map);
    }
}
