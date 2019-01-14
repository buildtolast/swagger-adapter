class Data {
    routes: object[];

    constructor(routes: object[]) {
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
    value: object;
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

        var routes : object[]  = new Array(availablePaths.length);
        var routeIdx = 0;
        availablePaths.forEach(e => {
            var key = e.substr(1, e.length).replace('{', '').replace('}', '').split('/').join('.').toLowerCase();
            routes[routeIdx++] = JSON.parse('{"'+key + '":"' + e + '"}');
        });

        return new EndPointSpecification(new Data(routes));
    }

}


