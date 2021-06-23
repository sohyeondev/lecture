abc = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
caesar = ["x","y","z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w"]

getPhr = input("문장을 입력하세요 : ")
phr=[]

for i in range(len(getPhr)):
    phr.append(getPhr[i])

for i in range(len(phr)):
    for j in range(len(abc)):
        if phr[i] == abc[j]:
            phr[i] = caesar[j]

print("".join(phr))