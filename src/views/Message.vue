<template>
  <div class="container" style="text-align: left">
    <div class="row clearfix">
      <div class="col-md-2 column"></div>
      <div class="col-md-8 column">
        <el-tabs :tab-position="tabPosition" style="height: 100%">
          <el-tab-pane label="Unread">
            <el-collapse v-for="msg in unread" :key="msg.sourceUserId">
              <el-collapse-item
                title="New message"
                @click="readHandle(msg.msgId)"
              >
                <div>
                  <b>From:</b> {{ msg.sourceUserName }} <br />
                  <b>Content:</b><br />
                  {{ msg.content }}<br />
                  <el-button type="text" @click="open(msg.sourceUserId)"
                    >Reply message</el-button
                  >
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="All">
            <el-collapse v-for="msg in inbox" :key="msg.sourceUserId">
              <el-collapse-item
                :title="msg.content"
                @click="readHandle2(msg.msgId)"
              >
                <div>
                  <b>From:</b> {{ msg.sourceUserName }} <br />
                  <b>Content:</b><br />
                  {{ msg.content }}<br />
                  <el-button type="text" @click="open(msg.sourceUserId)"
                    >Reply message</el-button
                  >
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="Sent">
            <el-collapse v-for="msg in sentBox" :key="msg.targetUserId">
              <el-collapse-item
                :title="msg.content"
                @click="readHandle2(msg.msgId)"
              >
                <div>
                  <b>To:</b> {{ msg.targetUserId }} <br />
                  <b>Content:</b><br />
                  {{ msg.content }}<br />
                  <b>Read status:</b> {{ msg.read }}
                </div>
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
import ApplyHouseService from "@/services/ApplyHouseService";
export default {
  data() {
    return {
      tabPosition: "left",
      userId: Number,
      inbox: [{}],
      sentBox: [{}],
      msgForm: {},
    };
  },
  methods: {
    readHandle(msgId) {
      console.log(msgId);
      ApplyHouseService.patchMessageReadStatus(msgId).then((response) => {
        console.log(response.data);
      });
    },
    readHandle2(msgId) {
      console.log(msgId);
    },
    open(targetUserId) {
      this.$prompt("Input your message", "Reply", {
        confirmButtonText: "Send",
        cancelButtonText: "Cancel",
      })
        .then(({ value }) => {
          console.log(value);
          this.msgForm.content = value;
          this.msgForm.sourceUserId = this.$store.getters.userid;
          this.msgForm.targetUserId = targetUserId;
          console.log(this.msgForm);
          ApplyHouseService.postMessage(this.msgForm).then((response) => {
            console.log(response.data);
            if (response.status === 201) {
              this.$message({
                type: "success",
                message: "Massage sent successfully!",
              });
            } else {
              this.$message({
                type: "warning",
                message: "Failed to send message!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Cancel sending message!",
          });
        });
    },
    refreshApplyService(id) {
      ApplyHouseService.getMessageBySourceId(id).then((response) => {
        console.log(response.data);
        for (let j = 0; j < response.data._embedded.messages.length; j++) {
          this.sentBox[j] = response.data._embedded.messages[j];
          this.sentBox[j].msgId = this.getMsgId(
            response.data._embedded.messages[j]._links.self.href
          );
          ApplyHouseService.getUser(this.sentBox[j].targetUserId).then((r) => {
            this.sentBox[j].targetUserName = r.data.displayName;
          });
        }
        console.log(this.sentBox);
      });
      ApplyHouseService.getMessageByTargetId(id).then((response) => {
        console.log(response.data);
        for (let i = 0; i < response.data._embedded.messages.length; i++) {
          this.inbox[i] = response.data._embedded.messages[i];
          this.inbox[i].msgId = this.getMsgId(
            response.data._embedded.messages[i]._links.self.href
          );
          ApplyHouseService.getUser(this.inbox[i].sourceUserId).then((r) => {
            this.inbox[i].sourceUserName = r.data.displayName;
          });
        }
        console.log(this.inbox);
      });
    },
    getMsgId(url) {
      return parseInt(url.split("/").pop());
    },
  },
  created() {
    this.userId = this.$store.getters.userid;
    console.log(this.userId);
    this.refreshApplyService(this.userId);
  },
  computed: {
    unread() {
      return this.inbox.filter((msg) => {
        return msg.read === 0;
      });
    },
  },
};
</script>

<style scoped>
@import url(https://unpkg.com/bootstrap@3.3.5/dist/css/bootstrap.min.css);
</style>
