package com.ssafy.chuanione.global.error;

import com.ssafy.chuanione.global.error.exception.CustomException;
import com.ssafy.chuanione.global.error.exception.ErrorCode;
import com.ssafy.chuanione.global.error.exception.InvalidParameterException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InvalidParameterException.class)
    protected ResponseEntity<ErrorResponse> handleInvalidParameterException(InvalidParameterException e){

        ErrorCode errorCode = e.getErrorCode();
        final ErrorResponse response = ErrorResponse.builder()
                .status(errorCode.getStatus())
                .code(errorCode.getCode())
                .message(e.toString()).build();

        response.setCustomFieldErrors(e.getErrors().getFieldErrors());

        return new ResponseEntity<>(response, HttpStatus.resolve(errorCode.getStatus()));
    }

    @ExceptionHandler(CustomException.class)
    protected ResponseEntity<ErrorResponse> handleCustomException(CustomException e){

        ErrorCode errorCode = e.getErrorCode();
        final ErrorResponse response = ErrorResponse.builder()
                .status(errorCode.getStatus())
                .code(errorCode.getCode())
                .message(e.toString()).build();

        return new ResponseEntity<>(response, HttpStatus.resolve(errorCode.getStatus()));
    }

    @ExceptionHandler(RuntimeException.class)
    protected ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException e){

        final ErrorResponse response = ErrorResponse.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .code("")
                .message(e.toString()).build();

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<ErrorResponse> handleException(Exception e){

        System.out.println(e.toString());

        final ErrorResponse response = ErrorResponse.builder()
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .code("")
                .message(e.toString()).build();

        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
