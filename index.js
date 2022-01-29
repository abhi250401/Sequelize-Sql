const sequelize = require('./database');
const { DataTypes } = require('sequelize');
const Company = require('./models/Company');
const User = require('./models/User');
//model initialization just demos
const Task = sequelize.define('task', { name: DataTypes.STRING }, { timestamps: false });
const List = sequelize.define('list', { name: DataTypes.STRING }, { timestamps: false });
const Taskdata = sequelize.define('taskdata', { name: DataTypes.STRING }, { timestamps: false });
const Listdata = sequelize.define('listdata', { name: DataTypes.STRING }, { timestamps: false });


Company.hasMany(User);
User.belongsTo(Company);
// m:n association between user and list
User.belongsToMany(List, { through: 'user-list' });
List.belongsToMany(User, { through: 'user-list' });
List.hasMany(Task);
Task.hasOne(Taskdata);
Taskdata.belongsTo(Task);
Task.belongsTo(List);


List.hasOne(Listdata);
Listdata.belongsTo(List);

sequelize.sync({ force: true }).then(async (result) => {
    console.log(result)
    //creating company
    const company = await Company.create({ name: "Company1" });
    //creating user
    const user = await User.create({ name: 'abhishek' });
    await company.addUser(user);
    const list = await List.create({ name: 'list1' });
    await user.addList(list);
    //  const task = await Task.create({ name: "task1" })
    const listdetails = await Listdata.create({ name: "list-data1" });
    await listdetails.setList(list);


    const ListTask = await list.createTask({ name: "task1" });
    //adding task data
    const taskdetails = await Taskdata.create({ name: "details of task 1" });
    await taskdetails.setTask(ListTask);
    {/*}
    //await ListTask.createTaskdata(datatask);
    const datalist = await Listdata.create({ name: "dataoflist1" });
    //adding listdata
    await list.setListdata(datalist)
    //await list.createListdata(datalist);
*/}
    const fetchedData = await Company.findAll({

        include: [
            {
                model: User,
                include: [{
                    model: List,
                    include: [{
                        model: Task,
                        include: {
                            model: Taskdata
                        }
                    },
                    {
                        model: Listdata,
                    }],

                }]
            }
        ]
    }
    );
    console.log(JSON.stringify(fetchedData, null, 2));


})
