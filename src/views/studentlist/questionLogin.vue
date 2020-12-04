<template>
    <div class="container">
        <div class="logo">
            <img src="../../assets/images/bj@2x.png" alt="">
        </div>
        <div class="login">
            <img src="../../assets/images/logo@2x.png" alt="">
            <input type="number" placeholder="输入手机号" name="phone" v-model='value' >
            <input type="button" value="登录" name="btn" @click="goindex($event)">
        </div>

    </div>
</template>

<script>
import $ from "jquery";
 
    export default {
        data() {
            return {
                name: this.$route.query.name,
                id:this.$route.query.id,
                flag:true,
                value:""
            }
        },
        created() {
            },
        methods: {
            checkstr(event){
              
            },
            
            goindex(event) {
                var reg = /^1\d{10}$/
            var str = this.value
            console.log(this.value,reg.test(str))
            this.flag = reg.test(str)
            if (this.flag) {
                $('input[name="btn"]').css("backgroundColor", "blue")

            } else {
                alert("手机号码格式错误,重新输入")
                this.flag =false

            }
                var that = this
                  if (this.flag) {
                    $('input[name="btn"]').css("backgroundColor", "blue")
                    console.log("可以发送请求")
                    $.ajax({
                        type: "GET",
                        url: "/api/v1/admin/tool/select/college",
                        //  data: {username:$("#username").val(), content:$("#content").val()},
                        dataType: "json",
                        headers: {
                            'X-Token': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImFjY291bnQiOiJhZG1pbiIsInVpZCI6MTk1MSwidHlwZSI6MSwiYXV0aF9pZCI6MCwiY29sbGVnZV9pZCI6MH0sImlhdCI6MTU2NzQwODM3MCwiZXhwIjoxNTY3NDk0NzcwfQ.SUB5P8rgeHzE8FJeRhMmmGxJ7YhUGg6qMQcey-4xuek",

                        },
                        success: function (data) {
                           
                        }
                    });
                    // window.location.href = "./index.html"
                                  that.$router.push({path:'/studentindex/caleindex',query:{id:this.id,name:this.name}})

                }
                 $(function () {
        var flag;
        $('input[name="phone"]').blur(function () {
            // var reg = /^1\d{10}$/
            // var str = this.value
            // console.log(str)
            // flag = reg.test(str)
            // if (flag) {
            //     $('input[name="btn"]').css("backgroundColor", "blue")

            // } else {
            //     alert("手机号码格式错误,重新输入")
            //     flag =false

            // }
            // $('input[name="btn"]').click(function () {

            //     if (flag) {
            //         $('input[name="btn"]').css("backgroundColor", "blue")
            //         console.log("可以发送请求")
            //         $.ajax({
            //             type: "GET",
            //             url: "/api/v1/admin/tool/select/college",
            //             //  data: {username:$("#username").val(), content:$("#content").val()},
            //             dataType: "json",
            //             headers: {
            //                 'X-Token': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImFjY291bnQiOiJhZG1pbiIsInVpZCI6MTk1MSwidHlwZSI6MSwiYXV0aF9pZCI6MCwiY29sbGVnZV9pZCI6MH0sImlhdCI6MTU2NzQwODM3MCwiZXhwIjoxNTY3NDk0NzcwfQ.SUB5P8rgeHzE8FJeRhMmmGxJ7YhUGg6qMQcey-4xuek",

            //             },
            //             success: function (data) {
                           
            //             }
            //         });
            //         // window.location.href = "./index.html"
            //                       that.$router.push({path:'/studentindex/caleindex',query:{id:this.id,name:this.name}})

            //     }
            // })

        })

    })
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
    // width: 100%;
    // min-width: 768px;
    max-width: 768px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    .logo{
        height: 100%;
        width: 100%;
        img{
            width: 100%;
            height: 100%;
        }
    }
        
  
    .login{
        width: 275px;
        height: 143px;
        padding: 0 5px;
        position: absolute;
        top:30%;
        width: 100%;
        text-align: center;
        color: rgb(211, 211, 211);

        img{
            width: 43px;
            height: 46px;
        }

        input[name="phone"]{
           height: 30px;
           width: 240px;
           display: block;
           margin:0 auto;
           border: none;
           border-bottom:  1px solid rgb(191, 191, 191);
        //    line-height: 63px;
           text-align: center;
           background-color: transparent;
           margin-top: 120px;
           font-size: 25px;
           
        }
        input[name="btn"]{
            display: block;
            margin:  0 auto;
            margin-top: 55px;
            width: 240px;
            height: 40px;
            border-radius: 20px;
            background-color:#A4A4A4;
            font-size: 20px;
            color: rgb(149, 149, 223);
            border: none;

            
        }
    }
}
</style>