<template>
  <div class="container" style="text-align: left">
    <div class="row clearfix">
      <div class="col-md-2 column"></div>
      <div class="col-md-8 column">
        <el-tabs :tab-position="tabPosition" style="height: 200px">
          <el-tab-pane label="Unread">
            <el-collapse v-model="msg1">
              <el-collapse-item title="New message" name="1">
                <div><b>From:</b> sourceUser</div>
                <div>Message content</div>
                <el-button type="text" @click="open">Reply message</el-button>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="All">
            <el-collapse v-model="msg2">
              <el-collapse-item title="New message" name="2">
                <div><b>From:</b> sourceUser</div>
                <div>Message content</div>
                <el-button type="text" @click="open">Reply message</el-button>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="Sent">
            <el-collapse v-model="msg3">
              <el-collapse-item title="New message" name="2">
                <div><b>To:</b> targetUser</div>
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
  data() {
    return {
      tabPosition: "left",
    };
  },
  methods: {
    open() {
      this.$prompt("Input your message", "Reply", {
        confirmButtonText: "Send",
        cancelButtonText: "Cancel",
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "Massage sent successfully!",
          });
          console.log(value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Cancel sending message!",
          });
        });
    },
  },
};
</script>

<style scoped>
@import url(https://unpkg.com/bootstrap@3.3.5/dist/css/bootstrap.min.css);
</style>
