<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->

<html>
    <head>
       
        <title>掲示板</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="js/jquery.min.js" type="text/javascript"></script>
        <script src="js/jquery-ui.min.js"  type="text/javascript"></script>

        
        <link rel="stylesheet" href="css/style.css" type="text/css" media="screen" />

    </head>
    <body>
        <div id="contentFrame">
            <div id="menu">
                <div id="menuContent" data-twitterLogin="<?php require 'php/check_twitter_auth.php';?>" >
                    <span id="twitterLoginBtn"><p>Login</p></span>
                    <span id="twitterLogoutBtn"><p>Logout</p></span>
                    <span id="moveTopBtn">↑</span>
                </div>
            </div>
            <div id="threadFrame">
                <ul id="threadContent">
                    
                    <span id="noTread">投稿が存在しません。</span>
                </ul>
            </div>
            <div id="postForm" name="postForm">
                <textarea id="threadTextArea" placeholder="文字を入力してください。"></textarea>
                <input id="pwForm" type="password" placeholder="編集用パスワード" ></input>
                <input id="resetBTN" type="submit" value="リセット" ></input>
                <input id="postBTN" type="submit" value="投稿する" ></input>
            </div>
        </div>
    </body>
    <script src="js/post_ajax.js" type="text/javascript"></script>
    <script src="js/post.js" type="text/javascript"></script>
    
    <?php 
        
        //require 'twitteroauth/auth.php'; 
    ?>
</html>
