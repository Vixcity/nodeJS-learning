const query = require("../db/conn");

const getUserList = () => {
  return [
    {
      id: 1,
      name: "eric",
      city: "北京",
    },
    {
      id: 2,
      name: "Vixcity",
      city: "上海",
    },
    {
      id: 3,
      name: "asd",
      city: "乌鲁木齐",
    },
  ];
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

const deleteUser = (id) => {
  return;
};

const updateUser = (id, userObj) => {
  console.log(id, userObj);
  return {
    code: 0,
    msg: "更新成功",
    data: "",
  };
};

module.exports = {
  getUserList,
  addUser,
  deleteUser,
  updateUser,
};
