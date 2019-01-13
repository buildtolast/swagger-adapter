
export class Route {
    name: String;
    value: String;

    constructor(name: String, value: String) {
        this.name = name;
        this.value = value;
    }
}

class Data {
    routes: Route[];

    constructor(routes: Route[]) {
        this.routes = routes;
    }
}

export class EndPointSpecification {
    data: Data;

    constructor(data: Data) {
        this.data = data;
    }
}

interface Path {
    key: string;
    value: object
}

interface JsonSpec {
    paths: Path[];
}

export class SwaggerAdapter {

    createEndPointSpecification(specPath : string): EndPointSpecification {
        var object : string[] = null;
        var fs = require("fs");
        var fileBuffer : Buffer = fs.readFileSync(specPath);
        var jsonSpec : JsonSpec = JSON.parse(fileBuffer.toString());
        var availablePaths = Object.keys(jsonSpec.paths);

        var routes : Route[]  = new Array(availablePaths.length);
        var routeIdx = 0;
        availablePaths.forEach(e => {
            routes[routeIdx++] = new Route(e.substr(1, e.length).replace('{', '').replace('}', '').split('/').join('.').toLowerCase(),e);
        });

        return new EndPointSpecification(new Data(routes));
    }

}


