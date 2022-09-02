package com.ssafy.chuanione.domain.user.exception;

import com.ssafy.chuanione.global.error.exception.CustomException;
import com.ssafy.chuanione.global.error.exception.ErrorCode;

public class UserNotFoundException extends CustomException {
    public UserNotFoundException(){
        super(ErrorCode.USER_NOT_FOUND);
    }
}
