const generateTips = (args) => {
  const tips = ["tip1", "tip2", "tip3", "tip4", "tip5", "tip6"];
  const shuffled = tips.sort(() => 0.5 - Math.random());

  let selected = shuffled.slice(0, parseInt(args.length));

  return selected;
};

exports.serviceObject = {
  TipsGeneratorService: {
    TipsGeneratorServiceSoapPort: {
      TipsGenerator: generateTips,
    },
    TipsGeneratorServiceSoap12Port: {
      TipsGenerator: generateTips,
    },
  },
};
