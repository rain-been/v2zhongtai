<template>
  <el-form inline :body-style="{ padding: '20px' }" style="margin-bottom: 20px">
    <el-form-item label="一级分类">
      <el-select
        placeholder="请选择"
        v-model="category1Id"
        @change="handleCategory1Change"
        :disabled="disabled"
      >
        <el-option
          :label="c1.name"
          :value="c1.id + '__' + c1.name"
          v-for="c1 in category1List"
          :key="c1.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select
        placeholder="请选择"
        v-model="category2Id"
        @change="handleCategory2Change"
        :disabled="disabled"
      >
        <el-option
          :label="c2.name"
          :value="c2.id + '__' + c2.name"
          v-for="c2 in category2List"
          :key="c2.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="三级分类">
      <el-select
        placeholder="请选择"
        v-model="category3Id"
        @change="handleCategory3Change"
        :disabled="disabled"
      >
        <el-option
          :label="c3.name"
          :value="c3.id + '__' + c3.name"
          v-for="c3 in category3List"
          :key="c3.id"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>


<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Category",
  data() {
    return {
      category1List: [],
      category2List: [],
      category3List: [],
      category1Id: "",
      category2Id: "",
      category3Id: "",
    };
  },
  computed: {
    ...mapState({
      category1: (state) => state.category.category1,
      category2: (state) => state.category.category2,
      category3: (state) => state.category.category3,
    }),
  },
  mounted() {
    this.getCategory1List()
  },
  methods: {
    async getCategory1List () {
      const result = await this.$API.category.getCategorys1()
      const category1List = result.data
      this.category1List = category1List
    },
    /* 
    选中的一级分类ID发生变化的事件回调
    */
    async handleCategory1Change (idName) {
      const [categoryId, categoryName] = idName.split('__')
      // 分发分类ID发生改变的事件
      this.$emit('categoryChange', {categoryId, categoryName, level: 1})

      // 重置二/三分类数据
      this.category2List = []
      this.category2Id = ''
      this.category3List = []
      this.category3Id = ''

      // 请求获取二级分类列表显示
      const result = await this.$API.category.getCategorys2(categoryId)
      this.category2List = result.data
    },
    /* 
    选中的二级分类ID发生变化的事件回调
    */
    async handleCategory2Change (idName) {
      const [categoryId, categoryName] = idName.split('__')

      // 分发分类ID发生改变的事件
      this.$emit('categoryChange', {categoryId, categoryName, level: 2})

      // 重置三分类数据
      this.category3List = []
      this.category3Id = ''

      // 请求获取三级分类列表显示
      const result = await this.$API.category.getCategorys3(categoryId)
      this.category3List = result.data
    },
    /* 
    选中的三级分类ID发生变化的事件回调
    */
    handleCategory3Change (idName) {
      const [categoryId, categoryName] = idName.split('__')
      // 分发分类ID发生改变的事件
      this.$emit('categoryChange', {categoryId, categoryName, level: 3})
    },
  }
}
</script>

<style lang="css" scoped></style>
