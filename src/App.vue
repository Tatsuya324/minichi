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

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
