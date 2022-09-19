package com.ssafy.chuanione.domain.member.service;

import com.ssafy.chuanione.domain.member.dao.EmailTokenRepository;
import com.ssafy.chuanione.domain.member.dao.MemberRepository;
import com.ssafy.chuanione.domain.member.domain.EmailToken;
import com.ssafy.chuanione.domain.member.exception.MemberNotFoundException;
import com.ssafy.chuanione.domain.member.exception.TokenNotFoundException;
import io.jsonwebtoken.lang.Assert;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
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
    private final ResourceLoader resourceLoader;

    //이메일 인증 토큰 생성
    public String createEmailToken(String receiverEmail) throws Exception {
        Assert.hasText(receiverEmail, "receiverEmail은 필수입니다.");
        System.out.println("receiver: " + receiverEmail);
        int memberId = memberRepository.findByEmail(receiverEmail).orElseThrow(MemberNotFoundException::new).getId();
        //이메일 토큰 저장
        EmailToken emailToken = EmailToken.createEmailToken(memberId);
        emailTokenRepository.save(emailToken);

        //이메일 전송
        MimeMessage mimeMessage = emailSender.createMimeMessage();
        mimeMessage.addRecipients(Message.RecipientType.TO, receiverEmail);
        mimeMessage.setSubject("회원가입 이메일 인증");

//        Resource resource = resourceLoader.getResource("classpath:static/img/email-confirm.jpg");
//        System.out.println("존재: " + resource.exists());
//        System.out.println("파일얻기 " + resource.getFile());
//        System.out.println("파일경로 " + resource.getURI());

        String msg = "";
        msg += "<div style='margin:100px;'>";
        msg += "<p> <img src='http://localhost:8080/static/img/mail-confirm.jpg'</p>";
        msg += "<a href='http://localhost:8080/api/v1/member/email-confirm.do?token="+emailToken.getId() + "'>링크 인증하기</a>";
        mimeMessage.setText(msg, "utf-8", "html");
        mimeMessage.setFrom(new InternetAddress("pecommend@gmail.com","ChuAnione"));

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
