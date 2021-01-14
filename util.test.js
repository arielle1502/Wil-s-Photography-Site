const ViewworkService = require('./server/services/ViewworkService');
const configs = require('./server/config');
const config = configs['development'];

const viewworkService = new ViewworkService(config.data.viewwork);

// This will test the getAlltypes function from ViewworkServices 
test('GetAlltypes should return an array of three different photography types', async () => {
  const types = await viewworkService.getAlltypes();
  expect(types).toStrictEqual(
    [{
        "type" : "Landscapes",
    },{
        "type" : "Street",
    },{
        "type" : "Flora & Fauna"
    }]);
})

// This will test the getOnetype function from ViewworkServices 
test('Return name and summary of one type', async () => {
  const oneType = await viewworkService.getOnetype("Landscapes");
  expect(oneType).toStrictEqual(
    {
        "type" : "Landscapes",
        "summary" : "these are photos of landscapes"
    }
  )
});