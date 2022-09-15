package com.ssafy.chuanione.domain.member.service;

import com.ssafy.chuanione.domain.member.dao.EmailTokenRepository;
import com.ssafy.chuanione.domain.member.domain.EmailToken;
import com.ssafy.chuanione.domain.member.exception.TokenNotFoundException;
import io.jsonwebtoken.lang.Assert;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class EmailTokenService {

    private final EmailTokenRepository emailTokenRepository;
    private final JavaMailSender emailSender;

    //이메일 인증 토큰 생성
    public String createEmailToken(int memberId, String receiverEmail) throws MessagingException {
        Assert.notNull(memberId, "memberId는 필수입니다");
        Assert.hasText(receiverEmail, "receiverEmail은 필수입니다.");

        //이메일 토큰 저장
        EmailToken emailToken = EmailToken.createEmailToken(memberId);
        emailTokenRepository.save(emailToken);

        //이메일 전송
        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        helper.setTo(receiverEmail);
        helper.setSubject("회원가입 이메일 인증");
        String msg = "";
        msg += "<div style='margin:100px;'>";
        msg += "<div style='margin:100px;'>";
        msg += "<br>";
        msg += "<p> 아래의 링크를 눌러서 메일인증을 완료해주세요. </p>";
        msg += "http://localhost:8080/confirm-email?token=\"+emailToken.getId()";
        helper.setText(msg);
//        mailMessage.setText("<div style='margin:100px;'>");
//        mailMessage.setText("<h1> 안녕하세요 ChuAniOne입니다. </h1>");
//        mailMessage.setText("<br>");
//        mailMessage.setText("<p> 아래의 링크를 눌러서 메일인증을 완료해주세요. </p>");
//        mailMessage.setText("http://localhost:8080/confirm-email?token="+emailToken.getId());

        emailSender.send(maile);

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
