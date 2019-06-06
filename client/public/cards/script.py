import os

dict = {
    '1': "Spades",
    '2': "Hearts",
    '3': "Clubs",
    '4': "Diamonds"
}

for filename in os.listdir("./"):
    # print(filename)
    if filename.endswith(".png"):
        arr = filename.split('-')
        val = dict[arr[1][0]]
        newName = arr[0] + '-' + val + '.png'
        print(newName)
        os.rename(filename, newName) 
