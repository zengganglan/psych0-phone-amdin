<template>
    <div class="login-wrap">
        <div class="login-content" v-loading="loginloading" element-loading-text="正在登录...">
            <div class="ms-title">{{logintitle}}</div>
            <el-form label-position="right" :model="ruleForm" :rules="rules" ref="ruleForm" size="mini" label-width="0px">
                <el-form-item label="" prop="username">
                    <el-input v-model="ruleForm.username" class="inputwinth240" :maxlength="20">
                        <template slot="prepend">帐号</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input type="password" v-model="ruleForm.password" @keyup.enter.native="submitForm()" class="inputwinth240" :maxlength="20">
                        <template slot="prepend">密码</template>
                    </el-input>
                </el-form-item>
                  <!-- <el-form-item label="" prop="password">
                    <el-input type="password" v-model="ruleForm.password" @keyup.enter.native="submitForm()" class="inputwinth240" :maxlength="20">
                        <template slot="prepend">验证码</template>
                    </el-input>
                </el-form-item> -->
                <el-form-item>
                    <el-button type="primary" @click="submitForm()" class="inputwinth240 login-height">登录</el-button>
                    <!-- <el-button @click="resetForm()">重置</el-button> -->
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            moduleName: "userInfo",
            loginloading: false,
            logindesc: "",
            logintitle: "超级管理员心理系统",
            ruleForm: {
                username: "",
                password: ""
            },
            rules: {
                username: [{ required: true, message: "请输入账号" }],
                password: [{ required: true, message: "请输入密码" }]
            }
        };
    },
    created: function() {
        //每次页面刷新就删除原来信息
        sessionStorage.removeItem("zsylocalInfo");
        sessionStorage.removeItem("zsylocalTabs");
        // q清楚控制台所有信息
        console.clear();
    },
    methods: {
        submitForm() {
            const self = this;
            self.$refs.ruleForm.validate(valid => {
                if (valid) {                  
                    self.loginloading = true;
                    var u = self.ruleForm;
                     sessionStorage.setItem("zsylocalInfo",u.username)
                    //  self.$router.push({ path: "/admin/teacherindex/teacherschool" });                    
                     // var url =
                    //     this.moduleName +
                    //     "/login?username=" +
                    //     u.username +
                    //     "&password=" +
                    //     self.$cryptosha1(u.password).toString();
                    // self.$ajax.get(url).then(
                    //     data => {
                    //         //点击如果查询成功表示有这个人存储到本地
                    //         sessionStorage.setItem(
                    //             "zsylocalInfo",
                    //             JSON.stringify(data)
                    //         );
                    //         self.loginloading = false;
                    //         console.clear();
                    //         self.$router.push("/index");
                    //     },
                    //     error => {
                    //         self.loginloading = false;
                    //     }
                    // );
                }
            });
        },
        resetForm() {
            // 饿了么提供
            this.$refs.ruleForm.resetFields();
        }
    }
};
</script>
<style scoped>
.login-wrap {
    width: 100%;
    height: 1020px;
    background: #0da2b3;
}
.login-height{
    height: 36px;
}
.login-content {
    text-align: center;
    background-color: #fff;
    border-radius: 5px;
    width: 300px;
    height: 300px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
.ms-title {
    height: 50px;
    padding: 30px 10px;
    text-align: center;
    font-size: 25px;
    color: #0da2b3;
}
</style>