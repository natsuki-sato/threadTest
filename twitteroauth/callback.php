<?php

echo "callback0,";

session_start();
// ライブラリの読み込み
require "autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;
// 各種キーの読み込み
require_once "config.php";

//oauth_tokenとoauth_verifierを取得
if($_SESSION['oauth_token'] == $_GET['oauth_token'] and $_GET['oauth_verifier']){

    // インスタンス作成
    $connection = new TwitterOAuth($CONSUMER_KEY, $CONSUMER_SECRET, $_SESSION['oauth_token'], $_SESSION['oauth_token_secret']);

    echo "callback0.2,";

    //Twitterからアクセストークンを取得する
    $access_token = $connection->oauth('oauth/access_token', array('oauth_verifier' => $_GET['oauth_verifier'], 'oauth_token'=> $_GET['oauth_token']));

    echo "callback0.3,";

    //取得したアクセストークンでユーザ情報を取得
    $user_connection = new TwitterOAuth($CONSUMER_KEY, $CONSUMER_SECRET, $access_token['oauth_token'], $access_token['oauth_token_secret']);
    $user_info = $user_connection->get('account/verify_credentials');


    //適当にユーザ情報を取得
    $id = $user_info->id;
    $name = $user_info->name;
    $screen_name = $user_info->screen_name;
    $profile_image_url_https = $user_info->profile_image_url_https;
    $text = $user_info->status->text;

    //各値をセッションに入れる
    $_SESSION['access_token'] = $access_token;
    $_SESSION['id'] = $id;
    $_SESSION['name'] = $name;
    $_SESSION['screen_name'] = $screen_name;
    $_SESSION['text'] = $text;
    $_SESSION['profile_image_url_https'] = $profile_image_url_https;
    
    
    header('Location: ../index.php?login=twiiter');


    //echo "callback1,";
    exit();
}else{
    
    header('Location: ../index.php');
    exit();       
}

