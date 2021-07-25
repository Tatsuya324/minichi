<template>
  <div id="app">
    <div
      v-if="disp_flag.isEnrollModal"
      id="enroll_modal"
      @click.self="Modal_trans_data()"
    >
      <div id="modal_content">
        <div id="modal_title">
          {{ modal_info.title }}
        </div>
        <div id="modal_description">
          {{ modal_info.description }}
        </div>
        <div v-if="disp_flag.isResultModal">
          <p class="modal_label">かかった時間 {{ enroll_time }} 秒</p>
          <p class="modal_label">
            参加者{{ modal_info.participants + 1 }}人中{{ rank }}番目
          </p>
        </div>
        <div v-else>
          <p class="modal_label">参加者{{ modal_info.participants }}人</p>
          <p class="modal_label">かかった時間</p>
          <div>
            <input id="modal_input_time" type="number" v-model="enroll_time" />
            秒
          </div>
          <div id="modal_submit_button" @click="Enroll_rank">
            ランキングに登録
          </div>
        </div>
      </div>
    </div>
    <div id="nav">
      <input
        id="input"
        placeholder="みんなの一番を調べる"
        type="text"
        @input="Update_Ranks"
        v-model="search_text"
      />
      <img id="logo_img" src="./assets/logo.png" alt="" />
      <div>
        <div id="signin_container">
          <div v-if="isLogin">
            <img
              style="
                width: 50px;
                margin-right: 15px;
                border-radius: 15px;
                box-shadow: 0 5px 10px 1px rgb(200, 200, 200);
              "
              v-bind:src="authUserIcon"
              alt=""
            />
          </div>
          <div v-else id="signin_button" @click="signIn">SIGN IN</div>
        </div>
      </div>
    </div>
    <!-- -----------メインエリアSTART----------- -->
    <div id="main">
      <div v-if="disp_flag.isLP" id="LP_container">
        <h1 id="LP_title">みんなの一番とは？？</h1>
        <p
          class="LP_text"
          style="border-radius: 99px 99px 99px 0; left: -180px"
        >
          この経験は僕・私が「一番」だ！！
        </p>
        <p
          class="LP_text"
          style="border-radius: 99px 99px 0 99px; right: -230px; top: -40px"
        >
          この経験をランキング化するみんなが主役のプラットフォームです
        </p>
        <p
          class="LP_text"
          style="border-radius: 99px 99px 99px 0; left: -250px; top: -60px"
        >
          まずは画面上部の検索バーからランキングを検索しよう！
        </p>
        <p
          class="LP_text"
          style="border-radius: 99px 99px 0 99px; right: -230px; top: -40px"
        >
          ランキングが見つかったら、そのランキングに自分の記録を登録！！
        </p>
        <p
          class="LP_text"
          style="border-radius: 99px 99px 99px 0; left: -210px; top: -70px"
        >
          もし、ランキングがない場合はあなたがそのランキングを作り、新たなランキングを作成しましょう！！
        </p>
        <p
          class="LP_text"
          style="border-radius: 99px 99px 0 99px; right: -200px; top: -80px"
        >
          その時はキミが「一番」だ！！
        </p>
      </div>
      <div v-if="disp_flag.isNotRankCard" style="padding: 30px">
        <p style="font-size: 20px; font-weight: bold">
          まだランキングが作られていないようです...
        </p>
      </div>
      <div v-if="disp_flag.isRankCard" id="search_result_container">
        <div
          v-for="(rank_info, rank_index) in disp_rank_card_infos"
          v-bind:key="rank_index"
          class="rank_card_container"
          @click="Modal_trans_data(rank_info)"
        >
          <span class="rank_card_title">
            {{ rank_info.title }}
          </span>
          <div class="rank_card_description_container">
            <div class="rank_card_description">
              {{ rank_info.description }}
            </div>
            <div class="rank_card_participants">
              <span> 参加者数 </span>
              <span> {{ rank_info.participants }} 人 </span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="disp_flag.isSubmit" id="submit_container">
        <h2 id="submit_title">ランキングを作ってみましょう！</h2>
        <div id="submit_form_container">
          <p class="form_label">タイトル</p>
          <input
            id="input_title"
            type="text"
            placeholder="ランキングのタイトルを入力"
            v-model="newData.title"
          />
          <p class="form_label">説明</p>
          <textarea
            name="説明"
            cols="30"
            rows="10"
            v-model="newData.description"
          ></textarea>
          <p class="form_label">かかった時間</p>
          <div>
            <input id="input_time" type="number" v-model="newData.time" />
            秒
          </div>
          <div id="submit_button" @click="Enroll_New_ranking">
            ランキングを作る
          </div>
        </div>
      </div>
    </div>
    <!-- -----------メインエリアEND----------- -->
    <div id="footer_container">
      © 2021 <a href="https://github.com/TatsuyaOkazaki324">Tatsuya Okazaki.</a>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "App",
  data() {
    return {
      isLogin: false,
      authUserIcon: "",
      authUid: "",
      search_text: "",
      enroll_time: "",
      rank: "",
      newData: {
        title: "",
        description: "",
        time: "",
      },
      disp_flag: {
        isRankCard: false,
        isNotRankCard: false,
        isLP: true,
        isSubmit: true,
        isEnrollModal: false,
        isResultModal: false,
      },
      modal_info: {
        key: "",
        title: "",
        description: "",
        participants: "",
        members: [],
      },
      disp_rank_card_infos: [],
      rank_card_infos: [],
    };
  },
  methods: {
    Enroll_rank() {
      firebase
        .database()
        .ref(
          "rankings/" +
            this.modal_info.key +
            "/members/member" +
            (this.modal_info.participants + 1)
        )
        .set({
          time: this.enroll_time,
          uid: this.authUid,
        });
      this.disp_flag.isResultModal = true;
      let rank = 1;
      for (let member of Object.keys(this.modal_info.members)) {
        if (this.modal_info.members[member].time * 1 < this.enroll_time * 1) {
          rank++;
        }
      }
      this.rank = rank;
    },
    Enroll_New_ranking() {
      firebase
        .database()
        .ref("rankings/ranking" + (this.rank_card_infos.length + 1))
        .set({
          description: this.newData.description,
          members: {
            member1: {
              time: this.newData.time,
              uid: this.authUid,
            },
          },
          title: this.newData.title,
        });
      this.newData.title = "";
      this.newData.description = "";
      this.newData.time = "";
      alert("ランキングを登録しました！！");
    },
    Update_Ranks() {
      this.disp_rank_card_infos = [];
      if (this.search_text != "") {
        this.disp_flag.isRankCard = true;
        this.disp_flag.isLP = false;
        for (let Target_Key in this.rank_card_infos) {
          if (
            this.rank_card_infos[Target_Key].title.indexOf(this.search_text) >
            -1
          ) {
            this.disp_rank_card_infos.push(this.rank_card_infos[Target_Key]);
          }
        }
        if (this.disp_rank_card_infos.length == 0) {
          this.disp_flag.isNotRankCard = true;
        } else {
          this.disp_flag.isNotRankCard = false;
        }
      } else {
        this.disp_flag.isRankCard = false;
        this.disp_flag.isNotRankCard = false;
        this.disp_flag.isLP = true;
      }
    },
    Modal_trans_data(from) {
      if (from) {
        (this.modal_info.key = from.key), (this.modal_info.title = from.title);
        this.modal_info.description = from.description;
        this.modal_info.participants = from.participants;
        this.modal_info.members = from.members;
        this.disp_flag.isEnrollModal = true;
      } else {
        this.disp_flag.isEnrollModal = false;
        this.disp_flag.isResultModal = false;
        this.enroll_time = "";
      }
    },
    signIn() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((user) => {
          if (user) {
            // !!userはBoolen変更後反転
            this.isLogin = !!user;
            this.authUserIcon = user.user.photoURL;
            this.authUid = user.user.uid;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted: function () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // !!userはBoolen変更後反転
        this.isLogin = !!user;
        this.authUserIcon = user.photoURL;
        this.authUid = user.uid;
        firebase
          .database()
          .ref("rankings")
          .on("value", (rawdata) => {
            this.rank_card_infos = [];
            let prepare;
            let rankings = JSON.parse(JSON.stringify(rawdata.val()));
            for (let ranking of Object.keys(rankings)) {
              prepare = {
                key: ranking,
                title: rankings[ranking].title,
                description: rankings[ranking].description,
                members: rankings[ranking].members,
                participants: Object.keys(rankings[ranking].members).length,
              };
              this.rank_card_infos.push(prepare);
            }
          });
      }
    });
  },
  created() {
    firebase
      .database()
      .ref("rankings")
      .once("value", (rawdata) => {
        this.rank_card_infos = [];
        let prepare;
        let rankings = JSON.parse(JSON.stringify(rawdata.val()));
        for (let ranking of Object.keys(rankings)) {
          prepare = {
            key: ranking,
            title: rankings[ranking].title,
            description: rankings[ranking].description,
            members: rankings[ranking].members,
            participants: Object.keys(rankings[ranking].members).length,
          };
          // console.log(rankings[ranking].members)
          this.rank_card_infos.push(prepare);
        }
      });
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #040c0c;
}

