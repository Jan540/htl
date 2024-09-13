package main

import (
	"htl/auth"
	"htl/controllers"
	"htl/docker"
	"htl/middlewares"
	"net/http"

	"github.com/joho/godotenv"
	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	godotenv.Load()

	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(echojwt.WithConfig(echojwt.Config{
		KeyFunc: auth.GetKey,
	}))
	e.Use(middlewares.GetUser())

	e.GET("/", func(c echo.Context) error {
		return c.JSON(http.StatusOK, docker.ListContainer())
	})

	boxController := controllers.BoxController{}
	e.POST("/spawn/:name", boxController.SpawnBox)
	e.POST("/stop/:name", boxController.StopBox)

	e.Logger.Fatal(e.Start(":6970"))
}
