<template>
  <div class="usertable">
    <!-- 仅管理权限可见 -->
    <div class="search">
      <Search content="user" />
      <!-- <div style="margin-bottom:15px;display:inline-block;"> -->
      <el-button
        class="add"
        type="primary"
        size="medium"
        icon="el-icon-plus"
        @click="handleClickCreate"
      >
        <span>批量导入</span>
      </el-button>
      <!-- </div> -->
    </div>

    <el-table :data="userData" border v-loading="loading">
      <el-table-column prop="id" label="#" width="60"></el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="auto"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="job_number"
        label="编号"
        width="100"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <!-- <el-table-column label="标签" width="150">
        <template slot-scope="scope">
          <el-tag
            size="medium"
            class="tags"
            :key="index"
            v-for="(tag, index) in scope.row.tags"
          >
            {{ tag }}
          </el-tag>
        </template>
      </el-table-column> -->
      <el-table-column label="权限" width="110">
        <template slot-scope="scope">
          <el-tag size="medium" class="tags" :type="mapRole(scope.row.role)">{{
            scope.row.role
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <!-- <el-table-column label="通过率" width="100">
        <template slot-scope="scope">
          <el-progress
            :show-text="false"
            :stroke-width="10"
            :percentage="scope.row.acceptRate * 100"
          ></el-progress>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" width="145">
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            size="small"
            @click="handleClickEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            plain
            size="small"
            @click="handleClickDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="编辑用户"
      :visible.sync="centerDialogVisible"
      width="80%"
      center
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <span slot="title">
        <i class="el-icon-edit"></i>
        <span>编辑用户</span>
      </span>
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        style="margin: 50px"
      >
        <el-form-item label="ID" prop="id">
          <el-input v-model="temp.id" :disabled="dialogStatus !== 'create'" />
          <!-- <el-button v-show="dialogStatus === 'create'" @click="handleClickRef"
            >推荐id</el-button
          > -->
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="temp.username" />
        </el-form-item>
        <el-form-item label="权限" prop="role">
          <el-select v-model="temp.role" placeholder="请选择权限" width="100%">
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="编号" prop="job_number">
          <el-input v-model="temp.job_number" />
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="temp.mobile" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="temp.email" />
        </el-form-item>
        <el-form-item label="注册时间">
          <el-input v-model="temp.register_time" disabled />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button @click="saveDraft">保存草稿</el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { getProbList, getProblem } from "@/api/problem";
import Search from "@/components/search/Search.vue";

const TEMP = {
  email: null,
  id: 57,
  job_number: null,
  mobile: null,
  register_time: "2020-11-10T05:18:53.950217",
  role: "net_friend",
  username: "lkx9",
};

const roleMap = {
  net_friend: "info",
  student: "",
  teacher: "success",
  admin: "warning",
};

export default {
  name: "Users",
  components: {
    Search,
  },
  data() {
    return {
      loading: true,
      dialogStatus: "",
      centerDialogVisible: false,
      draft: {},
      temp: TEMP,
      rules: {
        // type: [{ required: true, message: 'type is required', trigger: 'change' }],
        id: [
          {
            required: true,
            message: "请输入ID",
            trigger: "blur",
          },
        ],
      },
      userData: [],
      // probData: [],
      options: ["net_friend", "student", "teacher", "admin"],
    };
  },
  // computed: {
  //   probData() {
  //     return this.$store.state.problem.probData;
  //   },
  // },
  methods: {
    mapRole(role) {
      return roleMap[role];
    },
    handleClose(done) {
      this.$confirm(
        `确认关闭？再次打开时，您编辑的内容会被数据库中的信息覆盖，造成丢失。
        您可以选择对话框底端的“保存草稿”暂存内容。`
      )
        .then((_) => {
          this.centerDialogVisible = false;
          done();
        })
        .catch((_) => {});
    },
    saveDraft(done) {
      this.$confirm("确认保存？本次保存会覆盖草稿箱中原有的信息。")
        .then((_) => {
          this.centerDialogVisible = false;
          this.draft = this.temp;
          console.log(`temp`, this.temp);
          console.log(`draft`, this.draft);
          done();
        })
        .catch((_) => {});
    },
    handleClickRef() {
      console.log(`getID`);
    },
    handleClickCreate() {
      // this.dialogStatus = "create";
      // this.centerDialogVisible = true;
      console.log(`import`);
    },
    handleClickEdit(id) {
      this.dialogStatus = "edit";
      this.temp = this.getInfo(id);
      console.log(`temp`, this.temp);
      this.centerDialogVisible = true;
    },
    getUsers() {
      this.$store
        .dispatch("user/getAllUsers")
        .then((response) => {
          response.sort((a,b)=>{
            return a.id-b.id
          })
          this.userData = response;
          // console.log(this.userData);
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getInfo(id) {
      for (let i = 0; i < this.userData.length; i++) {
        if (this.userData[i].id == id) {
          return this.userData[i];
        }
      }
      return new Error("id不存在");
    },
    handleClickDelete(id) {
      this.$store
        .dispatch("user/deleteUser", id)
        .then((response) => {
          this.getUsers();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createData() {
      this.centerDialogVisible = false;
      this.temp = TEMP;
      console.log(`created`);
    },
    updateData() {
      this.$store.dispatch('user/changeInfo',this.temp).then(response=>{
        this.getUsers()
      this.centerDialogVisible = false;
      this.temp = TEMP;
      console.log(`edited`);

      }).catch(err=>{
        console.log(err)
      })
    },
  },
  created() {
    this.getUsers();
  },
};
</script>

<style scoped>
.usertable {
  padding: 30px;
  /* display: inline-block; */
  width: 70vw;
  float: left;
  max-width: 1000px;
  min-width: 500px;
}

.tags {
  margin: 0px 3px;
}

/* .el-progress__text {
  display:none;
  color: white;
} */

.add {
  margin-bottom: 15px;
  margin-top: 2px;
  /* display: inline-block; */
  /* position: absolute; */
  /* right: 0px; */
  float: right;
}

/* .search {
  position: relative;
  float: left;
  vertical-align: text-bottom;
} */
</style>

<style>
/* .el-table .cell.el-tooltip {
  white-space: pre-wrap;
} */
</style>