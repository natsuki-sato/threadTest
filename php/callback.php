<?php
session_start();
echo "callback";
// ライブラリの読み込み
require "./twitteroauth/autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;
// 各種キーの読み込み
require_once "KeyConfig.php";
// インスタンス作成
$connection = new TwitterOAuth($CONSUMER_KEY, $CONSUMER_SECRET, $_SESSION['oauth_token'], $_SESSION['oauth_token_secret']);
// アクセストークン取得
$access_token = $connection->oauth('oauth/access_token', array('oauth_verifier' => $_GET['oauth_verifier'], 'oauth_token'=> $_GET['oauth_token']));
//取得したアクセストークンでユーザ情報を取得
$user_connection = new TwitterOAuth($CONSUMER_KEY, $CONSUMER_SECRET, $access_token['oauth_token'], $access_token['oauth_token_secret']);
// 画像をアップロード
$media = $user_connection->upload('media/upload', ['media' => './image.jpg']);
// ツイートの内容を設定
$params = [
  'status' => 'test #test',
  'media_ids' => implode(',', [$media->media_id_string])
];
// ツイートする
$result = $user_connection->post('statuses/update', $params);
header('Location: index.html');
exit();
