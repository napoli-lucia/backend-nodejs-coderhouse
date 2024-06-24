export default class UserRepositoryDao {
  constructor(dao) {
    this.dao = dao;
  }

  getUser = async (email, password) => {
    return this.dao.getUser(email, password);
  }

  addUser = async (first_name, last_name, email, age, password) => {
    return this.dao.addUser(first_name, last_name, email, age, password);
  }

  changePassword = async (email, new_password) => {
    return this.dao.changePassword(email, new_password);
  }
}