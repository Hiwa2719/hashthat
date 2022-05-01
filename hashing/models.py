from django.db import models


class Hash(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    text = models.TextField()
    hash = models.CharField(max_length=64)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=('user', 'text'), name='user_text_uniqueness')
        ]

    def __str__(self):
        return self.text[:100]

    def date_format(self):
        return self.created_date.strftime('%x %X')