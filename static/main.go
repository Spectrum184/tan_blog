package main

import (
	"static/routes"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "*",
		AllowCredentials: true,
	}))

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	routes.Setup(app)

	// Custom config
	app.Static("/static", "./public", fiber.Static{
		Compress:      true,
		ByteRange:     true,
		Browse:        true,
		CacheDuration: 10 * time.Second,
		MaxAge:        3600,
	})

	app.Listen(":8000")
}
