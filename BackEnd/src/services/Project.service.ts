import { Project } from "../models/Project";
import UserService from "./user.service";
import { User } from "../models/User";
class ProjectService {
  async createProject(req) {
    let dataUser = {
      user: req.user.id,
      role: "manage",
    };
    const projectNew = new Project({
      name: req.body.name,
      category: req.body.category,
      permission: req.body.permission,
      describe: req.body.describe,
      owner: req.user.id,
    });
    projectNew.members.push(dataUser);
    projectNew.save();
    let user = await User.findById(req.user.id);
    user.projects.push(projectNew);
    await user.save();
    return projectNew;
  }

  async getProject(req) {
    const user = await User.findById(req.user.id).populate("projects");
    let listProjects = user.projects;
    if (listProjects) {
      return listProjects;
    }
  }

  async getDataProject(req) {
    let idProject = req.params.id;
    let dataProject = await Project.findById(idProject)
      .populate("boards")
      .populate("boards.members");
    if (dataProject) {
      return dataProject;
    }
  }
}

export default new ProjectService();
