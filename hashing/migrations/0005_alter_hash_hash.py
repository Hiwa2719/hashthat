# Generated by Django 4.0.4 on 2022-05-01 08:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hashing', '0004_hash_hash'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hash',
            name='hash',
            field=models.CharField(max_length=64),
        ),
    ]
