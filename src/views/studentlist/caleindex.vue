<template>
    <div class="container">
            <header>
                    <span></span>  心理测评管理系统 <span></span>
                  </header>
                  <main>
                      
                      <div class="top">
                            <div class="top1">{{name}}</div>
                            <div class="tu"><img src="../../assets/images/pt@2x.png" alt=""></div>
                            <div class="ms"></div>
                            <input type="button" value="开始测试" @click="go">

                      </div>
                  </main>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: this.$route.query.name,
                id:this.$route.query.id,
            }
        },
        created() {
            },
        methods: {
            
            go() {
              this.$router.push({path:'/studentindex/calequestion',query:{scaleid:this.id,name:this.name}})
            }
        },
    }
</script>

<style lang="scss" scoped>
body{
    background-color: #F7F8FE
}
.container{
    height: 100%;
    max-width: 768px;
    margin: 0 auto;
    background: url("../../assets/images/bj1@2x.png") no-repeat;
    background-size: 100% 100%;
    header{
        width: 100%;
        height: 50px;
        background: url("../../assets/images/dbczl@2x.png") no-repeat;
        background-size: 100% 100%;
        color:rgb(255, 255, 255);
        text-align: center;
        line-height: 50px;
        font-size: 20px;
        
    
    }
    main{
        margin-top: 70px;
        width: 100%;
        overflow: hidden;
        text-align: center;
        .top{
           
            background: url("../../assets/images/kbt@2x.png") no-repeat;
            background-size: 100% 100%;
            margin: 0 30px;
            overflow: hidden;
            .top1{
                margin-top: 30px;
                font-size: 20px;
                color: white;
        
            }
            .tu{
                width: 100%;
                height: 150px;
                margin-top: 50px;
                img{

                    width: 100%;
                    height: 100%;
                }
            }
            .ms{
                margin-top: 100px;
                color: rgb(128, 159, 221);
                height: 75px;
                line-height: 75px;
            }
            input[type="button"]{
                width: 200px;
                height: 50px;
                border: none;
                border-radius: 20px;
                margin-top: 30px;
                color: white;
                background: url("../../assets/images/ts@2x.png") no-repeat;
                background-size: 100% 100%;
               
            }
        }
       
      
    
    
    }
}
</style>