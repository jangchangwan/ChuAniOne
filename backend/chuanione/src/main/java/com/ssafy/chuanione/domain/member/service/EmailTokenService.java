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
import java.util.Random;

@Slf4j
@RequiredArgsConstructor
@Service
public class EmailTokenService {

    private final EmailTokenRepository emailTokenRepository;
    private final JavaMailSender emailSender;
    private final MemberRepository memberRepository;

    private final String FROM = "pecommend@gmail.com";
    public static final StringBuilder ePw = new StringBuilder();

    private final String path = System.getProperty("user.dir") + File.separator + "backend" + File.separator + "chuanione" + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "img" + File.separator;

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

    public String changePasswordMessage(String to) throws Exception{
        MimeMessage message = emailSender.createMimeMessage();
        ePw.setLength(0);
        ePw.append(createKey());

        message.addRecipients(Message.RecipientType.TO, to);//보내는 대상
        message.setSubject("ChuAniOne 새로운 비밀번호");//제목

        String msgg="";
        msgg+= "<div style='margin:100px;'>";
        msgg+= "<h1> 안녕하세요 ChuAniOne입니다. </h1>";
        msgg+= "<br>";
        msgg+= "<p>비밀번호가 아래와 같이 변경되었습니다.<p>";
        msgg+= "<br>";
        msgg+= "<p>로그인 후 새로운 비밀번호로 변경해주십시오.<p>";
        msgg+= "<br>";
        msgg+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgg+= "<h3 style='color:blue;'>새 비밀번호입니다.</h3>";
        msgg+= "<div style='font-size:130%'>";
        msgg+= "CODE : <strong>";
        msgg+= ePw.toString()+"</strong><div><br/> ";
        msgg+= "</div>";
        message.setText(msgg, "utf-8", "html");//내용
        message.setFrom(new InternetAddress("pecommend@gmail.com","ChuaniOne"));//보내는 사람

        emailSender.send(message);
        return ePw.toString();
    }

    public String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 8자리
            int index = rnd.nextInt(3); // 0~2 까지 랜덤

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    //  a~z  (ex. 1+97=98 => (char)98 = 'b')
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    //  A~Z
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    // 0~9
                    break;
            }
        }
        return key.toString();
    }
}
