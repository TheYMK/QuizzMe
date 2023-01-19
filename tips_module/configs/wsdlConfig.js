const generateTips = async (args) => {
  const tips = [
    {
      tip: " l’intensité des tremblements de terre est exprimée sur l'échelle de Richter",
      category: "science",
    },
    {
      tip: "Les bouddhistes sont les disciples du Bouddha. Cet homme était en réalité un riche prince",
      category: "monde",
    },
    {
      tip: "Certains oiseaux, comme le colibri, peuvent voler sur place",
      category: "animaux",
    },
    {
      tip: "Le sport qui consiste à descendre dans les grottes afin de les explorer s’appelle la spéléologie",
      category: "sport",
    },
  ];

  const filteredList = tips.filter((tip) => tip.category === args.category);

  const randomIndex = Math.floor(Math.random() * filteredList.length);
  return filteredList[randomIndex];
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
