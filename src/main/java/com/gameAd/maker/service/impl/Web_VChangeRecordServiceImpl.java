package com.gameAd.maker.service.impl;

import com.gameAd.maker.dao.Web_VChangeRecordMapper;
import com.gameAd.maker.service.Web_VChangeRecordService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Map;

/**
 * 抽税查询
 */
@Service("webVChangeRecordService")
public class Web_VChangeRecordServiceImpl implements Web_VChangeRecordService{

    @Resource
    Web_VChangeRecordMapper web_vChangeRecordMapper;

    @Override
    public long selectByMap(Map<String, Object> map) {
        return web_vChangeRecordMapper.selectByMap(map);
    }

    @Override
    public long selectByDateMap(Map<String, Object> map) {
        return web_vChangeRecordMapper.selectByDateMap(map);
    }
}
