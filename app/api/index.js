const landing = require("./landing");
const auth = require("./auth");
const dashboard = require("./dashboard");
const users = require("./users");
const middleware = require("./middleware");
const department = require("./department");
const employee = require("./employee");
const master = require("./master");
const sales = require("./sales");
// const keycloak=require('keycloak-connect')

module.exports = (app, keycloak) => {
  // app.get("/", landing);
  // app.get("/signup", auth.signupUI);
  // app.get('/login', keycloak.protect('realm:offline_access'), auth.loginUI);
  // app.post("/signup", auth.signup);
  // app.post("/login", auth.login);

  // app.use(middleware.validAuthChecker);

  app.get("/logout", auth.logout);
  app.get("/dashboard", dashboard.dashboard);
  app.get("/users", users.getUsers);
  app.delete("/user", users.deleteUser);
  app.post("/edit-user", users.editUser);

  // app.get('/create-department',department.)

  app.get("/create-department", department.createDepartmentUI);
  app.post("/create-department", department.createDepartment);
  // app.get('/department', keycloak.protect('realm÷:employee'), department.departmentUI);
  app.get("/departments", department.getDepartments);
  app.delete("/department", department.deleteDepartment);

  app.post("/edit-department", department.editDepartment);

  app.get("/create-employee", employee.createEmployeeUI);
  // app.post("/create-employee", employee.createEmployee);

  app.get("/", employee.EmployeeUI);

  app.get("/employee/:_id", employee.getEmployee);

  app.get("/employee-details", employee.getEmployeeDetails);
  // app.delete("/employee", employee.deleteEmployee);

  // app.post("/edit-employee", employee.editEmployee);
  app.post("/search-employee", employee.searchEmployee);

  app.get("/create-master", master.createMasterUI);
  app.get("/masterlist", master.MasterUI);
  app.post("/create-master", master.createItem);
  app.get("/masters", master.getItem);
  app.delete("/master", master.deleteItem);
  app.post("/edit-item", master.editItem);

  app.get("/sales", sales.salesUI);
  app.post("/sales-invoice", sales.createSales);
  app.get("/salesItem", sales.salesItemUI);
  app.get("/salesViews", sales.salesItem);
  app.delete("/sales", sales.deleteSales);
  app.post("/sales", sales.editSales);
};
