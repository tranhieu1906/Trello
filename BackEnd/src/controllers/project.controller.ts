import { Project } from "aws-sdk/clients/codebuild";
import ProjectService from "../services/Project.service";

class ProjectController {
  // tạo một dự án mới
  async createProject(req, res, next) {
    try {
      let newProject = await ProjectService.createProject(req);
      res.status(200).json(newProject);
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

  async getDataProject(req, res, next) {
    let dataProject = await ProjectService.getDataProject(req);
    let boards = [];
    dataProject.boards.map((board) => {
      if (
        board.members.some((member) => member.user.toString() === req.user.id)
      ) {
        boards.push(board);
      }
    });
    res.status(200).json({
      project: dataProject,
      boards: boards,
    });
  }
}

export default new ProjectController();
