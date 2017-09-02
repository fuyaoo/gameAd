package com.gameAd.maker.service;

import java.util.Map;

public interface Web_VChangeRecordService {

    long selectByMap(Map<String,Object> map);

    long selectByDateMap(Map<String, Object> map);
}