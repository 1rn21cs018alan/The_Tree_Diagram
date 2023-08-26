import random
screen=[]
def print_screen(mode=1):
    global screen
    print()
    if(mode==1):
        for i in range(len(screen)):
            a=''
            for j in range(len(screen[i])):
                if(screen[i][j]==1):
                    a+='⬜'
                else:
                    a+='⬛'
            print(a)
    else:
        a=''
        for j in range(len(screen[-2])):
            if(screen[-2][j]==1):
                a+='⬜'
            else:
                a+='⬛'
        print(a)
        a=''
        for j in range(len(screen[-1])):
            if(screen[-1][j]==1):
                a+='⬜'
            else:
                a+='⬛'
        print(a)

    print()

def extract()->list:
    global screen
    branch=[]
    for i in range(len(screen[-1])):
        if(i%2==0):
            branch.append(screen[-1][i])
    return branch


def blit(level):
    # print(level)
    screen.append([0]*(len(level)*2+1))
    screen.append([0]*(len(level)*2+1))
    for i in range(len(level)):
        if(level[i]==1):
            screen[-1][2*i+1]=1
            screen[-2][2*i+1]=1
            # print(2*i+1)


def rand_del(branch_path):
    trigger=10
    for i in range(len(branch_path)):
        if(branch_path[i]==1):
            chance=100*random.random()
            if(chance<trigger):
                branch_path[i]=-1


#to be called after blitting
def rand_branch(branch_path):
    global screen
    trigger=50
    valid=[]
    for i in range(len(branch_path)):
        if(branch_path[i]==-1):
            if(i>0 and branch_path[i-1]==1):#branch to right
                valid.append(i)     
            if (i<len(branch_path)-1 and branch_path[i+1]==1):# branch to left
                valid.append(-i)

    for i in range(len(valid)):
        chance=100*random.random()
        if(chance<trigger):
            # if(i==0 and branch_path[i+1]==1):
            #     branch_path[i]
            # print('flag')
            if(valid[i]>0):#right branch
                screen[-1][2*valid[i]]=1
                screen[-1][2*valid[i]+1]=1
                branch_path[valid[i]]=1
                # print('flag2',)
            elif(branch_path[-valid[i]]!=1):#left branch
                screen[-1][2*(-valid[i])+1]=1
                screen[-1][2*(-valid[i])+2]=1
                branch_path[-valid[i]]=1
                # print('flag3',i)
    

    

def main():
    global screen
    n=int(input("Enter maximum no of branches\n"))
    loopcount=int(input("Enter no of levels\n"))
    # screen.append([0 for j in range(n*2+1)]for i in range(2))
    branch_path=[-1]*n
    branch_path[n//2]=1
    blit(branch_path)
    print_screen()
    for i in range(loopcount):
        rand_del(branch_path)
        blit(branch_path)
        rand_branch(branch_path)
        # print_screen(mode=1)
    print_screen()
main()