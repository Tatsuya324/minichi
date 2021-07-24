<template>
  <div id="app">
    <div id="nav">
      <input id="input" placeholder="みんなの一番を調べる" type="text">
        <img id="logo_img" src="./assets/logo.png" alt="">
      <div>
        <div id="sign_container">
          <span>SIGN IN</span>
        </div>
      </div>
    </div>
    <!-- -----------メインエリアSTART----------- -->
    <div id="main">
      <div id="search_result_container">
        <div v-for="(rank_info, rank_index) in disp_rank_card_infos"
        v-bind:key="rank_index"
        class="rank_card_container"
        >
          <span class="rank_card_title">
            {{rank_info.title}}
          </span>
          <div class="rank_card_discription_container">
            <div class="rank_card_discription">
              {{rank_info.discription}}
            </div>
            <div class="rank_card_participants">
              <span>
                参加者数 
              </span>
              <span>
                {{rank_info.participants}} 人
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- -----------メインエリアEND----------- -->
    <div id="footer_container">
      <h2>みんなの一番 について</h2>
      <div id="footer_discription_container">
        <div class="footer_discription">
          <h3>自分の一番だと思うランキングに参加しよう！</h3>
          <p>日頃の生活の中で、「これって私が一番？」と感じることを登録しよう。</p>
          <p>はじめにランキングを検索して本当の一番と生活の順位を競おう！</p>
        </div>
        <div class="footer_discription">
          <h3>自分が一番だと思うランキングがない場合</h3>
          <p>「自分が一番！」と感じることのランキングがない場合は、それを登録しよう！</p>
          <p>初めてのランキングではキミが一番だ！！</p>
          <p>後からやってくる猛者たちを抑えて一番を維持しよう！</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import MenubarIcon from "./assets/icon/bars_icon.svg";

export default {
  name: "App",
  components: {
    // MenubarIcon,
  },
  data() {
    return {
      disp_rank_card_infos: [
        {
          title: "タイトル１",
          discription: "これは説明ですタイトル１",
          participants: 300,
        },
        {
          title: "タイトル２",
          discription: "これは説明ですタイトル２",
          participants: 300,
        },
        {
          title: "タイトル３",
          discription: "これは説明ですタイトル３",
          participants: 300,
        },
        {
          title: "タイトル４",
          discription: "これは説明ですタイトル４",
          participants: 300,
        },
      ]
    };
  },
  methods: {
    hamburger_menu_disp: function () {
      if (this.hamburger_menu_pos == 0) {
        this.hamburger_menu_pos = -300;
      } else {
        this.hamburger_menu_pos = 0;
      }
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #040C0C;
}

#nav {
  z-index: 1000;
  width: 100vw;
  height: 80px;
  position: fixed;
  background-color: #DCEEFC;
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
  #logo_img{
    width: 250px;
  }
  #sign_container{
    width: 30%;
    min-width: 400px;
    max-width: 600px;
    height: 50px;
    padding: 10px;
    margin-right: 30px;
  }
}

#main{
  padding-top: 100px;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
#search_result_container{
  width: 60%;
  max-width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  .rank_card_container{
    cursor: pointer;
    box-shadow: 0 5px 10px 1px rgb(200, 200, 200);
    width: 350px;
    height: 150px;
    margin: 10px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &:hover {
      box-shadow: 0 1px 10px 1px rgb(200, 200, 200);
    }
    .rank_card_title{
      width: 100%;
      height: 35px;
      padding: 3px;
      background-color: #0434EC;
      border-radius: 10px 10px 0 0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 25px;
      color: white;
      font-weight: bold;
    }
    .rank_card_discription_container{
      width: 95%;
      height: 115px;
      .rank_card_discription{
        width: 100%;
        height: 90px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .rank_card_participants{
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

#footer_container{
  width: 100vw;
  padding-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  #footer_discription_container{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    .footer_discription{
      width: 40%;
      margin: 20px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
    }
  }
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
