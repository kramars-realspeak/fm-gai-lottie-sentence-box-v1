"""
Author : Peter Kramar
Email : peter@ked.tech
This module contains a function that assesses a sentence against a given CEFR level.

Requirements:
    - cefrpy # pip install cefrpy / python -m pip install cefrpy

Validate package installation by running the following commands:
    - python -c "import cefrpy"
    - python -m cefrpy validate
"""

from cefrpy import CEFRAnalyzer

analyzer = CEFRAnalyzer()

data = {
  "image_src": "www.family.com/grandparents.jpg",
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

def assess_sentence_cefrpy(sentence):
    # split sentence into words and remove the dot at the end if there is a dot
    words = sentence[:-1].split(" ") if sentence[-1] == "." else sentence.split(" ")
    for word in words:
        word_level_float = analyzer.get_average_word_level_float(word.lower())
        word_level_cefr = analyzer.get_average_word_level_CEFR(word.lower())
        print(f"CEFRpy Word Level for '{word}': {word_level_cefr} = {word_level_float}")

def assess_sentence(sentence):    
    print("\nUsing CEFRpy for sentence-level assessment:")
    assess_sentence_cefrpy(sentence)

assess_sentence(data["sentence"])
