/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//非同期なajaxの実行結果を格納
var ajax_result={
    set_post : null,
    get_post : null,
    auth     : null,
    update   : null
};

function get_ajax_result(name){
    return ajax_result[name];
}

function obs_interval(data){
    
    var que=ajax_result[data.name];
    
    window.clearInterval(que);
    
    que=window.setInterval(function(){

        var result=get_ajax_result(data.name);
        
        console.log({authResult:result});

        if(result===true){
            data.funcTrue(data.para);
            window.clearInterval(que);
            
        }else if(result===false){
            data.funcFalse(data.para);
            window.clearInterval(que);
            
        }else{
            
        }

    },data.time);
}

//引数のテキスト、パスワードを送信して記事を投稿する
function set_post(password,text){
    
      var data = {
         'password' : password,
         'text' : text
      };
      
      console.log({ajax_post:data});
      
      $.ajax({
        type: "POST",
        url: "php/set_post.php",
        data: data,
        async: true,
        success:function(data, dataType) {
            //console.log(data);
            if(data==="true"){
                alert("記事を投稿しました。");
                get_post();
            }else{
                alert("記事の投稿ができませんでした。");
            }
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
            
            if(data==="true"){
                ajax_result.auth=true;
            }else{
                ajax_result.auth=false;
            }
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
            
            
            if(data==="true"){
                alert("記事を更新しました。");
                get_post();
            }else{
                alert("記事の更新ができませんでした。");
            }
            //グローバル変数に格納
            //alert(data=="true" ?"パスワードの認証成功":"パスワードが異なります");
        },
        error:function(XMLHttpRequest, textStatus, errorThrown) {
            
            console.log(errorThrown);
        }
      });
}


//パスワードの認証を行う
function logout_twitter(){
    
    
      var data = {
        //id       : id,
        //password : pass,
        //text     : text
      };
      
      console.log({ajax_post:data});
      
      $.ajax({
        type: "POST",
        url: "logout.php",
        data: data,
        async: true,
        success:function(data, dataType) {
            console.log(data);
            
            location.reload();
            
        },
        error:function(XMLHttpRequest, textStatus, errorThrown) {
            
            console.log(errorThrown);
        }
      });
}