const query = require("../db/conn");

const getUserList = async (urlParams) => {
  let { name, city, sex } = urlParams
  // 1=1 是为了在没有条件的时候进行查询全部使用
  let sql = 'select * from user where 1=1 '
  if (name) {
    sql += 'and name = ? '
  }

  if (city) {
    sql += 'and city = ? '
  }

  if (sex) {
    sql += 'and sex = ? '
  }

  let resultData = await query(sql, [name, city, sex])
  return resultData;
};

const addUser = async (userObj) => {
  let { name, city, sex } = userObj;
  let sql = "insert into user (name,city,sex) value (?,?,?)";
  // 数据库层面操作
  let resultData = await query(sql, [name, city, sex])
  if (resultData) {
    return {
      msg: "新增成功",
    };
  } else {
    return {
      msg: "新增失败",
    };
  }
};

const deleteUser = async (id) => {
  let sql = 'delete from user where id = ?'
  // 数据库层面操作
  let resultData = await query(sql, [id])
  if (resultData.affectedRows > 0) {
    return {
      msg: "删除成功",
    }
  } else {
    return {
      msg: "删除失败",
    }
  }
  return;
};

const updateUser = async (id, userObj) => {
  let { name, city, sex } = userObj
  let sql = 'update user set name = ?,city = ?,sex = ? where id = ?'
  // 数据库层面操作
  let resultData = await query(sql, [name, city, sex, id])
  if (resultData.affectedRows > 0) {
    return {
      msg: "更新成功",
    }
  } else {
    return {
      msg: "更新失败",
    }
  }
};

module.exports = {
  getUserList,
  addUser,
  deleteUser,
  updateUser,
};
