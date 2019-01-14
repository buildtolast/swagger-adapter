import 'mocha';
import {expect} from 'chai';
import {SwaggerAdapter, EndPointSpecification} from "../src/common/SwaggerJsonAdapter";

describe('Swagger Adapter Test Function', () => {

    it('Test the Swagger Adapter', () =>{
        var swaggerAdapter = new SwaggerAdapter();
        var endPointSpec : EndPointSpecification = swaggerAdapter.createEndPointSpecification('./swagger/swagger.json');
        expect(endPointSpec.data.routes.length).equal(14);
        var fs = require('fs');
        fs.writeFileSync("./swagger/generated/swagger-spec.json", JSON.stringify(endPointSpec));
    })

});