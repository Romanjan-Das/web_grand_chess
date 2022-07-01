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
        }
        else if(arr[i]==4){
            move=rook(i);
        }
        else if(arr[i]==2){
            move=bishop(i);
        }
        else if(arr[i]==5){
            move=queen(i);
        }
        else if(arr[i]==3){
            move=knight(i);
        }
        else if(arr[i]==6){
            move=king(i);
        }
        chosen=true;
        prev=i;

        for(j=0;j<move.length;j++){
            document.getElementById("box_"+move[j]).style.backgroundColor="cyan";
        }
    }
    else{
        var k=0;
        if(move.length==0){
            reset_board_colours();
            chosen=false;
        }
        else{
            for(k=0;k<move.length;k++){
                if(i==move[k]){
                    arr[i]=arr[prev];
                    arr[prev]=0;
                    reset_board_colours();
                    populate_board();
                    chosen=false;
                    move=[];
                    break;
                }
                else if(i==prev){
                    reset_board_colours();
                    chosen=false;
                    move=[];
                }
            }
        }
    }

}
function reset_board_colours(){
    var l;
    for(l=0;l<64;l++){
        document.getElementById("box_"+l).style.backgroundColor="transparent";
    }
}
function pawn(i){
    if(arr[i]>0){
        if(i>47){
            return [i-8,i-16];
        }
        else if(i>7){
            return [i-8];
        }
        else{
            return [];
        }
    }
    else if(arr[i]<0){
        if(i<16){
            return [i+8,i+16];
        }
        else if(i<56){
            return [i+8];
        }
        else{
            return [];
        }
    }

}
function rook(i){
    var arr2=[];
    var j=i;
    while(j>-1){
        if(j-8>-1){
            if(arr[j-8]>0){
                break;
            }
            else if(arr[j-8]<0){
                arr2.push(j-8);
                break;
            }
            else{
                arr2.push(j-8);
            }
        }
        j=j-8;
    }
    j=i;
    while(j<64){
        if(j+8<64){
            if(arr[j+8]>0){
                break;
            }
            else if(arr[j+8]<0){
                arr2.push(j+8);
                break;
            }
            else{
                arr2.push(j+8);
            }
        }
        j=j+8;
    }
    j=i;
    while(j>-1 && j%8!=0){
        if(j>-1 && j%8!=0){
            if(arr[j-1]>0){
                break;
            }
            else if(arr[j-1]<0){
                arr2.push(j-1);
                break;
            }
            else{
                arr2.push(j-1);
            }
        }
        j=j-1;
    }
    j=i;
    while(j<64 && (j+1)%8!=0){
        if(j<64 && (j+1)%8!=0){
            if(arr[j+1]>0){
                break;
            }
            else if(arr[j+1]<0){
                arr2.push(j+1);
                break;
            }
            else{
                arr2.push(j+1);
            }
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
function king(i){
    var arr2=[];
    if(i<56){
        arr2.push(i+8);
    }
    if((i+1)%8!=0 && i<64){
        arr2.push(i+1);
    }
    if((i+1)%8!=0 && i<56){
        arr2.push(i+9);
    }
    if(i%8!=0 && i<56){
        arr2.push(i+7);
    }
    if(i>7){
        arr2.push(i-8);
    }
    if(i%8!=0 && i>0){
        arr2.push(i-1);
    }
    if(i>7 && i%8!=0){
        arr2.push(i-9);
    }
    if((i+1)%8!=0 && i>7){
        arr2.push(i-7);
    }
    return arr2;
}