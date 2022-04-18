from django.db import models


class Hash(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    text = models.TextField()
    hash = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text[:100]

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=('user', 'text'), name='user_text_uniqueness')
        ]
