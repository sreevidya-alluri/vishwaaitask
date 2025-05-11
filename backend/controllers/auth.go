package controllers

import (
	"backend/initializers"
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *gin.Context) {
	var body struct {
		Username string
		Password string
	}
	c.Bind(&body)

	hash, _ := bcrypt.GenerateFromPassword([]byte(body.Password), 10)

	user := models.User{Username: body.Username, Password: string(hash)}
	result := initializers.DB.Create(&user)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User creation failed"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "User created"})
}
func Login(c *gin.Context) {

	var body struct {
		Username string
		Password string
	}
	c.Bind(&body)

	var user models.User
	initializers.DB.First(&user, "username = ?", body.Username)

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Logged in", "userId": user.ID})
}
