package models

import (
	"time"

	"gorm.io/gorm"
)

type Task struct {
	gorm.Model
	Title       string `gorm:"size:255;not null"`
	Description string `gorm:"type:text"`
	Status      string `gorm:"type:enum('Pending','In-Progress','Completed');default:'Pending'"`
	DueDate     *string
}

type User struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`

	Username string `gorm:"type:varchar(100);unique;not null" json:"username"`
	Password string `gorm:"type:text;not null" json:"-"`
}
