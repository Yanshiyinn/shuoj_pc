<template>
  <div class="probtable">
    <!-- 仅管理权限可见 -->
    <div class="search">
      <Search content="problem"/>
      <!-- <div style="margin-bottom:15px;display:inline-block;"> -->
      <el-button
        class="add"
        type="primary"
        size="medium"
        icon="el-icon-plus"
        @click="handleClickCreate"
      >
        <span>新增</span>
      </el-button>
      <!-- </div> -->
    </div>

    <el-table :data="probData.problemCatalog.elements[0]" border v-loading="loading">
      <el-table-column prop="id" label="#" width="60"></el-table-column>
      <el-table-column label="标题" width="auto">
        <template slot-scope="scope">
          <router-link
            :to="{ path: `/collect/` + scope.row.id }"
            v-slot="{ href, navigate }"
          >
            <el-link type="primary" :href="href" @click="navigate">
              {{ scope.row.title }}
            </el-link>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="标签" width="150">
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
      </el-table-column>
      <el-table-column label="难度" width="80">
        <template slot-scope="scope">
          <template v-if="scope.row.difficulty === `Naive`">
            <el-tag size="medium" class="tags" type="success">简单</el-tag>
          </template>
          <template v-else-if="scope.row.difficulty === `Middle`">
            <el-tag size="medium" class="tags" type="warning">中等</el-tag>
          </template>
          <template v-else-if="scope.row.difficulty === `Hard`">
            <el-tag size="medium" class="tags" type="danger">困难</el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="通过率" width="100">
        <template slot-scope="scope">
          <el-progress
            :show-text="false"
            :stroke-width="10"
            :percentage="scope.row.acceptRate * 100"
          ></el-progress>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="145">
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            size="small"
            @click="handleClickEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" plain size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="编辑题目"
      :visible.sync="centerDialogVisible"
      width="80%"
      center
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <span slot="title">
        <i class="el-icon-edit"></i>
        <span>编辑题目</span>
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
          <el-button v-show="dialogStatus === 'create'" @click="handleClickRef"
            >推荐id</el-button
          >
          <!-- :readonly="true" /> -->
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="temp.title" />
          <!-- :readonly="true" /> -->
        </el-form-item>
        <el-form-item label="题目描述" prop="description">
          <el-input v-model="temp.problem.description" />
        </el-form-item>
        <el-form-item label="输入内容" prop="input">
          <el-input v-model="temp.problem.inputExplain" />
        </el-form-item>
        <el-form-item label="输出内容" prop="output">
          <el-input v-model="temp.problem.outputExplain" />
        </el-form-item>
        <!-- <el-form-item label="示例">
          <el-input v-model="temp.examples" />
        </el-form-item> -->
        <el-form-item label="提示">
          <el-input v-model="temp.problem.hint" />
        </el-form-item>
        <!-- <el-form-item label="状态" prop="state">
          <el-select
            v-model="temp.state"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item> -->
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
  acceptRate: 0,
  acceptTimes: 0,
  defaultMaxCpuTime: 10000,
  defaultMaxMemory: 134217728,
  difficulty: "Naive",
  id: 1000,
  problem: {
    description: "",
    examples: [],
    hint: "",
    inputExplain: "",
    maxCpuTime: 10000,
    maxMemory: 134217728,
    outputExplain: "",
  },
  sources: null,
  submitTimes: "",
  tags: [],
  title: "",
};

export default {
  name: "Problems",
  components: {
    Search,
  },
  data() {
    return {
      loading:true,
      dialogStatus: "",
      centerDialogVisible: false,
      draft: {},
      temp: TEMP,
      rules: {
        // type: [{ required: true, message: 'type is required', trigger: 'change' }],
        title: [
          {
            required: true,
            message: "请输入题目标题",
            trigger: "blur",
          },
        ],
        description: [
          { required: true, message: "请输入题目描述", trigger: "blur" },
        ],
        input: [{ required: true, message: "请规定输入内容", trigger: "blur" }],
        output: [
          { required: true, message: "请规定输出内容", trigger: "blur" },
        ],
      },
      probData: {
        problemCatalog: {
          elements: [],
        },
      },
    };
  },
  // computed: {
  //   probData() {
  //     return this.$store.state.problem.probData;
  //   },
  // },
  methods: {
    handleClose(done) {
      this.$confirm(
        "确认关闭？再次打开时，您编辑的内容会被数据库中的信息覆盖，造成丢失。"
      )
        .then((_) => {
          this.centerDialogVisible = false
          done();
        })
        .catch((_) => {});
    },
    saveDraft(done) {
      this.$confirm("确认保存？本次保存会覆盖草稿箱中原有的信息。")
        .then((_) => {
          this.centerDialogVisible = false
          this.draft = this.temp;
          console.log(`temp`,this.temp)
          console.log(`draft`,this.draft)
          done();
        })
        .catch((_) => {});
    },
    handleClickRef() {
      console.log(`getID`);
    },
    handleClickCreate() {
      this.dialogStatus = "create";
      this.centerDialogVisible = true;
    },
    handleClickEdit(id) {
      this.dialogStatus = "edit";
      // console.log(id)
      this.$store
        .dispatch("problem/getProblem", id)
        .then((response) => {
          this.temp = response.data.problem;
          console.log(`temp`, this.temp);
          this.centerDialogVisible = true;
          this.dialogStatus = "edit";
        })
        .catch((err) => {
          console.log(err);
        });
      // this.temp = this.probData.problemCatalog.elements[0]//根据表中ID号获取temp
      // console.log(this.temp)
    },
    createData() {
      // 等后端接口
      this.centerDialogVisible = false;
      this.temp = TEMP;
      console.log(`created`);
    },
    updateData() {
      this.centerDialogVisible = false;
      this.temp = TEMP;
      console.log(`edited`);
    },
  },
  created() {
    this.$store
      .dispatch("problem/getProbList")
      .then((response) => {
        this.probData = response.data;
        // console.log(this.probData);
        this.loading=false
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.probtable {
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