#enroll_modal {
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  #modal_content {
    width: 600px;
    height: 500px;
    background-color: #fff;
    border-radius: 15px;
    position: absolute;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    z-index: 2100;
    #modal_title {
      width: 100%;
      height: 50px;
      color: #fff;
      font-size: 25px;
      font-weight: bold;
      background-color: #0434ec;
      border-radius: 15px 15px 0 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    #modal_description {
      width: 90%;
      height: 220px;
      padding: 10px;
      font-size: 17px;
      font-weight: bold;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
    }
    .modal_label {
      font-size: 20px;
      font-weight: bold;
      margin-top: 20px;
    }
    #modal_input_time {
      outline: none;
      width: 100px;
      height: 30px;
      border-radius: 20px;
      padding: 10px;
      border: solid #2c3e50 1px;
      text-align: right;
    }
    #modal_submit_button {
      cursor: pointer;
      color: #fff;
      background-color: #0434ec;
      width: 250px;
      height: 50px;
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      font-weight: bold;
      border-radius: 99px;
      box-shadow: 0 5px 10px 1px rgb(200, 200, 200);
      &:hover {
        box-shadow: 0 1px 1px 1px rgb(200, 200, 200);
      }
    }
  }
}

#nav {
  z-index: 1000;
  width: 100vw;
  height: 80px;
  position: fixed;
  background-color: #dceefc;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  box-shadow: 0 1px 10px 1px rgb(220, 220, 220);
  #input {
    outline: none;
    width: 30%;
    min-width: 400px;
    max-width: 600px;
    height: 50px;
    padding: 20px;
    margin-left: 30px;
    border: solid #2c3e50 1px;
    border-radius: 999px;
  }
  #logo_img {
    width: 250px;
  }
  #signin_container {
    width: 30%;
    min-width: 400px;
    max-width: 600px;
    height: 50px;
    padding: 10px;
    margin-right: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    #signin_button {
      width: 150px;
      height: 40px;
      cursor: pointer;
      color: #fff;
      background-color: #0434ec;
      border-radius: 99px;
      box-shadow: 0 5px 10px 1px rgb(200, 200, 200);
      font-size: 20px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        box-shadow: 0 1px 1px 1px rgb(200, 200, 200);
      }
    }
  }
}

