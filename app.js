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
        var img=document.createElement("img");
        img.setAttribute("class","chess_piece");
        img.setAttribute("id","img_"+i);
        j.setAttribute("class","box");
        j.setAttribute("id","box_"+i);
        j.setAttribute("onclick","select("+i+");");
        j.appendChild(img);
        board.appendChild(j);
    }
}
function populate_board(){
    var i;
    for(i=0;i<64;i++){
        document.getElementById("img_"+i).setAttribute("src","assets/"+arr[i]+".png");
    }
}
var move; var chosen=false; var prev;
function select(i){
    if(!chosen){ var n;
        if(arr[i]>0 || arr[i]<0){
            document.getElementById("box_"+i).style.backgroundColor="yellow";
        }

        if(arr[i]==1||arr[i]==-1){
            move=pawn(i);
        }
        else if(arr[i]==4||arr[i]==-4){
            if(arr[i]<0){
                arr=mirror_arr(arr);
                move=rook(i);
                arr=mirror_arr(arr);
            }
            else{
                move=rook(i);
            }
        }
        else if(arr[i]==2||arr[i]==-2){
            if(arr[i]<0){
                arr=mirror_arr(arr);
                move=bishop(i);
                arr=mirror_arr(arr);
            }
            else{
                move=bishop(i);
            }
        }
        else if(arr[i]==5||arr[i]==-5){
            if(arr[i]<0){
                arr=mirror_arr(arr);
                move=queen(i);
                arr=mirror_arr(arr);
            }
            else{
                move=queen(i);
            }
        }
        else if(arr[i]==3||arr[i]==-3){
            if(arr[i]<0){
                arr=mirror_arr(arr);
                move=knight(i);
                arr=mirror_arr(arr);
            }
            else{
                move=knight(i);
            }
        }
        else if(arr[i]==6||arr[i]==-6){
            if(arr[i]<0){
                arr=mirror_arr(arr);
                move=king(i);
                arr=mirror_arr(arr);
            }
            else{
                move=king(i);
            }
        }
        chosen=true;
        prev=i;
        paint_box_wrt_status(i);
    }
    else{
        var k=0;
        if(move.length==0){
            reset_board_colours();
            chosen=false;
        }
        else{
            for(k=0;k<move.length;k++){
                if(i==move[k]){ n=arr[i];
                    arr[i]=arr[prev];
                    arr[prev]=0;
                    reset_board_colours();
                    populate_board();
                    chosen=false;
                    move=[];
                    if(n==-6){
                        setTimeout(() => {
                            victory_message();
                        }, 1000);
                    }
                    else{
                        setTimeout(() => {
                            ai();
                        }, 1000);
                    }
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
function pawn(i){
    var arr2=[];
    if(arr[i]>0){   
        if(i>47 && arr[i-16]==0 && arr[i-8]==0){
            arr2=[i-8,i-16];
        }
        else if(i>7 && arr[i-8]==0){
            arr2=[i-8];
        }
        else{
            arr2=[];
        }
        if(arr[i-7]<0 && (i+1)%8!=0){
            arr2.push(i-7);
        }
        if(arr[i-9]<0 && i%8!=0){
            arr2.push(i-9);
        }
        return arr2;
    }
    else if(arr[i]<0){
        if(i<16 && arr[i+16]==0 && arr[i+8]==0){
            arr2=[i+8,i+16];
        }
        else if(i<56 && arr[i+8]==0){
            arr2=[i+8];
        }
        else{
            arr2=[];
        }
        if(arr[i+7]>0 && i%8!=0){
            arr2.push(i+7);
        }
        if(arr[i+9]>0 && (i+1)%8!=0){
            arr2.push(i+9);
        }
        return arr2;
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
            if(arr[j-9]>0){
                break;
            }
            else if(arr[j-9]<0){
                arr2.push(j-9);
                break;
            }
            else{
                arr2.push(j-9);
            }
        }
        j=j-9;
    }
    j=i;
    while(j>-1 && (j+1)%8!=0 && j-7>-1){
        if(j>-1 && (j+1)%8!=0){
            if(arr[j-7]>0){
                break;
            }
            else if(arr[j-7]<0){
                arr2.push(j-7);
                break;
            }
            else{
                arr2.push(j-7);
            }
        }
        j=j-7;
    }
    j=i;
    while(j<64 && j%8!=0 && j+7<64){
        if(j<64 && j%8!=0){
            if(arr[j+7]>0){
                break;
            }
            else if(arr[j+7]<0){
                arr2.push(j+7);
                break;
            }
            else{
                arr2.push(j+7);
            }
        }
        j=j+7;
    }
    j=i;
    while(j<64 && (j+1)%8!=0 && j+9<64){
        if(j<64 && (j+1)%8!=0){
            if(arr[j+9]>0){
                break;
            }
            else if(arr[j+9]<0){
                arr2.push(j+9);
                break;
            }
            else{
                arr2.push(j+9);
            }
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
    j=i;
    while(j>-1 && j%8!=0 && j-9>-1){
        if(j>-1 && j%8!=0){
            if(arr[j-9]>0){
                break;
            }
            else if(arr[j-9]<0){
                arr2.push(j-9);
                break;
            }
            else{
                arr2.push(j-9);
            }
        }
        j=j-9;
    }
    j=i;
    while(j>-1 && (j+1)%8!=0 && j-7>-1){
        if(j>-1 && (j+1)%8!=0){
            if(arr[j-7]>0){
                break;
            }
            else if(arr[j-7]<0){
                arr2.push(j-7);
                break;
            }
            else{
                arr2.push(j-7);
            }
        }
        j=j-7;
    }
    j=i;
    while(j<64 && j%8!=0 && j+7<64){
        if(j<64 && j%8!=0){
            if(arr[j+7]>0){
                break;
            }
            else if(arr[j+7]<0){
                arr2.push(j+7);
                break;
            }
            else{
                arr2.push(j+7);
            }
        }
        j=j+7;
    }
    j=i;
    while(j<64 && (j+1)%8!=0 && j+9<64){
        if(j<64 && (j+1)%8!=0){
            if(arr[j+9]>0){
                break;
            }
            else if(arr[j+9]<0){
                arr2.push(j+9);
                break;
            }
            else{
                arr2.push(j+9);
            }
        }
        j=j+9;
    }

    return arr2;
}
function knight(i){
    var arr2=[];
    if(i>15 && i%8!=0 && arr[i-17]<=0){
        arr2.push(i-17);
    }
    if(i>15 && (i+1)%8!=0 && arr[i-15]<=0){
        arr2.push(i-15);
    }
    if(i>7 && (i-1)%8!=0 && i%8!=0 && arr[i-10]<=0){
        arr2.push(i-10);
    }
    if(i<56 && (i-1)%8!=0 && i%8!=0 && arr[i+6]<=0){
        arr2.push(i+6);
    }
    if(i<48 && i%8!=0 && arr[i+15]<=0){
        arr2.push(i+15);
    }
    if(i<48 && (i+1)%8!=0 && arr[i+17]<=0){
        arr2.push(i+17);
    }
    if(i<56 && (i+1)%8!=0 && (i+2)%8!=0 && arr[i+10]<=0){
        arr2.push(i+10);
    }
    if(i>7 && (i+1)%8!=0 && (i+2)%8!=0 && arr[i-6]<=0){
        arr2.push(i-6);
    }
    return arr2;
}
function king(i){
    var arr2=[];
    if(i<56 && arr[i+8]<=0){
        arr2.push(i+8);
    }
    if((i+1)%8!=0 && i<64 && arr[i+1]<=0){
        arr2.push(i+1);
    }
    if((i+1)%8!=0 && i<56 && arr[i+9]<=0){
        arr2.push(i+9);
    }
    if(i%8!=0 && i<56 && arr[i+7]<=0){
        arr2.push(i+7);
    }
    if(i>7 && arr[i-8]<=0){
        arr2.push(i-8);
    }
    if(i%8!=0 && i>0 && arr[i-1]<=0){
        arr2.push(i-1);
    }
    if(i>7 && i%8!=0 && arr[i-9]<=0){
        arr2.push(i-9);
    }
    if((i+1)%8!=0 && i>7 && arr[i-7]<=0){
        arr2.push(i-7);
    }
    return arr2;
}
function mirror_arr(a){
    var t;
    for(t=0;t<64;t++){
        a[t]=-1*a[t];
    }
    return a;
}
function paint_box_wrt_status(i){
    var j;
    for(j=0;j<move.length;j++){
        document.getElementById("box_"+move[j]).style.backgroundColor="cyan";
        if(arr[i]<0 && arr[move[j]]>0){
            document.getElementById("box_"+move[j]).style.backgroundColor="magenta";
        }
        else if(arr[i]>0 && arr[move[j]]<0){
            document.getElementById("box_"+move[j]).style.backgroundColor="magenta";
        }
    }
}
function reset_board_colours(){
    var l;
    for(l=0;l<64;l++){
        document.getElementById("box_"+l).style.backgroundColor="transparent";
    }
}

function ai(){
    var x; var y=[]; var z; var u; var v; var w=[]; var p=1000;
    var t; var tv=0; //total value
    var s; var r; var q; var n;
    for(x=0;x<64;x++){
        select(x);y.push([x,move]);select(x);
    }
    for(x=0;x<64;x++){
        for(z=1;z<y[x].length;z++){
            u=y[x];
            for(v=0;v<u[1].length;v++){
                s=arr[u[1][v]]; r=arr[x]; arr[u[1][v]]=arr[x]; arr[x]=0;
                for(t=0;t<64;t++){
                    tv=tv+arr[t];
                }
                arr[u[1][v]]=s; arr[x]=r;
                w.push([x,u[1][v],tv]);
                tv=0;
            }
        }
    }
    for(x=0;x<w.length;x++){
        if(arr[w[x][0]]<0 && w[x][2]<=p){
                p=w[x][2];
                q=[w[x][0],w[x][1],w[x][2]];
        }
    }
    n=arr[q[1]];
    arr[q[1]]=arr[q[0]]; arr[q[0]]=0;
    populate_board();
    if(n==6){
        setTimeout(() => {
            defeat_message();
        }, 1000);
    }
}
function victory_message(){
    window.alert("Hurray! You win!!");
}
function defeat_message(){
    window.alert("Game Over. Blacks win!!");
}