# Generated by Django 2.2.1 on 2019-07-02 11:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0002_tv_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tv',
            name='image',
            field=models.ImageField(upload_to='static'),
        ),
    ]
