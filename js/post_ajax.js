/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//引数のテキスト、パスワードを送信して記事を投稿する
function set_post(text){
    
      var data = {
         'text' : text
      };
      
      console.log({ajax_post:data});
      
      $.ajax({
        type: "POST",
        url: "php/set_post.php",
        data: data,
        async: true,
        success:function(data, dataType) {

            alert("記事を投稿しました。");
            get_post();
        },
        error:function(XMLHttpRequest, textStatus, errorThrown) {
            
            alert("記事の投稿に失敗しました。");
            // エラーメッセージの表示
            //alert('Error : ' + errorThrown);
        }
      });
}

//条件を指定して投稿記事を取得する
function get_post(){
    
    
      var data = {
         'text' : null
      };
      
      console.log({ajax_post:data});
      
      $.ajax({
        type: "POST",
        url: "php/get_post.php",
        data: data,
        async: true,
        success:function(data, dataType) {
            console.log(data);
            //グローバル変数に格納
            threadData.json=data;
            
            create_Thread(data);
            //alert("記事を投稿しました。");
        },
        error:function(XMLHttpRequest, textStatus, errorThrown) {
            
            
        }
      });
}

//パスワードの認証を行う
function auth_password(id,pass){
    
      var data = {
        id       : id,
        password : pass
      };
      
      console.log({ajax_post:data});
      
      $.ajax({
        type: "POST",
        url: "php/auth_password.php",
        data: data,
        async: true,
        success:function(data, dataType) {
            console.log(data);
            //グローバル変数に格納
            //alert(data=="true" ?"パスワードの認証成功":"パスワードが異なります");
        },
        error:function(XMLHttpRequest, textStatus, errorThrown) {
            
            console.log(errorThrown);
        }
      });
}

//パスワードの認証を行う
function update_post(id,pass,text){
    
      var data = {
        id       : id,
        password : pass,
        text     : text
      };
      
      console.log({ajax_post:data});
      
      $.ajax({
        type: "POST",
        url: "php/update_post.php",
        data: data,
        async: true,
        success:function(data, dataType) {
            console.log(data);
            
            //get_post();
            
            //グローバル変数に格納
            //alert(data=="true" ?"パスワードの認証成功":"パスワードが異なります");
        },
        error:function(XMLHttpRequest, textStatus, errorThrown) {
            
            console.log(errorThrown);
        }
      });
}
