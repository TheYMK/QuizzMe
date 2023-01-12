var soap = require("soap");
var url = "http://localhost:8086/wsdl?wsdl";

exports.getDailyTips = async (maxTips) => {
  let tips = [];
  return soap.createClient(url, function (err, client) {
    if (err) {
      throw err;
    }

    var args = {
      length: maxTips,
    };
    // call the service
    client.TipsGenerator(args, function (err, res) {
      if (err) throw err;

      tips = res;
      console.log("[tips]: ", tips);
      return JSON.stringify(tips);
    });
  });
};
