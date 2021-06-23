def enciphering():
    N, e=input("공개키를 입력하세요(a,b) : ").split(",")
    while True:
        M=int(input("보내려는 메세지({}보다 작은 수)를 입력하세요 : ".format(int(N)-1)))
        if M>=(int(N)-1):
            print("{}보다 작은 수를 입력하세요.".format(int(N)-1))
            continue
        else:
            break
    c=M**int(e)%int(N)
    return c

def deciphering():
    N, d=input("개인키를 입력하세요(a,b) : ").split(",")
    c=int(input("암호화된 메세지를 입력하세요 : "))
    M=c**int(d)%int(N)
    return M

while True:
    a = input("암호화하려면 e, 복호화하려면 d, 종료하려면 x를 입력하세요 : ")
    if a == "e":
        print(enciphering())
    elif a == "d":
        print(deciphering())
    else:
        break