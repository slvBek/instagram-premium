import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Lottie from 'react-lottie-player';
import AuthAnimation from '../images/auth-page-animation.json';
import in_logo from '../images/pngwing.png';
import fb from '../images/fb.png';
import SignIN from './SignIn/SignIN';
import SignUp from './SignUp/SignUp';
import './LoginPage.css';
import microsoft from '../images/micro.png';
import playstore from '../images/play.png';
import insta_logo from '../images/logoinsta.png';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLogin: true
         }
    }

    changeLogin=()=>{
        if(this.state.isLogin)
            this.setState({isLogin: false});
        else    
            this.setState({isLogin: true});
    }

    render() { 
        return ( 
            <div>
                <Grid container>
                    <Grid item xs={3} style={{ maxWidth: '18%' }}>
                    </Grid>
                    <Grid item xs={6}>
                       <div className="loginpage__main">
                        <Lottie 
                        play
                          loop
                          animationData={AuthAnimation}
                        />
                           <div>
                               <div className="loginpage_rightcomponent">
                                   <img className="pngwing.png" src={in_logo} style={{width: "300px"}}/>
                                   <img className="logoinsta.png" src={insta_logo} style={{position: "absolute", width: "130px", right: "552px", top: "93px"}}/>
                                   <div className="loginPage__signin">

                                     {
                                         this.state.isLogin ? <SignIN/> : <SignUp/>
                                     }

                                        <div className="login__ordiv">
                                            <div className="login__dividor"></div>
                                            <div className="login__or">OR</div>
                                            <div className="login__dividor"></div>
                                        </div>

                                        <div className="login__fb">
                                            <img src={fb} width="15px" style={{ "marginRight":"5px" }} />Log in with Facebook
                                        </div>
                                        <div className="login_forgt"> Forgot password?</div>
                                   </div>
                               </div>

                                <div className="loginpage__signupoption">
                                    {
                                        this.state.isLogin ?
                                        <div className="loginPage__signin">
                                                 Don't have an account yet? <span onClick={this.changeLogin} style={{ "fontWeight":"bold", "color":"#0395F6"}}>Sign up</span>
                                        </div> :
                                        <div className="loginPage__signup">
                                                Have an account? <span onClick={this.changeLogin}  style={{ "fontWeight":"bold", "color":"#0395F6"}}>Sign in</span>
                                        </div>
                                    }
                                </div>

                                <div className="loginPage__downloadSection">
                                    <div>
                                    Install the app.
                                    </div>
                                    <div className="loginPage__option">
                                        <img className="loginPage_dwimg" src={playstore} href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3D216DFBAF-9C13-4C6D-B2E5-5453DF6B2BD8%26utm_content%3Dlo%26utm_medium%3Dbadge" rel="nofollow noopener" role="link" tabindex="0" target="_blank"/>
                                        <img className="loginPage_dwimg" src={microsoft} />
                                    </div>
                                </div>

                           </div>
                       </div>
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                </Grid>
            </div>
         );
    }
}
 
export default LoginPage;