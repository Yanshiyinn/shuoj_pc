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
      <div
        style="
          margin: 30px 0px 30px 50px;
          display: inline-block;
          vertical-align: bottom;
          width: 250px;
          letter-spacing: 0.1em;
        "
      >
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
      <el-tab-pane id="pane" label="做题统计" style="z-index:100;">

        <el-radio-group v-model="metric" style="margin:20px 50px;float:left;">
          <el-radio-button label="hour">hour</el-radio-button>
          <el-radio-button label="day">day</el-radio-button>
          <el-radio-button label="month">month</el-radio-button>
          <el-radio-button label="year">year</el-radio-button>
        </el-radio-group>

        <div style="width:100%;">
          <Chart></Chart>
        </div>
      </el-tab-pane>
      <el-tab-pane label="提交历史">提交历史</el-tab-pane>
      <el-tab-pane label="作业记录">作业记录</el-tab-pane>
      <el-tab-pane label="比赛记录">比赛记录</el-tab-pane>
      <el-tab-pane label="设置">设置</el-tab-pane>
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

export default {
  name: "Profile",
  components: {
    Chart,
    Calen,
  },
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      data: {
        username: "admin",
        stuNum: "00000000",
        probTotalNum: 0,
      },
      metric:"day"
    };
  },
  computed: {
    rank() {
      return ">1000";
    },
  },
};
</script>

<style>
/* .profile {
  height: 100%;
} */

.profile-container {
  width: auto;
  height: 200px;
  margin: 40px 62px;
  padding: 10px;
  text-align: left !important;
  /* overflow: auto; */
  overflow: hidden;
}

.profile-avatar {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 50%;
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
</style>