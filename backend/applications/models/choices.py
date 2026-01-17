from django.db import models


class Status(models.TextChoices):
    TODO = 'todo', 'À postuler'
    APPLIED = 'applied', 'Postulé'
    INTERVIEW = 'interview', 'Entretien'
    OFFER = 'offer', 'Offre'
    REJECTED = 'rejected', 'Refusé'

