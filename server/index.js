const express = require('express');
var cors = require('cors')
const app = express();
app.use(cors())
const PORT = 3030;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const crypto = require('crypto');


const faceCarsData = [
    {
        id: 1,
        brandName: 'bmw',
        modelName: 'x-6',
        year: 2019,
        color: "black",
        isNew: "aaa"
    },
    {
        id: 2,
        brandName: 'hundai',
        modelName: 'i-30',
        year: 2009,
        color: "white",
        isNew: "bbb"
    }
]

app.get('/api', (req, res) => {
    res.send('Hello World!')
})

////Get Cars
app.get('/api/cars', (req, res) => {
    const { brandName, modelName } = req.query;
    if (!brandName && !modelName) {
        res.send({
            data: faceCarsData,
            message: 'carsData succes!!'
        })
    }
    else  {
        if(brandName){
            const filteredData = faceCarsData.filter((x) =>
            x.brandName.toLowerCase().trim().includes(brandName.toLowerCase().trim()));
        res.status(200).send(filteredData);
        }
      else{
        const filtered = faceCarsData.filter((x) => x.modelName.toLowerCase().trim().includes(modelName.toLowerCase().trim()));
        res.status(200).send(filtered);
      }
    }
})

//Get Cars By ID
app.get('/api/cars/:id', (req, res) => {
    const id = req.params.id;
    const cars = faceCarsData.find(m => m.id == id);
    if (cars == undefined) {
        res.status(204).send('Cars modeli yoxdur!!')
    } else {
        res.status(200).send(cars)
    }
})

//Post cars
app.post('/api/cars', (req, res) => {
    const { brandName, modelName, year, color, isNew } = req.body
    const newObjectCar = {
        id: crypto.randomUUID(),
        brandName: brandName,
        modelName: modelName,
        year: year,
        isNew: isNew
    }
    faceCarsData.push(newObjectCar);
    res.send({
        message: 'ObjectCar gonderildi!!'
    })

})

//Delete
app.delete('/api/cars/:id', (req, res) => {
    const id = req.params.id;
    const deletCars = faceCarsData.find(m => m.id == id);
    const ind = faceCarsData.indexOf(deletCars);
    if (deletCars == undefined) {
        res.send({
            message: "Object Yoxdu!!"
        })
    } else {
        faceCarsData.splice(ind, 1);
        res.status(203).send({
            message: "Object Car silindi!!"
        })
    }
})

//Putt
app.put('/api/cars/:id', (req, res) => {
    const id = req.params.id;
    const { brandName, modelName, year, color, isNew } = req.body
    const putCars = faceCarsData.find(m => m.id == id);
    if (brandName) {
        putCars.brandName = brandName
    }
    if (modelName) {
        putCars.modelName = modelName
    }
    if (year) {
        putCars.year = year
    }
    if (color) {
        putCars.color = color
    }
    if (isNew) {
        putCars.isNew = isNew
    }
    res.status(200).send({
        message: "Object Car edit olundu"
    })
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})