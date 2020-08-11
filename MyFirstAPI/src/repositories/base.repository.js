//Plantilla de CRUD que será heredada por todos los repositorios(Manager)
class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async get(id) 
  {
    return await this.model.findById(id);
  }
  //pageSize: nos limita la cantidad de recursos(elementos de una colección)
  //pageNum: la página que queremos saber
  async getAll(pageSize = 5, pageNum = 1) 
  {
    //skip - limit
    //skip: le dic a mongoose cuántos elementos debe saltar
    //limit: limita la cantidad de elementos que debe retornar
    const skips = pageSize*(pageNum-1);
    return await this.model.find()/*.skip(skips).limit(pageSize)*/;
  }

  async create(entity) 
  {
    return await this.model.create(entity);
  }

  async update(id, entity) 
  {
    return await this.model.findByIdAndUpdate(id, entity, { new: true });
  }

  async delete(id) 
  {
    await this.model.findByIdAndDelete(id);
    return true;
  }
}

module.exports = BaseRepository;
