var arr=[-4,-3,-2,-5,-6,-2,-3,-4,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,4,3,2,5,6,2,3,4];
function main(){
    create_board();
    populate_board();
}
function create_board(){
    var board=document.getElementById("board");
    var i;
    for(i=0;i<64;i++){
        var j=document.createElement("div");
        j.setAttribute("class","box");
        j.setAttribute("id","box_"+i);
        j.setAttribute("onclick","select("+i+");");
        board.appendChild(j);
    }
}
function populate_board(){
    var i;
    for(i=0;i<64;i++){
        document.getElementById("box_"+i).innerHTML=arr[i];
    }
}
var move; var chosen=false; var prev;
function select(i){
    if(!chosen){
        if(arr[i]>0 && i!=prev){
            document.getElementById("box_"+i).style.backgroundColor="yellow";
        }

        if(arr[i]==1){
            move=pawn(i);
            chosen=true;
            prev=i;
        }
        for(j=0;j<move.length;j++){
            console.log(move[j]);
        }
    }
    else{
        var k=0;
        for(k=0;k<move.length;k++){
            if(i==move[k]){
                console.log(i);
                chosen=false;
                arr[i]=arr[prev];
                arr[prev]=0;
                document.getElementById("box_"+prev).style.backgroundColor="transparent";
                populate_board();
                break;
            }
            else if(i==prev){
                document.getElementById("box_"+i).style.backgroundColor="transparent";
                chosen=false;
            }
        }

    }

}
function pawn(i){
    if(i>47){
        return [i-8,i-16];
    }
    else{
        return [i-8];
    }
}