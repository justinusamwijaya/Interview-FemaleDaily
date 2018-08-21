const router = require("express").Router();
const Data = require("../models").Data

router.get('/',(req,res)=>{
    Data.findAll()
    .then(data => {
        // console.log(data)
        res.render('showData',{allData: data})
    })
})
router.get('/pivotedTable',(req,res)=>{
    Data.findAll()
    .then(data => {
        let columns = []
        let filteredData = []
        let newData = {}
        for(let i = 0; i < data.length; i++){
            if(!columns.includes(data[i].Item)) {
                columns.push(data[i].Item)
                newData[data[i].Item] = 0
            }
        }
        for(let j = 0; j < data.length; j++){
            let searchName = filteredData.findIndex(value=>{
                return value.FullName === data[j].FirstName + " " + data[j].LastName
            })
            if( searchName > -1) {
                filteredData[searchName][data[j].Item] = data[j].Quantity
            } else {
                let dataToBeAdded = {...newData}
                dataToBeAdded.FullName = data[j].FirstName + " " + data[j].LastName
                dataToBeAdded.Email = data[j].Email
                dataToBeAdded[data[j].Item] = data[j].Quantity
                filteredData.push(dataToBeAdded)
            }
        }
        res.render('pivotedData',{allData: filteredData, columns})
    })
})

module.exports = router