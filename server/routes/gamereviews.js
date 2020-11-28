const express = require('express');
const Joi = require('joi');
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gamereviewdb'
});

const route = express.Router();

const schema = Joi.object().keys({
    name: Joi.string().trim().max(50).required(),
    release_year: Joi.number().min(1950).max(2020).required(),
    image: Joi.string().uri({
        scheme: [
            /https?/
        ]
    }),
    rating: Joi.number().min(1).max(10).precision(1).required(),
    review: Joi.string().max(512).trim().allow('')
});

route.use(express.json());

route.get('/reviews', (req, res) => {
    pool.query('select * from gamereviews', (err, result) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(result);
    })
});

route.post('/reviews', (req, res) => {
   let { error } = schema.validate(req.body);

   if (error)
       res.status(400).send(error.details[0].message);
   else {
       let query = 'insert into gamereviews (name, release_year, image, rating, review) values (?, ?, ?, ?, ?)';
       let formatted = mysql.format(query, [req.body.name, req.body.release_year, req.body.image, req.body.rating, req.body.review]);

       pool.query(formatted, (err, response) => {
           if (err)
               res.status(500).send(err.sqlMessage);
           else {

               query = 'select * from gamereviews where id=?';
               formatted = mysql.format(query, [response.insertId]);

               pool.query(formatted, (err, rows) => {
                   if (err)
                       res.status(500).send(err.sqlMessage);
                   else
                       res.send(rows[0]);
               });

           }
       });
   }
});

route.get('/reviews/:name', (req, res) => {
    let query = `select * from gamereviews where name like '%${req.params.name}%'`;

    console.log(query);
    pool.query(query, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows);
    });
});

route.get('/review/:id', (req, res) => {
    let query = 'select * from gamereviews where id=?';
    let formatted = mysql.format(query, [req.params.id]);

    pool.query(formatted, (err, rows) => {
       if (err)
           res.status(500).send(err.sqlMessage);
       else
           res.send(rows[0]);
    });
});

route.delete('/review/:id', (req, res) => {
    let query = 'select * from gamereviews where id=?';
    let formatted = mysql.format(query, [req.params.id]);

    pool.query(formatted, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            let poruka = rows[0];
            let query = 'delete from gamereviews where id=?';
            let formatted = mysql.format(query, [req.params.id]);

            pool.query(formatted, (err, rows) => {
                if (err)
                    res.status(500).send(err.sqlMessage);
                else
                    res.send(poruka);
            });
        }
    });
});

route.put('/review/:id', (req, res) => {
    let { error } = schema.validate(req.body);

    if (error)
        res.status(400).send(error.details[0].message);
    else {
        let query = 'update gamereviews set name=?, release_year=?, image=?, rating=?, review=? where id=?';
        let formatted = mysql.format(query, [req.body.name,
                req.body.release_year, req.body.image, req.body.rating, req.body.review,
                req.params.id]);
        pool.query(formatted, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage);
            else {
                query = 'select * from gamereviews where id=?';
                formatted = mysql.format(query, [req.params.id]);

                pool.query(formatted, (err, rows) => {
                    if (err)
                        res.status(500).send(err.sqlMessage);
                    else
                        res.send(rows[0]);
                });
            }
        });
    }
});

module.exports = route;