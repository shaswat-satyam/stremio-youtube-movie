import json
import urllib.request
output = open("series2.json","a")
omdbKEY = "ce74ad75"

finalResult = {}
try:
    while True:
        name = input("Enter the name of the Series or (q)uit:")
        if name == "q":
            break
        seasonCount = int(input("Enter the number of seasons: "))
        episodeCount = int(input("Enter the number of episodes: "))
        url = "http://www.omdbapi.com/?t="+"+".join(name.split())+"&apikey="+omdbKEY
        print(url)
        response = urllib.request.urlopen(url)
        result = json.loads(response.read().decode('utf-8'))
        if result.get("Response") == "False":
            continue
        youtubeURLs = input("Enter the youtube URLs: ")
        urls = youtubeURLs.split("\n")

        for i in range(seasonCount):
            for j in range(episodeCount):
                youtubeURL = urls[i*episodeCount+j]
                key = f"{result["imdbID"]}:{i+1}:{j+1}"
                finalResult[key] = {}
                finalResult[key]["name"] = result["Title"]
                finalResult[key]["type"] = "series"
                finalResult[key]["ytId"] = youtubeURL.split("=")[-1]
        print(f"Written {result['Title']} to the file")
finally:
    output.write(json.dumps(finalResult))
    output.close()
