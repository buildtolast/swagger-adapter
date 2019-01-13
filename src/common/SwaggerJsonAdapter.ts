
class Route {
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

class EndPointSpecification {
    data: Data;

    constructor(data: Data) {
        this.data = data;
    }
}

export class SwaggerAdapter {

    createEndPointSpecification(): EndPointSpecification {
        var object : string[] = null;
        var fs = require("fs");
        var swagger = fs.readFile("./swagger.json", function (err, data) {
            if(err)
                throw err;

            object = JSON.parse(data).paths;
        });

        if(object == null)
            throw Error("Swagger json specificaton not valid");

        var routes  = new Route[object.length];
        var routeIdx = 0;
        object.forEach(e => {
            routes[routeIdx++] = new Route(e,e);
        });

        return new EndPointSpecification(new Data(routes));
    }

}


