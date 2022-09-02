package com.ssafy.chuanione.domain.member.exception;

import com.ssafy.chuanione.global.error.exception.CustomException;
import com.ssafy.chuanione.global.error.exception.ErrorCode;

public class MemberNotFoundException extends CustomException {
    public MemberNotFoundException(){
        super(ErrorCode.MEMBER_NOT_FOUND);
    }
}
