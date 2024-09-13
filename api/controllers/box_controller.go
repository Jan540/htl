package controllers

import (
	"htl/docker"
	"htl/middlewares"
	"net/http"

	"github.com/labstack/echo/v4"
)

type BoxController struct{}

type SpawnBoxRequest struct {
	Name string `param:"name"`
}

type SpawnBoxResponse struct {
	Port string `json:"port"`
	Message string `json:"message"`
}

func (BoxController) SpawnBox(c echo.Context) error {
	cc := c.(*middlewares.CustomContext)
	user := cc.User

	req := &SpawnBoxRequest{}

	if err := c.Bind(req); err != nil {
		return c.JSON(http.StatusBadRequest, &SpawnBoxResponse{
			Message: "Bad request",
		})
	}

	allowedImages := []string{"squeel-injection", "command-injection", "deserialization"}

	isAllowed := false
	for _, image := range allowedImages {
		if image == req.Name {
			isAllowed = true
			break
		}
	}

	if !isAllowed {
		return c.JSON(http.StatusBadRequest, &SpawnBoxResponse{
			Message: "The requested image is not allowed",
		})
	}

	containerName := user.ID + "-" + req.Name

	port, err := docker.SpawnContainer(req.Name, containerName)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, &SpawnBoxResponse{
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, &SpawnBoxResponse{
		Port: port,
	})
}

type StopBoxRequest struct {
	Name string `param:"name"`
}

type StopBoxResponse struct {
	Success bool `json:"success"`
}

func (BoxController) StopBox(c echo.Context) error {
	cc := c.(*middlewares.CustomContext)
	user := cc.User

	req := &StopBoxRequest{}

	if err := c.Bind(req); err != nil {
		return c.String(http.StatusBadRequest, "Bad request")
	}

	containerName := user.ID + "-" + req.Name

	success := docker.StopContainer(containerName)

	return c.JSON(http.StatusOK, &StopBoxResponse{
		Success: success,
	})
}
