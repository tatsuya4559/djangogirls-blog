import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings')

import django
django.setup()

from django.utils import timezone
from django.contrib.auth.models import User
from faker import Faker
from blog.models import Post


fakegen = Faker('ja_JP')


def create_post(user):
    Post.objects.create(
        author=user,
        title=fakegen.word(),
        text=fakegen.text(),
        created_date=fakegen.date_time(),
        published_date=timezone.now()
    )


def populate(n=100):
    user = User.objects.all()[0]
    for _ in range(n):
        create_post(user)


if __name__ == "__main__":
    print('populating scripts')
    populate(5000)
    print('populating complate')
