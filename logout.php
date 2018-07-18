<?php

session_start();
 
header("Content-type: text/html; charset=utf-8");
 
//セッション変数を全て解除
$_SESSION = array();
 
//セッションクッキーの削除
if (isset($_COOKIE["PHPSESSID"])) {
    setcookie("PHPSESSID", '', time() - 1800, '/');
}
 
//セッションを破棄する
session_destroy();
 
echo "<p>ログアウトしました。</p>";
 
echo "<a href='index.php'>はじめのページへ</a>";
