package controllers

import (
	"backend/initializers"
	"backend/models"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
)

func PostTask(c *gin.Context) {
	var body struct {
		Title       string  `json:"title"`
		Description string  `json:"description"`
		Status      string  `json:"status"`
		DueDate     *string `json:"due_date"`
	}

	if err := c.BindJSON(&body); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request"})
		return
	}

	task := models.Task{Title: body.Title, Description: body.Description, Status: body.Status, DueDate: body.DueDate}

	result := initializers.DB.Create(&task)

	if result.Error != nil {
		log.Fatal("Could not be created")
	}

	c.JSON(200, gin.H{
		"task": task,
	})

}

func GetTasks(c *gin.Context) {
	var task []models.Task

	initializers.DB.Find(&task)

	c.JSON(200, gin.H{
		"task": task,
	})
}

func UpdateTask(c *gin.Context) {
	var task models.Task

	var body struct {
		Title       string  `json:"title"`
		Description string  `json:"description"`
		Status      string  `json:"status"`
		DueDate     *string `json:"due_date"`
	}

	c.Bind(&body)
	id := c.Param("id")
	initializers.DB.First(&task, id)
	initializers.DB.Model(&task).Updates(models.Task{Title: body.Title, Description: body.Description, Status: body.Status, DueDate: body.DueDate})

	c.JSON(200, gin.H{
		"task": task,
	})

}

func DeleteTask(c *gin.Context) {
	id := c.Param("id")

	var task models.Task

	initializers.DB.Delete(&task, id)
	c.JSON(200, gin.H{
		"message": fmt.Sprintf("The task with ID %s has been deleted", id),
	})

}
