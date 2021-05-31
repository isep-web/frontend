<template>
  <div class="container" style="text-align: left">
    <div class="row clearfix">
      <div class="col-md-2 column"></div>
      <div class="col-md-8 column">
        <el-tabs :tab-position="tabPosition" style="height: 200px">
          <el-tab-pane label="Unread">
            <el-collapse v-model="msg1" @change="handleChange">
              <el-collapse-item title="New message" name="1">
                <div><b>From:</b> sourceUser</div>
                <div>Message content</div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="All">
            <el-collapse v-model="msg2" @change="handleChange">
              <el-collapse-item title="New message" name="1">
                <div><b>From:</b> sourceUser</div>
                <div>Message content</div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="Sent">
            <el-collapse v-model="msg3" @change="handleChange">
              <el-collapse-item title="New message" name="1">
                <div><b>From:</b> targetUser</div>
                <div>Message content</div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="col-md-2 column"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      tabPosition: "left",
      msg1: [],
      msg2: [],
      msg3: [],
    };
  },
  method: {
    handleChange(val) {
      console.log(val);
    },
  },
};
</script>

<style scoped>
@import url(https://unpkg.com/bootstrap@3.3.5/dist/css/bootstrap.min.css);
</style>
