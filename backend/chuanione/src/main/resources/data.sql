
select * from member;

-- member / test1의 비번은 test1
INSERT INTO MEMBER ( birthday, email, gender, introduction, nickname, password, profile, role,verified)
VALUES ('1999-03-02','window8397@naver.com','MALE','intro','nick','$2a$10$5X4Ui5RIPP8QPUXZLC38e.W3ciUmN7jKHVRA24BVczWunJo6tp7JO','1','ROLE_USER',true);
INSERT INTO MEMBER ( birthday, email, gender, introduction, nickname, password, profile, role,verified)
VALUES ('1999-03-02','test1@naver.com','MALE','intro','nick1','$2a$10$Or04LcJEIqAPs9URQQrXEeRhAtiX6NgUu7aT6gQiVpz4Qe63IGcyW','1','ROLE_USER',true);
INSERT INTO MEMBER ( birthday, email, gender, introduction, nickname, password, profile, role,verified)
VALUES ('1991-01-01','test2@naver.com','FEMALE','intro','nick2','$2a$10$cKSNZPmSfqR2tkGXRnM4auWC6l6jsUl4uqagZDnW0VdGEIq6vN7Fu','1','ROLE_USER',true);
INSERT INTO MEMBER ( birthday, email, gender, introduction, nickname, password, profile, role,verified)
VALUES ('1991-01-31','test3@naver.com','MALE','intro','nick3','$2a$10$.6vOWSIo4Kp2l7/zYWqPVeElXdwTnulrcdjJ6QUpVaITm8p.u1hXy','1','ROLE_USER',true);




-- room



-- member_room