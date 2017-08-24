package com.gameAd.maker.util;

/**
 * Created by dell on 2017/3/20.
 */
public enum ResultStatus {
    SUCCESS(100, "成功"),
    FAILED(101, "操作失败"),
    ERROR(103, "操作错误"),
    TRANS_LOGIN_EXCEPTION(102, "交易账号所属黄金先生账号不正确"),
    USERNAME_OR_PASSWORD_ERROR(-1, "用户名或密码错误"),
    PASSWORD_NOT_EXIST(-111, "原始密码输入错误"),
    USER_NOT_LOGIN(-2, "用户未登录"),
    PARAMETERS_EXCEPTION(-3, "请求参数异常"),
    UID_NOT_EXIST(-4,"用户不存在"),
    UID_EXIST(-444,"用户已存在"),
    LOGIN_CHECK_CODE_ERROR(-5, "登录验证码错误或已失效，请重新获取"),
    CUSTOMER_ERROR(-6, ""),
    USER_TYPE_IS_EMPTY(-7, "user_type参数为空"),
    USER_NAME_IS_EMPTY(-8, "用户名为空"),
    CLIENT_TYPE_IS_EMPTY(-9, "client_type参数为空"),
    DEVICE_ID_IS_EMPTY(-10, "device_id参数为空参数为空"),
    PHONE_NUM_INVALID(-11, "手机号必须为11位数字"),
    PHONE_CHECK_NUM_IS_EMPTY(-12, "验证码为空"),
    PWD_IS_EMPTY(-13, "密码为空"),
    COMPANY_ID_INVALID(-14, "company_id参数必须为数字"),
    UID_ID_IS_EMPTY(-15, "uid参数为空"),
    CLIENT_VERSION_IS_EMPTY(-16, "client_version参数为空"),
    INFO_ID_INVALID(-17, "infoId不合法"),
    CLS_ID_INVALID(-18, "cls_id不合法"),
    PAGE_NUM_INVALID(-19, "page_num不合法"),
    PAGE_SIZE_INVALID(-20, "page_size不合法"),
    PHONE_INVALID(-21, "手机号不合法"),
    START_DATE_IS_EMPTY(-22, "start_date参数为空"),
    START_DATE_INVALID(-23, "start_date参数请传时间戳，单位毫秒"),
    DAY_INVALID(-24, "day参数不合法"),
    from_ip(-25, "from_ip参数为空"),
    EXPIRE_TIME_INVALID(-26, "请设置下线时间，格式：yyyy-MM-dd HH:CC:SS"),
    TOKEN_IS_EMPTY(-27, "token参数为空"),
    INST_ID_IS_EMPTY(-28, "inst_id参数为空"),
    PUBLISH_TIME_INVALID(-29, "请设置上线时间，格式：yyyy-MM-dd HH:CC:SS"),
    CONTENT_INVALID(-30, "吐槽内容为空或超过500个字符"),
    FEED_BACK_ID_INVALID(-31, "吐槽id为空"),
    BANNER_ID_INVALID(-32, "id为空"),
    BANNER_IS_NOT_FOUND(-33, "轮播图不存在"),
    NICK_NAME_IS_EMPTY(-34, "昵称为空"),
    NICK_NAME_EXIST(-35, "昵称已使用"),
    SEX_INVALID(-36, "性别不合法"),
    PHONE_EXIST(-37, "手机号码已存在"),
    UPDATE_PHONE_CHECK_CODE_ERROR(-38, "验证码错误或已失效，请重新获取"),
    EMAIL_INVALID(-39, "邮箱格式不正确"),
    TITLE_IS_TOO_LONG_INVALID(-40, "资讯标题为空或者超过40个字符"),
    NICK_NAME_IS_TOO_LONG_EXIST(-41, "昵称不能超过16个字符"),
    READ_COUNT_INVALID(-42, "阅读量或者点赞量不能为负数"),
    RILI_TITLE_IS_TOO_LONG_INVALID(-43, "财经日历标题不超过15个字符"),
    WEIGHT_INVALID(-44, "财经日历权重参数不合法"),
    DATE_FORMAT_INVALID(-45, "日期参数请使用yyyy-MM-dd格式传入"),
    BANNER_FORMAT_INVALID(-46, "请上传图片格式的文件"),
    INFO_FILE_NUM_INVALID(-47, "请上传相应数量的文件"),
    INFO_FORMAT_INVALID(-48, "请上传图片或者zip文件"),
    UPLOAD_FILE_TOO_BIG(-49, "文件大小不能超过5M"),
    EXPIRE_TIME_MUST_BIG_THAN_PUBLISH_TIME(-50, "下线时间必须大于上线时间"),
    VERSION_CODE_IS_EMPTY(-51, "版本号为空"),
    CODE_IS_EMPTY(-51, "版本编码应该输入正整数"),
    IS_FORCE_IS_EMPTY(-52, "是否强制升级为空"),
    INFO_ID_IS_EMPTY(-53, "资讯ID为空"),
    CONTENT_IS_EMPTY(-54, "评论内容为空"),
    CONTENT_IS_TOO_LANG(-54, "评论内容不能超过1000个字符"),
    INFO_CONTENT_IS_EMPTY(-55, "资讯正文为空"),
    ASSIGN_PHONE_IS_EMPTY(-56, "指定用户为空"),
    INFO_CLASS_TITLE_IS_TOO_LONG(-57, "栏目标题应该在1-10个字符之间"),
    INFO_CLASS_LIMIT_IS_TOO_BIG(-58, "首页展示条目数应该在1-10之间"),
    INFO_CLASS_NOT_EXIST(-59, "标题栏目不存在"),
    INFO_CLASS_ID_IS_EMPTY(-60, "请传入标题栏目id"),
    COMMENT_ID_IS_EMPTY(-61, "评论id为空"),
    TAG_IS_TOO_LONG(-62, "标签名称应该在1-5个字符之间"),
    ACTIVITY_TIME_INVALID(-63, "请设置时间，格式：yyyy-MM-dd HH:CC:SS"),
    ACTIVITY_IS_TITLE(-64, "活动标题，参数为空"),
    ACTIVITY_IS_URL(-65, "活动链接地址，参数为空"),
    ACTIVITY_IS_SCOPE(-66, "公布范围，参数为空"),
    INFO_TAGS_IS_TOO_MORE(-67, "资讯标签不能超过5个"),
    BANNER_TITLE_IS_TOO_LANG(-68, "轮播图标题不能超过20个字符"),
    AUTHOR_IS_TOO_LONG_INVALID(-69, "资讯作者应该在1-10个字符之间"),
    ACTIVITY_IS_LONG_INVALID(-70, "指定用户’黄金先生账号‘不能为空"),
    GROUP_ID_IS_INVALID(-71, "分组id不合法"),
    GROUP_NAME_IS_INVALID(-72, "分组名称应该在1-5个字符"),
    PROCEED_PAGE_STATE(-73, "进行中的状态为0"),
    MAKE_PAGE_STATE(-74, "预约中的状态为0"),
    RELEASE_LOG_IS_INVALID(-75, "更新日志应该在1-500个字符之间"),
    APK_FORMAT_INVALID(-76, "请上传apk格式的文件"),
    APK_FILE_NAME_FORMAT_INVALID(-77, "文件名称格式不匹配"),
    UPLOAD_APK_FILE_TOO_BIG(-78, "上传的apk文件大小不能超过50M"),
    SHARE_TITLE_IS_TOO_LONG(-79, "标题不能超过40个字符"),
    SHARE_CONTENT_IS_TOO_LONG(-80, "内容不能超过200个字符"),
    SHARE_URL_IS_TOO_LONG(-81, "地址链接不能超过512个字符"),
    NAMED_IS_TOO_LONG(-82, "名称不能超过10个字符"),
    PHONE_IS_TOO_LONG(-83, "预留号码不能超过18个字符"),
    DESCRIPTION_IS_TOO_LONG(-84, "问题描述不能超过500个字符"),
    APP_SHARE_IMG_IS_TOO_BIG(-85, "封面图片不能超过250KB"),
    IMG_GROUP_NAME_INVALID(-86, "图片分组名称不能叫未分组"),
    IMG_GROUP_NAME_IS_TOO_LONG(-87, "图片名称不能超过20个字符"),
    FORM_TOKEN_IS_EMPTY(-88, "表单令牌为空"),
    REQUEST_TIME_SUBMIT(-89, "该时间段存在发布的活动"),
    CAN_NOT_UPDATE_GROUP(-90, "不能修改未分组"),
    SHOULD_CANCEL_EXIST_TOP_VIDEO(-91, "请先取消已经置顶的视频信息"),
    VIDEO_DESC_IS_TOO_LONG_INVALID(-92, "视频简介为空或者超过300个字符"),
    SPEAKER_DESC_IS_TOO_LONG_INVALID(-93, "主讲人简介为空或者超过500个字符"),
    SPEAKER_NAME_IS_TOO_LONG_INVALID(-94, "主讲人姓名为空或者超过10个字符"),
    PLEASE_UPLOAD_IMG_AND_VIDEO(-95, "请上传图片和视频文件"),
    PLEASE_UPLOAD_VIDEO_FILE(-96, "请上传视频文件"),
    UPLOAD_VIDEO_FAILED(-97, "上传视频出错"),
    UPLOAD_VIDEO_FILE_TOO_BIG(-98, "上传的视频文件大小不能超过500M"),
    GROUP_NAME_IS_TOO_LONG(-99, "分组名称不能超过10个字符"),
    GROUP_IS_NOT_EXIST(-100, "分组不存在"),
    DELETE_GROUP_AUTH_FAILED(-101, "没有权限删除该分组"),
    TRAINACCOUNT(-102, "培训账号，参数为空"),
    NICKNAME(-103, "姓名，参数为空"),
    IDENTITYMARK(-104, "身份证号码，参数为空"),
    PHONENUMBER(-105, "电话号码，参数为空"),
    DEPOSITBANK(-106, "开户银行，参数为空"),
    BANKMARK(-107, "银行卡号，参数为空"),
    BUSINESS_MANAGER(-108, "商务经理，参数为空"),
    BUSINESS_YONGJINLV(-1109, "佣金率，参数为空"),
    CUSTOMER_GROUP_IS_TOO_MORE(-109, "最多添加10个分组"),

