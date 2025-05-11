package initializers

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDb() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Failed to load .env")
	}

	Mysql_Username := os.Getenv("MYSQL_USERNAME")
	Mysql_Password := os.Getenv("MYSQL_PASSWORD")
	Mysql_Port := os.Getenv("MYSQL_PORT")
	Mysql_Databasename := os.Getenv("DATABASE_NAME")

	fmt.Println("Starting database initialization")
	dsn := fmt.Sprintf("%s:%s@tcp(127.0.0.1:%s)/%s?parseTime=true",
		Mysql_Username, Mysql_Password, Mysql_Port, Mysql_Databasename)

	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	fmt.Printf("Database connection successful")
}
