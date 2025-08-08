const { Person } = require('../config/database');

class PersonController {

    getAllPeople = async (req, res) => {
        try {
            const people = await Person.findAll({
                attributes: ['Id', 'FirstName', 'LastName']
            });

            // Converting to camelCase for frontend consistency
            const updatedPersonList = people.map(p => ({
                id: p.Id,
                firstName: p.FirstName,
                lastName: p.LastName
            }));

            res.json(updatedPersonList);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                statusCode: 500,
                message: "Internal server error"
            });
        }
    }

    getPersonById = async (req, res) => {
        try {
            const person = await Person.findByPk(req.params.id, {
                attributes: ['Id', 'FirstName', 'LastName']
            });

            if (!person) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "Person not found"
                });
            }

            const foundPerson = {
                id: person.Id,
                firstName: person.FirstName,
                lastName: person.LastName
            };

            res.json(foundPerson);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                statusCode: 500,
                message: "Internal server error"
            });
        }
    }

    createPerson = async (req, res) => {
        try {
            const newPerson = await Person.create({
                FirstName: req.body.firstName,
                LastName: req.body.lastName
            });

            const createdPerson = {
                id: newPerson.Id,
                firstName: newPerson.FirstName,
                lastName: newPerson.LastName
            };

            res.status(201).json(createdPerson);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                statusCode: 500,
                message: "Internal server error"
            });
        }
    }

    updatePerson = async (req, res) => {
        try {
            const person = await Person.findByPk(req.params.id);

            if (!person) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "Person not found"
                });
            }

            await person.update({
                FirstName: req.body.firstName,
                LastName: req.body.lastName
            });

            res.status(204).send();
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                statusCode: 500,
                message: "Internal server error"
            });
        }
    }

    deletePerson = async (req, res) => {
        try {
            const person = await Person.findByPk(req.params.id);

            if (!person) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "Person not found"
                });
            }

            await person.destroy();

            res.status(204).send();
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                statusCode: 500,
                message: "Internal server error"
            });
        }
    }
}

module.exports = new PersonController();