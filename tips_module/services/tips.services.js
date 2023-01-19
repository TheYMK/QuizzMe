const soap = require("soap");
const url = "http://localhost:8086/wsdl?wsdl";

exports.getDailyTips = async (category) => {
  const args = {
    category,
  };
  const client = await soap.createClientAsync(url);
  const result = await client.TipsGeneratorAsync(args);
  return JSON.stringify(result[0]);
};
