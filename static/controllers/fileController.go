package controllers

import (
	"fmt"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func UploadPostFile(c *fiber.Ctx) error {
	file, err := c.FormFile("image")

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "File not found!",
		})
	}

	uniqueId := uuid.New()

	fileName := strings.Replace(uniqueId.String(), "-", "", -1)
	fileExt := strings.Split(file.Filename, ".")[1]

	image := fmt.Sprintf("%s.%s", fileName, fileExt)

	err = c.SaveFile(file, fmt.Sprintf("./public/images/posts/%s", image))

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "Can't not save file!",
		})
	}

	imageUrl := fmt.Sprintf("http://localhost:8000/static/images/posts/%s", image)

	data := map[string]interface{}{
		"imageName": image,
		"imageUrl":  imageUrl,
		"size":      file.Size,
	}

	return c.JSON(fiber.Map{"status": 200, "message": "Image uploaded successfully", "data": data})

}

func UploadCategoryFile(c *fiber.Ctx) error {
	file, err := c.FormFile("image")

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "File not found!",
		})
	}

	fileName := c.Params("fileName")

	newFileName := strings.Replace(fileName, "-", "", -1)
	fileExt := strings.Split(file.Filename, ".")[1]

	image := fmt.Sprintf("%s.%s", newFileName, fileExt)

	err = c.SaveFile(file, fmt.Sprintf("./public/images/category/%s", image))

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "Can't not save file!",
		})
	}

	imageUrl := fmt.Sprintf("http://localhost:8000/static/images/category/%s", image)

	data := map[string]interface{}{
		"imageName": image,
		"imageUrl":  imageUrl,
		"size":      file.Size,
	}

	return c.JSON(fiber.Map{"status": 200, "message": "Image uploaded successfully", "data": data})

}
