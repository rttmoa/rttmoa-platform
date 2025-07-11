import Router = require("@koa/router");
const router = new Router();
const user:any = {
  getUsers() {},
  createUser() {},
  updateUser() {},
  deleteUser() {},
  delMoreUsers() {}
}
 
router.get("/users", user.getUsers); // GET /users 
router.get("/users/:id", user.getUsers); // GET /users/:id

router.post("/users", user.createUser); // POST /users
router.put("/users/:id", user.updateUser); // PUT /users/:id
router.delete("/users/:id", user.deleteUser); // DELETE /users/:id
router.post("/delMoreUsers", user.delMoreUsers); // POST /delMoreUsers

export default router; 
