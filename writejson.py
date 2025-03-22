import json
import urllib.request
output = open("data2.json","a")
omdbKEY = "ce74ad75"

finalResult = {}
try:
    while True:
        name = input("Enter the name of the Movie or (q)uit:")
        if name == "q":
            break
        youtubeURL = input("Enter the youtube URL: ")
        url = "http://www.omdbapi.com/?t="+"+".join(name.split())+"&apikey="+omdbKEY
        print(url)
        response = urllib.request.urlopen(url)
        result = json.loads(response.read().decode('utf-8'))
        if result.get("Response") == "False":
            continue
        finalResult[result["imdbID"]] = {}
        finalResult[result["imdbID"]]["name"] = result["Title"]
        finalResult[result["imdbID"]]["type"] = "movie"
        finalResult[result["imdbID"]]["ytId"] = youtubeURL.split("=")[-1]
        print(f"Written {result['Title']} to the file")
finally:
    output.write(json.dumps(finalResult))
    output.close()
