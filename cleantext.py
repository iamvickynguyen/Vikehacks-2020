out = ""
with open('in.txt') as f:
    data = f.read()
    s = data.replace(',', "")
    s = s.split(" ")
    out = "\n".join(s)

file = open('names.txt', 'w')
file.write(out)
file.close()
