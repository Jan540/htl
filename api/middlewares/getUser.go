package middlewares

import (
	"htl/models"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

// TODO: Remove DB from context
type CustomContext struct {
	echo.Context
	User models.User
}

func GetUser() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			token := c.Get("user").(*jwt.Token)
			claims := token.Claims.(jwt.MapClaims)

			id, _ := claims["sub"].(string)

			user := models.User{
				ID: id,
			}

			cc := &CustomContext{c, user}
			return next(cc)
		}
	}
}
