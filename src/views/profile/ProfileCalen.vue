<template>
  <!-- <div class="vchats"> -->
  <!-- <div id="1" style="width: 300px; height: 200px;"> -->
  <v-chart :options="calen" autoresize />
  <!-- </div> -->
  <!-- <div id="1" style="width: 500px; height: 300px">
      <v-chart theme="walden" :options="pie" autoresize/>
    </div> -->
  <!-- </div> -->
</template>

<style scoped>
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
import "echarts/lib/component/calendar";
import "echarts/lib/chart/heatmap";
// built-in theme
import "echarts/theme/walden";

export default {
  name: "TestEChart",
  components: {
    "v-chart": ECharts,
  },
  data() {
    function pad(str, len) {
      str += "";
      return "0000".substr(0, len - str.length) + str;
    }

    function formatTime(tpl, value, isUTC) {
      if (
        tpl === "week" ||
        tpl === "month" ||
        tpl === "quarter" ||
        tpl === "half-year" ||
        tpl === "year"
      ) {
        tpl = "MM-dd\nyyyy";
      }

      var date = parseDate(value);
      var utc = isUTC ? "UTC" : "";
      var y = date["get" + utc + "FullYear"]();
      var M = date["get" + utc + "Month"]() + 1;
      var d = date["get" + utc + "Date"]();
      var h = date["get" + utc + "Hours"]();
      var m = date["get" + utc + "Minutes"]();
      var s = date["get" + utc + "Seconds"]();
      var S = date["get" + utc + "Milliseconds"]();
      tpl = tpl
        .replace("MM", pad(M, 2))
        .replace("M", M)
        .replace("yyyy", y)
        .replace("yy", y % 100)
        .replace("dd", pad(d, 2))
        .replace("d", d)
        .replace("hh", pad(h, 2))
        .replace("h", h)
        .replace("mm", pad(m, 2))
        .replace("m", m)
        .replace("ss", pad(s, 2))
        .replace("s", s)
        .replace("SSS", pad(S, 3));
      return tpl;
    }

    var TIME_REG = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d\d)(?::(\d\d)(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/; // jshint ignore:line

    function parseDate(value) {
      if (value instanceof Date) {
        return value;
      } else if (typeof value === "string") {
        // Different browsers parse date in different way, so we parse it manually.
        // Some other issues:
        // new Date('1970-01-01') is UTC,
        // new Date('1970/01/01') and new Date('1970-1-01') is local.
        // See issue #3623
        var match = TIME_REG.exec(value);

        if (!match) {
          // return Invalid Date.
          return new Date(NaN);
        } // Use local time when no timezone offset specifed.

        if (!match[8]) {
          // match[n] can only be string or undefined.
          // But take care of '12' + 1 => '121'.
          return new Date(
            +match[1],
            +(match[2] || 1) - 1,
            +match[3] || 1,
            +match[4] || 0,
            +(match[5] || 0),
            +match[6] || 0,
            +match[7] || 0
          );
        } // Timezoneoffset of Javascript Date has considered DST (Daylight Saving Time,
        // https://tc39.github.io/ecma262/#sec-daylight-saving-time-adjustment).
        // For example, system timezone is set as "Time Zone: America/Toronto",
        // then these code will get different result:
        // `new Date(1478411999999).getTimezoneOffset();  // get 240`
        // `new Date(1478412000000).getTimezoneOffset();  // get 300`
        // So we should not use `new Date`, but use `Date.UTC`.
        else {
          var hour = +match[4] || 0;

          if (match[8].toUpperCase() !== "Z") {
            hour -= match[8].slice(0, 3);
          }

          return new Date(
            Date.UTC(
              +match[1],
              +(match[2] || 1) - 1,
              +match[3] || 1,
              hour,
              +(match[5] || 0),
              +match[6] || 0,
              +match[7] || 0
            )
          );
        }
      } else if (value == null) {
        return new Date(NaN);
      }

      return new Date(Math.round(value));
    }

    function getVirtulData(year) {
      year = year || "2017";
      var date = parseDate(year + "-01-01");
      var end = parseDate(year + "-12-31");
      var dayTime = 3600 * 24 * 1000;
      var data = [];
      for (var time = date; time <= end; time += dayTime) {
        data.push([
          formatTime("yyyy-MM-dd", time),
          Math.floor(Math.random() * 10000),
        ]);
      }
      return data;
    }

    return {
      calen: {
        visualMap: {
          show: false,
          min: 0,
          max: 10000,
        },
        tooltip: {
          trigger: "item",
        },
        calendar: {
          top: 20,
          left: 20,
          // right: 30,
          range: "2017",
          cellSize: ["auto", 22],
          yearLabel: { show: false },
          dayLabel: {
            // firstDay: 1,
            textStyle: {
              fontSize: 10,
              color: "#999",
            },
          },
          monthLabel: {
            // nameMap: "cn",
            // margin: 15,
            textStyle: {
              fontSize: 10,
              color: "#999",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#fff",
              width: 1,
              type: "solid",
            },
          },
          itemStyle: {
            color: "#efefef",
            borderWidth: 4,
            borderColor: "#fff",
          },
        },
        series: {
          type: "heatmap",
          coordinateSystem: "calendar",
          data: getVirtulData(2017),
        },
      },
    };
  },
};
</script>