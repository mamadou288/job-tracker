from django.db import models
from .choices import Status


class Application(models.Model):
    company = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.TODO)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Candidature'
        verbose_name_plural = 'Candidatures'

    def __str__(self):
        return f"{self.company} - {self.title}"

