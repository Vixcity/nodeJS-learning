const getUserList = () => {
    return [
        {
            id: 1,
            name: 'eric',
            city: '北京'
        }, {
            id: 2,
            name: 'Vixcity',
            city: '上海'
        }, {
            id: 3,
            name: 'asd',
            city: "乌鲁木齐"
        }]
}

const addUser = (userObj) => {
    return {
        code: 0,
        msg: '新增成功',
        data: ''
    }
}

const deleteUser = (id) => {
    return 
}

const updateUser = (id,userObj) => {
    console.log(id,userObj)
    return {
        code: 0,
        msg: '更新成功',
        data: ''
    }
}

module.exports = {
    getUserList,
    addUser,
    deleteUser,
    updateUser
}