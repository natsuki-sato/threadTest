/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var threadData={
    raw:null,
    json:null
};

var que={
    update:null
};

//update_post(1,"","uuuuu");

get_post();

//auth_password(1,"");

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
            text : ele[3]
                    
        };
        //console.log(data.date.replace(/(\d{4})-(\d{1,2})-(\d{1,2})\s(\d{1,2}):(\d{1,2}):(\d{1,2})/, "$1年$2月$3日$4時$5分$6秒"));
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
            .prop("disabled",vals.disabled) //要素を非活性化

            .off("keydown")
            .on("keydown",{num:threadNum},function(e){
                
               if(e.keyCode === 13){//enterキーで送信
                    var pass = this.value;
                    
                    auth_password(e.data.num,pass);
                    
                    $(this).prop("disabled",true);

                    toggleEditArea(e.data.num);
               } 
                //バブリングの防止、親要素への伝播を止める
                e.preventDefault();
                e.stopPropagation();

            });
            
        //記事更新ボタンの操作
        $editUpdateBTN
                .off("click")
                .on("click",{num:threadNum},function(e){//クリックイベントを上書き
  
                    
                    var orgText=$("#threadArtArea"+e.data.num).text();
                    var updateText=$("#editTextArea"+e.data.num).val();
                    var pass = $("#editPwArea"+e.data.num).val();
                    
                    console.log([orgText,updateText]);
                    
                    //記事の変更がなければ更新しない
                    if(orgText===updateText){
                        
                        alert("記事の内容が同じです。");
                     
                    }
                    //更新時にダイアログで確認
                    else{
                        
                        var result = window.confirm("以下の内容で記事を更新しますか。\n"+updateText);

                        if(result){
                            
                            update_post(e.data.num,pass,updateText);
                            
                            window.clearInterval(que.update);
                            que.update=window.setInterval(function(){
                                
                                window.clearInterval(que.update);
                                
                                alert("記事を更新しました。");
                                get_post();
                                
                            },500);
                            
                            
                            
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

    //記事編集エリアと記事エリアの切替処理
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
            
        }else if(!flag){//toggleClass関数に第二の引数を渡すと、inline-blockになるバグへの対策
            
            $editTextArea.addClass("hidingEle");

            $updateBtn.addClass("hidingEle");

            $artArea.removeClass("hidingEle");
        }
    }
    


    
}
