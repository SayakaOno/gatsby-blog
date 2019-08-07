---
title: 'コンタクト'
template: 'page'
---

ブログをご覧くださりありがとうございます。SNS もしくは以下のフォームより、お気軽にご連絡ください！<br />
[ポートフォリオ Web サイト（英語）](https://sayaka-ono.com) / [GitHub](https://github.com/SayakaOno) / [LinkedIn](https://www.linkedin.com/in/sayakaono/) / [twitter](https://twitter.com/38_ca)

<form class="form" id="contactform" action="https://sayaka38.minibird.jp/contact.php" method="POST">
  <style>
    form {
      margin-top: 40px;
    }
    .field {
      margin-bottom: 15px;
    }
    input, textarea {
      box-sizing: border-box;
      width: 100%;
      max-width: 450px;
      padding: .5rem .75rem;
      font-size: 1rem;
      color: #464a4c;
      border: 1px solid rgba(0,0,0,.15);
      border-radius: .25rem;
      outline: none;
    }
    .button {
      width: 100px;
      background-color: rgba(0,0,0,.15);
      border: none;
    }
    .button:hover {
      cursor: pointer;
    }
  </style>
  <div class="field">
    <label class="label" for="name"><div class="label-content">お名前</div></label>
    <input class="input" type="text" name="name" id="name" required>
  </div>
  <div class="field">
    <label class="label" for="_replyto"><div class="label-content">メールアドレス</div></label>
    <input class="input" type="email" name="_replyto" id="_replyto" required>
  </div>
  <div class="field">
    <label class="label" for="message"><div class="label-content">メッセージ</div></label>
    <textarea class="input" name="message" rows="5" id="message" required></textarea>
  </div>
  <input class="hidden" type="text" name="_gotcha" style="display:none">
  <input class="hidden" type="hidden" name="_subject" value="Message via Blog">
  <div class="field">
    <input class="button submit" type="submit" value="送信">
  </div>
</form>