#main {
  padding-top: 100px;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#LP_container {
  width: 95%;
  // height: 500px;
  padding-top: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  position: relative;
  #LP_title {
    color: #fff;
    padding: 20px 60px;
    margin-bottom: 30px;
    background-color: #0434ec;
    border-radius: 999px 10px;
    box-shadow: 0 5px 10px 1px rgb(220, 220, 220);
  }
  .LP_text {
    color: #040c0c;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    width: 400px;
    padding: 30px;
    box-shadow: 0 5px 10px 1px rgb(200, 200, 200);
    font-size: 20px;
  }
}

#search_result_container {
  width: 60%;
  max-width: 800px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  .rank_card_container {
    cursor: pointer;
    box-shadow: 0 5px 10px 1px rgb(200, 200, 200);
    width: 350px;
    height: 200px;
    margin: 10px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &:hover {
      box-shadow: 0 1px 10px 1px rgb(200, 200, 200);
    }
    .rank_card_title {
      width: 100%;
      height: 35px;
      padding: 3px;
      background-color: #0434ec;
      border-radius: 10px 10px 0 0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 25px;
      color: white;
      font-weight: bold;
    }
    .rank_card_description_container {
      width: 95%;
      height: 165px;
      .rank_card_description {
        width: 100%;
        height: 140px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .rank_card_participants {
        width: 100%;
        height: 25px;
        padding: 2px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-direction: row;
      }
    }
  }
}

#submit_container {
  width: 100%;
  padding-top: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  #submit_title {
    color: #fff;
    padding: 20px 60px;
    margin: 30px;
    background-color: #0434ec;
    border-radius: 10px 999px;
    box-shadow: 0 5px 10px 1px rgb(220, 220, 220);
  }
  #submit_form_container {
    width: 40%;
    min-width: 500px;
    padding: 30px;
    margin-bottom: 30px;
    border-radius: 10px;
    box-shadow: 0 5px 10px 1px rgb(200, 200, 200);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    .form_label {
      font-size: 20px;
      font-weight: bold;
      margin-top: 20px;
    }
    #input_title {
      outline: none;
      width: 80%;
      min-width: 300px;
      height: 30px;
      border-radius: 20px;
      padding: 10px;
      border: solid #2c3e50 1px;
    }
    #input_time {
      outline: none;
      width: 100px;
      height: 30px;
      border-radius: 20px;
      padding: 10px;
      border: solid #2c3e50 1px;
      text-align: right;
    }
    textarea {
      outline: none;
      resize: none;
      width: 80%;
      min-width: 300px;
      height: 200px;
      border-radius: 10px;
      padding: 10px;
      border: solid #2c3e50 1px;
    }
    #submit_button {
      cursor: pointer;
      color: #fff;
      background-color: #0434ec;
      width: 250px;
      height: 50px;
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      font-weight: bold;
      border-radius: 99px;
      box-shadow: 0 5px 10px 1px rgb(200, 200, 200);
      &:hover {
        box-shadow: 0 1px 1px 1px rgb(200, 200, 200);
      }
    }
  }
}

#footer_container {
  background-color: #dceefc;
  width: 100vw;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

/* A Modern CSS Reset */
*,
*::before,
*::after {
  box-sizing: border-box;
}
body,
h1,
h2,
h3,
h4,
p,
figure,
blockquote,
dl,
dd {
  margin: 0;
}
ul[role="list"],
ol[role="list"] {
  list-style: none;
}
html:focus-within {
  scroll-behavior: smooth;
}
body {
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
}
a:not([class]) {
  text-decoration-skip-ink: auto;
}
img,
picture {
  max-width: 100%;
  display: block;
}
input,
button,
textarea,
select {
  font: inherit;
}
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
</style>
