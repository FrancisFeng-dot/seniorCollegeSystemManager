<template>
  <div id="app">
    <header class="header">
      <div>
        <img src="./assets/logo_association.png" height="90" width="90" alt="">
        <div>老年大学协会<span>-会员管理系统</span></div>
      </div>
    </header>
    <router-view/>
    <footer class="website-description">
        <div>
          <span>
            地址：北京市朝阳区青年路113东院悦鑫园3号，邮政编码：100123 办公室电话：010-64211225 传真：010-64211225 电子邮箱：caua99@163.com
          </span>
          <span>
            本站最佳浏览效果：1024*768分辨率/建议使用微软公司浏览器IE6.0以上
          </span>
        </div>
        <span>技术支持：金龄科技有限公司</span>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data(){
        return {

        }
    }
  }
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
    background:#F2F2F2;    
    width: 100%;
    height: 100%;
  }

  #app {
    display:flex;
    flex-direction:column;
    justify-content:space-between;align-items:center;
    height:100;
  }

  .header {
    width: 100%;
    height: 160px;
    background:#ffffff;
    font-size: 20px;
    font-weight: 600;
    color:#000000;
    display:flex;
    justify-content:center;
    align-items:center;

    &>div{
      width:1200px;
      height:100%;
      display:flex;
      justify-content:flex-start;
      align-items:center;
      &>div {
        margin-left:30px;
        font-size:30px;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        color:#333333;
        &>span{
          font-size:30px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:#666666;
        }
      }
    }
  }

  .website-description{
    width: 100%;
    height: 220px;
    background:#ffffff;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
      font-size:14px;
      color:#8F8F8F;
    &>div {
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
    }
    &>span {
      margin-top:20px;
    }
  }
</style>
