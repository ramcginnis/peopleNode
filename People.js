var express = require('express');
var router = express.Router();
var people = [
	{firstName: "Randall", lastName: "McGinnis", dateOfBirth: "12/10/1991", email: "mcginnisra1@yahoo.com", socialSecurityNumber: 555555555}
];

//Routes will go here

router.get('/', function(req, res)
{
	res.json(people);
});

router.get('/:socialSecurityNumber([0-9]{9})', function(req, res)
{
	var currPerson = people.filter(function(person)
	{
		if(person.socialSecurityNumber == req.params.socialSecurityNumber)
		{
        		return true;
      		}
	});
	if(currPerson.length == 1)
	{
		res.json(currPerson[0])
   	}
	else 
	{
      		res.status(404);//Set status to 404 as movie was not found
	      	res.json({message: "Not Found"});
   	}
});

router.post('/', function(req, res)
{
	if(!req.body.socialSecurityNumber.toString().match(/[0-9]{9}/) || 
		!req.body.dateOfBirth.toString().match(/[0-9]{2}-[0-9]{2}-[0-9]{4}/) || 
		!req.body.email.toString().includes("@") ||
		!req.body.firstName.toString().match(/^[a-zA-Z]+$/))
	{
		res.status(400);
		res.json({message: "Bad Request"});
	}
	else
	{
		people.push(
		{
			firstName: req.body.firstName,
			lastName: req.body.lastName, 
			dateOfBirth: req.body.dateOfBirth, 
			email: req.body.email, 
			socialSecurityNumber: parseInt(req.body.socialSecurityNumber)
		});
		res.json({message: "New person added."});
	}
});

router.put('/:socialSecurityNumber', function(req, res)
{
	if(!req.body.socialSecurityNumber.toString().match(/[0-9]{9}/) || 
		!req.body.dateOfBirth.toString().match(/[0-9]{2}-[0-9]{2}-[0-9]{4}/) || 
		!req.body.email.toString().includes("@") ||
		!req.body.firstName.toString().match(/^[a-zA-Z]+$/))
	{
		res.status(400);
		res.json({message: "Bad Request"});
	}
	else
	{
		var updateIndex = people.map(function(person)
		{
			return person.socialSecurityNumber;
		}).indexOf(parseInt(req.params.socialSecurityNumber));
		
		
		
		if(updateIndex === -1)
		{
			people.push(
			{
				firstName: req.body.firstName,
				lastName: req.body.lastName, 
				dateOfBirth: req.body.dateOfBirth, 
				email: req.body.email, 
				socialSecurityNumber: parseInt(req.body.socialSecurityNumber)
			});
			res.json({message: "New person added."});
		}
		else
		{
			if(people[updateIndex].socialSecurityNumber != parseInt(req.body.socialSecurityNumber))
			{
				res.status(400);
				res.json({message: "Bad Request"});
			}
			else
			{
				people[updateIndex] =
				{
					firstName: req.body.firstName,
					lastName: req.body.lastName, 
					dateOfBirth: req.body.dateOfBirth, 
					email: req.body.email, 
					socialSecurityNumber: parseInt(req.body.socialSecurityNumber)
				};
				res.json({message: req.body.firstName + " updated "});
			}
		}
	}
});

router.delete('/:socialSecurityNumber', function(req, res)
{
	var deleteIndex = people.map(function(person)
	{
		return person.socialSecurityNumber;
	}).indexOf(parseInt(req.params.socialSecurityNumber));
		
	if(deleteIndex === -1)
	{
		res.json({message: "Not found"});
	}
	else
	{
		var tempName = people[deleteIndex].firstName;
		people.splice(deleteIndex, 1);
		res.send({message: tempName + " removed."});
	}
});
module.exports = router;