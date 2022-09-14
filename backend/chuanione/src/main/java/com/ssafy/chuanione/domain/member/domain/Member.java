package com.ssafy.chuanione.domain.member.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
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

    public Member toEntity(){
        return Member.builder()
                .email(email)
                .password(password)
                .nickname(nickname)
                .profile(profile)
                .gender(gender)
                .birthday(birthday)
                .introduction(introduction)
                .build();
    }

}
