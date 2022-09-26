package com.ssafy.chuanione.domain.member.service;

import com.ssafy.chuanione.domain.member.dao.EmailTokenRepository;
import com.ssafy.chuanione.domain.member.dao.MemberRepository;
import com.ssafy.chuanione.domain.member.domain.EmailToken;
import com.ssafy.chuanione.domain.member.exception.MemberNotFoundException;
import com.ssafy.chuanione.domain.member.exception.TokenNotFoundException;
import io.jsonwebtoken.lang.Assert;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class EmailTokenService {

    private final EmailTokenRepository emailTokenRepository;
    private final JavaMailSender emailSender;
    private final MemberRepository memberRepository;

    private final String FROM = "pecommend@gmail.com";
    private final String path = "/home/ubuntu/chuanione/S07P22E104/backend/chuanione/src/main/resources/img/";

    //이메일 인증 토큰 생성
    @Async
    public String createEmailToken(String receiverEmail) throws Exception {
        Assert.hasText(receiverEmail, "receiverEmail은 필수입니다.");
        System.out.println("receiver: " + receiverEmail);
        int memberId = memberRepository.findByEmail(receiverEmail).orElseThrow(MemberNotFoundException::new).getId();
        //이메일 토큰 저장
        EmailToken emailToken = EmailToken.createEmailToken(memberId);
        emailTokenRepository.save(emailToken);

        StringBuilder body = new StringBuilder();
        body.append("<html> <body>");
        body.append("<p><img src=\"cid:mail-confirm.jpg\" height='700' width='1000'></p>");
        body.append("<h1><a href='http://localhost:8080/api/v1/member/email-confirm.do?token="+emailToken.getId() + "'>링크 인증하기</a></h1></body></html>");
        //이메일 전송
        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
        helper.setFrom(new InternetAddress(FROM,"ChuAnione"));
        helper.setTo(receiverEmail);
        helper.setSubject("회원가입 이메일 인증");
        helper.setText(body.toString(), true);

        FileSystemResource file = new FileSystemResource(new File(path + "mail-confirm.jpg"));
        helper.addInline("mail-confirm.jpg", file);
        emailSender.send(mimeMessage);
        return emailToken.getId();
    }

    // 유효한 토큰 가져오기
    public EmailToken findByIdAndExpirationDateAfterAndExpired(String emailTokenId){
        Optional<EmailToken> emailToken = emailTokenRepository
                .findByIdAndExpirationDateAfterAndExpired(emailTokenId, LocalDateTime.now(), false);

        // 토큰이 없다면 예외 발생
        return emailToken.orElseThrow(TokenNotFoundException::new);
    }
}
