import {
  listProjects,
  searchProjects,
  getProject,
  deleteProjects,
  createProject,
  updateProject,
} from "./projects";
import {
  listWorkbooks,
  searchWorkbooks,
  getWorkbook,
  deleteWorkbook,
  publishWorkbook,
  updateWorkbook,
} from "./workbooks";
import {
  listUsers,
  searchUsers,
  getUser,
  deleteUser,
  createUser,
  updateUser,
} from "./users";
import {
  listConnections,
  searchConnections,
  updateConnection,
} from "./connections";
import { rawRequest } from "./misc";
import webhooks from "./webhooks";
export default {
  searchConnections,
  searchWorkbooks,
  searchUsers,
  searchProjects,
  listProjects,
  createProject,
  updateProject,
  deleteProjects,
  getProject,
  listWorkbooks,
  publishWorkbook,
  updateWorkbook,
  deleteWorkbook,
  getWorkbook,
  createUser,
  deleteUser,
  getUser,
  listUsers,
  updateUser,
  listConnections,
  updateConnection,
  rawRequest,
  ...webhooks,
};
