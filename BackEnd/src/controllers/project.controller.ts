import ProjectService from "../services/Project.service";
import BoardService from "../services/board.service";
import { User } from "../models/User";
import { Project } from "../models/Project";
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
    try {
      let dataProject = await ProjectService.getDataProject(req);
      let boards = [];
      dataProject.boards.map((board) => {
        if (
          board.members.some((member) => member.user.toString() === req.user.id)
        ) {
          boards.push(board);
        } else if (board.classify === "public") {
          boards.push(board);
        }
      });
      res.status(200).json({
        project: dataProject,
        boards: boards,
      });
    } catch (err) {
      next(err);
    }
  }

  async userJoinProject(req, res, next) {
    try {
      const project = await Project.findById(req.body.projectId);
      if (!project) return res.status(404).json("Không tồn tại nhóm");
      const users = await User.find({ _id: { $in: req.body.userIds } });
      if (!users) return res.status(404).json("Không tìm thấy người dùng");
      users.map((user) => {
        user.projects.unshift(project._id);
        user.save();
        project.members.push({ user: user, role: "edit" });
      });
      await project.save();
      res.status(200).json(project);
    } catch (err) {
      next(err);
    }
  }

  async getMembers(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
}

export default new ProjectController();
