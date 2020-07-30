const { Technology } = require("../models");

class TechnologiesController 
{
  async technologies(req, res, next) {
    let technologies = await Technology.find();
    technologies = technologies.map((technology) => 
    {
      technology.logo = `${req.protocol}://${req.headers.host}/img/${technology.logo}`;
      return technology;
    });
    return res.send({ error: false, data: technologies });
  }
  async technologyById(req, res, next) 
  {
    const { id } = req.params;
    let tech = await Technology.findById(id);
    tech.logo = `${req.protocol}://${req.headers.host}/img/${tech.logo}`;
    return res.send({ error: false, data: tech });
  }
  async searchTechnologies(req, res, next) 
  {
    const { name } = req.params;
    let technologies = await Technology.find(
        {
      name: { $regex: new RegExp(name, "i") },
    });
    technologies = technologies.map((technology) => 
    {
      technology.logo = `${req.protocol}://${req.headers.host}/img/${technology.logo}`;
      return technology;
    });
    return res.send({ error: false, data: technologies });
  }
}

module.exports = new TechnologiesController();
