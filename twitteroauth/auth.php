<?php
echo "auth_0,";

session_start();
// ライブラリの読み込み
require "twitteroauth/autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;
// 各種キーの読み込み
require_once "config.php";
 
echo "auth_0.1,";

// Callback URL
define('Callback', 'http://192.168.206.10:8888/netBeansTest/twitteroauth/callback.php');
 
echo "auth_0.2,";

// インスタンス作成
$connection = new TwitterOAuth($CONSUMER_KEY, $CONSUMER_SECRET);

echo "auth_0.3,";

// リクエストトークンを取得
$request_token = $connection->oauth("oauth/request_token", array("oauth_callback" => Callback));
 
echo "auth_0.4,";

//　コールバックでも利用するためセッションに保存
$_SESSION['oauth_token'] = $request_token['oauth_token'];
$_SESSION['oauth_token_secret'] = $request_token['oauth_token_secret'];
 
// 認証画面へリダイレクト
$url = $connection->url("oauth/authorize", array("oauth_token" => $request_token['oauth_token']));
header('Location: ' . $url);

echo "auth_1,";