    COUNT_BROKER(100, "经纪人账号创建成功"),
    CHECK_CODE(-111, "验证码不存在"),
    COMPARISON_PASSWORD(-112, "密码输入不一致"),
    EXIT_BROKER(-113, "经纪人账号已存在"),
    CHECK_MONEY(-114, "余额不足"),
    NO_EXIST_PHONE(-115, "尚未成为经纪人"),

    USER_TAG_IS_TOO_LONG(-116, "标签名称应该在1-10个字符之间"),
    REGISTER_TIME_INVALID(-117, "请设置注册时间，格式：yyyy-MM-dd HH:CC:SS"),
    LOGIN_TIME_INVALID(-118, "请设置登录时间，格式：yyyy-MM-dd HH:CC:SS"),
    LIVE_ADDRESS_IS_EMPTY(-119, "请填写直播地址"),
    CHANNEL_NAME_IS_INVALID(-120, "渠道名称应该在1-20个字符之间"),
    CHANNEL_CODE_IS_INVALID(-121, "渠道编号应该在1-20个字符之间"),
    CHANNEL_URL_IS_INVALID(-122, "投放URL应该在1-512个字符之间"),
    CHANNEL_MODE_ID_IS_INVALID(-123, "请选择合作模式"),
    CHANNEL_CODE_EXIST(-124, "渠道编码已存在"),
    START_TIME_IS_EMPTY(-125, "请选择统计起始和结束时间"),


    FORM_TOKEN_RE_SUBMIT(-998, "请勿重复提交"),
    LOGIN_TIMEOUT(-999, "登录已失效，请重新登录"),
    TRA_LOGIN_TIMEOUT(-888, "交易登录已失效，请重新登录"),
    REQUEST_EXCEPTION(-800, "请求保存的参数过长"),
    BALANCE_FILE_EXIST(-111, "结算文件已存在");

    /**
     * 返回码
     */
    private int code;

    /**
     * 返回结果描述
     */
    private String message;

    ResultStatus(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
