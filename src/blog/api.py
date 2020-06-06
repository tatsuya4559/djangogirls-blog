from django.http.response import JsonResponse
from django.utils import timezone

from blog.models import Post


def posts(request):
    posts = Post.objects.filter(published_date__lte=timezone.now()).order_by("published_date")
    return JsonResponse({"posts": [post.as_dict() for post in posts]})