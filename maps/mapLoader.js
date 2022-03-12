const pathToMapFolder = "./maps/"

const map_id_to_path = {
    0: "map1.json",
    1: "map2.json"
}

async function getMapData(map_id) {
    const data = await fetch(pathToMapFolder + map_id_to_path[map_id]);
    const jsonData = await data.json();
    return jsonData;
}

export {getMapData};

