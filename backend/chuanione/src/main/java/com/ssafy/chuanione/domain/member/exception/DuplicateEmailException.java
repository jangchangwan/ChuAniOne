package com.ssafy.chuanione.domain.member.exception;

import com.ssafy.chuanione.global.error.exception.CustomException;
import com.ssafy.chuanione.global.error.exception.ErrorCode;

public class DuplicateEmailException extends CustomException {

    public DuplicateEmailException(){
        super(ErrorCode.DUPLICATE_EMAIL);
    }
}
