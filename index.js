"use strict"

const express = require("express")
const app = express()
const mysql = require("mysql")
const port = 3000

// ? CREATE CONNECTION
const DB = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Shubham@4114",
	database: "nodemysql",
})

// ! CONNECT

DB.connect((err) => {
	if (err) {
		console.log("Mysql Connected..")
	}
})

app.get("/createdb", (req, res) => {
	let sql = "CREATE DATABASE nodemysql"
	DB.query(sql, (err, result) => {
		if (err) {
			console.log(err)
		}
		console.log(result)
		res.send("Database Created...")
	})
})

app.get("/createTable", (req, res) => {
	let sql = "CREATE TABLE Posts(id int Auto_increment primary key,title varchar(255), body varchar(255))"
	DB.query(sql, (err, result) => {
		if (err) throw err
		console.log(err)
		console.log(result)
		res.send("Table Created Successfully...")
	})
})

app.get("/addPost1", (req, res) => {
	let Post = { title: "Post One", body: "This is Post Number One." }
	let sql = "INSERT INTO Posts set ?"
	let query = DB.query(sql, Post, (err, result) => {
		if (err) throw err
		console.log(err)
		console.log(result)
		res.send("Post 1 Added...")
	})
})

// SELECT POST
app.get("/getPost", (req, res) => {
	let sql = "select * from Posts"
	let query = DB.query(sql, (err, result) => {
		if (err) throw err
		console.log(err)
		console.log(result)
		res.send(result)
		res.send("Get Posts")
	})
})

// SELECT SINGLE POST
app.get("/getPost/:id", (req, res) => {
	let sql = `select * from Posts where id = ${req.params.id}`
	let query = DB.query(sql, (err, result) => {
		if (err) throw err
		console.log(err)
		console.log(result)
		res.send("Get Post Using Id.")
	})
})

// UPDATE POST
app.get("/updatepost/:id", (req, res) => {
	let newTitle = "Updated Title"
	let sql = `update Posts set title = ${newTitle} where id ${req.params.id}`
	let query = DB.query(sql, (err, result) => {
		if (err) throw err
		console.log(err)
		console.log(result)
		res.send("Updated Title.")
	})
})

// app.get("/createdb", (req, res) => {
// 	'SELECT "foo" AS first_field, "bar" AS second_field',
// 		function (err, results, fields) {
// 			console.log(err)
// 			console.log(results)
// 			connection.end()
// 		}
// })

app.get("/", (req, res) => res.send("Home"))
app.listen(port, () => console.log(`Server Started local:host// ${port}!`))







