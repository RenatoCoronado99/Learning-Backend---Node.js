const BaseService = require("./base.service");
let _ideaRepository = null;
class IdeaService extends BaseService 
{
  constructor({ IdeaRepository }) 
  {
    super(IdeaRepository);
    _ideaRepository = IdeaRepository;
  }

  async getUserIdeas(author) 
  {
    if (!author) 
    {
      const error = new Error();
      error.status = 400;
      error.message = "userId must be sent";
      throw error;
    }
    return await _ideaRepository.getUserIdeas(author);
  }

  async upVoteIdea(ideaId) 
  {
    if (!ideaId) 
    {
      const error = new Error();
      error.status = 400;
      error.message = "idea id must be sent";
      throw error;
    }

    const idea = await _ideaRepository.get(ideaId);
    if (!idea) 
    {
      const error = new Error();
      error.status = 404;
      error.message = "Idea not found!";
      throw error;
    }
    idea.upvotes.push(true);
    return await _ideaRepository.update(ideaId, { upvotes: idea.upvotes });
  }

  async dowVoteIdea(ideaId)
  {
    if(!ideaId)
    {
      const error = new Error();
      error.status = 400;
      error.message = "Idea id must be sent";
      throw error;
    }
    const idea = await _ideaRepository.get(ideaId);
    if(!idea)
    {
      const error = new Error();
      error.status(404);
      error.message = "Idea nor found";
      throw error;
    }
    idea.downvotes.push(true);
    return await _ideaRepository.update(ideaId, {downvotes: idea.downvotes});
  }

}

module.exports = IdeaService;
