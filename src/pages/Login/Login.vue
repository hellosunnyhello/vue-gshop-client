<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: !isPasswordLogin}" @click="isPasswordLogin=false">短信登录</a>
          <a href="javascript:;" :class="{on: isPasswordLogin}"  @click="isPasswordLogin=true">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: !isPasswordLogin}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号"  v-model="phoneNumber">
              <button :disabled="!isRightPhone || computeCount>0" class="get_verification"
                :class="{right_phone_number: isRightPhone}" @click.prevent="getCode">{{computeCount>0 ? `已发送(${computeCount}s)` : '发送验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: isPasswordLogin}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input :type="isShowPwd ? 'text' : 'password'" maxlength="8" placeholder="密码" v-model="pwd">
                <div class="switch_button" @click="isShowPwd = !isShowPwd" :class="isShowPwd ? 'on' : 'off'">
                  <div class="switch_circle" :class="{right: isShowPwd}"></div>
                  <span class="switch_text">{{isShowPwd ? 'abc' : ''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha"
                  alt="captcha" ref="captcha" @click="getCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>

<script>
  import {reqSendcode,reqLoginPwd,reqLoginSms} from '../../api'
  import {Toast, MessageBox} from 'mint-ui'
  export default {
    data() {
      return {
        isPasswordLogin: true ,//密码登录为true 短信验证码登录为false 用来切换登录方式，默认为密码登录
        phoneNumber: '',      //电话号码
        computeCount: 0,          //短信验证码的倒计时
        isShowPwd: false,   //是否显示明文密码，默认密码密文
        code: '',         //短信验证码
        name: '',           //用户名
        pwd: '',          //密码
        captcha: ''       //四位验证码
      }
    },
    computed: {
      isRightPhone (){
        return /^1\d{10}$/.test(this.phoneNumber)
      }
    },
    methods: {
      async getCode (){
        //实现倒计时功能
        this.computeCount = 30
        const intervalId = setInterval(()=>{
          if(this.computeCount <= 0){
            clearInterval(intervalId)
            this.computeCount = 0
          }
          this.computeCount--
        },1000)
        //发送一次性短信验证码
        const result = await reqSendcode(this.phoneNumber)
        if(result.code === 0){
          //发送请求短信验证码成功
          Toast('发送成功，一分钟内有效')
        }else{
          //发送请求短信验证码失败
          this.computeCount = 0
          MessageBox.alert('验证码发送失败', '提示')
        }
      },
      getCaptcha (){
        const target = this.$refs.captcha
        target.src='http://localhost:4000/captcha?time='+Date.now()
      },
      showAlert (msg){
        MessageBox.alert(msg)
      },
      async login (){
        let result
        const {isRightPhone,isPasswordLogin,phoneNumber,name,pwd,code,captcha} = this
        if(isPasswordLogin){
          //用户名密码登录reqLoginPwd
          if(!name){
            this.showAlert('请输入用户名')
            return
          }else if(!pwd){
            this.showAlert('请输入密码')
            return
          }else if(captcha.length !== 4){
            this.showAlert('请输入4位验证码')
            return
          }
          result = await reqLoginPwd({name,pwd,captcha})
          this.getCaptcha()
        }else {
          //短信验证码登录reqLoginMsm
          if(!isRightPhone){
            this.showAlert('请输入正确的手机号')
            return
          }else if(!/^\d{6}$/.test(code)){
            this.showAlert('请输入6位手机验证码')
            return
          }
          result = await reqLoginSms({phoneNumber,code})
        }
        //登录成功，将user信息保存到state，跳转到用户中心
        if(result.code === 0){
          this.$store.dispatch('updateUser',result.data)
          this.$router.push('/profile')
        }else {
          //登录失败
          this.computeCount = 0
          this.showAlert(result.msg)
        }

      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone_number
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
