<?php

session_start();
// ライブラリの読み込み
require "twitteroauth/autoload.php";

use Abraham\TwitterOAuth\TwitterOAuth;
// 各種キーの読み込み
require_once "php/keyConfig.php";

//echo $CONSUMER_KEY."<br>".$CONSUMER_SECRET;
// Callback URL
define('Callback', 'http://192.168.206.10:8888/netBeansTest/php/callback.php');
 
echo 1;

// インスタンス作成
$connection = new TwitterOAuth($CONSUMER_KEY, $CONSUMER_SECRET);

// リクエストトークンを取得
$request_token = $connection->oauth("oauth/request_token", array("oauth_callback" => Callback));
echo 2;
//　コールバックでも利用するためセッションに保存
$_SESSION['oauth_token'] = $request_token['oauth_token'];
$_SESSION['oauth_token_secret'] = $request_token['oauth_token_secret'];
echo 3;

// 認証画面へリダイレクト
$url = $connection->url("oauth/authorize", array("oauth_token" => $request_token['oauth_token']));
header('Location: ' . $url);
echo 99;