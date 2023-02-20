import { Project } from "aws-sdk/clients/codebuild";
import ProjectService from "../services/Project.service";

class ProjectController {
  // tạo một dự án mới
  async createProject(req, res, next) {
    try {
      let test = await ProjectService.createProject(req);
      res.status(200).json(test);
    } catch (err) {
      next(err);
    }
  }

  // lấy danh sách cắc dự án của tôi
  async getListProject(req, res, next) {
    try {
      let listProject = await ProjectService.getProject(req);
      res.status(200).json(listProject);
    } catch (err) {
      next(err);
    }
  }
}

export default new ProjectController();
