abc = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

getPhr = input("문장을 입력하세요 : ")

phr=[]

for i in range(len(getPhr)):
    phr.append(getPhr[i])

for i in range(len(phr)):
    for j in range(len(abc)):
        k=j+3
        if phr[i] == abc[j]:
            if k >= len(abc):
                k -= len(abc)
            phr[i] = abc[k]
            break

print("".join(phr))