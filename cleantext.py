out = ""
with open('verbs.txt') as f:
    data = f.read()
    st = data.split('\n')
    s = []
    for i in st:
        i = i.lower()
        s.append(i)
    # s = []
    # for i in st:
    #     i = i.split(':')
    #     s.append(i[0])

    out = "\n".join(s)

file = open('v.txt', 'w')
file.write(out)
file.close()
