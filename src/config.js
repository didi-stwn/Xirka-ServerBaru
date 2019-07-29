const url = "http://192.168.2.7:8020"
const get ={
    //gettoken
    login: url+"/api-token-auth/",
    refreshtoken: url+"/api-token-refresh/",

    //user
    listuser: url+"/doorlog/allusers/",
    adduser: url+"/doorlog/registerUser/",
    edituser: url+"/doorlog/editUser/",
    deleteuser: url+"/doorlog/deleteUser/",

    //room
    listroom: url+"/doorlog/rooms/",
    addroom: url+"/doorlog/registerRoom/",
    editroom: url+"/doorlog/editRoom/",
    deleteroom: url+"/doorlog/deleteRoom/",

    //user in room
    listuserroom: url+"/doorlog/users/",
    adduserroom: url+"/doorlog/createPermission/",
    deleteuserroom: url+"/doorlog/deletePermission/",

    //log
    listlog: url+"/doorlog/getlogapi/",
    addlog: url+"/doorlog/addlog/",
    editlog: url+"/doorlog/editlog/",

    //device
    listdevice: url+"/doorlog/listdevais/",
    adddevice: url+"/doorlog/regdevais/",
    editdevice: url+"/doorlog/editdevais/",
    deletedevice: url+"/doorlog/deldevais/",
    startdevice: url+"/doorlog/startdevais/",
    stopdevice: url+"/doorlog/stopdevais/",
}

module.exports=get