import { Project } from "../models/Project";

class ProjectService {
  async createProject(req) {
    const projectNew = new Project({
      name: req.body.name,
      category: req.body.category,
      permission: req.body.permission,
      boards: [],
      describe: req.body.describe,
      members: [],
      owner: req.user.id,
    });
    projectNew.save();
    return projectNew;
  }

  async getProject(req) {
    let listProjects = await Project.find({
      owner: req.user.id,
    });
    if (listProjects) {
      return listProjects;
    }
  }
}

export default new ProjectService();
