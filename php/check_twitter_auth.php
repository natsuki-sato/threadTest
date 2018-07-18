<?php

    session_start();
 
    header("Content-type: text/html; charset=utf-8");

    if(!isset($_SESSION['access_token'])){
            //echo "<a href='login.php'>Twitterでログイン</a>";
        echo "false";
    }else{
            /*
            //callback.phpからセッションを受け継ぐ
            echo "<p>ID：". $_SESSION['id'] . "</p>";
            echo "<p>名前：". $_SESSION['name'] . "</p>";
            echo "<p>スクリーン名：". $_SESSION['screen_name'] . "</p>";
            echo "<p>最新ツイート：" .$_SESSION['text']. "</p>";
            echo "<p><img src=".$_SESSION['profile_image_url_https']."></p>";
            echo "<p>access_token：". $_SESSION['access_token']['oauth_token'] . "</p>";

            echo "<p><a href='logout.php'>ログアウト</a></p>";
             * 
             */
        echo "true";
    }