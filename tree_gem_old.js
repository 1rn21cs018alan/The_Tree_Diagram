let screen=[]
function print_screen(mode=1){
    if(mode==1){
        let a=''
        for (let i=0;i<(screen).length;i++){
            for (let j=0;j<(screen[i]).length;i++){
                if(screen[i][j]==1)
                    a+='_';                    // a+='⬜'
                else
                    a+='0';                    // a+='⬛'
            }
            a+='\n'
        }
        console.log(a)
    }
    else{
        let a=''
        for (let j=0;j<screen[screen.length-1-2];j++){
            if(screen[screen.length-1-2][j]==1)
                a+='_';                // a+='⬜'
            else
                a+='0';                // a+='⬛'
        }
        console.log(a)
        a=''
        for (let j=0;j<screen[screen.length-1-1];j++){
            if(screen[screen.length-1-2][j]==1)
                a+='_';                // a+='⬜'
            else
                a+='0';                // a+='⬛'
        }
        console.log(a)
    
    }
}


function extract()
{
    let branch=[]
    const n=screen[0].length;
    for (let i=0;i<n;i++)
    {
        if(i%2==0)
        {
            branch.push(screen[screen.length-2][i])
        }
    }
    return branch
}

function blit(level){
    screen.push(Array.from(('0').repeat((level.length)*2+1)));
    screen.push(Array.from(('0').repeat((level.length)*2+1)));
    const n=screen.length
    for (let i=0 ;i<level.length;i++)
    {
        if(level[i]==1){
            screen[n-1-1][2*i+1]=1
            screen[n-1-2][2*i+1]=1
        }
    }
            // print(2*i+1)
}


function rand_del(branch_path){
    const trigger=10;
    for(let i=0;i<(branch_path).length;i++){
        if(branch_path[i]==1){
            let chance=100*Math.random()
            if(chance<trigger)
                branch_path[i]=-1
        }
    }
}

// //to be called after blitting
function rand_branch(branch_path){
    const trigger=50
    const n=screen.length
    let valid=[]
    for (let i=0;i<branch_path.length;i++){
        if(branch_path[i]==-1)
        {
            if(i>0 && branch_path[i-1]==1){//branch to right
                valid.push(i)     
            }
            if (i<branch_path.length -1 && branch_path[i+1]==1){// branch to left
                valid.push(-i)
            }
        }
    }
    for (let i=0;i<(valid).length;i++){
        let chance=100*Math.random()
        if(chance<trigger){
            // if(i==0 and branch_path[i+1]==1):
            //     branch_path[i]
            // print('flag')
            if(valid[i]>0){//right branch
                screen[n-1-1][2*valid[i]]=1
                screen[n-1-1][2*valid[i]+1]=1
                branch_path[valid[i]]=1
                // print('flag2',)
            }
            else if(branch_path[-valid[i]]!=1){ //left branch
                screen[n-1-1][2*(-valid[i])+1]=1
                screen[n-1-1][2*(-valid[i])+2]=1
                branch_path[-valid[i]]=1
                // print('flag3',i)
            }
        }
    }
    
}
    

function main(){
    const n=prompt("Enter maximum no of branches\n")
    const loopcount=prompt("Enter no of levels\n")
    // screen.push([0 for j in range(n*2+1)]for i in range(2))
    let branch_path=Array.from('-1'.repeat(n))
    branch_path[n/2]=1
    blit(branch_path)
    print_screen()
    for (let i=0;i<loopcount;i++){
        rand_del(branch_path)
        blit(branch_path)
        rand_branch(branch_path)
        // print_screen(mode=1)
    }
    print_screen()
}
console.log("started")
main()
console.log("ended")
console.log(screen)