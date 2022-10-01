package com.ssafy.chuanione.domain.member.domain;


import com.ssafy.chuanione.domain.member.domain.enumlist.Gender;
import com.ssafy.chuanione.domain.member.domain.enumlist.Role;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@ToString
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Integer id;
    private String email;
    private String password;
    @Column(unique = true)
    private String nickname;
    private String profile;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String birthday;
    private String introduction;
    @Enumerated(EnumType.STRING)
    private Role role;

    private String token;

    private boolean verified;

    public void saveToken(String token){
        this.token = token;
    }

    public void setVerified(){
        this.verified = true;
    }
    public void patch(Member member, PasswordEncoder encoder){
        if(member.getPassword() != null){
            this.password = encoder.encode(member.getPassword());
        }
        if(member.getProfile() != null){
            this.profile = member.getProfile();
        }
        if(member.getIntroduction() != null){
            this.introduction = member.getIntroduction();
        }
        if(member.getNickname() != null){
            this.nickname = member.getNickname();
        }
    }

    public void changePw(String pw){this.password = pw;}
}
