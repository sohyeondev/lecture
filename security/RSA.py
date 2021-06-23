import random

def getPN():
    num=random.randrange(1, 101)
    for i in range(2, num):
        if num%i == 0:
            return getPN()
    return num

p = getPN()
q = getPN()

N=p*q
P=(p-1)*(q-1)

print("p: {}, q: {}, N: {}, P: {}".format(p,q,N,P))

def GCD(a, b):
    tmp = 0
    tmp2 = 0
    while True:
        if (a < b):
            tmp2 = b
            b = a
            a = tmp2
        if (a%b == 0):
            return b
        else:
            tmp = a%b
            a = b
            b = tmp

def getKey():
    a=2
    b=2
    while True:
        if a<P and GCD(P, a) != 1:
            a += 1
        else:
            break
    while True:
        if b*a%P != 1:
            b += 1
        else:
            break
    return a, b

e, d = getKey()

print("공개키 : {}, {}".format(N, e))
print("개인키 : {}, {}".format(N, d))

while True:
    M=int(input("보내려는 메세지({}보다 작은 수)를 입력하세요 : ".format(N-1)))
    if M>=(N-1):
        print("{}보다 작은 수를 입력하세요.".format(N-1))
        continue
    else:
        break

c=M**e%N

print("암호화된 메세지 : {}".format(c))

m=c**d%N

print("복호화된 메세지 : {}".format(m))