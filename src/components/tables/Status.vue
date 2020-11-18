<template>
  <div class="status">
    <el-table :data="status" style="width: 80%" stripe border>
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import { getStatus } from "@/api/judge";

export default {
  name: "Status",
  data() {
    return {
      status: [],
      count: 0,
      countPerPage: 15,
      pageNumber: 1,
      loading: true,
    };
  },
  props: {
    region: {
      type: String,
      default: "global",
    },
    problemID: {
      type: [Number, Object],
      default: null,
    },
    userID: {
      type: [Number, Object],
      default: null,
    },
    username: {
      type: [String, Object],
      default: null,
    },
    problemTitle: {
      type: [String, Object],
      default: null,
    },
    language: {
      type: [String, Object],
      default: null,
    },
  },
  created() {
    // console.log(this.results)
    const promise = new Promise((resolve, reject) => {
      getStatus(
        this.region,
        this.countPerPage,
        this.pageNumber,
        this.userID,
        this.problemID,
        this.problemTitle,
        this.username,
        this.language
      )
        .then((response) => {
          const { data } = response;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
    promise
      .then((data) => {
        this.status = data.statusCatalog.elements;
        this.count = data.statusCatalog.totalCount;
        this.loading = false;
        console.log(this.count,this.status);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.status {
  text-align: center;
}
</style>