const Countries = require('Countries-Api');

exports.getCountries = async (req, res, next) => {
    const {
        params: {
            searchCountry
        }
    } = req;
    try {
      // modif, bdd import tout les pays du monde
      const results = await Countries.findAll().data; 
          
      const filteredCountries = searchCountry !== ":searchCountry" ? results.filter(country => {
        if(country.translations.fra.official.toUpperCase().includes(searchCountry.toUpperCase())){
            return country
        }
      }) : results;

      const countriesFrenchTrad = filteredCountries.map( country => {
          return country["translations"]["fra"]["common"]
      });

      res.status(200).json(countriesFrenchTrad);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};

exports.getCities = async (req, res, next) => {
  const {
      params: {
        country,
        searchCities,
      }
  } = req;
  try {

    // a faire avec import toutes les villes de france en bdd

    res.status(200).json(results);
  }
  catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        error: error.message,
      });
  }
};