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
    var l=0;
    if(!chosen){
        if(arr[i]>0 && i!=prev){
            document.getElementById("box_"+i).style.backgroundColor="yellow";
        }

        if(arr[i]==1){
            move=pawn(i);
            chosen=true;
            prev=i;
        }
        else if(arr[i]==4){
            move=rook(i);
            chosen=true;
            prev=i;
        }
        else if(arr[i]==2){
            move=bishop(i);
            chosen=true;
            prev=i;
        }
        else if(arr[i]==5){
            move=queen(i);
            chosen=true;
            prev=i;
        }
        else if(arr[i]==3){
            move=knight(i);
            chosen=true;
            prev=i;
        }

        for(j=0;j<move.length;j++){
            console.log(move[j]);
            document.getElementById("box_"+move[j]).style.backgroundColor="cyan";
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
                for(l=0;l<64;l++){
                    document.getElementById("box_"+l).style.backgroundColor="transparent";
                }
                populate_board();
                break;
            }
            else if(i==prev){
                for(l=0;l<64;l++){
                    document.getElementById("box_"+l).style.backgroundColor="transparent";
                }
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
function rook(i){
    var arr2=[];
    var j=i;
    while(j>-1){
        if(j-8>-1){
            arr2.push(j-8);
        }
        j=j-8;
    }
    j=i;
    while(j<64){
        if(j+8<64){
            arr2.push(j+8);
        }
        j=j+8;
    }
    j=i;
    while(j>-1 && j%8!=0){
        if(j>-1 && j%8!=0){
            arr2.push(j-1);
        }
        j=j-1;
    }
    j=i;
    while(j<64 && (j+1)%8!=0){
        if(j<64 && (j+1)%8!=0){
            arr2.push(j+1);
        }
        j=j+1;
    }
    return arr2;
}
function bishop(i){
    var arr2=[];
    var j=i;
    while(j>-1 && j%8!=0 && j-9>-1){
        if(j>-1 && j%8!=0){
            arr2.push(j-9);
        }
        j=j-9;
    }
    j=i;
    while(j>-1 && (j+1)%8!=0 && j-7>-1){
        if(j>-1 && (j+1)%8!=0){
            arr2.push(j-7);
        }
        j=j-7;
    }
    j=i;
    while(j<64 && j%8!=0 && j+7<64){
        if(j<64 && j%8!=0){
            arr2.push(j+7);
        }
        j=j+7;
    }
    j=i;
    while(j<64 && (j+1)%8!=0 && j+9<64){
        if(j<64 && j%8!=0){
            arr2.push(j+9);
        }
        j=j+9;
    }
    return arr2;
}
function queen(i){
    var arr2=[];
    var j=i;
    while(j>-1){
        if(j-8>-1){
            arr2.push(j-8);
        }
        j=j-8;
    }
    j=i;
    while(j<64){
        if(j+8<64){
            arr2.push(j+8);
        }
        j=j+8;
    }
    j=i;
    while(j>-1 && j%8!=0){
        if(j>-1 && j%8!=0){
            arr2.push(j-1);
        }
        j=j-1;
    }
    j=i;
    while(j<64 && (j+1)%8!=0){
        if(j<64 && (j+1)%8!=0){
            arr2.push(j+1);
        }
        j=j+1;
    }
    j=i;
    while(j>-1 && j%8!=0 && j-9>-1){
        if(j>-1 && j%8!=0){
            arr2.push(j-9);
        }
        j=j-9;
    }
    j=i;
    while(j>-1 && (j+1)%8!=0 && j-7>-1){
        if(j>-1 && (j+1)%8!=0){
            arr2.push(j-7);
        }
        j=j-7;
    }
    j=i;
    while(j<64 && j%8!=0 && j+7<64){
        if(j<64 && j%8!=0){
            arr2.push(j+7);
        }
        j=j+7;
    }
    j=i;
    while(j<64 && (j+1)%8!=0 && j+9<64){
        if(j<64 && j%8!=0){
            arr2.push(j+9);
        }
        j=j+9;
    }
    console.log(arr2);
    return arr2;
}
function knight(i){
    var arr2=[];
    if(i>15 && i%8!=0){
        arr2.push(i-17);
    }
    if(i>15 && (i+1)%8!=0){
        arr2.push(i-15);
    }
    if(i>7 && (i-1)%8!=0 && i%8!=0){
        arr2.push(i-10);
    }
    if(i<56 && (i-1)%8!=0 && i%8!=0){
        arr2.push(i+6);
    }
    if(i<48 && i%8!=0){
        arr2.push(i+15);
    }
    if(i<48 && (i+1)%8!=0){
        arr2.push(i+17);
    }
    if(i<56 && (i+1)%8!=0 && (i+2)%8!=0){
        arr2.push(i+10);
    }
    if(i>7 && (i+1)%8!=0 && (i+2)%8!=0){
        arr2.push(i-6);
    }
    return arr2;
}