<template>
  <div class="pagination">
    <button
      :disabled="pageNo==1"
      @click="changePage(pageNo-1)"
    >上一页</button>
    <button
      v-if="pageNo>3"
      @click="changePage(1)"
    >1</button>
    <button v-if="pageNo>3">···</button>

    <button
      v-for="(page,index) in startAndEnd.end"
      :key="index"
      v-show="page >= startAndEnd.start"
      @click="changePage(page)"
    >{{page}}</button>

    <button v-if="pageNo < endPage -2">···</button>
    <button
      v-if="pageNo < endPage -2"
      @click="changePage(endPage)"
    >{{endPage}}</button>
    <button
      :disabled="pageNo==endPage"
      @click="changePage(pageNo+1)"
    >下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //计算尾页
    endPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    //计算连续页码的end和start
    startAndEnd() {
      let start = this.pageNo - parseInt(this.continues / 2);
      let end = this.pageNo + parseInt(this.continues / 2);
      //如果start小于1 就是一种非正常的情况
      //-1 0 1 2 3 => 1 2 3 4 5
      //0 1 2 3 4  => 1 2 3 4 5
      if (start < 1) {
        start = 1;
        end = this.continues;
        if (this.endPage < this.continues) {
          end = this.endPage;
        }
      }
      //如果end大于总页面数
      //29 30 31 32 33 => 27 28 29 30 31
      //28 29 30 31 32 => 27 28 29 30 31
      if (end > this.endPage) {
        end = this.endPage;
        start = this.endPage - this.continues + 1;
      }
      return { start, end };
    },
  },
  methods: {
    changePage(data) {
      this.$emit("currentPage", data);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>