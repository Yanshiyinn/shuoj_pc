<template>
  <!-- <div class="profile-app"> -->
  <div class="profile">
    <!-- <h1>个人主页</h1> -->
    <!-- <div class="backtop"> -->
    <div class="profile-container">
      <div style="display: inline-block">
        <el-card
          border
          class="profile-avatar"
          style="width: 180px; height: 180px"
        >
          <el-avatar
            :size="160"
            :src="circleUrl"
            fit="scale-down"
            style="margin: -10px"
          ></el-avatar>
        </el-card>
      </div>
      <div class="profile-text">
        <p>
          <span
            style="
              font-weight: bold;
              text-align: left;
              display: inline-block;
              width: 40%;
            "
            >用户名</span
          >
          <el-divider
            direction="vertical"
            style="display: inline-block; width: 20%"
          ></el-divider>
          <span style="text-align: right; display: inline-block; width: 40%">{{
            data.username
          }}</span>
        </p>
        <p>
          <span
            style="
              font-weight: bold;
              text-align: left;
              display: inline-block;
              width: 40%;
            "
            >学号</span
          >
          <el-divider
            direction="vertical"
            style="display: inline-block; width: 20%"
          ></el-divider>
          <span style="text-align: right; display: inline-block; width: 40%">{{
            data.stuNum
          }}</span>
        </p>
        <p>
          已解出
          <span style="font-weight: bold">{{ data.probTotalNum }}</span>
          题，全站排名<span style="font-weight: bold">{{ rank }}</span>
        </p>
      </div>
      <div
        style="
          margin: 10px 0px;
          height: 200px;
          width: 45%;
          float: right;
          display: inline-block;
        "
      >
        <Calen style="display: inline-block"></Calen>
      </div>
    </div>
    <el-tabs tab-position="left" class="tabs">
      <el-tab-pane id="pane" label="做题统计" style="z-index: 100">
        <el-radio-group v-model="metric" style="margin: 20px 50px; float: left">
          <el-radio-button label="hour">hour</el-radio-button>
          <el-radio-button label="day">day</el-radio-button>
          <el-radio-button label="month">month</el-radio-button>
          <el-radio-button label="year">year</el-radio-button>
        </el-radio-group>

        <div style="width: 100%">
          <Chart></Chart>
        </div>
      </el-tab-pane>
      <el-tab-pane label="提交历史">提交历史</el-tab-pane>
      <el-tab-pane label="作业记录">作业记录</el-tab-pane>
      <el-tab-pane label="比赛记录">比赛记录</el-tab-pane>
      <el-tab-pane label="设置" class="form-container-profile">
        <!-- <el-button type="primary" @click="showEdit=true" v-show="!showEdit">编辑</el-button> -->
        <el-form
          ref="dataForm"
          :rules="rules"
          :model="temp"
          label-position="right"
          label-width="160px"
          auto-complete="on"
        >
          <el-form-item label="ID" prop="id">
            <el-input v-model="temp.id" disabled />
            <!-- <el-button v-show="dialogStatus === 'create'" @click="handleClickRef"
            >推荐id</el-button
          > -->
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="temp.username" />
          </el-form-item>
          <!-- <el-form-item label="权限" prop="role">
            <el-select v-model="temp.role" placeholder="请选择权限">
              <el-option
                v-for="item in options"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item :label="temp.role | mapJNLabel" prop="job_number">
            <el-input v-model="temp.job_number" />
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="temp.mobile" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="temp.email" @keyup.enter.native="updateData" />
          </el-form-item>
          <!-- <el-form-item label="注册时间">
            <el-input v-model="temp.register_time" disabled />
          </el-form-item> -->
        </el-form>
        <span class="dialog-footer">
          <!-- <el-button>取 消</el-button> -->
          <el-button type="primary" @click="updateData" :loading="loading"
            >保 存</el-button
          >
        </span>
      </el-tab-pane>
    </el-tabs>
    <!-- </div>
      <el-backtop
        target=".profile .backtop"
        visibility-height="100"
      ></el-backtop>
    </div> -->
  </div>
</template>

<script>
import Chart from "./ProfileAnalyze";
import Calen from "./ProfileCalen";
import { validePhone } from "@/utils/validate";

const TEMP = {
  email: null,
  id: null,
  job_number: null,
  mobile: null,
  register_time: "",
  role: "",
  username: "",
};

const JNLMap = {
  net_friend: "学号",
  student: "学号",
  teacher: "工号",
  admin: "工号",
};

export default {
  name: "Profile",
  components: {
    Chart,
    Calen,
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!validePhone(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    return {
      circleUrl:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      data: {
        username: "admin",
        stuNum: "00000000",
        probTotalNum: 0,
      },
      metric: "day",
      temp: TEMP,
      userData: {},
      options: ["net_friend", "student", "teacher", "admin"],
      // showEdit: true,
      loading: false,
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
      },
      rules: {
        // type: [{ required: true, message: 'type is required', trigger: 'change' }],
        id: [
          {
            required: true,
            message: "请输入ID",
            trigger: "blur",
          },
        ],
        mobile: [
          {
            trigger: "blur",
            validator: validatePhone,
          },
        ],
      },
    };
  },
  computed: {
    rank() {
      return ">1000";
    },
  },
  filters: {
    mapJNLabel(role) {
      return JNLMap[role];
    },
  },
  methods: {
    updateData() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/changeInfo", this.temp)
            .then((response) => {
              this.getUser();
              this.loading = false;
              // this.centerDialogVisible = false;
              // this.showEdit=!this.showEdit
              // this.temp = TEMP;
              console.log(`edited`);
            })
            .catch((err) => {
              console.log(err);
              this.getUser()
            });
        }
      });
    },
    getUser() {
      this.$store
        .dispatch("user/getInfo")
        .then((response) => {
          this.userData = response;
          this.temp = response;
          // console.log(this.userData);
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getUser();
  },
};
</script>

<style lang="scss">
/* .profile {
  height: 100%;
} */
.profile {
  .profile-container {
    width: auto;
    height: 200px;
    margin: 40px 62px;
    padding: 10px;
    text-align: left !important;
    /* overflow: auto; */
    overflow: hidden;
    // vertical-align: top;
  }

  .profile-avatar {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 50%;
  }

  .profile-text {
    margin: 20px 0px 45px 50px;
    display: inline-block;
    vertical-align: bottom;
    width: 250px;
    letter-spacing: 0.1em;

    p {
      line-height: 200%;
    }
  }

  .tabs {
    /* height: 1000px; */
    /* width: 300px; */
    margin: 50px;
  }

  .el-tabs__item {
    padding: 12px 80px 50px 80px;
    /* height: 40px; */
    /* -webkit-box-sizing: border-box; */
    /* box-sizing: border-box; */
    /* line-height: -50px; */
    /* display: inline-block; */
    list-style: none;
    font-size: 16px !important;
    /* font-weight: 500; */
    color: #303133;
    /* position: relative; */
    /* float: left; */
    /* text-align: left; */
  }
  /* 
.backtop {
  overflow-y: scroll;
  height: 100%;
}

.profile-app {
  height: 100%;
} */

  .el-button {
    margin: 20px;
    width: 68%;
  }

  .form-container-profile {
    .el-form {
      margin: 0 50px;

      .el-form-item {
        // label {
        //   text-align: right;
        // }

        .el-input {
          width: 70%;
        }

        .el-form-item__error {
          left: 15%;
        }

        .el-select {
          width: 70%;
          .el-input {
            width: 100%;
          }
        }

        // input {
        //   width: 50%;
        // }
      }
    }
  }
}
</style>