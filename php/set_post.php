<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

    //データベースのログイン設定
    define('HOST', 'localhost');
    define('USER', 'moremost');
    define('PW', "moremost1");
    define('DB', 'internTest');
    //define('DB', "db_test_back");

    //データベースへ接続開始
    $connect =mysqli_connect( HOST , USER , PW , DB);

    //接続状況のチェック
    if(!$connect){
        
        echo "no connect";
        die('接続できませんでした: ' . mysql_error());
        //接続できなかったらここで終わります
    }
    
    //ajaxデータを変数に格納s
    $text   = filter_input(INPUT_POST, 'text');
    
    //テーブル名
    $tb="thread";
    
    //実行するクエリの内容(データの挿入)
    $query="insert into ".$tb." (text) values ('".$text."')";
    
    //クエリを実行
    $result = mysqli_query($connect,$query);
    
    //結果がなかったら終了
    if(!$result){
        //echo "投稿が失敗しました。";
        die();
    }
    //echo "投稿しました。";
    
    mysqli_close($connect);
    //全処理を終了
    exit();
