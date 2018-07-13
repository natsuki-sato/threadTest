/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

get_post();

var threadData={
    raw:null,
    json:null
};



console.log("test");

document.getElementById('postBTN').addEventListener('click', post, false);

document.getElementById('resetBTN').addEventListener('click', reset, false);

//投稿ボタンの処理関数
function post(){
    
    //投稿記事のテキスト
    var value=document.getElementById("threadTextArea").value;
    
    //編集用password
    var pw=document.getElementById("pwForm").value;
    
    //余分な空白を削除
    var repVal=value.replace(/ /g,"");

    console.log([repVal.length,repVal]);
    
    //入力欄が空の場合は投稿しない
    if(repVal.length>1){

        var result = window.confirm("以下の内容で記事を投稿しますか。\n"+value);
        
        
        if(result){
            set_post(repVal);
            
            reset();
        }

    }else{
        alert("文章が入力されていません。");
    }

}

//リセットボタンの処理(記事とpasswordのリセット)
function reset(){
    
    var textarea=document.getElementById("threadTextArea");
   
    var pwFrom=document.getElementById("pwForm");
    
    textarea.value="";
    pwFrom.value="";
}



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

function create_Thread(threadData){
    
    if(!threadData || threadData.length===0) return false;
    
    var $content=$("#threadContent");
    
    $content.empty();
    
    threadData.forEach(function(ele){
        
        
        var data={
            num  : ele[0],
            date : ele[1]
                    .replace(
                        //正規表現で日付に単位を付加
                        /(\d{4})-(\d{1,2})-(\d{1,2})\s(\d{1,2}):(\d{1,2}):(\d{1,2})/,
                       "$1年$2月$3日 $4時$5分$6秒"
                    ),
            text : ele[2]
                    
        };
        console.log(data.date.replace(/(\d{4})-(\d{1,2})-(\d{1,2})\s(\d{1,2}):(\d{1,2}):(\d{1,2})/,
                       "$1年$2月$3日$4時$5分$6秒"));
        var $threadEle = $("<li>")
                            .attr("id","thread"+data.num)
                            .addClass("thread");
                            
       
        var $topArea = $("<div>")
                            .attr("id","threadTopArea"+data.num)
                            .addClass("threadTopArea")
                            .text(data.num+" : "+data.date);
                    
                    
                    
        var $editBTN = $("<input>")
                            .attr("id","editBTN"+data.num)
                            .addClass("editBTN")
                            .attr("type","button")
                            .val("編集");
                    
        var $editPwArea = $("<input>")
                            .attr("id","editPwArea"+data.num)
                            .addClass("editPwArea disableEle")
                            .attr({
                                type:"password",
                                placeholder:"編集用パスワードを入力してしてください"
                            })
                            .prop("disabled",true);//要素の不活性化
                    

                    
        var $editTextArea = $("<textarea>")
                            .attr("id","editTextArea"+data.num)
                            .addClass("editTextArea hidingEle"); 
                    
        var $editUpdateBTN = $("<input>")
                    .attr({
                        id:"editUpdateBTN"+data.num,
                        type:"button"
                    })
                    .addClass("editUpdateBTN hidingEle")
                    .val("決定");              
        
                    
        var $artArea=$("<div>")
                        .attr("id","threadArtArea"+data.num)
                        .addClass("threadArtArea")
                        .text(data.text);
                

        
        $topArea
            .append($editBTN)
            .append($editPwArea)
            .append($editTextArea)
            .append($editUpdateBTN);
        
        $threadEle
            .append($topArea)
            .append($artArea);
        
        
        $content.append($threadEle);
        
        
    });
    
    //全記事を内包する要素にクリックイベントを登録
    $content.on("click","input.editBTN",function(e){

       //掲示板の番号を取り出す
       var threadNum = parseInt(this.id.match(/(\d{1,9})$/)[0]);


       var $editBtn = $(this);
       var $editPwArea = $("#editPwArea"+threadNum);
       var $editUpdateBTN = $("#editUpdateBTN"+threadNum);
       
       
       var vals = $editPwArea.hasClass("disableEle")? 
                  {disabled:false,label:"中止",editingFlag:true}: 
                  {disabled:true,label:"編集",editingFlag:false};
       
       
       $editBtn
            .toggleClass("editing") //編集中のクラスを付加
            .val(vals.label);       //ボタンの文字を書き換える
       
       if(vals.editingFlag) {
           $editBtn
                .one("click",{num:threadNum},function(e){ //編集中なら一度だけクリックでキャンセル
                    
                    toggleEditArea(e.data.num,false);
                });
       }

       //編集パスワード入力部のスタイル変更する
       $editPwArea
            .toggleClass("disableEle")
            .prop("disabled",vals.disabled)

            .off("keydown")
    
            .on("keydown",{num:threadNum},function(e){
                
               if(e.keyCode === 13){
                   
                    $(this).prop("disabled",true);

                    toggleEditArea(e.data.num);
               } 
                //バブリングの防止、親要素への伝播を止める
                e.preventDefault();
                e.stopPropagation();

            });
            
        $editUpdateBTN
                .off("click")
                .on("click",{num:threadNum},function(e){
  
                    var orgText=$("#editTextArea"+e.data.num).val();
                    var updateText=$("#editTextArea"+e.data.num).val();
                    console.log([orgText,updateText]);
                    if(orgText===updateText){
                        
                        alert("記事の内容が同じです。");
                        
                    }else{
                        
                        var result = window.confirm("以下の内容で記事を更新しますか。\n"+updateText);

                        if(result){
                            alert("記事を更新しました。")
                        }
                    }

                    //バブリングの防止、親要素への伝播を止める
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                    
                 });
           
        //バブリングの防止、親要素への伝播を止める
        e.preventDefault();
        e.stopPropagation();
        return false;
    });


    function toggleEditArea(num,flag){
        
        var $editTextArea = $("#editTextArea"+num);
        var $updateBtn    = $("#editUpdateBTN"+num);
        var $artArea      = $("#threadArtArea"+num);

        if(flag===undefined){
        
            $editTextArea
                    .val($artArea.text())
                    .toggleClass("hidingEle");

            $updateBtn.toggleClass("hidingEle");

            $artArea.toggleClass("hidingEle");
            
        }else if(!flag){
            
            $editTextArea.addClass("hidingEle");

            $updateBtn.addClass("hidingEle");

            $artArea.removeClass("hidingEle");
        }
    }
    


    
}
