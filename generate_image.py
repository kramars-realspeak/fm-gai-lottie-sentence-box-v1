"""
Author : Peter Kramar
Email : peter@ked.tech
This module contains a function that generates an image based on a given sentence and target vocabulary and grammar.

Requirements:
    - openai # pip install openai / python -m pip install openai

Validate package installation by running the following commands:
    - python -c "import openai"
    - python -m openai validate
"""

import openai
import requests
import os
from datetime import datetime
from openai import OpenAI

styles = ["Comic Book", "Gaming", "Realistic", "Fantasy", "GTA5 like", "Minecraft", "Photography", "Lego", "Taylor Swift", "Game of Thrones - Winterfell", "Roblox", "Fortnite", "School", "Among Us", "Five nights at Freddy's"]
style = styles[5]

data_structure =    {
  "image_src": "/Users/samuelgibson/Documents/GitHub/fm-gai-lottie-sentence-box-v1/media/img/19-09-2024-17-17-56.png",
  "sentence": "He is my granddad.",
  "boxes": [
    "He",
    "is",
    "my granddad"
  ],
  "cefr_level": "a1",
  "target_vocabulary": [
    "grandma",
    "granddad"
  ],
  "target_grammar": [
    "He is my",
    "She is my"
  ],
  "user_choice": [],
  "submitted": False
}

def craft_prompt(data, style):
    """Crafts a prompt for DALL-E based on the input data structure."""
    sentence = data.get("sentence", "")
    target_vocabulary = data.get("target_vocabulary", [])
    target_grammar = data.get("target_grammar", [])
    action_phrase = sentence
    prompt = (
        f"An image showing a scene where a {', '.join(target_vocabulary)} are involved. "
        f"The scene should depict: {action_phrase}"
        f"Style: {style}"
        f"comment: never include text"
    )
    print(f"Crafted prompt: {prompt}")
    return prompt

def generate_and_save_image(data, style, output_folder="./media/img", image_size="1024x1024"):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    try:
        print("Generating image...")
        key = ""
        client = OpenAI(api_key=key)
        prompt = craft_prompt(data, style)
        response = client.images.generate(
        model="dall-e-3",
        prompt=prompt,
        size=image_size,
        quality="standard",
        n=1,
        )
        image_url = response.data[0].url
        timestamp = datetime.now().strftime("%d-%m-%Y-%H-%M-%S")
        image_filename = os.path.join(output_folder, f"{timestamp}.png")
        img_data = requests.get(image_url).content
        with open(image_filename, 'wb') as image_file:
            image_file.write(img_data)
        print(f"Image saved successfully as {image_filename}")
        return image_filename

    except Exception as e:
        print(f"Error generating image: {e}")
        return None

generate_and_save_image(data_structure, style)