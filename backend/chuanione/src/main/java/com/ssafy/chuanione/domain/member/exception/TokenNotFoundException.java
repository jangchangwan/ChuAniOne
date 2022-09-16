package com.ssafy.chuanione.domain.member.exception;

import com.ssafy.chuanione.global.error.exception.CustomException;
import com.ssafy.chuanione.global.error.exception.ErrorCode;

public class TokenNotFoundException extends CustomException {
    public TokenNotFoundException() {
        super(ErrorCode.TOKEN_NOT_FOUND);
    }
}
