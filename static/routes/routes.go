package routes

import (
	"static/controllers"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	app.Post("/api/upload-post-image", controllers.UploadPostFile)
	app.Post("/api/upload-category-image/:fileName", controllers.UploadPostFile)
}
