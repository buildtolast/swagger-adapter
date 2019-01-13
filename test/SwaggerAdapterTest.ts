import 'mocha';
import Stream from "ts-stream";

interface Path {
    key : string;
    value : object
}

interface JsonSpecPath {
    paths : Path[];
}


describe('Swagger Adapter Test Function', () => {

    it('should return a endpoint of paths', () => {
        var fs = require("fs");
        var swagger: string[] = fs.readFile("./test/swagger.json", function (err, data) {
            if (err)
                throw err;
            let jsonSpecPath: JsonSpecPath = JSON.parse(data.toString());
            console.log(" Paths ... ");
            Stream.from(jsonSpecPath.paths).forEach(path => console.log(path.key));
        });

        console.log("[ Paths (debug) __output__ ] " + swagger);
        // expect(paths).to.equal("sads");
    });
});