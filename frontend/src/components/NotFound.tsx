import React from 'react';
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import NotFoundImg from "../assets/images/notfound.jpg"

function NotFound() {

    return (
            <Grid container
                sx={{
                    alignItems: 'center',
                    height: '100vh'
                }}
            >
                <Grid item xs={6}
                    sx={{
                        position: 'relative',
                        left: '10%'
                    }}
                >
                    <img src={NotFoundImg} alt="notfound" />
                </Grid>
                <Grid item xs={6}>
                    <h1>이런 이미 제가 <span style={{color: '#87A2FB'}}>훔쳐간 페이지</span> 군요.</h1>
                    <p>잘못된 주소이거나 권한이 없는 페이지입니다.</p>
                    <p>츄애니원 홈으로 이동해주세요.</p>
                    <Button variant="contained" href='/'>홈으로 이동</Button>
                </Grid>
            </Grid>
    )
}

export default NotFound;
