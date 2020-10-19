<template>
  <div class="vchats">
    <div id="2" style="width: 100%; height: 400px; display: inline-block;">
      <v-chart theme="mint" :options="bar" autoresize @click="onClick()" />
    </div>
    <div
      id="1"
      style="width: 500px; height: 300px; display: inline-block; float:left;"
      v-show="showPie"
    >
      <v-chart theme="walden" :options="pie" autoresize />
    </div>
  </div>
</template>

<style>
/**
 * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
 * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
 */
.echarts {
  width: 100%;
  height: 100%;
}
</style>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/bar";
// built-in theme
import "echarts/theme/walden";
// import "echarts/lib/component/polar";

export default {
  name: "TestEChart",
  components: {
    "v-chart": ECharts,
  },
  props: {
    width: {
      type: String,
      default: "800px",
    },
  },
  data() {
    var dataAxis = [];
    var data1 = [
      50,
      50,
      50,
      50,
      20,
      50,
      50,
      50,
      44,
      444,
      50,
      50,
      13,
      50,
      50,
      50,
      50,
      50,
      50,
      50,
      50,
      50,
    ];
    var data2 = [
      220,
      182,
      191,
      234,
      290,
      330,
      310,
      123,
      442,
      321,
      90,
      149,
      210,
      122,
      133,
      334,
      198,
      123,
      125,
      220,
    ];
    var yMax = 500;
    var dataShadow = [];

    for (var i = 0; i < data2.length; i++) {
      dataShadow.push(yMax);
    }

    for (let i = 1; i <= 20; i++) {
      dataAxis.push(`9-` + i);
    }

    return {
      pie: {
        tooltip: {
          trigger: "item",
          formatter: `这{a}，<br/>
            你做了{c}道标签中包含“{b}”的题，<br/>占这段时间做过题目总数的{d}%`,
          // textAlign: "left",
          // position:'bottom',
        },
        // legend: {
        //   orient: "vertical",
        //   left: 10,
        //   data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
        // },
        series: [
          {
            name: "一天",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              // show: false,
              // position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "20",
                // fontWeight: "bold",
              },
            },
            labelLine: {
              // show: false,
            },
            data: [
              { value: 335, name: "数据库" },
              { value: 310, name: "二叉树" },
              { value: 234, name: "OS" },
              { value: 135, name: "brute force" },
              { value: 1548, name: "贪心算法" },
            ],
          },
        ],
      },
      bar: {
        title: {
          // text: "特性示例：渐变色 阴影 点击缩放",
          // subtext: "Feature Sample: Gradient Color, Shadow, Click Zoom",
        },
        legend: {
          data: ["已通过", "未通过"],
          right: 10,
          top: 50,
          orient: "vertical",
          padding: 10,
          formatter: "{name}的题目",
          itemGap: 15,
          textStyle: {
            fontSize: 14,
          },
          // backgroundColor:"rgba(0,0,0,0.25)"
        },
        xAxis: {
          data: dataAxis,
          axisLabel: {
            // inside: true,
            textStyle: {
              color: "#999",
              fontSize: 14,
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          // z: 10,
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#999",
              fontSize: 14,
            },
          },
        },
        dataZoom: [
          {
            type: "inside",
          },
        ],
        grid: {
          right:150,
          width:'75%'
        },
        series: [
          // {
          //   // For shadow
          //   type: "bar",
          //   itemStyle: {
          //     color: "rgba(0,0,0,0.05)",
          //   },
          //   // barGap: "-100%",
          //   stack:"堆叠",
          //   barCategoryGap: "40%",
          //   data: dataShadow,
          //   animation: false,
          // },
          {
            name: "已通过",
            type: "bar",
            // barGap: "-100%",
            stack: "堆叠",
            itemStyle: {
              color: "#69B3FF"
            },
            data: data2,
          },
          {
            name: "未通过",
            type: "bar",
            // barGap: "-100%",
            stack: "堆叠",
            itemStyle: {
              color: "#AFD6FF"
            },
            data: data1,
          },
        ],
      },
      showPie:false
    };
  },
  methods:{
    onClick(event, instance, echarts){
      console.log(1,arguments)
      this.showPie=true
    }
  }
};
</script>