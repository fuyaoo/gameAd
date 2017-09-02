package com.gameAd.maker.dao;

import com.gameAd.maker.bean.Web_VChangeRecord;

import java.util.List;
import java.util.Map;

public interface Web_VChangeRecordMapper {

    long selectByMap(Map<String, Object> map);

    long selectByDateMap(Map<String, Object> map);
}