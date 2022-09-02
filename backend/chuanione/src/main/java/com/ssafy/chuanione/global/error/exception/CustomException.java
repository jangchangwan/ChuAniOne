package com.ssafy.chuanione.global.error.exception;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException{

    private ErrorCode errorCode;

    public CustomException(ErrorCode errorCode){
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
