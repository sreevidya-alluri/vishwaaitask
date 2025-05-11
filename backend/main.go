package main

import (
	"backend/controllers"
	"backend/initializers"
	"backend/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	r := gin.Default()
	godotenv.Load()

	initializers.ConnectDb()
	initializers.DB.AutoMigrate(&models.Task{})
	initializers.DB.AutoMigrate(&models.User{})

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowHeaders: []string{"X-Requested-With", "X-HTTP-Method-Override", "Content-Type", "Authorization", "Accept", "Access-Control-Allow-Credentials", "Access-Control-Allow-Origin"},
		AllowMethods: []string{"GET", "PUT", "POST", "DELETE", "OPTIONS"},
	}))

	r.POST("/tasks", controllers.PostTask)
	r.GET("/tasks", controllers.GetTasks)
	r.PUT("/tasks/:id", controllers.UpdateTask)
	r.DELETE("/tasks/:id", controllers.DeleteTask)
	r.POST("/register", controllers.Register)
	r.POST("/login", controllers.Login)
	r.Run()
}
