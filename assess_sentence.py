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

from nltk.tokenize import word_tokenize
from cefrpy import CEFRAnalyzer

analyzer = CEFRAnalyzer()

data = {
    "image_src": "www.professions.com/doctor-teacher-police-officer.jpg",
    "sentence": "The doctor is treating the patient.",
    "boxes": [
        "The doctor",
        "is",
        "treating",
        "the lesson"
    ],
    "cefr_level": "a2",
    "target_vocabulary": [
        "doctor",
        "teacher",
        "police officer"
    ],
    "target_grammar": [
        "present continuous tense"
    ],
    "user_choice": [],
    "submitted": False
}

def assess_sentence_cefrpy(sentence):
    for word in word_tokenize(sentence):
        word_level_float = analyzer.get_average_word_level_float(word)
        word_level_cefr = analyzer.get_average_word_level_CEFR(word)
        print(f"CEFRpy Word Level for '{word}': {word_level_cefr} = {word_level_float}")

def assess_sentence(sentence, cefr_target_level):    
    print("\nUsing CEFRpy for sentence-level assessment:")
    assess_sentence_cefrpy(sentence)

assess_sentence(data["sentence"], data["cefr_level"])
