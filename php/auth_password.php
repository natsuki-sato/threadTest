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
    
    //ajaxデータを変数に格納
    $threadId = filter_input(INPUT_POST, 'id');
    $threadPw = filter_input(INPUT_POST, 'password');
    
    //テーブル名
    $tb="thread";
    
    //実行するクエリの内容(データの検索)
    $query="select id,password from ".$tb. " where id=".$threadId;
    
    //クエリを実行
    $result = mysqli_query($connect,$query);
    
    $row = mysqli_fetch_object($result);
    
//    echo "auth";
//    echo "[".$threadPw."]==[".$row->id."]";
    
    //結果がない・パスワードが異なる場合は,falseを返す
    if(!$result || $row->password."" !== $threadPw){
        //echo "パスワードが一致しません";
        echo json_encode(false);
        die();
    }
    //パスワードが一致したならtrueを返す
    echo json_encode(true);
    //echo "test";

    
    mysqli_close($connect);

    //全処理を終了
    exit();
?>